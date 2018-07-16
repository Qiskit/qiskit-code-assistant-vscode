/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

export interface Type {
    getName(): string;
}

export class Symbol implements Type {
    name: string;

    type: Type;

    constructor(name: string, type: Type) {
        this.name = name;
        this.type = type;
    }

    getName(): string {
        return this.name;
    }

    isType(theType: string): boolean {
        return this.type.getName() === theType;
    }
}

export class BuiltInTypeSymbol extends Symbol implements Type {
    constructor(name: string) {
        super(name, null);
    }

    getName(): string {
        return this.name;
    }

    toString(): string {
        return `{ name: ${this.getName()} }`;
    }
}
