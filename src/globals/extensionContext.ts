import * as vscode from "vscode";

let codeAssistantExtensionContext: vscode.ExtensionContext | null = null;

export function setExtensionContext(
  context: vscode.ExtensionContext
): void {
  codeAssistantExtensionContext = context;
}

export function getExtensionContext(): vscode.ExtensionContext | null {
  return codeAssistantExtensionContext;
}
