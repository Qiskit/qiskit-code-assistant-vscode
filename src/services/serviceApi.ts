import vscode from "vscode";

import { normalizeURL } from "../utilities/utils";

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
  get requiresToken() { return false; }

  async getErrorMessage(response: Response) {
    let msg = "An unknown error has occurred";
    if (!response.ok) {
      try {
        const jsonMsg = await response.json() as {detail: string};
        msg = jsonMsg?.detail || response.statusText;
        console.log(response.status)
  
        if (AUTH_ERROR_CODES.includes(response.status)) {
          msg = `API Token is not authorized or is incorrect: ${msg}`
        }
      } catch (err) {
        msg = await response.text();
      }
    }
    return msg;
  }

  getServiceBaseUrl() {
    if (SERVICE_URL) {
      return normalizeURL(SERVICE_URL);
    } else {
      throw Error("Missing service URL. Check Qiskit Code Assistant settings.")
    }
  }

  getHeaders(apiToken: string|undefined = undefined) {
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

  async runFetch(endpoint: string | URL | Request, options: RequestInit) {
    try {
      const response = await fetch(endpoint, options);
      return response;
    } catch (err) {
      console.error(`Fetch failed for ${endpoint}: ${(err as Error).message}`);
      throw Error("Fetch failed. Possible invalid service request or service is currently unavailable.");
    }
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

  async postModelPrompt(
    modelId: string,
    input: string
  ): Promise<ModelPromptResponse> {
    return ({} as ModelPromptResponse)
  }
  
  async postPromptAcceptance(
    promptId: string,
    accepted: boolean
  ): Promise<ResponseMessage> {
    return { success: true }
  }
}