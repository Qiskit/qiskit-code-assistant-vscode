import ServiceAPI from "./serviceApi";
import { getExtensionContext } from "../globals/extensionContext";

const SERVICE_NAME = "qiskit-code-assistant";

export default class CodeAssistantService extends ServiceAPI {
  get name() { return SERVICE_NAME; }
  get requiresToken() { return true; }

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
    const endpoint = `${this.getServiceBaseUrl()}/models`;
    const apiToken = await this.getApiToken()
    const options = {
      'method': 'GET',
      'headers': this.getHeaders(apiToken)
    };
  
    const response = await this.runFetch(endpoint, options);
  
    let modelsData = null;
    if (response.ok) {
      const resp = (await response.json()) as ModelsList;
      modelsData = resp['models'];
    } else {
      console.error("Error getting models", response.status, response.statusText);
      throw Error(await this.getErrorMessage(response));
    }
    return modelsData;
  }

  async getModel(modelId: string): Promise<ModelInfo> {
    // GET /model/{modelId}
    const endpoint = `${this.getServiceBaseUrl()}/model/${modelId}`;
    const apiToken = await this.getApiToken()
    const options = {
      'method': 'GET',
      'headers': this.getHeaders(apiToken)
    };
  
    const response = await this.runFetch(endpoint, options);
  
    let modelData = null;
    if (response.ok) {
      modelData = await response.json();
    } else {
      console.error("Error getting model", response.status, response.statusText);
      throw Error(await this.getErrorMessage(response));
    }
    return modelData as ModelInfo;
  }
  
  async getModelDisclaimer(modelId: string): Promise<ModelDisclaimer> {
    // GET /model/{modelId}/disclaimer
    const endpoint = `${this.getServiceBaseUrl()}/model/${modelId}/disclaimer`;
    const apiToken = await this.getApiToken()
    const options = {
      'method': 'GET',
      'headers': this.getHeaders(apiToken)
    };
  
    const response = await this.runFetch(endpoint, options);
  
    if (response.ok) {
      const disclaimerData = await response.json() as ModelDisclaimer;
      return disclaimerData;
    } else {
      console.error("Error getting disclaimer", response.status, response.statusText);
      throw Error(await this.getErrorMessage(response));
    }
  }

  async postDisclaimerAcceptance(
    modelId: string,
    disclaimerId: string,
    accepted: boolean
  ): Promise<ResponseMessage> {
    // POST /disclaimer/{disclaimerId}/acceptance
    const endpoint = `${this.getServiceBaseUrl()}/disclaimer/${disclaimerId}/acceptance`;
    const apiToken = await this.getApiToken()
    const options = {
      'method': 'POST',
      'headers': this.getHeaders(apiToken),
      'body': JSON.stringify({
        'model': modelId,
        accepted
      })
    };
  
    const response = await this.runFetch(endpoint, options);
  
    let disclaimerData = null;
    if (response.ok) {
      disclaimerData = await response.json();
    } else {
      console.error("Error accepting disclaimer", response.status, response.statusText);
      throw Error(await this.getErrorMessage(response));
    }
    return disclaimerData as ResponseMessage;
  }

  async postModelPrompt(
    modelId: string,
    input: string
  ): Promise<ModelPromptResponse> {
    // POST /model/{modelId}/prompt
    const endpoint = `${this.getServiceBaseUrl()}/model/${modelId}/prompt`;
    const apiToken = await this.getApiToken()
    const options = {
      'method': 'POST',
      'headers': this.getHeaders(apiToken),
      'body': JSON.stringify({
        input
      })
    };
  
    const response = await this.runFetch(endpoint, options);
  
    let promptResponse = null;
    if (response.ok) {
      promptResponse = await response.json();
    } else {
      console.error("Error sending prompt", response.status, response.statusText);
      throw Error(await this.getErrorMessage(response));
    }
    return promptResponse as ModelPromptResponse;
  }

  async postPromptAcceptance(
    promptId: string,
    accepted: boolean
  ): Promise<ResponseMessage> {
    // POST /prompt/{promptId}/acceptance
    const endpoint = `${this.getServiceBaseUrl()}/prompt/${promptId}/acceptance`;
    const apiToken = await this.getApiToken()
    const options = {
      'method': 'POST',
      'headers': this.getHeaders(apiToken),
      'body': JSON.stringify({
        accepted
      })
    };
  
    const response = await this.runFetch(endpoint, options);
  
    let disclaimerData = null;
    if (response.ok) {
      disclaimerData = await response.json();
    } else {
      console.error("Error accepting prompt", response.status, response.statusText);
      throw Error(await this.getErrorMessage(response));
    }
    return disclaimerData as ResponseMessage;
  }
}
