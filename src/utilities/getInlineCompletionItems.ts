import * as vscode from "vscode";
import CodeAssistantInlineCompletionItem from "../inlineSuggestions/inlineCompletionItem";
import runCompletion from "./runCompletion";
import { AutocompleteResult, ResultEntry } from "../binary/requests/requests";
import { isMultiline } from "./utils";
import { completionItems } from "../inlineSuggestions/inlineSuggestionState";

const INLINE_REQUEST_TIMEOUT = 3000;

export default async function getInlineCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position
): Promise<vscode.InlineCompletionList> {
  const isEmptyLine = document.lineAt(position.line).text.trim().length === 0;

  const response = await runCompletion(
    document,
    position,
    isEmptyLine ? INLINE_REQUEST_TIMEOUT : undefined
  );

  const completions = response?.results.map(
    (result) =>
      new CodeAssistantInlineCompletionItem(
        result.new_prefix,
        result,
        calculateRange(position, response, result),
        undefined,
        result.completion_metadata?.model_id,
        result.completion_metadata?.prompt_id,
        result.completion_metadata?.completion_kind,
        result.completion_metadata?.is_cached,
        result.completion_metadata?.snippet_context
      )
  );

  completionItems.push(...completions ?? []);

  // Put newer items earlier in list
  return new vscode.InlineCompletionList(completionItems.reverse() || []);
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
