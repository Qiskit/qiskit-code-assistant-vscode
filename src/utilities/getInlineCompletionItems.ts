import * as vscode from "vscode";
import CodeAssistantInlineCompletionItem from "../inlineSuggestions/inlineCompletionItem";
import runCompletion from "./runCompletion";
import { AutocompleteResult, ResultEntry } from "../binary/requests/requests";
import { isMultiline } from "./utils";
import handleGetCompletion from "../commands/handleGetCompletion";

const INLINE_REQUEST_TIMEOUT = 3000;

// this will be used to collect the chunks of streaming data for
// each unique call to get inline completion items
const callsForCompletions = new Map<string, {
  completionText: string;
}>();

export default async function getInlineCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  resolver: CallableFunction
): Promise<void> {
  const isEmptyLine = document.lineAt(position.line).text.trim().length === 0;

  // unique identifier for this call to getInlineCompletionItems
  const callerId = `${document.uri.toString()}-${position.line}-${position.character}`;

  let caller = callsForCompletions.get(callerId)

  // already have a streaming request in progress from this caller
  if (caller && caller.completionText) {
    const item = new vscode.InlineCompletionItem(
      caller.completionText,
      new vscode.Range(position, position)
    );
    // send it to be processed
    const list = new vscode.InlineCompletionList([item])
    resolver(list);
    return;
  }

  try {
    const completionGenerator = runCompletion(
      document,
      position,
      isEmptyLine ? INLINE_REQUEST_TIMEOUT : undefined
    );

    for await (let chunk of completionGenerator) {
      const result = chunk?.results[0]
      if (!result) return;

      caller = callsForCompletions.get(callerId)
      if (!caller) {
        caller = {
          completionText: result.new_prefix,
        }
        // store this caller so we may update it as we loop through the streaming chunks
        callsForCompletions.set(callerId, caller)
      } else {
        // update the stored caller's text
        caller.completionText += result.new_prefix
      }

      // process completion item with text up to latest streaming response
      const item = new CodeAssistantInlineCompletionItem(
        caller.completionText,
        result,
        calculateRange(position, chunk, result),
        undefined,
        result.completion_metadata?.model_id,
        result.completion_metadata?.prompt_id,
        result.completion_metadata?.input,
        result.completion_metadata?.output,
        result.completion_metadata?.completion_kind,
        result.completion_metadata?.is_cached,
        result.completion_metadata?.snippet_context
      )

      const list = new vscode.InlineCompletionList([item])
      resolver(list)

      // give vscode time to process update to current inline suggestion chunk
      // then trigger another inline suggestion to capture future chunks
      setTimeout(handleGetCompletion.handler, 10)
    }
  } catch (error) {
    console.error('Error streaming completions:', error);
  } finally {
      // clean up after streaming is done
      setTimeout(() => {
        if (callsForCompletions.has(callerId)) {
          callsForCompletions.delete(callerId);
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
