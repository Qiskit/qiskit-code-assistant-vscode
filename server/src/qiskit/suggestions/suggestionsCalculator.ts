/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { Python3Parser } from '../antlr/Python3Parser';
import { SuggestionSymbol } from '../../types';
import { SuggestionsDictionary } from './suggestionsDictionary';
import { CodeCompletionCore } from 'antlr4-c3';
import { Python3Lexer } from '../antlr/Python3Lexer';
import { MethodsDictionary } from './methodsDictionary';
import { VariablesDictionary } from './variablesDictionary';
import { QLogger } from '../../logger';

export class SuggestionsCalculator {
    constructor(
        private parser: Python3Parser,
        private suggestionsDictionary: SuggestionsDictionary,
        private methodsDictionary: MethodsDictionary,
        private variablesDictionary: VariablesDictionary
    ) {}

    calculateAtPosition(tokenPosition: number): SuggestionSymbol[] {
        let core = new CodeCompletionCore(this.parser);
        core.ignoredTokens = GrammarElements.ignorableTokens();
        core.preferredRules = GrammarElements.requiredRules();

        let candidates = core.collectCandidates(tokenPosition);

        let allowedSymbols: string[] = [];
        for (let candidate of candidates.tokens) {
            let terminal = this.parser.vocabulary.getSymbolicName(candidate[0]);
            allowedSymbols.push(terminal);
        }

        for (let candidate of candidates.rules) {
            let rule = this.parser.ruleNames[candidate[0]];
            allowedSymbols.push(rule);
        }

        let result: SuggestionSymbol[] = this.calculateSuggestions(allowedSymbols);

        return result;
    }

    private calculateSuggestions(allowedSymbols: string[]): SuggestionSymbol[] {
        QLogger.debug(`Allowed symbols > ${allowedSymbols}`, this);

        let result: SuggestionSymbol[] = [];
        if (allowedSymbols.includes('trailer')) {
            result.push(...this.methodsDictionary.currentMethods());
        }
        if (allowedSymbols.includes('atom')) {
            result.push(...this.variablesDictionary.currentVariables());
            result.push(...this.suggestionsDictionary.symbolsWithTypeIn(['class']));
        }

        return result;
    }
}

namespace GrammarElements {
    export function ignorableTokens(): Set<number> {
        return new Set([
            Python3Lexer.EOF,
            Python3Lexer.NOT,
            Python3Lexer.STAR,
            Python3Lexer.ADD,
            Python3Lexer.MINUS,
            Python3Lexer.NOT_OP,
            Python3Lexer.OPEN_PAREN,
            Python3Lexer.OPEN_BRACK,
            Python3Lexer.OPEN_BRACE,
            Python3Lexer.DECIMAL_INTEGER,
            Python3Lexer.OCT_INTEGER,
            Python3Lexer.HEX_INTEGER,
            Python3Lexer.BIN_INTEGER,
            Python3Lexer.FLOAT_NUMBER,
            Python3Lexer.IMAG_NUMBER,
            Python3Lexer.STRING_LITERAL,
            Python3Lexer.BYTES_LITERAL,
            Python3Lexer.ELLIPSIS,
            Python3Lexer.LAMBDA,
            Python3Lexer.DEL,
            Python3Lexer.PASS,
            Python3Lexer.BREAK,
            Python3Lexer.CONTINUE,
            Python3Lexer.RETURN,
            Python3Lexer.RAISE,
            Python3Lexer.YIELD,
            Python3Lexer.IMPORT,
            Python3Lexer.FROM,
            Python3Lexer.GLOBAL,
            Python3Lexer.NONLOCAL,
            Python3Lexer.ASSERT,
            Python3Lexer.IF,
            Python3Lexer.WHILE,
            Python3Lexer.FOR,
            Python3Lexer.TRY,
            Python3Lexer.WITH,
            Python3Lexer.DEF,
            Python3Lexer.CLASS,
            Python3Lexer.AT,
            Python3Lexer.NEWLINE
        ]);
    }

    export function requiredRules(): Set<number> {
        return new Set([Python3Parser.RULE_atom, Python3Parser.RULE_trailer]);
    }
}
