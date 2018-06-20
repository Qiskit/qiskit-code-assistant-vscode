/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { SuggestionSymbol, SuggestionSymbolType } from '../../types';
import { AtomFinder } from './atomFinder';
import { CommonTokenStream } from 'antlr4ts';
import { ClassSymbol } from '../compiler/qiskitSymbolTable';
import { SuggestionsDictionary } from './suggestionsDictionary';

export class MethodsDictionary {
    constructor(
        private atomFinder: AtomFinder,
        private tokenStream: CommonTokenStream,
        private suggestionsDictionary: SuggestionsDictionary
    ) {}

    currentMethods(): SuggestionSymbol[] {
        let atom = this.atomFinder.firstViableAtomFor(this.tokenStream);
        if (atom && atom.type instanceof ClassSymbol) {
            return this.suggestionsDictionary
                .allMethods()
                .filter(suggestion => suggestion.parent === atom.type.getName())
                .filter(suggestion => suggestion.type === SuggestionSymbolType.method);
        } else {
            return this.suggestionsDictionary.allMethods();
        }
    }
}
