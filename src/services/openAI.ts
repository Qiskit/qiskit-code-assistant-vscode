import ServiceAPI from "./serviceApi";

type OpenAIModelInfo = {
  id: string
}
type OpenAIModelList = {
  data: OpenAIModelInfo[]
}

const OPENAI_API_VERSION = "v1";
const SERVICE_NAME = "open-ai";

export default class OpenAIService extends ServiceAPI {
  get name() { return SERVICE_NAME; }

  async getModels(): Promise<ModelInfo[]> {
    // GET /v1/models
    const endpoint = `${this.getServiceBaseUrl()}/${OPENAI_API_VERSION}/models`;
    const options = {
      "method": "GET",
      "headers": this.getHeaders()
    };
  
    const response = await this.runFetch(endpoint, options);
  
    let modelsData = null;
    if (response.ok) {
      const resp = (await response.json()) as OpenAIModelList;
      modelsData = resp["data"];
    } else {
      console.error("Error getting models", response.status, response.statusText);
      throw Error(await this.getErrorMessage(response));
    }
  
    return modelsData
            .map(m => {
              return {
                "_id": m.id,
                "disclaimer": { accepted: true },
                "display_name": m.id,
                "doc_link": "",
                "license": { name: "", link: "" },
                "model_id": m.id,
                "prompt_type": 1,
                "token_limit": 255
              }
            })
  }

  async getModel(modelId: string): Promise<ModelInfo> {
    // GET /v1/models/{model_id}
    const endpoint = `${this.getServiceBaseUrl()}/${OPENAI_API_VERSION}/models/${modelId}`;
    const options = {
      "method": "GET",
      "headers": this.getHeaders(),
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

  async postModelPrompt(
    modelId: string,
    input: string
  ): Promise<ModelPromptResponse> {
    // POST /v1/completions
    const endpoint = `${this.getServiceBaseUrl()}/${OPENAI_API_VERSION}/completions`;
    const options = {
      "method": "POST",
      "body": JSON.stringify({
        model: modelId,
        prompt: input
      })
    };
  
    const response = await this.runFetch(endpoint, options);
  
    let promptResponse = null;
    if (response.ok) {
      promptResponse = await response.json() as {
        id: string,
        created: number,
        choices: {"text": string, "index": number}[]
      };
    } else {
      console.error("Error sending prompt", response.status, response.statusText);
      throw Error(await this.getErrorMessage(response));
    }
  
    const results = promptResponse["choices"].map(c => {
      return  {
        "generated_text": c.text
      }
    })
  
    return {
      results: results,
      prompt_id: promptResponse["id"],
      created_at: (new Date(promptResponse["created"])).toISOString()
    }
  }
}
