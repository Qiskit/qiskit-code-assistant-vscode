import CodeAssistantService from "./codeAssistant"
import ServiceAPI from "./serviceApi";

let activeService: ServiceAPI;

export async function getServiceApi(): Promise<ServiceAPI> {
  if (!activeService) {
    try {
      activeService = new CodeAssistantService();
      activeService.checkForToken();
    } catch (err) {
      console.error(`Get Service API: ${err}`)
      throw Error("Service API failed. Possible invalid service request or service is currently unavailable.")
    }
  }

  return activeService
}
