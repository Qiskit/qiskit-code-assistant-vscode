/**
* This code is part of Qiskit.
*
* (C) Copyright IBM 2025.
*
* This code is licensed under the Apache License, Version 2.0. You may
* obtain a copy of this license in the LICENSE.txt file in the root directory
* of this source tree or at http:*www.apache.org/licenses/LICENSE-2.0.
*
* Any modifications or derivative works of this code must retain this
* copyright notice, and modified files need to carry a notice indicating
* that they have been altered from the originals.
*/

import * as vscode from "vscode";

import ServiceAPI from "./serviceApi";
import { getExtensionContext } from "../globals/extensionContext";
import { requiresToken } from "../utilities/guards";
import { SSEParser, StreamingPipeline } from "../utilities/streamingPipeline";
import { streamingStatusBar, StreamingTelemetry } from "../utilities/streamingStatusBar";
import { isRetryableError } from "../utilities/errorUtils";
import { getCircuitBreaker } from "../utilities/circuitBreaker";
import { modelTransform, toModelPromptResponse } from "../utilities/utils";

const QCA_API_VERSION = "v1";
const SERVICE_NAME = "qiskit-code-assistant";
const STREAM_DATA_PREFIX = 'data: ';

export default class CodeAssistantService extends ServiceAPI {
  get name() { return SERVICE_NAME; }

  get enableFeedback() { return true; }

  async checkForToken(): Promise<void> {
    return await requiresToken();
  }

  async getApiToken() {
    const context = getExtensionContext();
    const apiToken = await context?.secrets.get("apiToken");
  
    if (!apiToken) {
      throw Error("Missing API Token");
    }
  
    return apiToken;
  }

  async getModels(): Promise<ModelInfo[]> {
    // GET /v1/models
    const endpoint = `/${QCA_API_VERSION}/models`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "GET",
      "headers": ServiceAPI.getHeaders(apiToken)
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const jsonResponse = (await response.json()) as OpenAIModelList;
    const modelsData = jsonResponse["data"];
    const updatedModelsData = modelsData.map((model) => modelTransform(model, false));
  
    return updatedModelsData;
  }

  async getModel(modelId: string): Promise<ModelInfo> {
    // GET /v1/models/{model_id}
    const endpoint = `/${QCA_API_VERSION}/models/${modelId}`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "GET",
      "headers": ServiceAPI.getHeaders(apiToken)
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const modelData = (await response.json()) as OpenAIModelInfo;
    const updatedModelsData = modelTransform(modelData, false)

    return updatedModelsData;
  }
  
  async getModelDisclaimer(modelId: string): Promise<ModelDisclaimer> {
    // GET /v1/models/{modelId}/disclaimer
    const endpoint = `/${QCA_API_VERSION}/models/${modelId}/disclaimer`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "GET",
      "headers": ServiceAPI.getHeaders(apiToken)
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const disclaimerData = (await response.json()) as ModelDisclaimer;

    return disclaimerData;
  }

  async postDisclaimerAcceptance(
    modelId: string,
    disclaimerId: string,
    accepted: boolean
  ): Promise<ResponseMessage> {
    // POST /v1/models/{modelId}/disclaimer
    const endpoint = `/${QCA_API_VERSION}/models/${modelId}/disclaimer`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify({
        "disclaimer": disclaimerId,
        accepted
      })
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const disclaimerData = (await response.json()) as ResponseMessage;

    return disclaimerData;
  }

  async *postModelPrompt(
    modelId: string,
    input: string,
    signal?: AbortSignal,
    retryCount: number = 0
  ): AsyncGenerator<ModelPromptResponse> {
    // POST /v1/completions
    const endpoint = `/${QCA_API_VERSION}/chat/completions`;
    const apiToken = await this.getApiToken()

    // Fetch config at runtime for hot-reload support
    const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
    const streamingEnabled = config.get<boolean>("enableStreaming") ?? false;
    const enableMetrics = config.get<boolean>("enableTelemetry") ?? false;
    const bufferSize = config.get<number>("streamingBufferSize") ?? 1;
    const maxRetries = config.get<number>("streamingRetryAttempts") ?? 2;
    const retryDelay = config.get<number>("streamingRetryDelay") ?? 1000;
    const timeout = config.get<number>("streamingTimeout") ?? 30000;
    const circuitBreakerEnabled = config.get<boolean>("circuitBreakerEnabled") ?? true;
    const circuitBreakerThreshold = config.get<number>("circuitBreakerThreshold") ?? 3;
    const circuitBreakerResetTimeout = config.get<number>("circuitBreakerResetTimeout") ?? 60000;

    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify({
        model: modelId,
        messages: [{
          role: "user",
          content: input
        }],
        stream: streamingEnabled
      })
    };

