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
import { parse } from './antlr/parser';
import * as suggester from './antlr/suggester';
import { ParserError, ParseErrorLevel } from './tools/parserModel';

let symbols = [{
    label: 'OPENQASM',
    kind: CompletionItemKind.Text,
    data: 1,
    detail: 'OPENQASM',
    documentation: 'TBD ... blah blah blah',
    type: 'IBMQASM'
},
{
    label: 'IBMQASM',
    kind: CompletionItemKind.Text,
    data: 2,
    detail: 'OPENQASM',
    documentation: 'TBD ... blah blah blah',
    type: 'IBMQASM'
},
{
    label: 'include',
    kind: CompletionItemKind.Text,
    data: 10,
    detail: 'include',
    documentation: 'TBD ... blah blah blah',
    type: 'INCLUDE'
}
];

export class CompilationTool {
    connection: IConnection;
    currentDocument: TextDocument = null;

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
            return symbols;
        }

        let textToCaret = this.currentDocument.getText().substring(0, this.currentDocument.offsetAt(_documentPosition.position));
        
        let suggestions = suggester.calculateSuggestionsFor(textToCaret);
        
        return symbols.filter(symbol => suggestions.indexOf(symbol.type) > -1);
    }

    completionDetailsFor(item: CompletionItem): CompletionItem {
        let searchedSymbol = symbols.filter((symbol) => {
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