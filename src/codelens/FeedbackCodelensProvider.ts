import * as vscode from "vscode";

import { QcaInlineCompletionItemProvider } from "../inlineSuggestions/provideInlineCompletionItems";
import { handleProvideFeedback } from "../commands/handleFeedback";
import CodeAssistantInlineCompletionItem from "../inlineSuggestions/inlineCompletionItem";

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

  constructor(
    range: vscode.Range,
    type: string,
    modelId: string|undefined,
    promptId: string|undefined
  ) {
    super(range);
    this.type = type;
    this.modelId = modelId;
    this.promptId = promptId;
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
          inlineCompletionItem.range?.start as vscode.Position
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
          new FeedbackCodeLens(range, FeedbackCodeLensTypes.HELPFUL, codeLensData.modelId, codeLensData.promptId),
          new FeedbackCodeLens(range, FeedbackCodeLensTypes.POSITIVE, codeLensData.modelId, codeLensData.promptId),
          new FeedbackCodeLens(range, FeedbackCodeLensTypes.NEGATIVE, codeLensData.modelId, codeLensData.promptId),
        ]);
      });
    }

    return this.codeLenses;
	}

  public async resolveCodeLens(
    codeLens: FeedbackCodeLens,
    token: vscode.CancellationToken
  ): Promise<vscode.CodeLens> {
    const commandArgs: (string|boolean|(() => void)|undefined)[] = [codeLens.modelId, codeLens.promptId];

    switch(codeLens.type) {
      case FeedbackCodeLensTypes.HELPFUL:
        commandArgs.length = 0
        break;
      case FeedbackCodeLensTypes.POSITIVE:
        commandArgs.push(...[true, clearPromptFeedbackCodeLens])
        break;
      case FeedbackCodeLensTypes.NEGATIVE:
        commandArgs.push(...[false, clearPromptFeedbackCodeLens])
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
