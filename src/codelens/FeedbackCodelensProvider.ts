import * as vscode from "vscode";

import { QcaInlineCompletionItemProvider } from "../inlineSuggestions/provideInlineCompletionItems";
import provideFeedback from "../commands/provideFeedback";

export interface PromptFeedbackCodeLensData {
  modelId: string|undefined;
  promptId: string|undefined;
  position: vscode.Position;
}


const promptFeedbackCodeLensList: PromptFeedbackCodeLensData[] = [];
const _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();

export function addPromptFeedbackCodeLens(
  modelId: string|undefined,
  promptId: string|undefined,
  position: vscode.Position
) {
  promptFeedbackCodeLensList.length = 0
  promptFeedbackCodeLensList.push({
    modelId: modelId,
    promptId: promptId,
    position
  });
}

export function removePromptFeedbackCodeLens() {
  promptFeedbackCodeLensList.length = 0;
  _onDidChangeCodeLenses.fire();
}

const CodeLensTitles = Object.freeze({
  HELPFUL: "Qiskit Code Assistant: Helpful?",
  POSITIVE: "$(thumbsup)",
  NEGATIVE: "$(thumbsdown)",
  FEEDBACK: "Provide feedback"
});

class FeedbackCodeLens extends vscode.CodeLens {
  cmdTitle: string;
  modelId: string|undefined;
  promptId: string|undefined;

  constructor(
    range: vscode.Range,
    cmdTitle: string,
    modelId: string|undefined,
    promptId: string|undefined
  ) {
    super(range);
    this.cmdTitle = cmdTitle;
    this.modelId = modelId;
    this.promptId = promptId;
  }
}

let disableYesNo = false;

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
        disableYesNo = false;
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

        if (disableYesNo) {
          this.codeLenses.push(...[
            new FeedbackCodeLens(range, CodeLensTitles.HELPFUL, codeLensData.modelId, codeLensData.promptId),
            new FeedbackCodeLens(range, CodeLensTitles.FEEDBACK, codeLensData.modelId, codeLensData.promptId),
          ]);
        } else {
          this.codeLenses.push(...[
            new FeedbackCodeLens(range, CodeLensTitles.HELPFUL, codeLensData.modelId, codeLensData.promptId),
            new FeedbackCodeLens(range, CodeLensTitles.POSITIVE, codeLensData.modelId, codeLensData.promptId),
            new FeedbackCodeLens(range, CodeLensTitles.NEGATIVE, codeLensData.modelId, codeLensData.promptId),
            new FeedbackCodeLens(range, CodeLensTitles.FEEDBACK, codeLensData.modelId, codeLensData.promptId),
          ]);
        }
      });
    }

    return this.codeLenses;
	}

  public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens> {
    if (codeLens instanceof FeedbackCodeLens) {
      const commandArgs: (string|boolean|(() => void)|undefined)[] = [codeLens.modelId, codeLens.promptId]
      function callback(): void {
        console.log(`callback for ${(codeLens as FeedbackCodeLens).cmdTitle}`)
        disableYesNo = true;
        _onDidChangeCodeLenses.fire()
      }
      switch(codeLens.cmdTitle) {
        case CodeLensTitles.HELPFUL:
          commandArgs.length = 0
          break;
        case CodeLensTitles.POSITIVE:
          commandArgs.push(...[true, callback])
          break;
        case CodeLensTitles.NEGATIVE:
          commandArgs.push(...[true, callback])
          break;
        case CodeLensTitles.FEEDBACK:
          break;
      }
      codeLens.command = {
        title: codeLens.cmdTitle,
        command: codeLens.cmdTitle == CodeLensTitles.HELPFUL ? "" : provideFeedback.identifier,
        arguments: commandArgs
      }
    }
    return codeLens
  }
}
