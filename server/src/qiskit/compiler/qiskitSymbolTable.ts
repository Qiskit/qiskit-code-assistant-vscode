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

export namespace QiskitSymbolTable {

    export function build(): SymbolTable {
        let globalScope = new GlobalScope();
        let symbolTable = new SymbolTable(globalScope);
        
        let classType = new BuiltInTypeSymbol('class');

        symbolTable.define(new BuiltInTypeSymbol('void'));
        symbolTable.define(new BuiltInTypeSymbol('string'));
        symbolTable.define(new BuiltInTypeSymbol('int'));
        symbolTable.define(new BuiltInTypeSymbol('boolean'));
        symbolTable.define(classType);
        symbolTable.define(createClassicalRegisterFrom(symbolTable));
        // symbolTable.define(new ClassSymbol('QuantumRegister', classType, []));
        // symbolTable.define(new ClassSymbol('ClassicalRegister', classType, []));
        // symbolTable.define(createQuantumCircuitSymbol(symbolTable));
        // symbolTable.define(createQuantumProgramSymbol(symbolTable));
        
        return symbolTable;
    }

    function createClassicalRegisterFrom(symbolTable: SymbolTable): ClassSymbol {
        let classType = symbolTable.lookup('class');
        let methods = [
            createCheckRangeMethod(symbolTable),
            createQasmMethod(symbolTable)
        ];

        return new ClassSymbol('ClassicalRegister', classType, methods);
    }

    function createCheckRangeMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('boolean');
        let requiredArguments = [
            new ArgumentSymbol('position', symbolTable.lookup('int'))
        ];

        return new MethodSymbol('check_range', type, requiredArguments);
    }

    function createQasmMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('string');
        let requiredArguments: ArgumentSymbol[] = [];

        return new MethodSymbol('qasm', type, requiredArguments);
    }

    function createQuantumProgramSymbol(symbolTable: SymbolTable): ClassSymbol {
        let methods = [
            createQuantumRegisterMethod(symbolTable),
            createClassicalRegisterMethod(symbolTable),
            createCircuitMethod(symbolTable)
        ];

        return new ClassSymbol('QuantumProgram', symbolTable.lookup('class'), methods);
    }

    function createQuantumRegisterMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('QuantumRegister');
        let requiredArguments = [
            new ArgumentSymbol('name', symbolTable.lookup('string')),
            new ArgumentSymbol('size', symbolTable.lookup('int'))
        ];

        return new MethodSymbol('create_quantum_register', type, requiredArguments);
    }

    function createClassicalRegisterMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('ClassicalRegister');
        let requiredArguments = [
            new ArgumentSymbol('name', symbolTable.lookup('string')),
            new ArgumentSymbol('size', symbolTable.lookup('int'))
        ];

        return new MethodSymbol('create_classical_register', type, requiredArguments);
    }

    function createCircuitMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('QuantumCircuit');
        let requiredArguments = [
            new ArgumentSymbol('name', symbolTable.lookup('string')),
            new ArgumentSymbol('quantumRegister', symbolTable.lookup('QuantumRegister')),
            new ArgumentSymbol('classicalRegister', symbolTable.lookup('ClassicalRegister'))
        ];

        return new MethodSymbol('create_circuit', type, requiredArguments);
    }

    function createQuantumCircuitSymbol(symbolTable: SymbolTable): ClassSymbol {
        let methods = [
            createHMethod(symbolTable),
            createCXMethod(symbolTable),
            createMeasureMethod(symbolTable)
        ];

        return new ClassSymbol('QuantumCircuit', symbolTable.lookup('class'), methods);
    }

    function createHMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('void');
        let requiredArguments = [
            new ArgumentSymbol('quantumRegister', symbolTable.lookup('QuantumRegister'))
        ];

        return new MethodSymbol('h', type, requiredArguments);
    }

    function createCXMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('void');
        let requiredArguments = [
            new ArgumentSymbol('quantumRegister1', symbolTable.lookup('QuantumRegister')),
            new ArgumentSymbol('quantumRegister2', symbolTable.lookup('QuantumRegister'))
        ];

        return new MethodSymbol('cx', type, requiredArguments);
    }

    function createMeasureMethod(symbolTable: SymbolTable): MethodSymbol {
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
