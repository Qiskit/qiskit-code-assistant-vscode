import { Disposable, languages } from "vscode";

import { Capability, isCapabilityEnabled } from "../capabilities/capabilities";
import enableProposed from "../globals/proposedAPI";
import {
  isInlineSuggestionProposedApiSupported,
  isInlineSuggestionReleasedApiSupported,
} from "../globals/versions";
import { QcaInlineCompletionItemProvider } from "./provideInlineCompletionItems";
import { FeedbackCodelensProvider } from "../codelens/FeedbackCodelensProvider";


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
    return subscriptions;
  }

  return subscriptions;
}