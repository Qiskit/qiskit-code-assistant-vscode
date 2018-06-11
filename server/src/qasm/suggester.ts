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

import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { CodeCompletionCore } from 'antlr4-c3';
import { Suggester, SuggestionSymbol } from '../types';
import { QLogger } from '../logger';
import { QasmLexer } from './antlr/QasmLexer';
import { QasmParser } from './antlr/QasmParser';
import { SymbolTableGenerator } from './compiler/symbolTableGenerator';
import { SymbolTable } from '../tools/symbolTable';

export class QASMSuggester implements Suggester {
    dictionary: SymbolsDictionary = new SymbolsDictionary();

    calculateSuggestionsFor(input: string): SuggestionSymbol[] {
        let inputStream = new ANTLRInputStream(input);
        let lexer = new QasmLexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new QasmParser(tokenStream);

        let tree = parser.code();

        let symbolTable = SymbolTableGenerator.symbolTableFor(tree);

        return this.calculateCandidates(parser, symbolTable, tokenStream.getTokens().length);
    }

    availableSymbols(): SuggestionSymbol[] {
        let inputStream = new ANTLRInputStream('');
        let lexer = new QasmLexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new QasmParser(tokenStream);

        return this.dictionary.allSymbols();
    }

    private calculateCandidates(
        parser: QasmParser,
        symbolTable: SymbolTable,
        caretPosition: number
    ): SuggestionSymbol[] {
        let core = new CodeCompletionCore(parser);

        core.ignoredTokens = new Set([
            QasmLexer.LeftCurlyBrace,
            QasmLexer.RightCurlyBrace,
            QasmLexer.LeftBrace,
            QasmLexer.RightBrace,
            QasmLexer.LeftParen,
            QasmLexer.RightParen,
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

        let suggestions: string[] = [];
        suggestions.push(...keywords);
        suggestions.push(...functionNames);
        suggestions.push(...variableNames);

        let result: SuggestionSymbol[] = [];
        result.push(...this.dictionary.symbolsWithTypeIn(suggestions));
        result.push(...symbolTable.definedSymbols().map(symbol => this.toSymbolVariable(symbol)));

        QLogger.verbose(`Available suggestions > ${result}`, this);

        return result;
    }

    private toSymbolVariable = (input: string): SuggestionSymbol => {
        return {
            label: input,
            detail: 'Declared variable',
            documentation: 'This is a previously declared variable',
            type: 'Variable',
            parent: input
        };
    };
}

class SymbolsDictionary {
    symbols = [
        {
            label: 'IBMQASM 2.0; ',
            detail: 'TBD',
            documentation: 'TBD',
            type: 'QasmDescriptor',
            parent: 'QASM'
        },
        {
            label: 'OPENQASM 2.0; ',
            detail: 'TBD',
            documentation: 'TBD',
            type: 'QasmDescriptor',
            parent: 'QASM'
        },
        {
            label: 'include "qelib1.inc";',
            detail: 'Include',
            documentation: 'Includes the selected library.',
            type: 'Include',
            parent: 'QASM'
        },
        {
            label: 'qreg',
            detail: 'Quantum register',
            documentation: 'This is the representation of a quantum register.',
            type: 'Qreg',
            parent: 'QASM'
        },
        {
            label: 'creg',
            detail: 'Classical register',
            documentation: 'This is the representation of a classical register.',
            type: 'Creg',
            parent: 'QASM'
        },
        {
            label: 'U',
            detail: 'TBD',
            documentation: 'TBD.',
            type: 'U',
            parent: 'QASM'
        },
        {
            label: 'CX',
            detail: 'TBD',
            documentation: 'TBD.',
            type: 'Cx',
            parent: 'QASM'
        },
        {
            label: 'measure',
            detail: 'Measurement',
            documentation: 'Measurement in the computational (standard) basis (Z).',
            type: 'Measure',
            parent: 'QASM'
        },
        {
            label: 'barrier',
            detail: 'Barrier',
            documentation: 'The barrier prevents transformations across this source line.',
            type: 'Barrier',
            parent: 'QASM'
        },
        {
            label: 'reset',
            detail: 'Reset',
            documentation: 'Prepare qubits in the |0> state.',
            type: 'Reset',
            parent: 'QASM'
        },
        {
            label: 'opaque',
            detail: 'Opaque',
            documentation: 'TBD.',
            type: 'Opaque',
            parent: 'QASM'
        },
        {
            label: 'gate',
            detail: 'Gate declaration',
            documentation: 'TBD.',
            type: 'Gate',
            parent: 'QASM'
        }
    ];

    allSymbols(): SuggestionSymbol[] {
        return this.symbols;
    }

    symbolsWithTypeIn(types: string[]): SuggestionSymbol[] {
        let isContainedInTypes = (symbol: SuggestionSymbol) => types.indexOf(symbol.type) > -1;

        return this.symbols.filter(isContainedInTypes);
    }
}
