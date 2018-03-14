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
import { parse } from './qasm/parser';
import * as suggester from './qasm/suggester';
import { ParserError, ParseErrorLevel } from './tools/parserModel';

export class CompilationTool {
    connection: IConnection;
    currentDocument: TextDocument = null;
    availableSymbols: CompletionItem[] = [];

    constructor(public _connection: IConnection) {
        this.connection = _connection;
    }

    validateDocument(document: TextDocument): void {
        this.currentDocument = document;

        let result = parse(document.getText());
        this.launchCompilationErrors(document, result.errors);
    }

    availableCompletions(_documentPosition: TextDocumentPositionParams): CompletionItem[] {
        if (this.currentDocument === null) {
            return [];
        }

        let textToCaret = this.currentDocument.getText().substring(0, this.currentDocument.offsetAt(_documentPosition.position));

        let suggestions = suggester.calculateSuggestionsFor(textToCaret);

        if (suggestions.length === 0) {
            return [];
        }

        let isContainedInSuggestions = (symbol: any) => {
            return suggestions.indexOf(symbol.type) > -1;
        }

        return this.updatedAvailableSymbols().filter(isContainedInSuggestions);
    }

    updatedAvailableSymbols(): CompletionItem[] {
        this.availableSymbols = suggester.availableSymbols().map((symbol, index) => {
            return {
                label: symbol.label,
                kind: CompletionItemKind.Text,
                data: index,
                detail: symbol.detail,
                documentation: symbol.documentation   
            };
        });

        return this.availableSymbols;
    }

    completionDetailsFor(item: CompletionItem): CompletionItem {
        let searchedSymbol = this.availableSymbols.filter((symbol) => {
            return symbol.data === item.data
        }).pop();

        item.detail = searchedSymbol.detail;
        item.documentation = searchedSymbol.documentation;

        return item;
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