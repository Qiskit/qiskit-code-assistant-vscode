import { error } from "console";
import CodeAssistantService from "./codeAssistant"
import OpenAIService from "./openAI"
import ServiceAPI from "./serviceApi";

let activeService: ServiceAPI;

export async function getServiceApi(): Promise<ServiceAPI> {
  if (!activeService) {
    try {
      const response = await ServiceAPI.runFetch("/", { "method": "GET" });
      if (response.headers.get("content-type") == "application/json") {
        const rootResponse = (await response.json()) as ServiceInfo
        const qcaService = new CodeAssistantService();
        if (rootResponse?.name == qcaService.name) {
          activeService = qcaService
        }
      }

      if (!activeService) {
        activeService = new OpenAIService();
      }
      activeService.checkForToken();
    } catch (err) {
      throw Error("Service API failed. Possible invalid service request or service is currently unavailable.")
    }
  }
  return activeService
}
