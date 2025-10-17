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

import { Command, InlineCompletionItem, Range } from "vscode";
import {
  CompletionKind,
  ResultEntry,
  SnippetContext,
} from "../binary/requests/requests";

export default class CodeAssistantInlineCompletionItem extends InlineCompletionItem {
  isCached?: boolean;

  suggestionEntry: ResultEntry;

  completionKind?: CompletionKind;

  snippetContext?: SnippetContext;

  modelId?: string;

  promptId?: string;

  input?: string;

  output?: string;

  constructor(
    text: string,
    suggestionEntry: ResultEntry,
    range?: Range,
    command?: Command,
    modelId?: string,
    promptId?: string,
    input?: string,
    output?: string,
    completionKind?: CompletionKind,
    isCached?: boolean,
    snippetContext?: SnippetContext
  ) {
    super(text, range, command);
    this.isCached = isCached;
    this.suggestionEntry = suggestionEntry;
    this.completionKind = completionKind;
    this.snippetContext = snippetContext;
    this.modelId = modelId;
    this.promptId = promptId;
    this.input = input;
    this.output = output;
  }
}
