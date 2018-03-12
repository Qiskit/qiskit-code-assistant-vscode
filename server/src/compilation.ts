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
    label: 'QELIB.INC',
    kind: CompletionItemKind.Text,
    data: 11,
    detail: 'Include',
    documentation: 'References the QELIB.INC dependency.',
    type: 'Qelib'
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
},
{
    label: 'U',
    kind: CompletionItemKind.Text,
    data: 30,
    detail: 'TBD',
    documentation: 'TBD.',
    type: 'U'
},
{
    label: 'CX',
    kind: CompletionItemKind.Text,
    data: 31,
    detail: 'TBD',
    documentation: 'TBD.',
    type: 'Cx'
},
{
    label: 'measure',
    kind: CompletionItemKind.Text,
    data: 60,
    detail: 'Measurement',
    documentation: 'Measurement in the computational (standard) basis (Z).',
    type: 'Measure'
},
{
    label: 'barrier',
    kind: CompletionItemKind.Text,
    data: 61,
    detail: 'Barrier',
    documentation: 'The barrier prevents transformations across this source line.',
    type: 'Barrier'
},
{
    label: 'reset',
    kind: CompletionItemKind.Text,
    data: 62,
    detail: 'Reset',
    documentation: 'Prepare qubits in the |0> state.',
    type: 'Reset'
},
{
    label: 'opaque',
    kind: CompletionItemKind.Text,
    data: 63,
    detail: 'Opaque',
    documentation: 'TBD.',
    type: 'Opaque'
},
{
    label: 'gate',
    kind: CompletionItemKind.Text,
    data: 100,
    detail: 'Gate declaration',
    documentation: 'TBD.',
    type: 'Gate'
},
{
    label: 'u1',
    kind: CompletionItemKind.Text,
    data: 101,
    detail: 'U1 gate',
    documentation: 'The first physical gate of the Quantum Experience. It is a one parameter single-qubit phase gate with zero duration.\n\n[[1,0],[0,exp(1i*lambda)]]',
    type: 'GateId'
},
{
    label: 'u2',
    kind: CompletionItemKind.Text,
    data: 102,
    detail: 'U2 gate',
    documentation: 'The second physical gate of the Quantum Experience. It is a two parameter single-qubit gate with duration one unit of time.\n\n[[1/sqrt(2),-exp(1i*lambda)*1/sqrt(2)],[exp(1i*phi)*1/sqrt(2),exp(1i*lambda+1i*phi)*1/sqrt(2)]]',
    type: 'GateId'
},
{
    label: 'u3',
    kind: CompletionItemKind.Text,
    data: 103,
    detail: 'U3 gate',
    documentation: 'The third physical gate of the Quantum Experience. It is a three-parameter single-qubit gate with duration 2 units of gate time.\n\n[[cos(theta/2),-exp(1i*lambda)*sin(theta/2)],[exp(1i*phi)*sin(theta/2),exp(1i*lambda+1i*phi)*cos(theta/2)]]',
    type: 'GateId'
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
            return [];
        }

        let textToCaret = this.currentDocument.getText().substring(0, this.currentDocument.offsetAt(_documentPosition.position));

        let availableSymbols = suggester.availableSymbols();
        let suggestions = suggester.calculateSuggestionsFor(textToCaret);

        if (suggestions.length === 0) {
            return [];
        }

        let isContainedInSuggestions = (symbol: any) => {
            return suggestions.indexOf(symbol.type) > -1;
        }

        return symbols.filter(isContainedInSuggestions).map((symbol, index) => {
            return {
                label: symbol.label,
                kind: CompletionItemKind.Text,
                data: index,
                detail: symbol.detail,
                documentation: symbol.documentation   
            };
        });;
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