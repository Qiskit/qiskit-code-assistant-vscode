import CodeAssistantInlineCompletionItem from "../inlineSuggestions/inlineCompletionItem";
import { createDecorationType, extractCompletionParts, toCompletionItem } from "./utils";
import handleGetCompletion from "../commands/handleGetCompletion";
import runCompletion from "./runCompletion";
import * as vscode from "vscode";
import * as os from 'os';

const INLINE_REQUEST_TIMEOUT = 3000;

// this will be used to collect the chunks of streaming data
const callsForCompletions = new Map<string, CodeAssistantInlineCompletionItem>();

export default async function getInlineCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  resolver: CallableFunction
): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document !== document) return;

  // If cursor is on the last line, insert a new blank line so ghostText can render below
  if (position.line === document.lineCount - 1) {
    await editor.edit(edit => {
      edit.insert(new vscode.Position(document.lineCount, 0), "\n");
    });
    const lastLine = document.lineAt(document.lineCount - 2);
    const newPosition = new vscode.Position(document.lineCount - 2, lastLine.text.length);
    editor.selection = new vscode.Selection(newPosition, newPosition);
  }

  const ghostDeco = createDecorationType();
  let accumulated = "\n";
  let lastResolvedText = "";
  let cancelled = false;

  const docChangeDisposable = (os.arch() === 'arm64')? 
    vscode.workspace.onDidChangeTextDocument(e => cancelled=(e.document === document) )
    :vscode.window.onDidChangeTextEditorSelection(e => cancelled=(e.textEditor.document === document) );
  

  const isEmptyLine = document.lineAt(position.line).text.trim().length === 0;
  const completionId = `${document.uri.toString()}-${position.line}-${position.character}`;
  let completionItem = callsForCompletions.get(completionId);

  if (completionItem && completionItem.insertText) {
    resolver(new vscode.InlineCompletionList([completionItem]));
    return;
  }

  try {
    // get streaming response
    const completionGenerator = runCompletion(
      document,
      position,
      isEmptyLine ? INLINE_REQUEST_TIMEOUT : undefined
    );

    // loop through streaming data
    for await (let chunk of completionGenerator) {
      if (cancelled) return;
      const result = chunk?.results[0]
      if (!result) return;
      accumulated += result.new_prefix;
      
      const { before, after } = extractCompletionParts(accumulated);

      // Show ghost text on the line below (now guaranteed to exist)
      const ghostLine = position.line + 1;
      const ghostCol = document.lineAt(ghostLine).range.end.character;
      const ghostPos = new vscode.Position(ghostLine, ghostCol);
      editor.setDecorations(ghostDeco, [
        {
          range: new vscode.Range(ghostPos, ghostPos),
          renderOptions: { after: { contentText: after } },
        },
      ]);

      // Only show inline suggestion when we cross a newline boundary
      if (before && before !== lastResolvedText && before.length > lastResolvedText.length && before.length > 0) {
        lastResolvedText = before;
        // Create or update inline completion item
        if (!completionItem) {
          // Use `before` (the full chunk up to the newline) as the insertText
          completionItem = toCompletionItem(before, position, chunk, result);
          callsForCompletions.set(completionId, completionItem);
        } else {
          completionItem.insertText = before;
        }
        resolver(new vscode.InlineCompletionList([completionItem]));
        setTimeout(handleGetCompletion.handler, 10);
      }
    }
  } catch (error) {
    console.error('Error streaming completions:', error);
  } finally {
    ghostDeco.dispose();
    docChangeDisposable.dispose();
    if (completionItem) {
      completionItem.insertText = accumulated;
      resolver(new vscode.InlineCompletionList([completionItem]));
      setTimeout(handleGetCompletion.handler, 10);
    } else {
      resolver(new vscode.InlineCompletionList([]));
    }
    setTimeout(() => {
      if (callsForCompletions.has(completionId)) {
        callsForCompletions.delete(completionId);
      }
    }, 500);
  }
}