import vscode from "vscode";

import selectModel from './selectModel';
import acceptDisclaimer from "./acceptDisclaimer";

async function handler(): Promise<void> {
    const selectedModel = await vscode.commands.executeCommand<ModelInfo>(selectModel.identifier);
    if (selectedModel && !selectedModel.disclaimer?.accepted) {
      await vscode.commands.executeCommand(acceptDisclaimer.identifier, selectedModel);
    }
}

const command: CommandModule = {
  identifier: "qiskit-vscode.handle-status-bar",
  handler,
};

export default command;
