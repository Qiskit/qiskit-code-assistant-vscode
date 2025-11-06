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
import type { ExtensionContext } from "vscode";
import { promises as fs } from "fs";
import * as os from "os";
import * as path from "path";

import { getExtensionContext } from "../globals/extensionContext";

const QISKIT_JSON_FILE_PATH = path.join(os.homedir(), ".qiskit", "qiskit-ibm.json");

interface CredentialInfo {
  name: string;
  token: string;
  displayName: string;
}

async function getAllCredentials(): Promise<CredentialInfo[]> {
  let data = undefined;
  try {
    data = await fs.readFile(QISKIT_JSON_FILE_PATH);
  } catch (err) {
    console.log(`Unable to read saved Qiskit account: ${err}`);
    return [];
  }

  if (data) {
    try {
      const accounts = JSON.parse(data.toString("utf8")) as QiskitAccountJson;
      const credentials: CredentialInfo[] = [];

      // Iterate through all entries in the JSON file
      for (const [accountName, accountData] of Object.entries(accounts)) {
        if (accountData?.token) {
          credentials.push({
            name: accountName,
            token: accountData.token,
            displayName: formatDisplayName(accountName)
          });
        }
      }

      return credentials;
    } catch (err) {
      console.log(`Unable to parse saved Qiskit account: ${err}`);
    }
  }
  return [];
}

function formatDisplayName(accountName: string): string {
  // Convert kebab-case or snake_case to Title Case
  return accountName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function getTokenFromJson(): Promise<string | undefined> {
  const credentials = await getAllCredentials();
  if (credentials.length === 0) {
    return undefined;
  }

  // Check if user has a preferred credential
  const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
  const selectedCredential = config.get<string>("selectedCredential");

  if (selectedCredential) {
    const credential = credentials.find(c => c.name === selectedCredential);
    if (credential) {
      return credential.token;
    }
  }

  // Fall back to priority order (for backward compatibility)
  const priorityOrder = [
    "qiskit-code-assistant",
    "default-ibm-quantum-platform",
    "default-ibm-quantum"
  ];

  for (const priorityName of priorityOrder) {
    const credential = credentials.find(c => c.name === priorityName);
    if (credential) {
      return credential.token;
    }
  }

  // If none of the priority credentials exist, return the first available one
  return credentials[0]?.token;
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

/**
 * Proactively prompts user to select a credential if:
 * 1. Multiple credentials exist in qiskit-ibm.json
 * 2. User hasn't explicitly selected one yet
 * 3. Haven't prompted before (tracked in workspace state)
 *
 * This provides better UX by letting users choose upfront rather than
 * discovering issues after authentication failures.
 */
export async function promptCredentialSelectionIfNeeded(context: ExtensionContext): Promise<void> {
  try {
    // Check if user chose "Don't Ask Again" globally
    const neverPrompt = context.globalState.get<boolean>('qiskit.neverPromptCredentialSelection', false);
    if (neverPrompt) {
      return;
    }

    // Check if we've already prompted in this workspace
    const hasPrompted = context.workspaceState.get<boolean>('qiskit.hasPromptedCredentialSelection', false);
    if (hasPrompted) {
      return;
    }

    // Check if user already has a selection
    const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
    const selectedCredential = config.get<string>("selectedCredential");
    if (selectedCredential) {
      return;
    }

    // Get all available credentials
    const credentials = await getAllCredentials();

    // Only prompt if there are multiple credentials
    if (credentials.length <= 1) {
      return;
    }

    // Mark that we've prompted (do this before showing UI to avoid duplicate prompts)
    await context.workspaceState.update('qiskit.hasPromptedCredentialSelection', true);

    // Show information message with action
    const choice = await vscode.window.showInformationMessage(
      `Found ${credentials.length} IBM Quantum credentials. Would you like to choose which one to use?`,
      'Select Credential',
      'Use Default',
      "Don't Ask Again"
    );

    if (choice === 'Select Credential') {
      // Run the credential selection command
      await vscode.commands.executeCommand('qiskit-vscode.select-credential');
    } else if (choice === "Don't Ask Again") {
      // Store in global state to never ask again
      await context.globalState.update('qiskit.neverPromptCredentialSelection', true);
    }
    // If 'Use Default' or dismissed, do nothing (will use automatic selection)

  } catch (err) {
    // Silently fail - don't interrupt extension activation
    console.log(`Error in credential selection prompt: ${err}`);
  }
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

async function selectCredentialHandler(): Promise<void> {
  const context = getExtensionContext();
  const credentials = await getAllCredentials();

  if (credentials.length === 0) {
    vscode.window.showWarningMessage(
      "No credentials found in qiskit-ibm.json. Please configure your credentials first."
    );
    return;
  }

  if (credentials.length === 1) {
    vscode.window.showInformationMessage(
      `Only one credential available: ${credentials[0].displayName}`
    );
    return;
  }

  const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
  const currentSelection = config.get<string>("selectedCredential");

  // Create quick pick items with current selection marked
  const items = credentials.map(cred => ({
    label: cred.displayName,
    description: cred.name === currentSelection ? "(Currently selected)" : "",
    detail: cred.name,
    credentialName: cred.name,
    token: cred.token
  }));

  const result = await vscode.window.showQuickPick(items, {
    title: "Select IBM Quantum Credential",
    placeHolder: "Choose which credential to use for authentication"
  });

  if (result) {
    // Update the configuration
    await config.update("selectedCredential", result.credentialName, vscode.ConfigurationTarget.Global);

    // Store the token in secrets
    await context?.secrets.store("apiToken", result.token);

    vscode.window.showInformationMessage(
      `Credential switched to: ${result.label}`
    );

    vscode.commands.executeCommand("setContext", "qiskit-vscode.api-token-set", true);
  }
}

const command: CommandModule = {
  identifier: "qiskit-vscode.api-token",
  handler,
};

export const selectCredentialCommand: CommandModule = {
  identifier: "qiskit-vscode.select-credential",
  handler: selectCredentialHandler,
};

export default command;
export { getAllCredentials };
