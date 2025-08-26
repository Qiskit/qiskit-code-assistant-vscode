import * as vscode from "vscode";

import { ExtensionContext, StatusBarAlignment, StatusBarItem, ThemeColor, window } from "vscode";
import { STATUS_NAME } from "../globals/consts";

import { handleChangeModelStatusBar, handleProvideFeedbackStatusBar } from "../commands/handleStatusBar";
import { currentModel } from "../commands/selectModel";
import { getServiceApi } from "../services/common";

const SPINNER = "$(sync~spin)";

let mainStatusBar: StatusBarItem | undefined;
let feedbackStatusBar: StatusBarItem | undefined;

export async function registerStatusBar(context: ExtensionContext): Promise<void> {
  const serviceApi = await getServiceApi();

  if (serviceApi.enableFeedback && !feedbackStatusBar) {
    feedbackStatusBar = window.createStatusBarItem(StatusBarAlignment.Left, -1);
    feedbackStatusBar.name = `${STATUS_NAME}.provideFeedback`;
    feedbackStatusBar.command = handleProvideFeedbackStatusBar.identifier;
    feedbackStatusBar.tooltip = "Qiskit Code Assistant: Provide feedback";
    feedbackStatusBar.text = "$(feedback)";
    feedbackStatusBar.show();
    context.subscriptions.push(feedbackStatusBar);
  }

  if (!mainStatusBar) {
    mainStatusBar = window.createStatusBarItem(StatusBarAlignment.Left, -1);
    mainStatusBar.name = `${STATUS_NAME}.changeModel`;;
    mainStatusBar.command = handleChangeModelStatusBar.identifier;
    mainStatusBar.tooltip = "Click to change the model";
    mainStatusBar.show();
    setDefaultStatus();
    context.subscriptions.push(mainStatusBar);
  }
}

export function setDefaultStatus(): void {
  if (!mainStatusBar) {
    return;
  }

  if (currentModel) {
    mainStatusBar.text = "Qiskit Code Assistant: " + currentModel.display_name;
    mainStatusBar.backgroundColor = undefined;

    if (feedbackStatusBar) {
      feedbackStatusBar.command = {
        title: "qiskit-code-assistant-provide-feedback-status-bar",
        command: handleProvideFeedbackStatusBar.identifier,
        arguments: [currentModel?._id]
      }
    }
    vscode.commands.executeCommand("setContext", "qiskit-vscode.model-selected", true);
  } else {
    mainStatusBar.text = "Qiskit Code Assistant: No Model Selected";
    mainStatusBar.backgroundColor = new ThemeColor("statusBarItem.warningBackground");
    vscode.commands.executeCommand("setContext", "qiskit-vscode.model-selected", false);
  }
}

export function setLoadingStatus(): void {
  if (!mainStatusBar) {
    return;
  }

  mainStatusBar.text = mainStatusBar.text + " " + SPINNER;
}
