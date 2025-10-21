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

import { updateUserAcceptance, cancelCurrentCompletion } from "../utilities/runCompletion";
import { handleClearCodelens } from "./handleFeedback";

async function acceptSuggestionHandler(): Promise<void> {
  // Cancel the underlying streaming request to prevent continued streaming after acceptance
  cancelCurrentCompletion();

  await updateUserAcceptance(true);
  vscode.commands.executeCommand(handleClearCodelens.identifier);
  vscode.commands.executeCommand("editor.action.inlineSuggest.commit");
};

export const acceptSuggestionCommand: CommandModule = {
  identifier: "qiskit-vscode.accept-suggestion",
  handler: acceptSuggestionHandler,
};

async function dismissSuggestionHandler(): Promise<void> {
  // Cancel the underlying streaming request to stop spinner
  cancelCurrentCompletion();

  await updateUserAcceptance(false);
  vscode.commands.executeCommand(handleClearCodelens.identifier);
  vscode.commands.executeCommand("editor.action.inlineSuggest.hide");
};

export const dismissSuggestionCommand: CommandModule = {
  identifier: "qiskit-vscode.dismiss-suggestion",
  handler: dismissSuggestionHandler
};
