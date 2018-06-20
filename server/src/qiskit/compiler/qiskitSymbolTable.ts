/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { SymbolTable, Symbol, GlobalScope, Type, BuiltInTypeSymbol } from '../../tools/symbolTable';

export namespace QiskitSymbolTable {
    export function build(): SymbolTable {
        let globalScope = new GlobalScope();
        let symbolTable = new SymbolTable(globalScope);

        symbolTable.define(new BuiltInTypeSymbol('void'));
        symbolTable.define(new BuiltInTypeSymbol('object'));
        symbolTable.define(new BuiltInTypeSymbol('string'));
        symbolTable.define(new BuiltInTypeSymbol('number'));
        symbolTable.define(new BuiltInTypeSymbol('boolean'));
        symbolTable.define(new BuiltInTypeSymbol('dict'));
        symbolTable.define(new BuiltInTypeSymbol('qubit_pol'));
        symbolTable.define(new BuiltInTypeSymbol('class'));

        const qiskitSymbols: QiskitSDK = require('../libs/qiskitSDK.json');

        load(qiskitSymbols, symbolTable);

        return symbolTable;
    }

    function load(qiskitSymbols: QiskitSDK, symbolTable: SymbolTable): void {
        qiskitSymbols.classes.forEach(qclass => {
            let type = symbolTable.lookup('class');
            let args: ArgumentSymbol[] = getArgumentsSymbols(qclass.arguments, symbolTable);
            let methods: MethodSymbol[] = getMethodsSymbols(qclass.methods, symbolTable);
            let classSymbol = new ClassSymbol(qclass.name, type, args, methods);

            symbolTable.define(classSymbol);
        });
    }

    function getMethodsSymbols(qmethods: QiskitMethod[], symbolTable: SymbolTable): MethodSymbol[] {
        return qmethods.map(qmethod => {
            let type = symbolTable.lookup(qmethod.type) || symbolTable.lookup('void');
            let requiredArguments: ArgumentSymbol[] = getArgumentsSymbols(qmethod.arguments, symbolTable);

            return new MethodSymbol(qmethod.name, type, requiredArguments);
        });
    }

    function getArgumentsSymbols(qarguments: QiskitArgument[] | undefined, symbolTable: SymbolTable): ArgumentSymbol[] {
        if (qarguments === undefined) {
            return [];
        }

        return qarguments.map(qargument => {
            let type = symbolTable.lookup(qargument.type) || symbolTable.lookup('void');

            return new ArgumentSymbol(qargument.name, type, qargument.optional);
        });
    }
}

export class ClassSymbol extends Symbol {
    constructor(name: string, type: Type, public requiredArguments: ArgumentSymbol[], public methods: MethodSymbol[]) {
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
    constructor(name: string, type: Type, public optional: boolean = false) {
        super(name, type);
    }

    isSameType(input: any): boolean {
        if (typeof input === 'string') {
            return this.type.getName() === 'string';
        }
        if (typeof input === 'number') {
            return this.type.getName() === 'number';
        }

        return false;
    }

    toString() {
        if (this.type === null) {
            return `{ name: ${this.name}, type: NULL }`;
        }

        return `{ name: ${this.name}, type: ${this.type.getName()} }`;
    }
}

export class VariableSymbol extends Symbol {
    metadata: VariableMetadata = null;

    constructor(name: string, type: Type, metadata?: VariableMetadata) {
        super(name, type);

        if (metadata && metadata !== null) {
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
        if (this.type === null) {
            return `{ name: ${this.name}, type: NULL }`;
        }

        return `{ name: ${this.name}, type: ${this.type.getName()} }`;
    }
}

export interface VariableMetadata {
    name?: string;
    size?: number;
}

export interface QiskitSDK {
    classes: QiskitClass[];
}

interface QiskitClass {
    name: string;
    detail: string;
    documentation: string;
    arguments?: QiskitArgument[];
    methods: QiskitMethod[];
}

interface QiskitMethod {
    name: string;
    type: string;
    detail: string;
    documentation: string;
    arguments?: QiskitArgument[];
}

interface QiskitArgument {
    name: string;
    type: string;
    optional?: boolean;
}
