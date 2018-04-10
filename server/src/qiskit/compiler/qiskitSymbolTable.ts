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

import { SymbolTable, Symbol, GlobalScope, Type, BuiltInTypeSymbol } from "../../tools/symbolTable";

export class QiskitSymbolTable {

    public static build(): SymbolTable {
        let globalScope = new GlobalScope();
        let symbolTable = new SymbolTable(globalScope);

        symbolTable.define(new ClassSymbol('QuantumRegister', []));
        symbolTable.define(new ClassSymbol('ClassicalRegister', []));
        symbolTable.define(new ClassSymbol('QuantumCircuit', []));
        symbolTable.define(this.theQuantumProgramClass(symbolTable));
        
        return symbolTable;
    }

    private static theQuantumProgramClass(symbolTable: SymbolTable): Symbol {
        let methods = [
            new MethodSymbol('create_quatum_register', symbolTable.lookup('QuantumRegister').type),
            new MethodSymbol('create_classical_register', symbolTable.lookup('ClassicalRegister').type)
        ];

        return new ClassSymbol('QuantumProgram', methods);
    }

}

export class ClassSymbol extends Symbol {

    constructor(name: string, private methods: MethodSymbol[]) {
        super(name, new ClassType());
    }

}

export class MethodSymbol extends Symbol {

    constructor(name: string, type: Type) {
        super(name, type);
    }

}

export class VariableSymbol extends Symbol {

    constructor(name: string, type: Type) {
        super(name, type);
    }

}

export class ClassType implements Type {

    getName(): string {
        return 'Class';
    }

}