import * as vscode from "vscode";

import getInlineCompletionItems from "../utilities/getInlineCompletionItems";

export default async function provideInlineCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  _context: vscode.InlineCompletionContext,
  _token: vscode.CancellationToken
): Promise<
  vscode.InlineCompletionList | undefined
> {
  try {
    if (_context.triggerKind != vscode.InlineCompletionTriggerKind.Invoke) {
      return undefined;
    }

    const completions = await getInlineCompletionItems(document, position);
    return completions;
  } catch (e) {
    console.error(`Error setting up request: ${e}`);

    return undefined;
  }
}
