/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { Symbol, Type } from '../../tools/symbolTable';

export class ClassSymbol extends Symbol {
    constructor(name: string, type: Type, public requiredArguments: ArgumentSymbol[], public methods: MethodSymbol[]) {
        super(name, type);
    }

    toString() {
        return `{ name: ${this.name}, type: ${this.type.getName()} }`;
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
    constructor(name: string, type: Type, public optional = false) {
        super(name, type);
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

interface QiskitSDK {
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

export enum QiskitSymbols {
    void = 'void',
    object = 'object',
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    dictionary = 'dict',
    qbitPol = 'qubit_pol',
    class = 'class'
}
