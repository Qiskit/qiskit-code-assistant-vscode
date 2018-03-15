'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const antlr4ts_1 = require("antlr4ts");
const antlr4_c3_1 = require("antlr4-c3");
const QasmLexer_1 = require("./antlr/QasmLexer");
const QasmParser_1 = require("./antlr/QasmParser");
class Suggester {
    constructor() {
        this.dictionary = new SymbolsDictionary();
        this.toSymbolVariable = (input) => {
            return {
                label: input,
                detail: 'Declared variable',
                documentation: 'This is a previously declared variable',
                type: 'Variable'
            };
        };
    }
    calculateSuggestionsFor(input) {
        let inputStream = new antlr4ts_1.ANTLRInputStream(input);
        let lexer = new QasmLexer_1.QasmLexer(inputStream);
        let tokenStream = new antlr4ts_1.CommonTokenStream(lexer);
        let parser = new QasmParser_1.QasmParser(tokenStream);
        parser.code();
        return this.calculateCandidates(parser, tokenStream.getTokens().length);
    }
    availableSymbols() {
        let inputStream = new antlr4ts_1.ANTLRInputStream('');
        let lexer = new QasmLexer_1.QasmLexer(inputStream);
        let tokenStream = new antlr4ts_1.CommonTokenStream(lexer);
        let parser = new QasmParser_1.QasmParser(tokenStream);
        return this.dictionary.allSymbols();
    }
    calculateCandidates(parser, caretPosition) {
        let core = new antlr4_c3_1.CodeCompletionCore(parser);
        core.ignoredTokens = new Set([
            QasmLexer_1.QasmLexer.LeftCurlyBrace, QasmLexer_1.QasmLexer.RightCurlyBrace,
            QasmLexer_1.QasmLexer.LeftBrace, QasmLexer_1.QasmLexer.RightBrace,
            QasmLexer_1.QasmLexer.LeftParen, QasmLexer_1.QasmLexer.RightParen,
            QasmLexer_1.QasmLexer.Semi
        ]);
        // core.preferredRules = new Set([QasmParser.RULE_statement]);
        let candidates = core.collectCandidates(caretPosition);
        let keywords = [];
        for (let candidate of candidates.tokens) {
            keywords.push(parser.vocabulary.getSymbolicName(candidate[0]));
        }
        let functionNames = [];
        let variableNames = [];
        for (let candidate of candidates.rules) {
            console.log('Rule > ' + candidate);
        }
        let suggestions = [];
        suggestions.push(...keywords);
        suggestions.push(...functionNames);
        suggestions.push(...variableNames);
        console.log('Found ' + suggestions);
        let result = [];
        result.push(...this.dictionary.symbolsWithTypeIn(suggestions));
        result.push(...this.foundVariablesAt(parser));
        return result;
    }
    foundVariablesAt(parser) {
        return parser.declaredVariables().map(this.toSymbolVariable);
    }
}
exports.Suggester = Suggester;
class SymbolsDictionary {
    constructor() {
        this.symbols = [{
                label: 'IBMQASM 2.0; ',
                detail: 'TBD',
                documentation: 'TBD',
                type: 'QasmDescriptor'
            },
            {
                label: 'OPENQASM 2.0; ',
                detail: 'TBD',
                documentation: 'TBD',
                type: 'QasmDescriptor'
            },
            {
                label: 'include "quelib1.inc";',
                detail: 'Include',
                documentation: 'Includes the selected library.',
                type: 'Include'
            },
            {
                label: 'qreg',
                detail: 'Quantum register',
                documentation: 'This is the representation of a quantum register.',
                type: 'Qreg'
            },
            {
                label: 'creg',
                detail: 'Classical register',
                documentation: 'This is the representation of a classical register.',
                type: 'Creg'
            },
            {
                label: 'U',
                detail: 'TBD',
                documentation: 'TBD.',
                type: 'U'
            },
            {
                label: 'CX',
                detail: 'TBD',
                documentation: 'TBD.',
                type: 'Cx'
            },
            {
                label: 'measure',
                detail: 'Measurement',
                documentation: 'Measurement in the computational (standard) basis (Z).',
                type: 'Measure'
            },
            {
                label: 'barrier',
                detail: 'Barrier',
                documentation: 'The barrier prevents transformations across this source line.',
                type: 'Barrier'
            },
            {
                label: 'reset',
                detail: 'Reset',
                documentation: 'Prepare qubits in the |0> state.',
                type: 'Reset'
            },
            {
                label: 'opaque',
                detail: 'Opaque',
                documentation: 'TBD.',
                type: 'Opaque'
            },
            {
                label: 'gate',
                detail: 'Gate declaration',
                documentation: 'TBD.',
                type: 'Gate'
            }];
    }
    allSymbols() {
        return this.symbols;
    }
    symbolsWithTypeIn(types) {
        let isContainedInTypes = (symbol) => types.indexOf(symbol.type) > -1;
        return this.symbols.filter(isContainedInTypes);
    }
}
