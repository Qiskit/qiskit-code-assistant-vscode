import { ExtensionContext, StatusBarAlignment, StatusBarItem, ThemeColor, window } from "vscode";
import { CHOOSE_FEEDBACK_COMMAND } from "../globals/consts";
import { STATUS_NAME } from "../globals/consts";

import handleStatusBar from "../commands/handleStatusBar";
import { currentModel } from "../commands/selectModel";

const SPINNER = "$(sync~spin)";

let mainStatusBar: StatusBarItem | undefined;
let feedbackStatusBar: StatusBarItem | undefined;

export function registerStatusBar(context: ExtensionContext): void {
  if (!mainStatusBar) {
    mainStatusBar = window.createStatusBarItem(StatusBarAlignment.Left, -1);
    mainStatusBar.name = STATUS_NAME;
    mainStatusBar.command = handleStatusBar.identifier;
    mainStatusBar.tooltip = 'Click to change the model';
    mainStatusBar.show();
    setDefaultStatus();
    context.subscriptions.push(mainStatusBar);
  }

  if (!feedbackStatusBar) {
    feedbackStatusBar = window.createStatusBarItem(StatusBarAlignment.Left, -1);
    feedbackStatusBar.name = STATUS_NAME + '.feedback';
    feedbackStatusBar.command = CHOOSE_FEEDBACK_COMMAND;
    feedbackStatusBar.tooltip = 'Click to provide feedback';
    feedbackStatusBar.text = '$(thumbsdown)/$(thumbsup)';
    //feedbackStatusBar.show();
    context.subscriptions.push(feedbackStatusBar);
  }
}

export function setDefaultStatus(): void {
  if (!mainStatusBar) {
    return;
  }

  if (currentModel) {
    mainStatusBar.text = 'Qiskit Code Assistant: ' + currentModel.display_name;
    mainStatusBar.backgroundColor = undefined;
  } else {
    mainStatusBar.text = 'Qiskit Code Assistant: No Model Selected';
    mainStatusBar.backgroundColor = new ThemeColor('statusBarItem.warningBackground');
  }
}

export function setLoadingStatus(): void {
  if (!mainStatusBar) {
    return;
  }

  mainStatusBar.text = mainStatusBar.text + ' ' + SPINNER;
}
