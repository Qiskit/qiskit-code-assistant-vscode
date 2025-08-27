import * as vscode from "vscode";

import { registerStatusBar } from "./statusBar/statusBar";
import { setExtensionContext } from "./globals/extensionContext";
import installAutocomplete from "./utilities/autocompleteInstaller";
import handlePluginInstalled from "./events/handlePluginInstalled";
import commands from "./commands";
import { initModels } from "./commands/selectModel";
import { initApiToken } from "./commands/setApiToken";

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

  commands.forEach((command) => {
    context.subscriptions.push(
      vscode.commands.registerCommand(command.identifier, command.handler)
    )
  }
  );

  await initApiToken(context);

  await initModels(context);

  await installAutocomplete(context);
}

export async function deactivate(context: vscode.ExtensionContext) {
}

function handleSelection(context: vscode.ExtensionContext) {
  // It seems like this function must be defined for the extension to work even if nothing needs
  // to be done here
}
