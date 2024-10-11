import vscode from "vscode";

import CodeAssistantService from "./codeAssistant"
import OpenAIService from "./openAI"
import ServiceAPI from "./serviceApi";

const config = vscode.workspace.getConfiguration("qiskitCodeAssistant")
const SERVICE_URL = config.get<string>("url") as string;

let activeService: ServiceAPI;

export async function getServiceApi(): Promise<ServiceAPI> {
  if (!activeService) {
    try {
      const response = await fetch(SERVICE_URL, {"method": "GET"});

      if (response.ok && response.headers.get("content-type") == "application/json") {
        const rootResponse = (await response.json()) as ServiceInfo
        const qcaService = new CodeAssistantService();
        if (rootResponse["name"] == qcaService.name) {
          activeService = qcaService
        }
      }
      
      if (!activeService) {
        activeService = new OpenAIService();
      }
    } catch (err) {
      console.error(`Fetch failed for ${SERVICE_URL}: ${err}`)
      throw Error("Fetch failed. Possible invalid service request or service is currently unavailable.")
    }
  }

  return activeService
}
