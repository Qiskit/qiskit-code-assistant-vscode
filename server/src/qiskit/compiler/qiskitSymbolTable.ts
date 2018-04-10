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
        
        let classType = new BuiltInTypeSymbol('class');

        symbolTable.define(classType);
        symbolTable.define(new ClassSymbol('QuantumRegister', classType, []));
        symbolTable.define(new ClassSymbol('ClassicalRegister', classType, []));
        symbolTable.define(new ClassSymbol('QuantumCircuit', classType, []));
        symbolTable.define(this.createQuantumProgramSymbol(symbolTable));
        
        return symbolTable;
    }

    private static createQuantumProgramSymbol(symbolTable: SymbolTable): ClassSymbol {
        let methods = [
            new MethodSymbol('create_quantum_register', symbolTable.lookup('QuantumRegister')), 
            new MethodSymbol('create_classical_register', symbolTable.lookup('ClassicalRegister'))
        ];

        return new ClassSymbol('QuantumProgram', symbolTable.lookup('class'), methods);
    }

}

export class ClassSymbol extends Symbol {

    constructor(name: string, type: Type, private methods: MethodSymbol[]) {
        super(name, type);
    }

    getMethods(): MethodSymbol[] {
        return this.methods;
    }

    toString() {
        return `{ name: ${this.name}, type: ${this.type.getName()}, methods: [${this.methods}] }`;
    }

}

export class MethodSymbol extends Symbol {

    constructor(name: string, type: Type) {
        super(name, type);
    }

    toString() {
        return `{ name: ${this.name}, type: ${this.type.getName()} }`;
    }

}

export class VariableSymbol extends Symbol {

    constructor(name: string, type: Type) {
        super(name, type);
    }

    toString() {
        return `{ name: ${this.name}, type: ${this.type.getName()} }`;
    }

}
