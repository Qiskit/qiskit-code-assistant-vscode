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
    "model_id": model.id
  }
}

function has_only_comments(text: string) {
  return text.split("\n").every((line: string) => {
    return line.trim().startsWith("#")
  });
}

function preprocess_prompt(prompt_input: string) {
  const only_comments = has_only_comments(prompt_input);
  let structured_input = prompt_input;
  if (only_comments) {
    const _processed_input = prompt_input.replace("#", "").trim();
    structured_input = `Question: 
${_processed_input}

Answer:
\`\`\`python`
  }
  else {
    structured_input = `Question:
please complete the code below: 
${prompt_input}

Answer:
${prompt_input}`
  }
  console.log(structured_input)
  return structured_input
}

function postprocess_text(generated_text: string) {
  console.log(generated_text)
  const idx = generated_text.indexOf("```");
  if (idx > -1) {
    return generated_text.substring(0, idx);
  }
  return generated_text;
}

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
    const updatedModelsData = modelsData.map(modelTransform);
  
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
      "headers": ServiceAPI.getHeaders(),
      "body": JSON.stringify({
        model: modelId,
        prompt: preprocess_prompt(input)
      })
    };
  
    const response = await ServiceAPI.runFetch(endpoint, options);
    const jsonResponse = (await response.json()) as OpenAIPromptResponse;
    const responseText = jsonResponse["choices"].map(c => {
      return  { "generated_text": postprocess_text(c.text) };
    });
    const promptResponse: ModelPromptResponse = {
      results: responseText,
      prompt_id: jsonResponse["id"],
      created_at: (new Date(jsonResponse["created"])).toISOString()
    }

    return promptResponse;
  }
}
