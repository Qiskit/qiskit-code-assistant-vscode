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
            let classType = atom.type as ClassSymbol;
            let atomMethods = classType.getMethods().map(method => method.getName());

            return this.suggestionsDictionary
                .allMethods()
                .filter(suggestion => suggestion.parent === atom.type.getName())
                .filter(suggestion => suggestion.type === SuggestionSymbolType.method);
        } else {
            return this.suggestionsDictionary.allMethods();
        }
    }
}
