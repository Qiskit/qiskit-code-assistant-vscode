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

import { Disposable, languages, window } from "vscode";

import { Capability, isCapabilityEnabled } from "../capabilities/capabilities";
import enableProposed from "../globals/proposedAPI";
import {
  isInlineSuggestionProposedApiSupported,
  isInlineSuggestionReleasedApiSupported,
} from "../globals/versions";
import { QcaInlineCompletionItemProvider } from "./provideInlineCompletionItems";
import { FeedbackCodelensProvider, clearPromptFeedbackCodeLens } from "../codelens/FeedbackCodelensProvider";


async function isDefaultAPIEnabled(): Promise<boolean> {
  return (
    (isCapabilityEnabled(Capability.SNIPPET_SUGGESTIONS_CONFIGURABLE) ||
      isCapabilityEnabled(Capability.VSCODE_INLINE_V2)) &&
    isInlineSuggestionProposedApiSupported() &&
    (await enableProposed())
  );
}

export default async function registerInlineHandlers(
  inlineEnabled: boolean,
  snippetsEnabled: boolean
): Promise<Disposable[]> {
  const subscriptions: Disposable[] = [];

  if (!inlineEnabled && !snippetsEnabled) return subscriptions;

  if (
    isInlineSuggestionReleasedApiSupported() ||
    (await isDefaultAPIEnabled())
  ) {
    const inlineCompletionsProvider = new QcaInlineCompletionItemProvider()
    const feedbackCodeLensProvider = new FeedbackCodelensProvider(inlineCompletionsProvider)

    languages.registerCodeLensProvider("*", feedbackCodeLensProvider);

    subscriptions.push(
      languages.registerInlineCompletionItemProvider(
        { pattern: "**" },
        inlineCompletionsProvider
      )
    );

    // Clear feedback when active editor changes
    subscriptions.push(
      window.onDidChangeActiveTextEditor(() => {
        clearPromptFeedbackCodeLens().catch(err =>
          console.error('Failed to clear feedback on editor change:', err)
        );
      })
    );

    return subscriptions;
  }

  return subscriptions;
}