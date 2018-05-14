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

import { CommonTokenStream, Token } from 'antlr4ts';
import { SymbolTable, Symbol, Type } from '../../tools/symbolTable';

export class AtomFinder {
    constructor(private symbolTable: SymbolTable) {}

    firstViableAtomFor(tokenStream: CommonTokenStream): Symbol {
        if (!this.isFinishedAtMethodScope(tokenStream)) {
            return new NullSymbol();
        }
        let atomToken = this.getAtomToken(tokenStream);
        return this.symbolTable.lookup(atomToken.text);
    }

    private isFinishedAtMethodScope(tokenStream: CommonTokenStream): boolean {
        let lastPosition = tokenStream.getTokens().length - 1;
        if (tokenStream.getTokens()[lastPosition - 1].text === '.') {
            return true;
        }
        if (tokenStream.getTokens()[lastPosition - 2].text === '.') {
            return true;
        }

        return false;
    }

    private getAtomToken(tokenStream: CommonTokenStream): Token {
        let position = tokenStream.getTokens().length - 1;
        while(tokenStream.getTokens()[position].text !== '.') {
            position--;
        }
        return tokenStream.getTokens()[position - 1];
    }
}

class NullSymbol extends Symbol {
    constructor() {
        super('null', new NullType());
    }
}

class NullType implements Type {
    getName(): string {
        return 'null';
    }
}
