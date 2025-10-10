import * as vscode from "vscode";


function handler(): void {
  // Hide previous completions before triggering a new completion
  vscode.commands.executeCommand("editor.action.inlineSuggest.hide");

  vscode.commands.executeCommand("editor.action.inlineSuggest.trigger");
}

const command: CommandModule = {
  identifier: "qiskit-vscode.handle-get-completion",
  handler,
};

export default command;
