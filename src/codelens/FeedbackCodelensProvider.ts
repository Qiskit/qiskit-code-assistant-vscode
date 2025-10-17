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

import { QcaInlineCompletionItemProvider } from "../inlineSuggestions/provideInlineCompletionItems";
import { handleProvideFeedback } from "../commands/handleFeedback";
import CodeAssistantInlineCompletionItem from "../inlineSuggestions/inlineCompletionItem";
import { getServiceApi } from "../services/common";

export interface PromptFeedbackCodeLensData {
  modelId: string|undefined;
  promptId: string|undefined;
  position: vscode.Position;
  input: string|undefined;
  output: string|undefined;
}


const promptFeedbackCodeLensList: PromptFeedbackCodeLensData[] = [];
const _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();

export async function addPromptFeedbackCodeLens(
  modelId: string|undefined,
  promptId: string|undefined,
  position: vscode.Position,
  input: string|undefined,
  output: string|undefined,
) {
  promptFeedbackCodeLensList.length = 0

  const serviceApi = await getServiceApi()
  if (serviceApi.enableFeedback) {
    promptFeedbackCodeLensList.push({
      modelId: modelId,
      promptId: promptId,
      position,
      input: input,
      output: output
    });
  }
}

export async function clearPromptFeedbackCodeLens() {
  await vscode.commands.executeCommand("setContext", "qiskit-vscode.feedback-codelens-visible", false);
  promptFeedbackCodeLensList.length = 0;
  _onDidChangeCodeLenses.fire();
}

const FeedbackCodeLensTypes = Object.freeze({
  HELPFUL: "Qiskit Code Assistant: Helpful?",
  POSITIVE: "$(thumbsup)",
  NEGATIVE: "$(thumbsdown)",
  FEEDBACK: "Provide feedback"
});

class FeedbackCodeLens extends vscode.CodeLens {
  type: string;
  modelId: string|undefined;
  promptId: string|undefined;
  input: string|undefined;
  output: string|undefined;

  constructor(
    range: vscode.Range,
    type: string,
    modelId: string|undefined,
    promptId: string|undefined,
    input: string|undefined,
    output: string|undefined
  ) {
    super(range);
    this.type = type;
    this.modelId = modelId;
    this.promptId = promptId;
    this.input = input;
    this.output = output;
  }
}

/**
 * FeedbackCodelensProvider
 */
export class FeedbackCodelensProvider implements vscode.CodeLensProvider {
  private codeLenses: vscode.CodeLens[] = [];
  public readonly onDidChangeCodeLenses: vscode.Event<void> = _onDidChangeCodeLenses.event;
  private inlineCompletionsProvider: QcaInlineCompletionItemProvider;

  constructor(inlineCompletionsProvider: QcaInlineCompletionItemProvider) {
    this.inlineCompletionsProvider = inlineCompletionsProvider;

    // trigger update of codelens on update of completion items
    inlineCompletionsProvider.onDidUpdateCompletionItems((completions: vscode.InlineCompletionList) => {
      if (completions.items.length) {
        const inlineCompletionItem = completions.items[0] as CodeAssistantInlineCompletionItem;
        addPromptFeedbackCodeLens(
          inlineCompletionItem.modelId,
          inlineCompletionItem.promptId,
          inlineCompletionItem.range?.start as vscode.Position,
          inlineCompletionItem.input,
          inlineCompletionItem.output,
        );
        _onDidChangeCodeLenses.fire();
      }
    });
	}

	public provideCodeLenses(
    _: vscode.TextDocument,
    _token: vscode.CancellationToken
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    this.codeLenses = [];

    if (this.inlineCompletionsProvider) {
      promptFeedbackCodeLensList?.forEach((codeLensData) => {
        const range = new vscode.Range(
          codeLensData.position,
          codeLensData.position
        );

        this.codeLenses.push(...[
          new FeedbackCodeLens(range, FeedbackCodeLensTypes.HELPFUL, codeLensData.modelId, codeLensData.promptId, codeLensData.input, codeLensData.output),
          new FeedbackCodeLens(range, FeedbackCodeLensTypes.POSITIVE, codeLensData.modelId, codeLensData.promptId, codeLensData.input, codeLensData.output),
          new FeedbackCodeLens(range, FeedbackCodeLensTypes.NEGATIVE, codeLensData.modelId, codeLensData.promptId, codeLensData.input, codeLensData.output),
        ]);
      });
    }

    return this.codeLenses;
	}

  public async resolveCodeLens(
    codeLens: FeedbackCodeLens,
    token: vscode.CancellationToken
  ): Promise<vscode.CodeLens> {
    const commandArgs: (string|boolean|(() => void)|undefined)[] = [
      codeLens.modelId,
      codeLens.promptId
    ];

    switch(codeLens.type) {
      case FeedbackCodeLensTypes.HELPFUL:
        commandArgs.length = 0
        break;
      case FeedbackCodeLensTypes.POSITIVE:
        commandArgs.push(...[true, codeLens.input, codeLens.output, clearPromptFeedbackCodeLens])
        break;
      case FeedbackCodeLensTypes.NEGATIVE:
        commandArgs.push(...[false, codeLens.input, codeLens.output, clearPromptFeedbackCodeLens])
        break;
    }
    codeLens.command = {
      title: codeLens.type,
      command: codeLens.type == FeedbackCodeLensTypes.HELPFUL ? "" : handleProvideFeedback.identifier,
      arguments: commandArgs
    }
    if (promptFeedbackCodeLensList.length) {
      await vscode.commands.executeCommand("setContext", "qiskit-vscode.feedback-codelens-visible", true);
    }
    return codeLens
  }
}
