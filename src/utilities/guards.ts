import vscode from "vscode";
import setApiToken from "../commands/setApiToken";
import { getExtensionContext } from "../globals/extensionContext";

export async function requiresToken(): Promise<void> {
  const context = getExtensionContext();
  const apiToken = await context?.secrets.get("apiToken");

  vscode.commands.executeCommand("setContext", "qiskit-vscode.api-token-set", !!apiToken);

  if (!apiToken) {
    const clicked = await vscode.window.showInformationMessage(`In order to use Qiskit Code Assistant, you'd need a IBM Quantum API Token`,
      "Enter your token from quantum.ibm.com"
    )
    if (clicked) {
      await setApiToken.handler()
    }
  }
}
