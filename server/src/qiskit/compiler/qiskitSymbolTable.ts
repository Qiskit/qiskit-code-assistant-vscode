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
import { lookup } from "dns";

export class QiskitSymbolTable {

    public static build(): SymbolTable {
        let globalScope = new GlobalScope();
        let symbolTable = new SymbolTable(globalScope);
        
        let classType = new BuiltInTypeSymbol('class');

        symbolTable.define(new BuiltInTypeSymbol('void'));
        symbolTable.define(new BuiltInTypeSymbol('string'));
        symbolTable.define(new BuiltInTypeSymbol('int'));
        symbolTable.define(classType);
        symbolTable.define(new ClassSymbol('QuantumRegister', classType, []));
        symbolTable.define(new ClassSymbol('ClassicalRegister', classType, []));
        symbolTable.define(this.createQuantumCircuitSymbol(symbolTable));
        symbolTable.define(this.createQuantumProgramSymbol(symbolTable));
        
        return symbolTable;
    }

    private static createQuantumProgramSymbol(symbolTable: SymbolTable): ClassSymbol {
        let methods = [
            this.createQuantumRegisterMethod(symbolTable),
            this.createClassicalRegisterMethod(symbolTable),
            this.createCircuitMethod(symbolTable)
        ];

        return new ClassSymbol('QuantumProgram', symbolTable.lookup('class'), methods);
    }

    private static createQuantumRegisterMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('QuantumRegister');
        let requiredArguments = [
            new ArgumentSymbol('name', symbolTable.lookup('string')),
            new ArgumentSymbol('size', symbolTable.lookup('int'))
        ];

        return new MethodSymbol('create_quantum_register', type, requiredArguments);
    }

    private static createClassicalRegisterMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('ClassicalRegister');
        let requiredArguments = [
            new ArgumentSymbol('name', symbolTable.lookup('string')),
            new ArgumentSymbol('size', symbolTable.lookup('int'))
        ];

        return new MethodSymbol('create_classical_register', type, requiredArguments);
    }

    private static createCircuitMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('QuantumCircuit');
        let requiredArguments = [
            new ArgumentSymbol('name', symbolTable.lookup('string')),
            new ArgumentSymbol('quantumRegister', symbolTable.lookup('QuantumRegister')),
            new ArgumentSymbol('classicalRegister', symbolTable.lookup('ClassicalRegister'))
        ];

        return new MethodSymbol('create_circuit', type, requiredArguments);
    }

    private static createQuantumCircuitSymbol(symbolTable: SymbolTable): ClassSymbol {
        let methods = [
            this.createHMethod(symbolTable),
            this.createCXMethod(symbolTable),
            this.createMeasureMethod(symbolTable)
        ];

        return new ClassSymbol('QuantumCircuit', symbolTable.lookup('class'), methods);
    }

    private static createHMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('void');
        let requiredArguments = [
            new ArgumentSymbol('quantumRegister', symbolTable.lookup('QuantumRegister'))
        ];

        return new MethodSymbol('h', type, requiredArguments);
    }

    private static createCXMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('void');
        let requiredArguments = [
            new ArgumentSymbol('quantumRegister1', symbolTable.lookup('QuantumRegister')),
            new ArgumentSymbol('quantumRegister2', symbolTable.lookup('QuantumRegister'))
        ];

        return new MethodSymbol('cx', type, requiredArguments);
    }

    private static createMeasureMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('void');
        let requiredArguments = [
            new ArgumentSymbol('quantumRegister', symbolTable.lookup('QuantumRegister')),
            new ArgumentSymbol('classicalRegister', symbolTable.lookup('ClassicalRegister'))
        ];

        return new MethodSymbol('measure', type, requiredArguments);
    }

}

export class ClassSymbol extends Symbol {

    constructor(name: string, type: Type, public methods: MethodSymbol[]) {
        super(name, type);
    }

    // DEPRECATED
    getMethods(): MethodSymbol[] {
        return this.methods;
    }

    toString() {
        return `{ name: ${this.name}, type: ${this.type.getName()}, methods: [${this.methods}] }`;
    }

}

export class MethodSymbol extends Symbol {

    arguments: ArgumentSymbol[] = [];

    constructor(name: string, type: Type, requiredArguments: ArgumentSymbol[] = []) {
        super(name, type);
        this.arguments = requiredArguments;
    }

    getArguments(): ArgumentSymbol[] {
        return this.arguments;
    }

    toString() {
        return `{ name: ${this.name}, type: ${this.type.getName()}, arguments: ${this.arguments} }`;
    }

}

export class ArgumentSymbol extends Symbol {

    constructor(name: string, type: Type) {
        super(name, type);
    }

    isSameType(input: any): boolean {
        if (typeof input === "string") {
            return this.type.getName() === 'string';
        }
        if (typeof input === "number") {
            return this.type.getName() === 'int';
        }

        return false;
    }

    toString() {
        return `{ name: ${this.name}, type: ${this.type.getName()} }`;
    }

}

export class VariableSymbol extends Symbol {

    private metadata: VariableMetadata = null;

    constructor(name: string, type: Type, metadata?: VariableMetadata) {
        super(name, type);
        
        if (metadata) {
            this.metadata = metadata;
        }
    }

    hasSize(): boolean {
        return this.metadata !== null && this.metadata.size !== null;
    }

    size(): number {
        return this.metadata.size;
    }

    toString() {
        return `{ name: ${this.name}, type: ${this.type.getName()} }`;
    }

}

export interface VariableMetadata {
    name: string;
    size: number;
}
