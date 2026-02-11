/**
* This code is part of Qiskit.
*
* (C) Copyright IBM 2025.
*
* This code is licensed under the Apache License, Version 2.0. You may
* obtain a copy of this license in the LICENSE.txt file in the root directory
* of this source tree or at http:*www.apache.org/licenses/LICENSE-2.0.
*
* Any modifications or derivative works of this code must retain this
* copyright notice, and modified files need to carry a notice indicating
* that they have been altered from the originals.
*/

import CodeAssistantInlineCompletionItem from "../inlineSuggestions/inlineCompletionItem";
import { AutocompleteResult, ResultEntry } from "../binary/requests/requests";
import * as vscode from "vscode";

export type Iterator = {
  next: () => number;
  prev: () => number;
  current: () => number;
};

export function rotate(value: number): Iterator {
  let current = 0;
  return {
    next() {
      current += 1;
      if (current > value) {
        current = 0;
      }
      return current;
    },
    prev() {
      current -= 1;
      if (current < 0) {
        current = value;
      }
      return current;
    },
    current() {
      return current;
    },
  };
}

export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function trimEnd(str: string, suffix: string): string {
  return str.replace(new RegExp(`${escapeRegExp(suffix)}$`), "");
}

export function isMultiline(text?: string): boolean {
  return text?.includes("\n") || false;
}

export function normalizeURL(url: string): string {
  if (url && url.endsWith("/")) {
    return url.slice(0, -1);
  }
  return url;
}

export function normalizeURLPath(urlPath: string): string {
  if (urlPath && urlPath.charAt(0) != "/") {
    return `/${urlPath}`
  }
  return urlPath;
}

export function createDecorationType(): vscode.TextEditorDecorationType {
  return vscode.window.createTextEditorDecorationType({
    after: {
      margin: "0 0 0 1ch",
      color: new vscode.ThemeColor("editorGhostText.foreground"),
    },
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
  });
}

export function extractCompletionParts(text: string): { before: string; after: string } {
  const lastNewline = text.lastIndexOf("\n");
  if (lastNewline === -1) return { before: "", after: text };
  return {
    before: text.slice(0, lastNewline + 1),
    after: text.slice(lastNewline + 1),
  };
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

export function toCompletionItem(
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

export function toModelPromptResponse(jsonResponse: OpenAIPromptResponse): ModelPromptResponse {
  const responseText = jsonResponse["choices"].map(c => {
    return  { "generated_text": c.text ?? c.message?.content };
  });
  const promptResponse: ModelPromptResponse = {
    results: responseText,
    prompt_id: jsonResponse["id"],
    created_at: (new Date(jsonResponse["created"])).toISOString()
  }
  return promptResponse
}

export function modelTransform (model: OpenAIModelInfo, isOpenAI: boolean): ModelInfo {
  return isOpenAI ? {
    "_id": model.id,
    "disclaimer": { accepted: true },
    "display_name": model.id,
    "doc_link": "",
    "license": { name: "", link: "" },
    "model_id": model.id
  } : {
    "_id": model.id,
    "disclaimer": { accepted: false },  // force checking of disclaimer
    "display_name": model.id,
    "doc_link": "",
    "license": { name: "", link: "" },
    "model_id": model.id
  }
}
