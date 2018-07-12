/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import {
    CompletionItem,
    Diagnostic,
    DiagnosticSeverity,
    IConnection,
    TextDocument,
    TextDocumentPositionParams
} from 'vscode-languageserver/lib/main';
import { Parser, Suggester, ParserError, ParseErrorLevel, SuggestionSymbol } from './types';
import { SuggestionSymbolAdapter } from './tools/suggestionSymbolAdapter';

export class CompilationTool {
    currentDocument: TextDocument = null;
    currentSuggestions: CompletionItem[] = [];

    constructor(private connection: IConnection, private parser: Parser, private suggester: Suggester) {}

    validateDocument(document: TextDocument): void {
        this.currentDocument = document;

        let result = this.parser.parse(document.getText());
        this.launchCompilationErrors(document, result.errors);
    }

    availableCompletions(documentPosition: TextDocumentPositionParams): CompletionItem[] {
        if (this.currentDocument === null) {
            return [];
        }

        let textToCaret = this.currentDocument
            .getText()
            .substring(0, this.currentDocument.offsetAt(documentPosition.position));

        this.currentSuggestions = this.suggester
            .calculateSuggestionsFor(textToCaret)
            .map(SuggestionSymbolAdapter.toCompletionItem());

        return this.currentSuggestions;
    }

    completionDetailsFor(item: CompletionItem): CompletionItem {
        let searchedSymbol = this.getCompletionSymbolFor(item);

        item.detail = searchedSymbol.detail;
        item.documentation = searchedSymbol.documentation;

        return item;
    }

    private getCompletionSymbolFor(item: CompletionItem): CompletionItem {
        let isSameData = (symbol: CompletionItem) => symbol.data === item.data;

        let availableOptions = this.currentSuggestions.filter(isSameData);

        if (availableOptions.length < 1) {
            return {
                label: item.label,
                detail: '',
                documentation: ''
            };
        }

        return availableOptions[0];
    }

    private launchCompilationErrors(document: TextDocument, errors: ParserError[]) {
        let diagnostics: Diagnostic[] = [];
        errors.forEach(error => {
            diagnostics.push(this.errorToDiagnostics(error));
        });

        this.connection.sendDiagnostics({
            uri: document.uri,
            diagnostics
        });
    }

    private errorToDiagnostics(error: ParserError) {
        return {
            severity: error.level === ParseErrorLevel.ERROR ? DiagnosticSeverity.Error : DiagnosticSeverity.Warning,
            range: {
                start: {
                    line: error.line,
                    character: error.start
                },
                end: {
                    line: error.line,
                    character: error.end
                }
            },
            message: error.message,
            source: 'ex'
        };
    }
}
