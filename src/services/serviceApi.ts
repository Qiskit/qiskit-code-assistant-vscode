import vscode from "vscode";

import { normalizeURL, normalizeURLPath } from "../utilities/utils";

const config = vscode.workspace.getConfiguration("qiskitCodeAssistant")
const SERVICE_URL = config.get<string>("url") as string;
const AUTH_ERROR_CODES = [401, 403];

type APIHeader = {
  "Accept": string,
  "Content-Type": string,
  "X-Caller": string,
  "Authorization"?: string
}

const SERVICE_NAME = "service-api";

export default class ServiceAPI {
  get name() { return SERVICE_NAME; }

  get enableFeedback() { return false; }

  static async getErrorMessage(response: Response) {
    let msg = "An unknown error has occurred";
    if (!response.ok) {
      try {
        // Clone the response to avoid consuming the original body
        const responseClone = response.clone();
        const jsonMsg = await responseClone.json() as {detail: string};
        msg = jsonMsg?.detail || response.statusText;
        console.log(response.status, msg);
  
        if (AUTH_ERROR_CODES.includes(response.status)) {
          msg = `API Token is not authorized or is incorrect: ${msg}`
        }
      } catch (err) {
        try {
          // If JSON parsing fails, try text - clone again to be safe
          const responseClone = response.clone();
          msg = await responseClone.text();
        } catch (textErr) {
          msg = response.statusText || "Unknown error";
        }
      }
    }
    return msg;
  }

  static getServiceBaseUrl() {
    if (SERVICE_URL) {
      return normalizeURL(SERVICE_URL);
    } else {
      throw Error("Missing service URL. Check Qiskit Code Assistant settings.")
    }
  }

  static getHeaders(apiToken: string|undefined = undefined) {
    let headers: APIHeader = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Caller": "qiskit-vscode"
    }

    if (apiToken) {
      headers["Authorization"] = `Bearer ${apiToken}`;
    }

    return headers;
  }

  static async runFetch(urlPath: string, options: RequestInit) {
    let response: Response;

    try {
      const endpoint = `${ServiceAPI.getServiceBaseUrl()}${normalizeURLPath(urlPath)}`;
      response = await fetch(endpoint, options);
    } catch (err) {
      console.error(`Fetch failed for ${urlPath}: ${(err as Error).message}`);
      throw Error("Fetch failed. Possible invalid service request or service is currently unavailable.");
    }

    if (!response.ok) {
      console.error(`Error response for ${urlPath}:`, response.status, response.statusText);
      const errorMessage = await ServiceAPI.getErrorMessage(response);
      throw Error(errorMessage);
    }

    return response;
  }

  static async *runFetchStreaming(urlPath: string, options: RequestInit) {
    console.log("Starting streaming fetch for:", urlPath);
    
    const response = await ServiceAPI.runFetch(urlPath, options);

    if (!response.body) {
      throw Error("Fetch failed. No response body returned.");
    }

    console.log("Streaming response headers:", {
      contentType: response.headers.get('content-type'),
      transferEncoding: response.headers.get('transfer-encoding'),
      status: response.status
    });

    // Verify the response is actually set up for streaming
    if (response.status !== 200) {
      console.error("Non-200 response for streaming:", response.status);
      throw new Error(`Streaming request failed with status: ${response.status}`);
    }

    // get body reader
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = ''; // Buffer for incomplete chunks
    
    try {
      while (true) {
        // wait for next encoded chunk
        const { done, value } = await reader.read();
        
        // check if stream is done
        if (done) {
          console.log("Stream finished");
          // Process any remaining data in buffer
          if (buffer.trim()) {
            console.log("Final buffer content:", buffer);
            yield buffer;
          }
          break;
        }
        
        // decode chunk and add to buffer
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        
        // Process complete lines from buffer
        const lines = buffer.split('\n');
        // Keep the last line in buffer (might be incomplete)
        buffer = lines.pop() || '';
        
        // Yield complete lines
        for (const line of lines) {
          if (line.trim()) {
            console.log("Streaming line:", line.substring(0, 100) + (line.length > 100 ? '...' : ''));
            yield line + '\n';
          }
        }
      }
    } catch (error) {
      console.error("Streaming read error:", error);
      throw error;
    } finally {
      reader.releaseLock();
    }
  }

  async checkForToken(): Promise<void> {
    return Promise.resolve();
  }

  async getModels(): Promise<ModelInfo[]> {
    return ([] as ModelInfo[]);
  }

  async getModel(modelId: string): Promise<ModelInfo> {
    return ({} as ModelInfo);
  }

  async getModelDisclaimer(modelId: string): Promise<ModelDisclaimer> {
    return ({} as ModelDisclaimer)
  }

  async postDisclaimerAcceptance(
    modelId: string,
    disclaimerId: string,
    accepted: boolean
  ): Promise<ResponseMessage> {
    return { success: true }
  }

  async *postModelPrompt(
    modelId: string,
    input: string
  ): AsyncGenerator<ModelPromptResponse> {
    yield ({} as ModelPromptResponse)
  }
  
  async postPromptAcceptance(
    promptId: string,
    accepted: boolean
  ): Promise<ResponseMessage> {
    return { success: true }
  }

  async postFeedback(
    modelId: string,
    promptId: undefined|string,
    positiveFeedback: undefined|boolean,
    comment: undefined|string,
    input: undefined|string,
    output: undefined|string
  ): Promise<ResponseMessage> {
    return { success: true }
  }
}
