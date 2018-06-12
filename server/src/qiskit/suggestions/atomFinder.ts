/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

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
