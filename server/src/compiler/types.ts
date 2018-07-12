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
import { Scope } from './scope';

export interface SymbolTable {
    /** Pointer to the current scope at the symbol table. */
    currentScope: Scope;

    /** Searches the given symbol name at the root scope, if a line number is specified searches for a scope
     *  containing that symbol.
     */
    lookup(symbolName: string, line?: number): Symbol;

    /** Stores the given symbol with the line where it was declared for first time. */
    define(symbol: Symbol, declarationLine: number): void;

    /** Adds a new scope to the current scope. */
    push(scopeName: string, line: number): void;

    /** Returns to the parent scope closing the current one. */
    pop(line: number): void;

    /** Returns a list of the USER DEFINED symbols for the current scope and its parents. */
    currentSymbols(): Symbol[];

    /** Merge into the global scope the symbols at the given scope. */
    mergeWith(scope: Scope): void;

    print(): void;
}
