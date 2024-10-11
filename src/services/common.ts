import vscode from "vscode";

import * as qca from "./codeAssistant"
import * as openai from "./openAi"

const config = vscode.workspace.getConfiguration("qiskitCodeAssistant")
const SERVICE_URL = config.get<string>("url") as string;

let activeService:any = undefined;

async function initActiveService(): Promise<void> {
  if (!activeService) {
    try {
      const response = await fetch(SERVICE_URL, {"method": "GET"});

      if (response.ok && response.headers.get("content-type") == "application/json") {
        const rootResponse = (await response.json()) as ServiceInfo
        if (rootResponse["name"] == qca.SERVICE_NAME) {
          activeService = qca;
        }
      }
      
      if (!activeService) {
        activeService = openai;
      }
    } catch (err) {
      console.error(`Fetch failed for ${SERVICE_URL}: ${err}`)
      throw Error("Fetch failed. Possible invalid service request or service is currently unavailable.")
    }
  }
}

export async function isQiskitCodeAssistantService(): Promise<boolean> {
  await initActiveService()
  return activeService?.SERVICE_NAME == qca.SERVICE_NAME
}

export async function getModels(): Promise<ModelInfo[]> {
  await initActiveService()
  return activeService?.getModels()
}

export async function getModel(modelId: string): Promise<ModelInfo> {
  await initActiveService()
  return activeService?.getModel(modelId)
}

export async function getModelDisclaimer(modelId: string): Promise<ModelDisclaimer> {
  await initActiveService()
  return activeService?.getModelDisclaimer(modelId)
}

export async function postDisclaimerAcceptance(
  modelId: string,
  disclaimerId: string,
  accepted: boolean
): Promise<ResponseMessage> {
  await initActiveService()
  return activeService?.postDisclaimerAcceptance(modelId, disclaimerId, accepted)
}

export async function postModelPrompt(
  modelId: string,
  input: string
): Promise<ModelPromptResponse> {
  await initActiveService()
  return activeService?.postModelPrompt(modelId, input)
}

export async function postPromptAcceptance(
  promptId: string,
  accepted: boolean
): Promise<ResponseMessage> {
  await initActiveService()
  return activeService?.postPromptAcceptance(promptId, accepted)
}
