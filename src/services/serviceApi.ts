import * as vscode from "vscode";

import { normalizeURL, normalizeURLPath } from "../utilities/utils";
import { DISCLAIMER_ERROR_MSG } from "../globals/consts";

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
        // Read the body as text ONCE to avoid "Body already read" error
        const responseText = await response.text();

        // Try to parse it as JSON
        try {
          const jsonMsg = JSON.parse(responseText) as {detail: string};
          msg = jsonMsg?.detail || response.statusText;
        } catch {
          // If not JSON, use the text directly
          msg = responseText || response.statusText;
        }

        console.log(response.status, msg);

        if (AUTH_ERROR_CODES.includes(response.status)) {
          msg = `API Token is not authorized or is incorrect: ${msg}`
          if (response.status === 403 && msg.toLowerCase().includes("disclaimer")) {
            msg = DISCLAIMER_ERROR_MSG
          }
        }
      } catch (err) {
        console.error('Error reading response body:', err);
        msg = response.statusText || "An unknown error has occurred";
      }
    }
    return msg;
  }

  static getServiceBaseUrl() {
    const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
    const serviceUrl = config.get<string>("url") as string;
    if (serviceUrl) {
      return normalizeURL(serviceUrl);
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
      throw Error(await ServiceAPI.getErrorMessage(response));
    }

    return response;
  }

  static async *runFetchStreaming(urlPath: string, options: RequestInit) {
    const response = await ServiceAPI.runFetch(urlPath, options);

    if (!response.body) {
      throw Error("Fetch failed. No response body returned.");
    }

    // get body reader
    const reader = response.body.getReader();
    while (true) {
      // wait for next encoded chunk
      const { done, value } = await reader.read();
      // check if stream is done
      if (done) break;
      // decode chunk and yield it
      yield (new TextDecoder().decode(value));
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
    feedback: any
  ): Promise<ResponseMessage> {
    return { success: true }
  }
}
