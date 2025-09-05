import * as vscode from "vscode";

import { ExtensionContext, StatusBarAlignment, StatusBarItem, ThemeColor, window } from "vscode";
import { STATUS_NAME } from "../globals/consts";

import { handleChangeModelStatusBar, handleProvideFeedbackStatusBar } from "../commands/handleStatusBar";
import { currentModel } from "../commands/selectModel";
import { getServiceApi } from "../services/common";

let mainStatusBar: StatusBarItem | undefined;
let feedbackStatusBar: StatusBarItem | undefined;
let loadingInterval: NodeJS.Timeout | undefined;

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

  // Clear any loading intervals
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = undefined;
  }

  if (currentModel) {
    mainStatusBar.text = "Qiskit Code Assistant: " + currentModel.display_name;
    mainStatusBar.backgroundColor = undefined;
    mainStatusBar.color = undefined;

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

export function setLoadingStatus(stage: 'connecting' | 'generating' | 'streaming' | 'processing' = 'generating'): void {
  if (!mainStatusBar) {
    return;
  }

  // Clear any existing interval
  if (loadingInterval) {
    clearInterval(loadingInterval);
  }

  const baseText = currentModel 
    ? `Qiskit Code Assistant: ${currentModel.display_name}` 
    : "Qiskit Code Assistant";

  let stageText: string;
  let endIcon: string;

  switch (stage) {
    case 'connecting':
      stageText = "Connecting to API";
      endIcon = "$(cloud)";
      break;
    case 'generating':
      stageText = "Generating completion";
      endIcon = "$(gear)";
      break;
    case 'streaming':
      stageText = "Receiving data";
      endIcon = "$(arrow-down)";
      break;
    case 'processing':
      stageText = "Processing response";
      endIcon = "$(settings-gear)";
      break;
    default:
      stageText = "Working";
      endIcon = "$(sync)";
  }

  mainStatusBar.backgroundColor = new ThemeColor("statusBarItem.prominentBackground");
  mainStatusBar.color = new ThemeColor("statusBarItem.prominentForeground");

  let spinnerFrame = 0;
  const spinnerFrames = ["$(loading~spin)", "$(sync~spin)"];
  
  const updateSpinner = () => {
    if (mainStatusBar) {
      // Show spinner right after model name, then stage text with end icon
      mainStatusBar.text = `${baseText} ${spinnerFrames[spinnerFrame]} ${stageText}... ${endIcon}`;
      spinnerFrame = (spinnerFrame + 1) % spinnerFrames.length;
    }
  };

  // Initial update
  updateSpinner();

  // Update every 500ms for smooth animation
  loadingInterval = setInterval(updateSpinner, 500);
}

export function setErrorStatus(message: string): void {
  if (!mainStatusBar) {
    return;
  }

  // Clear any loading intervals
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = undefined;
  }

  const baseText = currentModel 
    ? `Qiskit Code Assistant: ${currentModel.display_name}` 
    : "Qiskit Code Assistant";

  mainStatusBar.text = `${baseText} $(warning) ${message}`;
  mainStatusBar.backgroundColor = new ThemeColor("statusBarItem.errorBackground");
  mainStatusBar.color = new ThemeColor("statusBarItem.errorForeground");

  // Auto-reset to default after 5 seconds
  setTimeout(() => {
    setDefaultStatus();
  }, 5000);
}
