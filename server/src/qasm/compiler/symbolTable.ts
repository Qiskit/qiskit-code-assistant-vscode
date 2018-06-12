/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { SymbolTable, GlobalScope, Symbol, BuiltInTypeSymbol, Type } from '../../tools/symbolTable';

export namespace SymbolTableBuilder {
    
    export function build(): SymbolTable {
        let globalScope = new GlobalScope();
        let symbolTable = new SymbolTable(globalScope);
        symbolTable.define(new BuiltInTypeSymbol('Creg'));
        symbolTable.define(new BuiltInTypeSymbol('Qreg'));
        symbolTable.define(new BuiltInTypeSymbol('Int'));
        symbolTable.define(new BuiltInTypeSymbol('Real'));
        symbolTable.define(new BuiltInTypeSymbol('Gate'));
        symbolTable.define(new BuiltInTypeSymbol('Opaque'));

        return symbolTable;
    }

}

export class VariableSymbol extends Symbol {
    
    constructor(name: string, type: Type) {
        super(name, type);
    }

}

export class RegisterSymbol extends Symbol {

    size: number;

    constructor(name: string, type: Type, size: number) {
        super(name, type);
        this.size = size;
    }

}

export class GateSymbol extends Symbol {

    constructor(name: string, type: Type) {
        super(name, type);
    }

}
