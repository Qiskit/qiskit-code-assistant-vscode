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
import { SuggestionsDictionary } from './suggestions/suggestionsDictionary';
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { Python3Lexer } from './antlr/Python3Lexer';
import { Python3Parser } from './antlr/Python3Parser';
import { SuggestionsCalculator } from './suggestions/suggestionsCalculator';
import { AtomFinder } from './suggestions/atomFinder';
import { QiskitSemanticAnalyzer } from './analyzers/qiskitSemanticAnalyzer';

export class QiskitSuggester implements Suggester {
    private dictionary = new SuggestionsDictionary();

    calculateSuggestionsFor(input: string): SuggestionSymbol[] {
        let inputStream = new ANTLRInputStream(input);
        let lexer = new Python3Lexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new Python3Parser(tokenStream);

        let tree = parser.program();

        let semanticAnalyzer = new QiskitSemanticAnalyzer();
        let symbolTable = semanticAnalyzer.visit(tree);

        let caretPosition = tokenStream.getTokens().length;
        let atomFinder = new AtomFinder(symbolTable);
        let suggestionCalculator = new SuggestionsCalculator(
            parser,
            tokenStream,
            this.dictionary,
            atomFinder,
            symbolTable
        );

        return suggestionCalculator.calculateAtPosition(caretPosition);
    }

    availableSymbols(): SuggestionSymbol[] {
        return this.dictionary.allSymbols();
    }
}
