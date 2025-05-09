import * as vscode from "vscode";
import CodeAssistantInlineCompletionItem from "../inlineSuggestions/inlineCompletionItem";
import runCompletion from "./runCompletion";
import { AutocompleteResult, ResultEntry } from "../binary/requests/requests";
import { isMultiline } from "./utils";
import handleGetCompletion from "../commands/handleGetCompletion";

const INLINE_REQUEST_TIMEOUT = 3000;

// this will be used to collect the chunks of streaming data
const callsForCompletions = new Map<string, CodeAssistantInlineCompletionItem>();

function toCompletionItem(
  insertText: string,
  position: vscode.Position,
  autoCompleteResult: AutocompleteResult,
  resultEntry: ResultEntry
) {
  return new CodeAssistantInlineCompletionItem(
    insertText,
    resultEntry,
    calculateRange(position, autoCompleteResult, resultEntry),
    undefined,
    resultEntry.completion_metadata?.model_id,
    resultEntry.completion_metadata?.prompt_id,
    resultEntry.completion_metadata?.input,
    resultEntry.completion_metadata?.output,
    resultEntry.completion_metadata?.completion_kind,
    resultEntry.completion_metadata?.is_cached,
    resultEntry.completion_metadata?.snippet_context
  )
}

export default async function getInlineCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  resolver: CallableFunction
): Promise<void> {
  const isEmptyLine = document.lineAt(position.line).text.trim().length === 0;

  // unique identifier for this call
  const completionId = `${document.uri.toString()}-${position.line}-${position.character}`;

  let completionItem = callsForCompletions.get(completionId)

  // already have streaming in progress from this completion
  if (completionItem && completionItem.insertText) {
    // send completion item to be processed
    const list = new vscode.InlineCompletionList([completionItem])
    resolver(list);
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
      const result = chunk?.results[0]
      if (!result) return;

      completionItem = callsForCompletions.get(completionId)
      if (!completionItem) {
        completionItem = toCompletionItem(result.new_prefix, position, chunk, result);
        // store this completion item so we may update it as we loop through the streaming chunks
        callsForCompletions.set(completionId, completionItem)
      } else {
        // update the stored completion item
        completionItem.insertText += result.new_prefix
      }

      // process completion item with updated text
      const list = new vscode.InlineCompletionList([completionItem])
      resolver(list)

      // give vscode time to process update to the current inline suggestion chunk
      // then trigger another inline suggestion to capture future chunks
      setTimeout(handleGetCompletion.handler, 10)
    }
  } catch (error) {
    console.error('Error streaming completions:', error);
  } finally {
      // clean up after streaming is done
      setTimeout(() => {
        if (callsForCompletions.has(completionId)) {
          callsForCompletions.delete(completionId);
        }
      }, 500);
  }
}

function calculateRange(
  position: vscode.Position,
  response: AutocompleteResult,
  result: ResultEntry
): vscode.Range {
  return new vscode.Range(
    position.translate(0, -response.old_prefix.length),
    isMultiline(result.old_suffix)
      ? position
      : position.translate(0, result.old_suffix.length)
  );
}
