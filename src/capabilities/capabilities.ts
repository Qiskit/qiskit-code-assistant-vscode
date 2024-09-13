import { Disposable, EventEmitter } from "vscode";

export enum Capability {
  INLINE_SUGGESTIONS = "inline_suggestions_mode",
  SNIPPET_SUGGESTIONS = "snippet_suggestions",
  SNIPPET_SUGGESTIONS_CONFIGURABLE = "snippet_suggestions_configurable",
  VSCODE_INLINE_V2 = "vscode_inline_v2",
}

export function isCapabilityEnabled(capability: Capability): boolean {
  console.log(capability);
  return true;
}

const capabilitiesRefreshed = new EventEmitter<void>();

export function onDidRefreshCapabilities(listener: () => void): Disposable {
  return capabilitiesRefreshed.event(listener);
}
