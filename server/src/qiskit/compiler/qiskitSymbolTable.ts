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
import { ClassicalRegister } from "./symbols/classicalRegister";

export namespace QiskitSymbolTable {

    export function build(): SymbolTable {
        let globalScope = new GlobalScope();
        let symbolTable = new SymbolTable(globalScope);
        
        symbolTable.define(new BuiltInTypeSymbol('void'));
        symbolTable.define(new BuiltInTypeSymbol('string'));
        symbolTable.define(new BuiltInTypeSymbol('int'));
        symbolTable.define(new BuiltInTypeSymbol('boolean'));
        symbolTable.define(new BuiltInTypeSymbol('class'));

        const qiskitSymbols: QiskitSDK = require('../libs/qiskitSDK.json');

        load(qiskitSymbols, symbolTable);
        
        return symbolTable;
    }

    function load(qiskitSymbols: QiskitSDK, symbolTable: SymbolTable): void {
        qiskitSymbols.classes.forEach(qclass => {
            let type = symbolTable.lookup('class');
            let methods: MethodSymbol[] = getMethodsSymbols(qclass.methods, symbolTable);
            let classSymbol = new ClassSymbol(qclass.name, type, methods);

            symbolTable.define(classSymbol);
        });
    }

    function getMethodsSymbols(qmethods: QiskitMethod[], symbolTable: SymbolTable): MethodSymbol[] {
        return qmethods.map(qmethod => {
            let type = symbolTable.lookup(qmethod.type);
            let requiredArguments: ArgumentSymbol[] = getArgumentsSymbols(qmethod.arguments, symbolTable);

            return new MethodSymbol(qmethod.name, type, requiredArguments);
        });
    }

    function getArgumentsSymbols(qarguments: QiskitArgument[] | undefined, symbolTable: SymbolTable): ArgumentSymbol[] {
        if (qarguments === undefined) {
            return [];
        }

        return qarguments.map(qargument => {
            let type = symbolTable.lookup(qargument.type);

            return new ArgumentSymbol(qargument.name, type);
        });
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

interface QiskitSDK {
    classes: QiskitClass[];
}

interface QiskitClass {
    name: string;
    info: string;
    detail: string;
    methods: QiskitMethod[];
}

interface QiskitMethod {
    name: string;
    type: string;
    info: string;
    detail: string;
    arguments: QiskitArgument[];
}

interface QiskitArgument {
    name: string;
    type: string;
}
