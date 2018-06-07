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
