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
        symbolTable.define(new BuiltInTypeSymbol(QASMSymbols.Creg));
        symbolTable.define(new BuiltInTypeSymbol(QASMSymbols.Qreg));
        symbolTable.define(new BuiltInTypeSymbol(QASMSymbols.Int));
        symbolTable.define(new BuiltInTypeSymbol(QASMSymbols.Real));
        symbolTable.define(new BuiltInTypeSymbol(QASMSymbols.Gate));
        symbolTable.define(new BuiltInTypeSymbol(QASMSymbols.Opaque));

        return symbolTable;
    }
}

export class VariableSymbol extends Symbol {
    constructor(name: string, type: Type) {
        super(name, type);
    }

    toString(): string {
        return `{ name: ${this.name}, type: ${this.type} }`;
    }
}

export class RegisterSymbol extends Symbol {
    size: number;

    constructor(name: string, type: Type, size: number) {
        super(name, type);
        this.size = size;
    }

    toString(): string {
        return `{ name: ${this.name}, type: ${this.type}, size: ${this.size} }`;
    }
}

export enum QASMSymbols {
    Qreg = 'Qreg',
    Creg = 'Creg',
    Int = 'Int',
    Real = 'Real',
    Gate = 'Gate',
    Opaque = 'Opaque'
}
