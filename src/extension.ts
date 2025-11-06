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

import { registerStatusBar } from "./statusBar/statusBar";
import { setExtensionContext } from "./globals/extensionContext";
import installAutocomplete from "./utilities/autocompleteInstaller";
import handlePluginInstalled from "./events/handlePluginInstalled";
import commands from "./commands";
import { initModels } from "./commands/selectModel";
import { initApiToken, promptCredentialSelectionIfNeeded } from "./commands/setApiToken";

export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  setExtensionContext(context);
  handleSelection(context);
  registerStatusBar(context);

  // Do not await. we do not want VSCode to wait for these to finish
  // before considering the extension ready
  void backgroundInit(context);

  if (context.extensionMode !== vscode.ExtensionMode.Test) {
    handlePluginInstalled(context);
  }

  return Promise.resolve();
}

async function backgroundInit(context: vscode.ExtensionContext) {

  commands.forEach((command) =>
    context.subscriptions.push(
      vscode.commands.registerCommand(command.identifier, command.handler)
    )
  );

  await initApiToken(context);

  // Proactively prompt user to select credential if multiple exist
  // This happens after initApiToken so credentials are discovered first
  // Returns true if user selected a credential (which already called initModels)
  const credentialWasSelected = await promptCredentialSelectionIfNeeded(context);

  // Only init models if they weren't already initialized during credential selection
  if (!credentialWasSelected) {
    await initModels(context);
  }
  await installAutocomplete(context);
}

export async function deactivate(context: vscode.ExtensionContext) {
}

function handleSelection(context: vscode.ExtensionContext) {
  // It seems like this function must be defined for the extension to work even if nothing needs
  // to be done here
}
