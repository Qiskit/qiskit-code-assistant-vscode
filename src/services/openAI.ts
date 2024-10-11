import ServiceAPI from "./serviceApi";

type OpenAIModelInfo = {
  id: string
}
type OpenAIModelList = {
  data: OpenAIModelInfo[]
}
type OpenAIChoice = {
  index: number,
  text: string
}
type OpenAIPromptResponse = {
  id: string,
  created: number,
  choices: OpenAIChoice[]
}

const OPENAI_API_VERSION = "v1";
const SERVICE_NAME = "open-ai";

function modelTransform (model: OpenAIModelInfo): ModelInfo {
  return {
    "_id": model.id,
    "disclaimer": { accepted: true },
    "display_name": model.id,
    "doc_link": "",
    "license": { name: "", link: "" },
    "model_id": model.id,
    "prompt_type": 1,
    "token_limit": 255
  }
}

export default class OpenAIService extends ServiceAPI {
  get name() { return SERVICE_NAME; }

  async getModels(): Promise<ModelInfo[]> {
    // GET /v1/models
    const endpoint = `/${OPENAI_API_VERSION}/models`;
    const options = {
      "method": "GET",
      "headers": this.getHeaders()
    };
  
    const response = await this.runFetch(endpoint, options);
    const jsonResponse = (await response.json()) as OpenAIModelList;
    const modelsData = jsonResponse["data"];
    const updatedModelsData = modelsData.map(modelTransform);
  
    return updatedModelsData;
  }

  async getModel(modelId: string): Promise<ModelInfo> {
    // GET /v1/models/{model_id}
    const endpoint = `/${OPENAI_API_VERSION}/models/${modelId}`;
    const options = {
      "method": "GET",
      "headers": this.getHeaders(),
    };
  
    const response = await this.runFetch(endpoint, options);
    const modelData = (await response.json()) as ModelInfo;
  
    return modelData;
  }

  async postModelPrompt(
    modelId: string,
    input: string
  ): Promise<ModelPromptResponse> {
    // POST /v1/completions
    const endpoint = `/${OPENAI_API_VERSION}/completions`;
    const options = {
      "method": "POST",
      "body": JSON.stringify({
        model: modelId,
        prompt: input
      })
    };
  
    const response = await this.runFetch(endpoint, options);
    const jsonResponse = (await response.json()) as OpenAIPromptResponse;
    const responseText = jsonResponse["choices"].map(c => {
      return  { "generated_text": c.text };
    });
    const promptResponse: ModelPromptResponse = {
      results: responseText,
      prompt_id: jsonResponse["id"],
      created_at: (new Date(jsonResponse["created"])).toISOString()
    }

    return promptResponse;
  }
}
