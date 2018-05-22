// Copyright 2018 IBM RESEARCH. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

'use strict';

import { Python3Parser } from '../antlr/Python3Parser';
import { SuggestionSymbol } from '../../types';
import { SuggestionsDictionary } from './suggestionsDictionary';
import { CodeCompletionCore } from 'antlr4-c3';
import { Python3Lexer } from '../antlr/Python3Lexer';
import { Token, CommonTokenStream } from 'antlr4ts';
import { Symbol, SymbolTable } from '../../tools/symbolTable';
import { AtomFinder } from './atomFinder';
import { ClassSymbol } from '../compiler/qiskitSymbolTable';

export class SuggestionsCalculator {
    constructor(
        private parser: Python3Parser,
        private tokenStream: CommonTokenStream,
        private suggestionsDictionary: SuggestionsDictionary,
        private atomFinder: AtomFinder,
        private symbolTable: SymbolTable
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

        console.log(`Available suggestions > ${this.print(result)}`);

        return result;
    }

    private calculateSuggestions(allowedSymbols: string[]): SuggestionSymbol[] {
        console.log(`Allowed symbols > ${allowedSymbols}`);

        let result: SuggestionSymbol[] = [];
        if (allowedSymbols.includes('trailer')) {
            result.push(...this.availableMethodScopeSymbols());
        }
        if (allowedSymbols.includes('atom')) {
            result.push(...this.foundVariablesAt());
            result.push(...this.suggestionsDictionary.symbolsWithTypeIn(['class']));
        }

        return result;
    }

    private availableMethodScopeSymbols(): SuggestionSymbol[] {
        let atom = this.atomFinder.firstViableAtomFor(this.tokenStream);
        if (atom.type instanceof ClassSymbol) {
            let classType = atom.type as ClassSymbol;
            let atomMethods = classType.getMethods().map(method => method.getName());
            return this.suggestionsDictionary
                .symbolsWithTypeIn(['method'])
                .filter(symbol => atomMethods.includes(symbol.label));
        } else {
            return this.suggestionsDictionary.symbolsWithTypeIn(['method']);
        }
    }

    private foundVariablesAt(): SuggestionSymbol[] {
        return this.symbolTable
            .currentSymbols()
            .filter(symbol => 'class' !== symbol.type.getName())
            .map(this.toSuggestionSymbol);
    }

    private toSuggestionSymbol = (input: Symbol): SuggestionSymbol => {
        return {
            label: input.getName(),
            detail: 'Declared variable',
            documentation: 'This is a previously declared variable',
            type: 'Variable'
        };
    };

    private print(symbols: SuggestionSymbol[]): String[] {
        return symbols.map(symbol => `${symbol.label}:${symbol.type}`);
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
