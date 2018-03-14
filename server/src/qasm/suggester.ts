'use strict';

import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { CodeCompletionCore } from 'antlr4-c3';
import { QasmLexer } from './antlr/QasmLexer';
import { QasmParser } from './antlr/QasmParser';
import { Symbol } from './model';

export function calculateSuggestionsFor(input: string): string[] {
    let inputStream = new ANTLRInputStream(input);
    let lexer = new QasmLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new QasmParser(tokenStream);

    parser.code();

    return calculateCandidateKeywords(parser, tokenStream.getTokens().length);
}

export function availableSymbols(): Symbol[] {
    let inputStream = new ANTLRInputStream('');
    let lexer = new QasmLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new QasmParser(tokenStream);

    return symbols;
}

function calculateCandidateKeywords(parser: QasmParser, caretPosition: number): string[] {
    let core = new CodeCompletionCore(parser);

    core.ignoredTokens = new Set([
        QasmLexer.LeftCurlyBrace, QasmLexer.RightCurlyBrace,
        QasmLexer.LeftBrace, QasmLexer.RightBrace,
        QasmLexer.LeftParen, QasmLexer.RightParen,
        QasmLexer.Semi
    ]);

    // core.preferredRules = new Set([QasmParser.RULE_statement]);

    let candidates = core.collectCandidates(caretPosition);

    let keywords: string[] = [];
    for (let candidate of candidates.tokens) {
        keywords.push(parser.vocabulary.getSymbolicName(candidate[0]));
    }

    let functionNames: string[] = [];
    let variableNames: string[] = [];
    for (let candidate of candidates.rules) {
        console.log('Rule > ' + candidate);
    }

    let result: string[] = [];
    result.push(...keywords);
    result.push(...functionNames);
    result.push(...variableNames);

    console.log('Found ' + result);

    return result;
}


let symbols = [{
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
}
];
