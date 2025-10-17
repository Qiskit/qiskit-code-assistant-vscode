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

import { Disposable, ExtensionContext } from "vscode";
import getSuggestionMode, {
  SuggestionsMode,
} from "../capabilities/getSuggestionMode";
import {
  Capability,
  isCapabilityEnabled,
  onDidRefreshCapabilities,
} from "../capabilities/capabilities";
import registerInlineHandlers from "../inlineSuggestions/registerHandlers";

let subscriptions: Disposable[] = [];

export default async function installAutocomplete(
  context: ExtensionContext
): Promise<void> {
  context.subscriptions.push({
    dispose: () => uninstallAutocomplete(),
  });

  let installOptions = InstallOptions.get();

  await reinstallAutocomplete(installOptions);

  context.subscriptions.push(
    onDidRefreshCapabilities(() => {
      const newInstallOptions = InstallOptions.get();

      if (!newInstallOptions.equals(installOptions)) {
        void reinstallAutocomplete(newInstallOptions);
        installOptions = newInstallOptions;
      }
    })
  );
}

async function reinstallAutocomplete({
  inlineEnabled,
  snippetsEnabled,
  autocompleteEnabled,
}: InstallOptions) {
  uninstallAutocomplete();

  subscriptions.push(
    ...(await registerInlineHandlers(inlineEnabled, snippetsEnabled))
  );
}

class InstallOptions {
  inlineEnabled: boolean;

  snippetsEnabled: boolean;

  autocompleteEnabled: boolean;

  constructor(
    inlineEnabled: boolean,
    snippetsEnabled: boolean,
    autocompleteEnabled: boolean
  ) {
    this.inlineEnabled = inlineEnabled;
    this.snippetsEnabled = snippetsEnabled;
    this.autocompleteEnabled = autocompleteEnabled;
  }

  public equals(other: InstallOptions): boolean {
    return (
      this.autocompleteEnabled === other.autocompleteEnabled &&
      this.inlineEnabled === other.inlineEnabled &&
      this.snippetsEnabled === other.snippetsEnabled
    );
  }

  public static get() {
    return new InstallOptions(
      isInlineEnabled(),
      isSnippetSuggestionsEnabled(),
      isAutoCompleteEnabled()
    );
  }
}

function uninstallAutocomplete() {
  subscriptions.forEach((s) => {
    s.dispose();
  });
  subscriptions = [];
}

function isInlineEnabled() {
  return getSuggestionMode() === SuggestionsMode.INLINE;
}

function isSnippetSuggestionsEnabled() {
  return isCapabilityEnabled(Capability.SNIPPET_SUGGESTIONS);
}

function isAutoCompleteEnabled() {
  return getSuggestionMode() === SuggestionsMode.AUTOCOMPLETE;
}
