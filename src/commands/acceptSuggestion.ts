import vscode from "vscode";

import { updateUserAcceptance } from "../utilities/runCompletion";

async function handler(): Promise<void> {
  await updateUserAcceptance()
  vscode.commands.executeCommand("editor.action.inlineSuggest.commit");
}

const command: CommandModule = {
  identifier: "qiskit-vscode.accept-suggestion",
  handler,
};

export default command;
