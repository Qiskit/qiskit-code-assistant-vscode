import vscode from "vscode";

import { normalizeURL } from "../utilities/utils";

const config = vscode.workspace.getConfiguration("qiskitCodeAssistant")
const SERVICE_URL = config.get<string>("url") as string;
const AUTH_ERROR_CODES = [401, 403];

const OPENAI_API_VERSION = "v1";

type OpenAIModelInfo = {
  id: string
}
type OpenAIModelList = {
  data: OpenAIModelInfo[]
}

export const SERVICE_NAME = "open-ai"

async function getErrorMessage(response: Response) {
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

function getServiceBaseUrl() {
  if (SERVICE_URL) {
    return normalizeURL(SERVICE_URL);
  } else {
    throw Error("Missing service URL. Check Qiskit Code Assistant settings.")
  }
}

function getHeaders() {
  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Caller": "qiskit-vscode"
  }
}

async function runFetch(endpoint: string | URL | Request, options: RequestInit) {
  try {
    const response = await fetch(endpoint, options);
    return response;
  } catch (err) {
    console.error(`Fetch failed for ${endpoint}: ${(err as Error).message}`)
    throw Error(`Fetch failed. Possible invalid service request or service is currently unavailable.`)
  }
}

export async function getModels(): Promise<ModelInfo[]> {
  // GET /v1/models
  const endpoint = `${getServiceBaseUrl()}/${OPENAI_API_VERSION}/models`;
  const options = {
    "method": "GET",
    "headers": getHeaders()
  };

  const response = await runFetch(endpoint, options);

  let modelsData = null;
  if (response.ok) {
    const resp = (await response.json()) as OpenAIModelList;
    modelsData = resp["data"];
  } else {
    console.error("Error getting models", response.status, response.statusText);
    throw Error(await getErrorMessage(response));
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

export async function getModel(modelId: string): Promise<ModelInfo> {
  // GET /v1/models/{model_id}
  const endpoint = `${getServiceBaseUrl()}/${OPENAI_API_VERSION}/models/${modelId}`;
  const options = {
    "method": "GET",
    "headers": getHeaders(),
  };

  const response = await runFetch(endpoint, options);

  let modelData = null;
  if (response.ok) {
    modelData = await response.json();
  } else {
    console.error("Error getting model", response.status, response.statusText);
    throw Error(await getErrorMessage(response));
  }

  return modelData as ModelInfo;
}

export async function getModelDisclaimer(modelId: string): Promise<ModelDisclaimer> {
  throw Error("getModelDisclaimer not implemented")
}

export async function postDisclaimerAcceptance(
  modelId: string,
  disclaimerId: string,
  accepted: boolean
): Promise<ResponseMessage> {
  throw Error("postDisclaimerAcceptance not implemented")
}

export async function postModelPrompt(
  modelId: string,
  input: string
): Promise<ModelPromptResponse> {
  // POST /v1/completions
  const endpoint = `${getServiceBaseUrl()}/${OPENAI_API_VERSION}/completions`;
  const options = {
    "method": "POST",
    "body": JSON.stringify({
      model: modelId,
      prompt: input
    })
  };

  const response = await runFetch(endpoint, options);

  let promptResponse = null;
  if (response.ok) {
    promptResponse = await response.json() as {
      id: string,
      created: number,
      choices: {"text": string, "index": number}[]
    };
  } else {
    console.error("Error sending prompt", response.status, response.statusText);
    throw Error(await getErrorMessage(response));
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

export async function postPromptAcceptance(
  promptId: string,
  accepted: boolean
): Promise<ResponseMessage> {
  return { success: true }
}
