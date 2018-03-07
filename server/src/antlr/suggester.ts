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
    let candidates = core.collectCandidates(caretPosition);

    let keywords: string[] = [];
    for (let candidate of candidates.tokens) {
        keywords.push(parser.vocabulary.getDisplayName(candidate[0]));
    }

    return keywords;
}