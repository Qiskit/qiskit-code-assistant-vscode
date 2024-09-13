import vscode from "vscode";

import { getExtensionContext } from "../globals/extensionContext";
import { normalizeURL } from "../utilities/utils";

const config = vscode.workspace.getConfiguration("qiskitCodeAssistant")
const SERVICE_URL = config.get<string>("url") as string;
const AUTH_ERROR_CODES = [401, 403];

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

async function getApiToken() {
  const context = getExtensionContext();
  const apiToken = await context?.secrets.get("apiToken");

  if (!apiToken) {
    throw Error("Missing API Token");
  }

  return apiToken;
}

function getHeaders(apiToken: string) {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Caller': 'qiskit-vscode',
    'Authorization': `Bearer ${apiToken}`
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
  // GET /models
  const endpoint = `${getServiceBaseUrl()}/models`;
  const apiToken = await getApiToken()
  const options = {
    'method': 'GET',
    'headers': getHeaders(apiToken)
  };

  const response = await runFetch(endpoint, options);

  let modelsData = null;
  if (response.ok) {
    const resp = (await response.json()) as ModelsList;
    modelsData = resp['models'];
  } else {
    console.error("Error getting models", response.status, response.statusText);
    throw Error(await getErrorMessage(response));
  }
  return modelsData;
}

export async function getModel(modelId: string): Promise<ModelInfo> {
  // GET /model/{modelId}
  const endpoint = `${getServiceBaseUrl()}/model/${modelId}`;
  const apiToken = await getApiToken()
  const options = {
    'method': 'GET',
    'headers': getHeaders(apiToken)
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
  // GET /model/{modelId}/disclaimer
  const endpoint = `${getServiceBaseUrl()}/model/${modelId}/disclaimer`;
  const apiToken = await getApiToken()
  const options = {
    'method': 'GET',
    'headers': getHeaders(apiToken)
  };

  const response = await runFetch(endpoint, options);

  if (response.ok) {
    const disclaimerData = await response.json() as ModelDisclaimer;
    return disclaimerData;
  } else {
    console.error("Error getting disclaimer", response.status, response.statusText);
    throw Error(await getErrorMessage(response));
  }
}

export async function postDisclaimerAcceptance(
  modelId: string,
  disclaimerId: string,
  accepted: boolean
): Promise<ResponseMessage> {
  // POST /disclaimer/{disclaimerId}/acceptance
  const endpoint = `${getServiceBaseUrl()}/disclaimer/${disclaimerId}/acceptance`;
  const apiToken = await getApiToken()
  const options = {
    'method': 'POST',
    'headers': getHeaders(apiToken),
    'body': JSON.stringify({
      'model': modelId,
      accepted
    })
  };

  const response = await runFetch(endpoint, options);

  let disclaimerData = null;
  if (response.ok) {
    disclaimerData = await response.json();
  } else {
    console.error("Error accepting disclaimer", response.status, response.statusText);
    throw Error(await getErrorMessage(response));
  }
  return disclaimerData as ResponseMessage;
}

export async function postModelPrompt(
  modelId: string,
  input: string
): Promise<ModelPromptResponse> {
  // POST /model/{modelId}/prompt
  const endpoint = `${getServiceBaseUrl()}/model/${modelId}/prompt`;
  const apiToken = await getApiToken()
  const options = {
    'method': 'POST',
    'headers': getHeaders(apiToken),
    'body': JSON.stringify({
      input
    })
  };

  const response = await runFetch(endpoint, options);

  let promptResponse = null;
  if (response.ok) {
    promptResponse = await response.json();
  } else {
    console.error("Error sending prompt", response.status, response.statusText);
    throw Error(await getErrorMessage(response));
  }
  return promptResponse as ModelPromptResponse;
}

export async function postPromptAcceptance(
  promptId: string,
  accepted: boolean
): Promise<ResponseMessage> {
  // POST /prompt/{promptId}/acceptance
  const endpoint = `${getServiceBaseUrl()}/prompt/${promptId}/acceptance`;
  const apiToken = await getApiToken()
  const options = {
    'method': 'POST',
    'headers': getHeaders(apiToken),
    'body': JSON.stringify({
      accepted
    })
  };

  const response = await runFetch(endpoint, options);

  let disclaimerData = null;
  if (response.ok) {
    disclaimerData = await response.json();
  } else {
    console.error("Error accepting prompt", response.status, response.statusText);
    throw Error(await getErrorMessage(response));
  }
  return disclaimerData as ResponseMessage;
}
