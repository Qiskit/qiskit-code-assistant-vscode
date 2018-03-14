'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const antlr4ts_1 = require("antlr4ts");
const parserModel_1 = require("../tools/parserModel");
const QasmLexer_1 = require("./antlr/QasmLexer");
const QasmParser_1 = require("./antlr/QasmParser");
const Decorators_1 = require("antlr4ts/Decorators");
class Parser {
    parse(input) {
        let errorListener = new ErrorListener();
        let parser = this.buildQasmParser(input, errorListener);
        let tree = parser.code();
        return {
            ast: tree,
            errors: errorListener.errors
        };
    }
    buildQasmParser(input, errorListener) {
        let inputStream = new antlr4ts_1.ANTLRInputStream(input);
        let lexer = new QasmLexer_1.QasmLexer(inputStream);
        lexer.removeErrorListener(antlr4ts_1.ConsoleErrorListener.INSTANCE);
        let tokenStream = new antlr4ts_1.CommonTokenStream(lexer);
        let parser = new QasmParser_1.QasmParser(tokenStream);
        parser.addErrorListener(errorListener);
        return parser;
    }
}
exports.Parser = Parser;
class ErrorListener {
    constructor() {
        this.errors = [];
    }
    syntaxError(_recognizer, _offendingSymbol, line, charPositionInLine, msg, _e) {
        this.errors.push({
            line: line - 1,
            start: charPositionInLine,
            end: charPositionInLine + 1,
            message: msg,
            level: parserModel_1.ParseErrorLevel.ERROR
        });
    }
}
__decorate([
    Decorators_1.Override
], ErrorListener.prototype, "syntaxError", null);
