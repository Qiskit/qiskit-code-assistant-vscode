/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { SymbolTable } from '../../compiler/types';
import { Scope } from '../../compiler/scope';
import { BuiltInTypeSymbol, Symbol, Type } from '../../compiler/symbols';
import { MultiScopeSymbolTable } from '../../compiler/multiScopeSymbolTable';

export namespace SymbolTableBuilder {
    export function build(): SymbolTable {
        let rootScope = new Scope(null, 'global');
        rootScope.define(new BuiltInTypeSymbol(QASMSymbols.Creg), 0);
        rootScope.define(new BuiltInTypeSymbol(QASMSymbols.Qreg), 0);
        rootScope.define(new BuiltInTypeSymbol(QASMSymbols.Int), 0);
        rootScope.define(new BuiltInTypeSymbol(QASMSymbols.Real), 0);
        rootScope.define(new BuiltInTypeSymbol(QASMSymbols.Gate), 0);
        rootScope.define(new BuiltInTypeSymbol(QASMSymbols.Opaque), 0);

        return new MultiScopeSymbolTable(rootScope);
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
