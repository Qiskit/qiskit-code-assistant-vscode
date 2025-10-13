import * as vscode from "vscode";
import CodeAssistantService from "./codeAssistant"
import OpenAIService from "./openAI"
import ServiceAPI from "./serviceApi";

let activeService: ServiceAPI | undefined;
let lastServiceUrl: string | undefined;
let initializationPromise: Promise<ServiceAPI> | undefined;

/**
 * Invalidates the cached service API instance.
 * Call this when service URL changes or on errors that require re-initialization.
 */
export function invalidateServiceApi(): void {
  activeService = undefined;
  lastServiceUrl = undefined;
  initializationPromise = undefined;
}

export async function getServiceApi(): Promise<ServiceAPI> {
  const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
  const currentServiceUrl = config.get<string>("url");

  // Invalidate cache if service URL has changed
  if (activeService && lastServiceUrl !== currentServiceUrl) {
    console.log(`Service URL changed from ${lastServiceUrl} to ${currentServiceUrl}, invalidating cache`);
    invalidateServiceApi();
  }

  // If already initialized, return cached instance
  if (activeService) {
    return activeService;
  }

  // If initialization in progress, wait for it
  if (initializationPromise) {
    return initializationPromise;
  }

  // Start new initialization
  initializationPromise = (async () => {
    try {
      const response = await ServiceAPI.runFetch("/", {"method": "GET"});
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const rootResponse = (await response.json()) as ServiceInfo
        // Compare against service name constant instead of creating instance
        if (rootResponse?.name === "qiskit-code-assistant") {
          activeService = new CodeAssistantService();
        }
      }

      if (!activeService) {
        activeService = new OpenAIService();
      }

      await activeService.checkForToken();
      lastServiceUrl = currentServiceUrl;

      return activeService;
    } catch (err) {
      console.error(`Get Service API: ${err}`)
      // Ensure cache is cleared on error so next call can retry
      invalidateServiceApi();
      throw Error("Service API failed. Possible invalid service request or service is currently unavailable.")
    }
  })();

  return initializationPromise;
}
