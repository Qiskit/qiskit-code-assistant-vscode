'use strict';

import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { CodeCompletionCore } from 'antlr4-c3';
import { QasmLexer } from './QasmLexer';
import { QasmParser } from './QasmParser';

export function calculateSuggestionsFor(input: string): string[] {
    let inputStream = new ANTLRInputStream(input);
    let lexer = new QasmLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new QasmParser(tokenStream);

    parser.startProgram();

    return calculateCandidateKeywords(parser, tokenStream.getTokens().length);
}

function calculateCandidateKeywords(parser: QasmParser, caretPosition: number): string[] {
    let core = new CodeCompletionCore(parser);

    core.ignoredTokens = new Set([
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