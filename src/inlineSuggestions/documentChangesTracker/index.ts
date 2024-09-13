import { Disposable, TextDocumentChangeEvent, window, workspace } from "vscode";
import DocumentTextChangeContent from "./DocumentTextChangeContent";
import tryApplyPythonIndentExtensionFix from "./pythonIndentExtensionFix";
import { resetCompletionItems } from "../inlineSuggestionState";

let change = false;

function onChange(): void {
  change = true;
  resetCompletionItems();
}

function onTextSelectionChange(): void {
  change = false;
}

export function initTracker(): Disposable[] {
  return [
    workspace.onDidChangeTextDocument(
      ({ contentChanges, document }: TextDocumentChangeEvent) => {
        const currentPosition = window.activeTextEditor?.selection.active;
        const relevantChange = contentChanges.find(
          ({ range }) => currentPosition && range.contains(currentPosition)
        );
        const contentChange = new DocumentTextChangeContent(
          document,
          relevantChange
        );
        const changeHappened =
          (contentChange.isValidNonEmptyChange() &&
            contentChange.isNotIndentationChange() &&
            contentChange.isSingleCharNonWhitespaceChange()) ||
          contentChange.isIndentOutChange();

        if (changeHappened) {
          onChange();
          tryApplyPythonIndentExtensionFix(contentChange);
        }
      }
    ),
    window.onDidChangeTextEditorSelection(onTextSelectionChange),
  ];
}
