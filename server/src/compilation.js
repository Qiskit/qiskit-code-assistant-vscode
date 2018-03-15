'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
const parser_1 = require("./qasm/parser");
const suggester_1 = require("./qasm/suggester");
const model_1 = require("./qasm/model");
class CompilationTool {
    constructor(_connection) {
        this._connection = _connection;
        this.currentDocument = null;
        this.currentSuggestions = [];
        this.toCompletionItem = (symbol, index) => {
            return {
                label: symbol.label,
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: index,
                detail: symbol.detail,
                documentation: symbol.documentation
            };
        };
        this.connection = _connection;
    }
    validateDocument(document) {
        this.currentDocument = document;
        let parser = new parser_1.Parser();
        let result = parser.parse(document.getText());
        this.launchCompilationErrors(document, result.errors);
    }
    availableCompletions(_documentPosition) {
        if (this.currentDocument === null) {
            return [];
        }
        let textToCaret = this.currentDocument.getText().substring(0, this.currentDocument.offsetAt(_documentPosition.position));
        let suggester = new suggester_1.Suggester();
        this.currentSuggestions = suggester.calculateSuggestionsFor(textToCaret).map(this.toCompletionItem);
        return this.currentSuggestions;
    }
    completionDetailsFor(item) {
        // new method returning null object if nothing found
        let searchedSymbol = this.currentSuggestions.filter((symbol) => {
            return symbol.data === item.data;
        }).pop();
        item.detail = searchedSymbol.detail;
        item.documentation = searchedSymbol.documentation;
        return item;
    }
    launchCompilationErrors(document, errors) {
        let diagnostics = [];
        errors.forEach((error) => {
            diagnostics.push(this.errorToDiagnostics(error));
        });
        this.connection.sendDiagnostics({
            uri: document.uri,
            diagnostics
        });
    }
    errorToDiagnostics(error) {
        return {
            severity: (error.level === model_1.ParseErrorLevel.ERROR) ? vscode_languageserver_1.DiagnosticSeverity.Error : vscode_languageserver_1.DiagnosticSeverity.Warning,
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
exports.CompilationTool = CompilationTool;
