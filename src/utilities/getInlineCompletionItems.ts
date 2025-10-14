import CodeAssistantInlineCompletionItem from "../inlineSuggestions/inlineCompletionItem";
import { createDecorationType, extractCompletionParts, toCompletionItem } from "./utils";
import handleGetCompletion from "../commands/handleGetCompletion";
import runCompletion from "./runCompletion";
import * as vscode from "vscode";

const INLINE_REQUEST_TIMEOUT = 3000;
const CACHE_CLEANUP_DELAY = 500; // Time to wait before cleaning up cached completions

// this will be used to collect the chunks of streaming data
const callsForCompletions = new Map<string, CodeAssistantInlineCompletionItem>();

// Type for the inline completion resolver function
type InlineCompletionResolver = (value: vscode.InlineCompletionList) => void;

export default async function getInlineCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  resolver: InlineCompletionResolver
): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document !== document) return;

  const isEmptyLine = document.lineAt(position.line).text.trim().length === 0;
  const completionId = `${document.uri.toString()}-${position.line}-${position.character}`;
  let completionItem = callsForCompletions.get(completionId);

  // Early return for cached completions (no decorations to clean up)
  if (completionItem && completionItem.insertText) {
    resolver(new vscode.InlineCompletionList([completionItem]));
    return;
  }

  // Create disposables inside try-finally to ensure cleanup
  const ghostDeco = createDecorationType();
  let accumulated = "\n";
  let lastResolvedText = "";
  let cancelled = false;
  let hasResolvedOnce = false;  // Track if we've already called resolver
  let completionTimerId: NodeJS.Timeout | undefined;
  let cacheCleanupTimerId: NodeJS.Timeout | undefined;

  // Listen for any changes that should cancel the completion
  // Using text document change for more reliable cancellation across all architectures
  const docChangeDisposable = vscode.workspace.onDidChangeTextDocument(e => {
    if (e.document === document) {
      cancelled = true;
    }
  });

  try {
    // get streaming response
    const completionGenerator = runCompletion(
      document,
      position,
      isEmptyLine ? INLINE_REQUEST_TIMEOUT : undefined
    );

    // loop through streaming data
    for await (let chunk of completionGenerator) {
      if (cancelled) break;  // Use break instead of return to reach finally
      const result = chunk?.results[0]
      if (!result) break;  // Use break instead of return to reach finally
      accumulated += result.new_prefix;

      const { before, after } = extractCompletionParts(accumulated);

      // Show ghost text decoration if there's text after the cursor and line exists
      if (after && position.line + 1 < document.lineCount) {
        try {
          const ghostLine = position.line + 1;
          const ghostCol = document.lineAt(ghostLine).range.end.character;
          const ghostPos = new vscode.Position(ghostLine, ghostCol);
          editor.setDecorations(ghostDeco, [
            {
              range: new vscode.Range(ghostPos, ghostPos),
              renderOptions: { after: { contentText: after } },
            },
          ]);
        } catch (err) {
          // Line might not exist anymore if document changed, silently ignore
          console.debug('Failed to set ghost decoration:', err);
        }
      }

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

        // Only resolve once during streaming (first chunk)
        if (!hasResolvedOnce) {
          resolver(new vscode.InlineCompletionList([completionItem]));
          completionTimerId = setTimeout(handleGetCompletion.handler, 10);
          hasResolvedOnce = true;
        }
      }
    }
  } catch (error) {
    console.error('Error streaming completions:', error);
  } finally {
    // Cancel any pending timers
    if (completionTimerId) {
      clearTimeout(completionTimerId);
    }
    if (cacheCleanupTimerId) {
      clearTimeout(cacheCleanupTimerId);
    }

    // Safely dispose resources with error handling
    try {
      ghostDeco.dispose();
    } catch (err) {
      console.debug('Error disposing ghost decoration:', err);
    }

    try {
      docChangeDisposable.dispose();
    } catch (err) {
      console.debug('Error disposing document listener:', err);
    }

    // Resolve with final completion if we have accumulated text
    // Update completion with final accumulated text if different from what was shown
    if (completionItem && accumulated.trim()) {
      // Only send final update if we have more text than what was last resolved
      if (accumulated.trim() !== completionItem.insertText?.toString().trim()) {
        completionItem.insertText = accumulated;
        resolver(new vscode.InlineCompletionList([completionItem]));
        completionTimerId = setTimeout(handleGetCompletion.handler, 10);
      }
    } else if (!hasResolvedOnce) {
      // Only send empty list if we never resolved before
      resolver(new vscode.InlineCompletionList([]));
    }

    // Clean up cache after a delay
    cacheCleanupTimerId = setTimeout(() => {
      if (callsForCompletions.has(completionId)) {
        callsForCompletions.delete(completionId);
      }
    }, CACHE_CLEANUP_DELAY);
  }
}