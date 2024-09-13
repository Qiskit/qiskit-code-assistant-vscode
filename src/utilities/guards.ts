import vscode from "vscode";
import setApiToken from "../commands/setApiToken";

export async function requiresToken(context: vscode.ExtensionContext): Promise<void> {
  const apiToken = await context?.secrets.get("apiToken");

  if (!apiToken) {
    const clicked = await vscode.window.showInformationMessage(`In order to use Qiskit Code Assistant, you'd need a IBM Quantum API Token`,
      "Enter your token from quantum.ibm.com"
    )
    if (clicked) {
      await setApiToken.handler()
    }
  }
}
