/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { Symbol } from './symbols';
import { SymbolTable } from './types';
import { Scope } from './scope';

export class MultiScopeSymbolTable implements SymbolTable {
    public currentScope: Scope;

    constructor(private rootScope: Scope) {
        this.currentScope = rootScope;
    }

    lookup(symbolName: string, line?: number): Symbol {
        return this.currentScope.lookup(symbolName, line);
    }

    define(symbol: Symbol, declarationLine: number): void {
        this.currentScope.define(symbol, declarationLine);
    }

    push(scopeName: string, line: number): void {
        let localScope = new Scope(this.currentScope, scopeName, line);
        this.currentScope.childs.push(localScope);

        this.currentScope = localScope;
    }

    pop(line: number): void {
        this.currentScope.closeScopeAt(line);
        this.currentScope = this.currentScope.parentScope;
    }

    currentSymbols(): Symbol[] {
        return this.currentScope.definedSymbols();
    }

    mergeWith(scope: Scope): void {
        scope.definedSymbols().forEach(symbol => this.define(symbol, 0));
    }

    print() {
        console.log('Printing symbol table >>>>>>>>');
        this.rootScope.print();
        console.log('<<<<<<<<<<<<<<<<');
    }
}
