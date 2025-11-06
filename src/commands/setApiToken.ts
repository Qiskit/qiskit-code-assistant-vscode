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
import { invalidateCurrentModel, initModels } from "./selectModel";

// Constants
const QISKIT_JSON_FILE_PATH = path.join(os.homedir(), ".qiskit", "qiskit-ibm.json");
const CONFIG_SECTION = "qiskitCodeAssistant";
const CONFIG_KEY_SELECTED_CREDENTIAL = "selectedCredential";
const STATE_KEY_HAS_PROMPTED = "qiskit.hasPromptedCredentialSelection";
const STATE_KEY_NEVER_PROMPT = "qiskit.neverPromptCredentialSelection";
const PRIORITY_CREDENTIAL_NAMES = [
  "qiskit-code-assistant",
  "default-ibm-quantum-platform",
  "default-ibm-quantum"
] as const;

interface CredentialInfo {
  name: string;
  token: string;
  displayName: string;
}

interface CredentialQuickPickItem extends vscode.QuickPickItem {
  credentialName: string;
  token: string;
}

async function getAllCredentials(): Promise<CredentialInfo[]> {
  try {
    const data = await fs.readFile(QISKIT_JSON_FILE_PATH);
    const accounts = JSON.parse(data.toString("utf8")) as QiskitAccountJson;
    const credentials: CredentialInfo[] = [];

    // Iterate through all entries in the JSON file
    for (const [accountName, accountData] of Object.entries(accounts)) {
      if (accountData?.token) {
        credentials.push({
          name: accountName,
          token: accountData.token,
          displayName: accountName
        });
      }
    }

    return credentials;
  } catch (err) {
    // File might not exist or be invalid JSON - this is expected for new users
    console.log(`Unable to read or parse Qiskit credentials file: ${err}`);
    return [];
  }
}

