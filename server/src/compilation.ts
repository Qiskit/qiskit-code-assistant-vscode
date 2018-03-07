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
    documentation: 'Initial file descriptor.',
    type: 'IbmQasm'
},
{
    label: 'IBMQASM',
    kind: CompletionItemKind.Text,
    data: 2,
    detail: 'OPENQASM',
    documentation: 'Initial file descriptor.',
    type: 'IbmQasm'
},
{
    label: 'include',
    kind: CompletionItemKind.Text,
    data: 10,
    detail: 'Include',
    documentation: 'Includes the selected library.',
    type: 'Include'
},
{
    label: 'qreg',
    kind: CompletionItemKind.Text,
    data: 20,
    detail: 'Quantum register',
    documentation: 'This is the representation of a quantum register.',
    type: 'Qreg'
},
{
    label: 'creg',
    kind: CompletionItemKind.Text,
    data: 21,
    detail: 'Classical register',
    documentation: 'This is the representation of a classical register.',
    type: 'Creg'
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

        if (suggestions.length === 0) {
            return [];
        }

        let isContainedInSuggestions = (symbol: any) => {
            return suggestions.indexOf(symbol.type) > -1;
        }

        let result = symbols.filter(isContainedInSuggestions);

        console.log('Filtered symbols > ' + result);

        return result;
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