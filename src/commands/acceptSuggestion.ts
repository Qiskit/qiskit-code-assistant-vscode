import vscode from "vscode";

import { updateUserAcceptance } from "../utilities/runCompletion";

async function acceptSuggestionHandler(): Promise<void> {
  await updateUserAcceptance(true)
  vscode.commands.executeCommand("editor.action.inlineSuggest.commit");
};

export const acceptSuggestionCommand: CommandModule = {
  identifier: "qiskit-vscode.accept-suggestion",
  handler: acceptSuggestionHandler,
};

async function dismissSuggestionHandler(): Promise<void> {
  await updateUserAcceptance(false)
  vscode.commands.executeCommand("editor.action.inlineSuggest.hide");
};

export const dismissSuggestionCommand: CommandModule = {
  identifier: "qiskit-vscode.dismiss-suggestion",
  handler: dismissSuggestionHandler
};