async function getTokenFromJson(): Promise<string | undefined> {
  const credentials = await getAllCredentials();
  if (credentials.length === 0) {
    return undefined;
  }

  // Check if user has a preferred credential
  const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
  const selectedCredential = config.get<string>(CONFIG_KEY_SELECTED_CREDENTIAL);

  if (selectedCredential) {
    const credential = credentials.find(c => c.name === selectedCredential);
    if (credential) {
      return credential.token;
    }
    // Selected credential no longer exists - clear the invalid selection
    console.log(`Selected credential '${selectedCredential}' not found in qiskit-ibm.json, falling back to auto-selection`);
    await config.update(CONFIG_KEY_SELECTED_CREDENTIAL, undefined, vscode.ConfigurationTarget.Global);
  }

  // Fall back to priority order (for backward compatibility)
  for (const priorityName of PRIORITY_CREDENTIAL_NAMES) {
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
    await context.secrets.store("apiToken", token);
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
export async function promptCredentialSelectionIfNeeded(context: ExtensionContext): Promise<boolean> {
  try {
    // Check if user chose "Don't Ask Again" globally
    const neverPrompt = context.globalState.get<boolean>(STATE_KEY_NEVER_PROMPT, false);
    if (neverPrompt) {
      return false;
    }

    // Check if we've already prompted in this workspace
    const hasPrompted = context.workspaceState.get<boolean>(STATE_KEY_HAS_PROMPTED, false);
    if (hasPrompted) {
      return false;
    }

    // Check if user already has a selection
    const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
    const selectedCredential = config.get<string>(CONFIG_KEY_SELECTED_CREDENTIAL);
    if (selectedCredential) {
      return false;
    }

    // Get all available credentials
    const credentials = await getAllCredentials();

    // Only prompt if there are multiple credentials
    if (credentials.length <= 1) {
      return false;
    }

    // Show information message with action
    const choice = await vscode.window.showInformationMessage(
      `Qiskit Code Assistant found ${credentials.length} IBM Quantum credentials. Would you like to choose which one to use?`,
      'Select Credential',
      'Enter Token Manually',
      "Don't Ask Again"
    );

    // Mark that we've prompted after user responds to avoid showing again
    await context.workspaceState.update(STATE_KEY_HAS_PROMPTED, true);

    if (choice === 'Select Credential') {
      // Run the credential selection command - this will call initModels internally
      await vscode.commands.executeCommand('qiskit-vscode.select-credential');
      return true; // Indicate that credential was selected and models already initialized
    } else if (choice === 'Enter Token Manually') {
      // Run the manual token entry command
      await vscode.commands.executeCommand('qiskit-vscode.api-token');
      return false;
    } else if (choice === "Don't Ask Again") {
      // Store in global state to never ask again
      await context.globalState.update(STATE_KEY_NEVER_PROMPT, true);
      return false;
    }
    // If dismissed, do nothing (will use automatic selection)
    return false;

  } catch (err) {
    // Silently fail - don't interrupt extension activation
    console.log(`Error in credential selection prompt: ${err}`);
    return false;
  }
}

async function handler(): Promise<void> {
  const context = getExtensionContext();
  const input = await vscode.window.showInputBox({
    prompt: "Please enter your API token (find yours at quantum.cloud.ibm.com):",
    placeHolder: "Your token goes here ..."
  });
  if (input !== undefined && context) {
    await context.secrets.store("apiToken", input);
    vscode.window.showInformationMessage(`IBM Quantum API Token was successfully saved`);
  }

  vscode.commands.executeCommand("setContext", "qiskit-vscode.api-token-set", !!input);
}

async function selectCredentialHandler(): Promise<void> {
  const context = getExtensionContext();
  if (!context) {
    vscode.window.showErrorMessage("Extension context not available");
    return;
  }

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

  const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
  const currentSelection = config.get<string>(CONFIG_KEY_SELECTED_CREDENTIAL);

  // Create quick pick items with current selection marked
  const items: CredentialQuickPickItem[] = credentials.map(cred => ({
    label: cred.displayName,
    description: cred.name === currentSelection ? "(Currently selected)" : "",
    credentialName: cred.name,
    token: cred.token
  }));

  const result = await vscode.window.showQuickPick<CredentialQuickPickItem>(items, {
    title: "Select IBM Quantum Credential",
    placeHolder: "Choose which credential to use for authentication"
  });

  if (result) {
    // Update the configuration
    await config.update(CONFIG_KEY_SELECTED_CREDENTIAL, result.credentialName, vscode.ConfigurationTarget.Global);

    // Store the token in secrets
    await context.secrets.store("apiToken", result.token);

    vscode.commands.executeCommand("setContext", "qiskit-vscode.api-token-set", true);

    // Invalidate and re-initialize models to validate the new credential
    invalidateCurrentModel();

    try {
      await initModels(context);
      // Only show success message if validation succeeded
      vscode.window.showInformationMessage(
        `Credential switched to: ${result.label}`
      );
    } catch (err) {
      // initModels already shows the error message, so we just need to handle the exception
      // to prevent it from propagating
    }
  }
}

async function resetCredentialSelectionHandler(): Promise<void> {
  const context = getExtensionContext();
  if (!context) {
    vscode.window.showErrorMessage("Extension context not available");
    return;
  }

  // Confirm with user before resetting
  const confirm = await vscode.window.showWarningMessage(
    "This will reset your credential selection and clear all related preferences. You'll be prompted to choose a credential again on next reload.",
    { modal: true },
    "Reset"
  );

  if (confirm === "Reset") {
    // Clear the selected credential configuration
    const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
    await config.update(CONFIG_KEY_SELECTED_CREDENTIAL, undefined, vscode.ConfigurationTarget.Global);

    // Clear workspace state (hasPromptedCredentialSelection)
    await context.workspaceState.update(STATE_KEY_HAS_PROMPTED, undefined);

    // Clear global state (neverPromptCredentialSelection)
    await context.globalState.update(STATE_KEY_NEVER_PROMPT, undefined);

    vscode.window.showInformationMessage(
      "Credential selection has been reset. Reload the window to be prompted again.",
      "Reload Window"
    ).then(choice => {
      if (choice === "Reload Window") {
        vscode.commands.executeCommand("workbench.action.reloadWindow");
      }
    });
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

export const resetCredentialSelectionCommand: CommandModule = {
  identifier: "qiskit-vscode.reset-credential-selection",
  handler: resetCredentialSelectionHandler,
};

export default command;
export { getAllCredentials };
