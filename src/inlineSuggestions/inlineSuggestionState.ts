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

import { commands, InlineCompletionItem } from "vscode";
import { AutocompleteResult, ResultEntry } from "../binary/requests/requests";
import { rotate } from "../utilities/utils";

export const completionItems: InlineCompletionItem[] = [];

let autocompleteResult: AutocompleteResult | undefined | null;
let iterator = rotate(0);

export async function setSuggestionsState(
  autocompleteResults: AutocompleteResult | undefined | null
): Promise<void> {
  autocompleteResult = autocompleteResults;

  if (autocompleteResult?.results?.length) {
    iterator = rotate(autocompleteResult.results.length - 1);
    await toggleInlineState(true);
  } else {
    iterator = rotate(0);
    await toggleInlineState(false);
  }
}
export async function clearState(): Promise<void> {
  autocompleteResult = null;
  iterator = rotate(0);

  await toggleInlineState(false);
}
async function toggleInlineState(withinSuggestion: boolean): Promise<void> {
  await commands.executeCommand(
    "setContext",
    "qiskit-vscode.in-inline-suggestions",
    withinSuggestion
  );
}

export function getNextSuggestion(): ResultEntry | undefined {
  return results()?.[iterator.next()];
}

export function getPrevSuggestion(): ResultEntry | undefined {
  return results()?.[iterator.prev()];
}

export function getCurrentSuggestion(): ResultEntry | undefined {
  return results()?.[iterator.current()];
}

export function getCurrentPrefix(): string {
  return autocompleteResult?.old_prefix || "";
}

export function getAllSuggestions(): ResultEntry[] | undefined {
  return results();
}

export function resetCompletionItems(): void {
  completionItems.length = 0;
}

function results(): ResultEntry[] | undefined {
  return autocompleteResult?.results;
}
