/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { Symbol } from '../../tools/symbolTable';

export interface SymbolTable {
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

    print(): void;
}
