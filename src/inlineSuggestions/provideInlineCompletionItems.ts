import * as vscode from "vscode";

import getInlineCompletionItems from "../utilities/getInlineCompletionItems";


export class QcaInlineCompletionItemProvider implements vscode.InlineCompletionItemProvider {
	private _onDidUpdateCompletionItems: vscode.EventEmitter<vscode.InlineCompletionList> = new vscode.EventEmitter<vscode.InlineCompletionList>();
	public readonly onDidUpdateCompletionItems: vscode.Event<vscode.InlineCompletionList> = this._onDidUpdateCompletionItems.event;

  async provideInlineCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    _context: vscode.InlineCompletionContext,
    _token: vscode.CancellationToken
  ): Promise<vscode.InlineCompletionItem[] | vscode.InlineCompletionList | undefined> {
    try {
      if (_context.triggerKind != vscode.InlineCompletionTriggerKind.Invoke) {
        return undefined;
      }

      return new Promise(async (resolve) => {
        const resolver = (completions: vscode.InlineCompletionList | undefined) => {
          if (completions) {
            this._onDidUpdateCompletionItems.fire(completions)
          }
          resolve(completions)
        }

        getInlineCompletionItems(document, position, resolver);
      })

    } catch (e) {
      console.error(`Error setting up request: ${e}`);

      return undefined;
    }
  }
}
