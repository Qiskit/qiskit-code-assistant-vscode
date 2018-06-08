// Copyright 2018 IBM RESEARCH. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

'use strict';

import {
    CompletionItem,
    CompletionItemKind,
    Diagnostic,
    DiagnosticSeverity,
    IConnection,
    TextDocument,
    TextDocumentPositionParams
} from 'vscode-languageserver';
import { Parser, Suggester, ParserError, ParseErrorLevel, SuggestionSymbol } from './types';

export class CompilationTool {
    currentDocument: TextDocument = null;
    currentSuggestions: CompletionItem[] = [];

    toCompletionItem = (symbol: SuggestionSymbol, index: number) => {
        return {
            label: symbol.label,
            kind: CompletionItemKind.Text,
            data: index,
            detail: symbol.detail,
            documentation: symbol.documentation
        };
    };

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

        this.currentSuggestions = this.suggester.calculateSuggestionsFor(textToCaret).map(this.toCompletionItem);

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
