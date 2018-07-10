/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { BuiltInTypeSymbol, Symbol, Type } from '../../tools/symbolTable';
import { QiskitSymbols } from './qiskitSymbolTable';

export class PersistentSymbolTable {
    constructor(private rootScope: Scope) {}

    lookup(symbolName: string, line?: number): Symbol {
        return this.rootScope.lookup(symbolName, line);
    }

    define(symbol: Symbol, line: number): void {
        this.rootScope.define(symbol, line);
    }
}

class Scope {
    dictionary: Map<string, VariableDefinition[]> = new Map();
    childs: Scope[];

    lookup(symbolName: string, line?: number): Symbol {
        return this.dictionary.get(symbolName)[0].symbol;
    }

    define(symbol: Symbol, startLine = 1, endLine = Number.MAX_SAFE_INTEGER) {
        let variableDefinition = new VariableDefinition(symbol, startLine, endLine);
        this.dictionary.set(symbol.name, [variableDefinition]);
    }
}

class VariableDefinition {
    constructor(public symbol: Symbol, public startLine: number, public endLine: number) {}
}

export namespace QiskitInitialScope {
    export function create(): Scope {
        let scope = new Scope();

        scope.define(new BuiltInTypeSymbol(QiskitSymbols.void));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.object));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.string));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.number));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.boolean));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.dictionary));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.qbitPol));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.class));

        return scope;
    }
}
