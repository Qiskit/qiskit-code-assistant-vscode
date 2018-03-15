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
import { Parser } from './qasm/parser';
import { Suggester } from './qasm/suggester';
import { ParserError, ParseErrorLevel, Symbol } from './qasm/model';

export class CompilationTool {
    connection: IConnection;
    currentDocument: TextDocument = null;
    currentSuggestions: CompletionItem[] = [];

    toCompletionItem = (symbol: Symbol, index: number) => {
        return {
            label: symbol.label,
            kind: CompletionItemKind.Text,
            data: index,
            detail: symbol.detail,
            documentation: symbol.documentation   
        };
    };

    constructor(public _connection: IConnection) {
        this.connection = _connection;
    }

    validateDocument(document: TextDocument): void {
        this.currentDocument = document;

        let parser = new Parser();
        let result = parser.parse(document.getText());
        this.launchCompilationErrors(document, result.errors);
    }

    availableCompletions(_documentPosition: TextDocumentPositionParams): CompletionItem[] {
        if (this.currentDocument === null) {
            return [];
        }

        let textToCaret = this.currentDocument.getText().substring(0, this.currentDocument.offsetAt(_documentPosition.position));

        let suggester = new Suggester();
        this.currentSuggestions = suggester.calculateSuggestionsFor(textToCaret).map(this.toCompletionItem);

        return this.currentSuggestions;
    }

    completionDetailsFor(item: CompletionItem): CompletionItem {
        let searchedSymbol = this.getCompletionSymbolFor(item);

        item.detail = searchedSymbol.detail;
        item.documentation = searchedSymbol.documentation;

        return item;
    }

    private getCompletionSymbolFor(item: CompletionItem): CompletionItem {
        let isSameData = (symbol:CompletionItem) => symbol.data === item.data;

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
        errors.forEach((error) => {
            diagnostics.push(this.errorToDiagnostics(error));
        });

        this.connection.sendDiagnostics({
            uri: document.uri,
            diagnostics
        });
    }

    private errorToDiagnostics(error: ParserError) {
        return {
            severity: (error.level === ParseErrorLevel.ERROR) ? DiagnosticSeverity.Error : DiagnosticSeverity.Warning,
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