import vscode from "vscode";

import { getExtensionContext } from "../globals/extensionContext";
import { getServiceApi } from "../services/common";
import { setDefaultStatus, setLoadingStatus } from "../statusBar/statusBar";
import { modelDisclaimerHTML } from "../utilities/disclaimer";
import { setAsCurrentModel } from "./selectModel";

export interface DisclaimerState {
  panel: vscode.WebviewPanel | undefined,
  model: ModelInfo | undefined,
  acceptFlag: boolean | false
};

export const disclaimerState: DisclaimerState = {
  panel: undefined,
  model: undefined,
  acceptFlag: false
};

async function handler(model: ModelInfo): Promise<void> {
  const context = getExtensionContext();
  if (!context) return;

  if (disclaimerState.panel) {
    disclaimerState.panel.dispose();
  }

  disclaimerState.acceptFlag = model?.disclaimer?.accepted || false;
  disclaimerState.model = model;

  if (!model || model.disclaimer?.accepted) return;

  const apiService = await getServiceApi();
  let disclaimer = null;
  try {
    setLoadingStatus();
    disclaimer = await apiService.getModelDisclaimer(model._id);
  } catch (err) {
    vscode.window.showErrorMessage((err as Error).message);
    return;
  } finally {
    setDefaultStatus();
  }

  disclaimerState.panel = vscode.window.createWebviewPanel(
    'autocompleteModelDisclaimer',
    'Qiskit Code Assistant Model Disclaimer for ' + model.display_name,
    vscode.ViewColumn.Two,
    { "enableScripts": true }
  );

  disclaimerState.panel.webview.html = modelDisclaimerHTML(model, disclaimer)
  disclaimerState.panel.webview.onDidReceiveMessage(async (m) => {
    switch (m.command) {
      case "accept":
        await apiService.postDisclaimerAcceptance(model._id, disclaimer._id, true);
        disclaimerState.acceptFlag = true;
        model.disclaimer!.accepted = true;
        setAsCurrentModel(model)
        disclaimerState.panel?.dispose();
        return;
      default:
        console.log("Unknown dislaimer webview message: ", m);
    }
  });
  disclaimerState.panel.onDidDispose(() => {
    disclaimerState.panel = undefined;
    disclaimerState.model = undefined;
    disclaimerState.acceptFlag = false;
  }, null, context.subscriptions);

  disclaimerState.panel.reveal();
}

const command: CommandModule = {
  identifier: "qiskit-vscode.disclaimer-acceptance",
  handler,
};

export default command;
