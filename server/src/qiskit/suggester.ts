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
import { Python3Lexer } from './antlr/Python3Lexer';
import { Python3Parser } from './antlr/Python3Parser';
import { Symbol, Suggester } from '../types';

export class QiskitSuggester implements Suggester {

    dictionary: SymbolsDictionary = new SymbolsDictionary();

    calculateSuggestionsFor(input: string): Symbol[] {
        let inputStream = new ANTLRInputStream(input);
        let lexer = new Python3Lexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new Python3Parser(tokenStream);
    
        parser.file_input();
    
        return this.calculateCandidates(parser, tokenStream.getTokens().length);
    }

    availableSymbols(): Symbol[] {
        let inputStream = new ANTLRInputStream('');
        let lexer = new Python3Lexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new Python3Parser(tokenStream);
    
        return this.dictionary.allSymbols();
    }

    private calculateCandidates(parser: Python3Parser, caretPosition: number): Symbol[] {
        let core = new CodeCompletionCore(parser);
    
        core.ignoredTokens = new Set([]);
    
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
    
        let suggestions: string[] = [];
        suggestions.push(...keywords);
        suggestions.push(...functionNames);
        suggestions.push(...variableNames);
    
        let result: Symbol[] = [];
        result.push(...this.dictionary.symbolsWithTypeIn(suggestions));
        result.push(...this.foundVariablesAt(parser));

        console.log(`Available suggestions > ${result}`);

        return result;
    }

    private foundVariablesAt(_parser: Python3Parser): Symbol[] {
        return [];
        // return parser.declaredVariables().map(this.toSymbolVariable);
    }

    private toSymbolVariable = (input: string): Symbol => {

        return {
            label: input,
            detail: 'Declared variable',
            documentation: 'This is a previously declared variable',
            type: 'Variable'
        }
    }

}

class SymbolsDictionary {
    
    symbols = [{
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

    allSymbols(): Symbol[] {
        return this.symbols;
    }

    symbolsWithTypeIn(types: string[]): Symbol[] {
        let isContainedInTypes = (symbol: Symbol) => types.indexOf(symbol.type) > -1;

        return this.symbols.filter(isContainedInTypes);
    }

}