    if (streamingEnabled) {
      // Get circuit breaker instance
      const circuitBreaker = circuitBreakerEnabled
        ? getCircuitBreaker(SERVICE_NAME, {
            failureThreshold: circuitBreakerThreshold,
            resetTimeout: circuitBreakerResetTimeout,
            successThreshold: 2
          })
        : null;

      try {
        // Check circuit breaker before request
        if (circuitBreaker) {
          await circuitBreaker.beforeRequest();
        }

        // Log streaming start
        if (enableMetrics && retryCount === 0) {
          StreamingTelemetry.logStart('postModelPrompt', {
            modelId,
            service: SERVICE_NAME,
            streamingEnabled: true,
            bufferSize,
            timeout
          });
        }

        // Start streaming status indicator
        streamingStatusBar.start();

        // Create timeout signal if configured
        let timeoutId: NodeJS.Timeout | undefined;
        let abortController: AbortController | undefined;
        let effectiveSignal = signal;

        if (timeout > 0) {
          abortController = new AbortController();
          timeoutId = setTimeout(() => {
            abortController!.abort();
          }, timeout);

          // Combine external signal with timeout signal
          if (signal) {
            signal.addEventListener('abort', () => {
              abortController!.abort();
            });
          }

          effectiveSignal = abortController.signal;
        }

        try {
          // Execute streaming request
          const streamGenerator = async function* (): AsyncGenerator<ModelPromptResponse> {
            // Get raw streaming response
            const rawStream = ServiceAPI.runFetchStreaming(endpoint, options);

            // Parse SSE format with unified parser
            const parser = new SSEParser<OpenAIPromptResponse>(STREAM_DATA_PREFIX);
            const parsedStream = parser.parse(rawStream);

            // Transform OpenAI format to ModelPromptResponse
            async function* transformStream(stream: AsyncGenerator<OpenAIPromptResponse>): AsyncGenerator<ModelPromptResponse> {
              for await (const openAIChunk of stream) {
                yield toModelPromptResponse(openAIChunk);
              }
            }

            const transformedStream = transformStream(parsedStream);

            // Wrap in streaming pipeline for metrics and monitoring
            const pipeline = new StreamingPipeline(transformedStream, {
              signal: effectiveSignal,
              enableMetrics,
              bufferSize,
              onComplete: (metrics) => {
                streamingStatusBar.complete(metrics);
                if (enableMetrics) {
                  StreamingTelemetry.logMetrics('postModelPrompt', metrics, {
                    modelId,
                    service: SERVICE_NAME,
                    retryCount
                  });
                }
              },
              onError: (error) => {
                streamingStatusBar.error('Streaming failed');
                if (enableMetrics) {
                  StreamingTelemetry.logError('postModelPrompt', error as Error, {
                    modelId,
                    service: SERVICE_NAME,
                    retryCount
                  });
                }
              }
            });

            // Yield chunks from pipeline
            for await (const chunk of pipeline.process()) {
              yield chunk;
            }
          };

          // Yield from the stream generator
          for await (const chunk of streamGenerator()) {
            yield chunk;
          }

          // Record success with circuit breaker
          if (circuitBreaker) {
            circuitBreaker.onSuccess();
          }
        } finally {
          // Clean up timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        }
      } catch (error) {
        // Record failure with circuit breaker
        if (circuitBreaker && error instanceof Error) {
          circuitBreaker.onFailure(error);
        }

        // Check for timeout
        if (signal?.aborted || error instanceof Error && error.name === 'AbortError') {
          if (enableMetrics) {
            StreamingTelemetry.logTimeout('postModelPrompt', timeout, {
              modelId,
              service: SERVICE_NAME,
              retryCount
            });
          }
          // Status bar already cleaned up by onError callback
          throw new Error('Streaming request timed out');
        }

        // Check if error is retryable (network errors, 5xx status codes)
        const isRetryable = isRetryableError(error);

        if (isRetryable && retryCount < maxRetries) {
          const delayMs = retryDelay * Math.pow(2, retryCount);

          if (enableMetrics) {
            StreamingTelemetry.logRetry('postModelPrompt', retryCount + 1, maxRetries, delayMs, {
              modelId,
              service: SERVICE_NAME,
              error: error instanceof Error ? error.message : String(error)
            });
          }

          console.log(`Retrying streaming request (attempt ${retryCount + 1}/${maxRetries})...`);
          vscode.window.showWarningMessage(
            `Connection issue detected. Retrying... (${retryCount + 1}/${maxRetries})`
          );

          // Wait with exponential backoff
          await new Promise(resolve => setTimeout(resolve, delayMs));

          // Retry by recursively calling the function with incremented counter
          yield* this.postModelPrompt(modelId, input, signal, retryCount + 1);
        } else {
          // Status bar already cleaned up by onError callback
          throw error;
        }
      }
    } else {
      const response = await ServiceAPI.runFetch(endpoint, options)
      const jsonResponse = (await response.json()) as OpenAIPromptResponse;
      const promptResponse = toModelPromptResponse(jsonResponse)
      yield promptResponse;
    }
  }

  async postPromptAcceptance(
    promptId: string,
    accepted: boolean
  ): Promise<ResponseMessage> {
    if (!vscode.env.isTelemetryEnabled) {
      // VSCode telemetry level is set to `off`
      return { success: false }
    }

    const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
    const telemetryEnabled = config.get<boolean>("enableTelemetry") as boolean;
    if (!telemetryEnabled) {
      // Qiskit Code Assistant telemetry is disabled
      return { success: false }
    }
    
    // POST /v1/completion/acceptance
    const endpoint = `/${QCA_API_VERSION}/completion/acceptance`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify({
        completion: promptId,
        accepted
      })
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const promptData = (await response.json()) as ResponseMessage;

    return promptData;
  }

  async postFeedback(
    feedback: any
  ): Promise<ResponseMessage> {
    // POST /feedback
    const endpoint = `/feedback`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify(feedback)
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const feedbackResponse = (await response.json()) as ResponseMessage;

    return feedbackResponse;
  }
}
