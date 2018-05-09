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

import { Suggester, SuggestionSymbol } from '../types';
import { Symbol } from '../tools/symbolTable';
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { Python3Lexer } from './antlr/Python3Lexer';
import { Python3Parser } from './antlr/Python3Parser';
import { CodeCompletionCore } from 'antlr4-c3';

export class QiskitSuggester implements Suggester {
    dictionary: SymbolsDictionary = new SymbolsDictionary();

    calculateSuggestionsFor(input: string): SuggestionSymbol[] {
        console.log(`Analysis of ${input}`);

        let inputStream = new ANTLRInputStream(input);
        let lexer = new Python3Lexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new Python3Parser(tokenStream);

        parser.program();

        return this.calculateCandidates(parser, tokenStream.getTokens().length);
    }

    availableSymbols(): SuggestionSymbol[] {
        return this.dictionary.allSymbols();
    }

    private calculateCandidates(parser: Python3Parser, caretPosition: number): SuggestionSymbol[] {
        let core = new CodeCompletionCore(parser);

        core.ignoredTokens = new Set([
            Python3Lexer.EOF,
            Python3Lexer.NOT,
            Python3Lexer.STAR,
            Python3Lexer.ADD,
            Python3Lexer.MINUS,
            Python3Lexer.NOT_OP,
            Python3Lexer.OPEN_PAREN,
            Python3Lexer.OPEN_BRACK,
            Python3Lexer.OPEN_BRACE
        ]);

        core.preferredRules = new Set([Python3Parser.RULE_atom, Python3Parser.RULE_trailer]);

        let candidates = core.collectCandidates(caretPosition);

        let keywords: string[] = [];
        for (let candidate of candidates.tokens) {
            console.log(`Candidate token ${parser.vocabulary.getSymbolicName(candidate[0])}`);

            keywords.push(parser.vocabulary.getSymbolicName(candidate[0]));
        }

        let functionNames: string[] = [];
        let variableNames: string[] = [];
        for (let candidate of candidates.rules) {
            console.log(`Candidate rule ${parser.ruleNames[candidate[0]]}`);

            keywords.push(parser.ruleNames[candidate[0]]);
        }

        let suggestions: string[] = [];
        suggestions.push(...keywords);
        suggestions.push(...functionNames);
        suggestions.push(...variableNames);

        let result: SuggestionSymbol[] = [];
        result.push(...this.dictionary.symbolsWithTypeIn(suggestions));
        result.push(...this.foundVariablesAt(parser));

        console.log(`Available suggestions > ${this.print(result)}`);

        return result;
    }

    private foundVariablesAt(parser: Python3Parser): SuggestionSymbol[] {
        return parser.symbolTable.currentSymbols()
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
    }

    private print(symbols: SuggestionSymbol[]): String[] {
        return symbols.map(symbol => `${symbol.label}:${symbol.type}`);
    }
}

class SymbolsDictionary {
    symbols = [
        {
            label: 'QuantumProgram',
            detail: 'Quantum Program Class',
            documentation: 'Quantum Program Class.',
            type: 'atom'
        },
        {
            label: 'create_quantum_register',
            detail: 'Creates a quantum register',
            documentation: "create_quantum_register('register_name', size)",
            type: 'trailer'
        },
        {
            label: 'create_classical_register',
            detail: 'Creates a classical register',
            documentation: "create_classical_register('register_name', size)",
            type: 'trailer'
        },
        {
            label: 'create_circuit',
            detail: 'Creates a quantum circuit',
            documentation: "create_circuit('circuit_name', quantum_registers, classical_registers)",
            type: 'trailer'
        },
        {
            label: 'QuantumCircuit',
            detail: 'Quantum circuit',
            documentation: 'Quantum circuit.',
            type: 'atom'
        },
        {
            label: 'h',
            detail: 'Applies a Hadamard gate',
            documentation: 'h(quantum_register)',
            type: 'trailer'
        },
        {
            label: 'QuantumRegister',
            detail: 'Quantum register',
            documentation: 'Implement a quantum register.',
            type: 'atom'
        },
        {
            label: 'ClassicalRegister',
            detail: 'Classical register',
            documentation: 'Implement a classical register.',
            type: 'atom'
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
