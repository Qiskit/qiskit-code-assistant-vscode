import vscode from "vscode";

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
