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
import { parse } from './tools/parser';
import { ParserError, ParseErrorLevel } from './tools/parserModel';

let symbols = [{
    label: 'OPENQASM',
    kind: CompletionItemKind.Text,
    data: 1,
    detail: 'OPENQASM',
    documentation: 'TBD ... blah blah blah'
},
{
    label: 'include',
    kind: CompletionItemKind.Text,
    data: 2,
    detail: 'include',
    documentation: 'TBD ... blah blah blah'
}
];

export class CompilationTool {
    connection: IConnection;

    constructor(public _connection: IConnection) {
        this.connection = _connection;
    }

    validateDocument(document: TextDocument): void {
        let errors = parse(document.getText());
        this.launchCompilationErrors(document, errors);
    }

    availableCompletions(_documentPosition: TextDocumentPositionParams): CompletionItem[] {
        // The available completions should be based in the actual state of the parser
        return symbols;
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