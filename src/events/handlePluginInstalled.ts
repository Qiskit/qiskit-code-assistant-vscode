import { Disposable, Memento } from "vscode";
import { onPluginInstalledEmitter } from "./onPluginInstalledEmitter";

type ExtensionContext = { globalState: Memento };

export default function handlePluginInstalled(
  _context: ExtensionContext
): Disposable {
  return onPluginInstalledEmitter.event(() => {
    console.log("todo open webview");
  })
}
