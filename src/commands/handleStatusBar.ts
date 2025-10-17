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

import selectModel from './selectModel';
import { handleProvideFeedback } from "./handleFeedback";
import acceptDisclaimer from "./acceptDisclaimer";

async function changeModelHandler(): Promise<void> {
    const selectedModel = await vscode.commands.executeCommand<ModelInfo>(selectModel.identifier);
    if (selectedModel && !selectedModel.disclaimer?.accepted) {
      await vscode.commands.executeCommand(acceptDisclaimer.identifier, selectedModel);
    }
}

async function provideFeedbackHandler(model_id: undefined|string = undefined): Promise<void> {
  await vscode.commands.executeCommand(handleProvideFeedback.identifier, model_id);
}

export const handleChangeModelStatusBar: CommandModule = {
  identifier: "qiskit-vscode.handle-change-model-status-bar",
  handler: changeModelHandler,
};

export const handleProvideFeedbackStatusBar: CommandModule = {
  identifier: "qiskit-vscode.handle-provide-feedback-status-bar",
  handler: provideFeedbackHandler,
};
