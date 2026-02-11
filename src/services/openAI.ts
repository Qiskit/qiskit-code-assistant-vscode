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
import { SSEParser, StreamingPipeline } from "../utilities/streamingPipeline";
import { streamingStatusBar, StreamingTelemetry } from "../utilities/streamingStatusBar";
import { isRetryableError } from "../utilities/errorUtils";
import { getCircuitBreaker } from "../utilities/circuitBreaker";
import { modelTransform, toModelPromptResponse } from "../utilities/utils";

const OPENAI_API_VERSION = "v1";
const SERVICE_NAME = "open-ai";

export default class OpenAIService extends ServiceAPI {
  get name() { return SERVICE_NAME; }

  async getModels(): Promise<ModelInfo[]> {
    // GET /v1/models
    const endpoint = `/${OPENAI_API_VERSION}/models`;
    const options = {
      "method": "GET",
      "headers": ServiceAPI.getHeaders()
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const jsonResponse = (await response.json()) as OpenAIModelList;
    const modelsData = jsonResponse["data"];
    const updatedModelsData = modelsData.map((model) => modelTransform(model, true));
  
    return updatedModelsData;
  }

  async getModel(modelId: string): Promise<ModelInfo> {
    // GET /v1/models/{model_id}
    const endpoint = `/${OPENAI_API_VERSION}/models/${modelId}`;
    const options = {
      "method": "GET",
      "headers": ServiceAPI.getHeaders(),
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const modelData = (await response.json()) as OpenAIModelInfo;
    const updatedModelsData = modelTransform(modelData, false)

    return updatedModelsData;
  }

  async *postModelPrompt(
    modelId: string,
    input: string,
    signal?: AbortSignal,
    retryCount: number = 0
  ): AsyncGenerator<ModelPromptResponse> {
    // POST /v1/completions
    const endpoint = `/${OPENAI_API_VERSION}/completions`;

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
      "headers": ServiceAPI.getHeaders(),
      "body": JSON.stringify({
        model: modelId,
        prompt: input,
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

            // Parse SSE format with unified parser (OpenAI uses "data: " prefix)
            const parser = new SSEParser<OpenAIPromptResponse>('data: ');
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
      const response = await ServiceAPI.runFetch(endpoint, options);
      const jsonResponse = (await response.json()) as OpenAIPromptResponse;
      const promptResponse = toModelPromptResponse(jsonResponse)
      yield promptResponse;
    }
  }
}
