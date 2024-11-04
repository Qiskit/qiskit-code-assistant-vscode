import { Command, InlineCompletionItem, Range } from "vscode";
import {
  CompletionKind,
  ResultEntry,
  SnippetContext,
} from "../binary/requests/requests";

export default class CodeAssistantInlineCompletionItem extends InlineCompletionItem {
  isCached?: boolean;

  suggestionEntry: ResultEntry;

  completionKind?: CompletionKind;

  snippetContext?: SnippetContext;

  modelId?: string;

  promptId?: string;

  constructor(
    text: string,
    suggestionEntry: ResultEntry,
    range?: Range,
    command?: Command,
    modelId?: string,
    promptId?: string,
    completionKind?: CompletionKind,
    isCached?: boolean,
    snippetContext?: SnippetContext
  ) {
    super(text, range, command);
    this.isCached = isCached;
    this.suggestionEntry = suggestionEntry;
    this.completionKind = completionKind;
    this.snippetContext = snippetContext;
    this.modelId = modelId;
    this.promptId = promptId;
  }
}
