import * as vscode from "vscode";
import type { ExtensionContext } from "vscode";
import { promises as fs } from "fs";
import * as os from "os";
import * as path from "path";

import { getExtensionContext } from "../globals/extensionContext";

const QISKIT_JSON_FILE_PATH = path.join(os.homedir(), ".qiskit", "qiskit-ibm.json");

async function getTokenFromJson(): Promise<string | undefined> {
  let data = undefined;
  try {
    data = await fs.readFile(QISKIT_JSON_FILE_PATH);
  } catch (err) {
    console.log(`Unable to read saved Qiskit account: ${err}`);
  }

  if (data) {
    try {
      const accounts = JSON.parse(data.toString("utf8")) as QiskitAccountJson;
      return (
        accounts["qiskit-code-assistant"]?.token ||
        accounts["default-ibm-quantum-platform"]?.token ||
        accounts["default-ibm-quantum"]?.token
      );
    } catch (err) {
      console.log(`Unable to parse saved Qiskit account: ${err}`);
    }
  }
  return undefined;
}

export async function initApiToken(context: ExtensionContext | null): Promise<string | undefined> {
  let token = process.env["QISKIT_IBM_TOKEN"];
  if (!token) {
    token = await getTokenFromJson();
  }
  if (token && context) {
    await context?.secrets.store("apiToken", token);
  }
  return token;
}

async function handler(): Promise<void> {
  const context = getExtensionContext();
  const input = await vscode.window.showInputBox({
    prompt: "Please enter your API token (find yours at quantum.cloud.ibm.com):",
    placeHolder: "Your token goes here ..."
  });
  if (input !== undefined) {
    await context?.secrets.store("apiToken", input);
    vscode.window.showInformationMessage(`IBM Quantum API Token was successfully saved`);
  }

  vscode.commands.executeCommand("setContext", "qiskit-vscode.api-token-set", !!input);
}

const command: CommandModule = {
  identifier: "qiskit-vscode.api-token",
  handler,
};

export default command;
