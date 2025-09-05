import vscode from "vscode";

import ServiceAPI from "./serviceApi";
import { getExtensionContext } from "../globals/extensionContext";
import { requiresToken } from "../utilities/guards";

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
    // GET /models
    const endpoint = "/models";
    const apiToken = await this.getApiToken()
    const options = {
      "method": "GET",
      "headers": ServiceAPI.getHeaders(apiToken)
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const jsonResponse = (await response.json()) as ModelsList;
    const modelsData = jsonResponse["models"];

    return modelsData;
  }

  async getModel(modelId: string): Promise<ModelInfo> {
    // GET /model/{modelId}
    const endpoint = `/model/${modelId}`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "GET",
      "headers": ServiceAPI.getHeaders(apiToken)
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const modelData = (await response.json()) as ModelInfo;

    return modelData;
  }
  
  async getModelDisclaimer(modelId: string): Promise<ModelDisclaimer> {
    // GET /model/{modelId}/disclaimer
    const endpoint = `/model/${modelId}/disclaimer`;
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
    // POST /disclaimer/{disclaimerId}/acceptance
    const endpoint = `/disclaimer/${disclaimerId}/acceptance`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify({
        "model": modelId,
        accepted
      })
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const disclaimerData = (await response.json()) as ResponseMessage;

    return disclaimerData;
  }

  async *postModelPrompt(
    modelId: string,
    input: string
  ): AsyncGenerator<ModelPromptResponse> {
    // POST /model/{modelId}/prompt
    const endpoint = `/model/${modelId}/prompt`;
    const apiToken = await this.getApiToken()
    
    // Get fresh config each time to ensure settings changes are picked up
    const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
    const streamingEnabled = config.get<boolean>("enableStreaming") as boolean;
    
    console.log("Completion streaming enabled:", streamingEnabled);
    
    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify({
        input,
        stream: streamingEnabled
      })
    };
  
    if (streamingEnabled) {
      console.log("Starting streaming completion for model:", modelId);
      const response = ServiceAPI.runFetchStreaming(endpoint, options);
  
      try {
        for await (let chunk of response) {
          console.log("Received completion chunk:", chunk.substring(0, 200) + "...");
          
          // parse & transform the streaming data chunk
          const lines = chunk.split('\n');
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith(STREAM_DATA_PREFIX)) {
              try {
                // remove 'data: ' prefix and parse remaining string
                const jsonStr = line.substring(STREAM_DATA_PREFIX.length);
                console.log("Parsing completion JSON:", jsonStr);
                
                const jsonChunk = JSON.parse(jsonStr) as ModelPromptResponse;
                console.log("Parsed completion chunk:", jsonChunk);
                
                yield jsonChunk;
              } catch (error) {
                // JSON parsing errors
                console.error(`Error parsing completion JSON: ${error}`);
                console.log("Problematic completion line:", line);
              }
            } else if (line.trim() === '') {
              // Empty lines are normal in streaming, skip them
              continue;
            } else if (line.startsWith('[DONE]') || line === 'data: [DONE]') {
              // End of stream marker
              console.log("Completion stream finished");
              break;
            } else {
              console.log("Non-data completion line:", line);
            }
          }
        }
      } catch (streamError) {
        console.error("Completion streaming error:", streamError);
        throw streamError;
      }
    } else {
      console.log("Using non-streaming completion for model:", modelId);
      const response = await ServiceAPI.runFetch(endpoint, options)
      const promptResponse = (await response.json()) as ModelPromptResponse;
      console.log("Non-streaming completion response:", promptResponse);
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
  
    // Get fresh config each time
    const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
    const telemetryEnabled = config.get<boolean>("enableTelemetry") as boolean;
    if (!telemetryEnabled) {
      // Qiskit Code Assistant telemetry is disabled
      return { success: false }
    }
    
    // POST /prompt/{promptId}/acceptance
    const endpoint = `/prompt/${promptId}/acceptance`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify({
        accepted
      })
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const promptData = (await response.json()) as ResponseMessage;

    return promptData;
  }

  async postFeedback(
    modelId: string,
    promptId: undefined|string,
    positiveFeedback: undefined|boolean,
    comment: undefined|string,
    input: undefined|string,
    output: undefined|string
  ): Promise<ResponseMessage> {
    // POST /feedback
    const endpoint = `/feedback`;
    const apiToken = await this.getApiToken()
    
    // Validate and sanitize data to prevent server errors
    const sanitizedInput = input ? input.substring(0, 10000) : undefined; // Limit to 10KB
    const sanitizedOutput = output ? output.substring(0, 10000) : undefined; // Limit to 10KB
    const sanitizedComment = comment ? comment.substring(0, 1000) : undefined; // Limit to 1KB
    
    const feedbackData = {
      model_id: modelId,
      prompt_id: promptId || undefined, // Ensure null becomes undefined
      input: sanitizedInput,
      output: sanitizedOutput,
      positive_feedback: positiveFeedback,
      comment: sanitizedComment
    };
    
    // Remove undefined values to clean up the payload
    const cleanedData = Object.fromEntries(
      Object.entries(feedbackData).filter(([_, value]) => value !== undefined)
    );
    
    // Log the feedback data being sent for debugging
    console.log("Sending feedback data:", {
      model_id: modelId,
      prompt_id: promptId,
      has_input: !!sanitizedInput,
      input_length: sanitizedInput?.length,
      has_output: !!sanitizedOutput,
      output_length: sanitizedOutput?.length,
      positive_feedback: positiveFeedback,
      has_comment: !!sanitizedComment,
      comment_length: sanitizedComment?.length,
      cleaned_keys: Object.keys(cleanedData)
    });
    
    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify(cleanedData)
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const feedbackResponse = (await response.json()) as ResponseMessage;

    return feedbackResponse;
  }
}
