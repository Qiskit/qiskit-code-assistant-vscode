import ServiceAPI from "./serviceApi";
import { getExtensionContext } from "../globals/extensionContext";
import { requiresToken } from "../utilities/guards";

const SERVICE_NAME = "qiskit-code-assistant";

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

  async postModelPrompt(
    modelId: string,
    input: string
  ): Promise<ModelPromptResponse> {
    // POST /model/{modelId}/prompt
    const endpoint = `/model/${modelId}/prompt`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify({
        input
      })
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const promptResponse = (await response.json()) as ModelPromptResponse;

    return promptResponse;
  }

  async postPromptAcceptance(
    promptId: string,
    accepted: boolean
  ): Promise<ResponseMessage> {
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
    comment: undefined|string
  ): Promise<ResponseMessage> {
    // POST /feedback
    const endpoint = `/feedback`;
    const apiToken = await this.getApiToken()
    const options = {
      "method": "POST",
      "headers": ServiceAPI.getHeaders(apiToken),
      "body": JSON.stringify({
        model_id: modelId,
        prompt_id: promptId,
        positive_feedback: positiveFeedback,
        comment
      })
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const feedbackResponse = (await response.json()) as ResponseMessage;

    return feedbackResponse;
  }
}
