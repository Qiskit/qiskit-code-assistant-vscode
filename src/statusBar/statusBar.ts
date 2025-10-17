/**
* This code is part of Qiskit.
*
* (C) Copyright IBM 2025.
*
* This code is licensed under the Apache License, Version 2.0. You may
* obtain a copy of this license in the LICENSE.txt file in the root directory
* of this source tree or at http:*www.apache.org/licenses/LICENSE-2.0.
*
* Any modifications or derivative works of this code must retain this
* copyright notice, and modified files need to carry a notice indicating
* that they have been altered from the originals.
*/

import * as vscode from "vscode";

import { ExtensionContext, StatusBarAlignment, StatusBarItem, ThemeColor, window } from "vscode";
import { STATUS_NAME } from "../globals/consts";

import { handleChangeModelStatusBar, handleProvideFeedbackStatusBar } from "../commands/handleStatusBar";
import { currentModel } from "../commands/selectModel";
import { getServiceApi } from "../services/common";

const SPINNER = "$(sync~spin)";

let mainStatusBar: StatusBarItem | undefined;
let feedbackStatusBar: StatusBarItem | undefined;
let originalStatusText: string | undefined;
let loadingCount = 0;  // Track number of concurrent loading operations

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

  // Decrement loading counter
  if (loadingCount > 0) {
    loadingCount--;
  }

  // Only remove spinner if no more loading operations
  if (loadingCount === 0) {
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

    // Store the text for restoring after loading
    originalStatusText = mainStatusBar.text;
  }
}

export function setLoadingStatus(): void {
  if (!mainStatusBar) {
    return;
  }

  // Increment loading counter
  loadingCount++;

  // Store original text if not already stored (first loading call)
  if (!originalStatusText || loadingCount === 1) {
    originalStatusText = mainStatusBar.text.replace(SPINNER, "").trim();
  }

  // Only add spinner if not already present
  if (!mainStatusBar.text.includes(SPINNER)) {
    mainStatusBar.text = originalStatusText + " " + SPINNER;
  }
}
