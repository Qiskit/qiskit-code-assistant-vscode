/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

export namespace QiskitSDK {
    const dictionary: any = require('./qiskitSDK.json');

    export function classes(): QiskitClass[] {
        return dictionary.classes;
    }

    export function containsClass(className: string): boolean {
        return classes().some(theClass => theClass.name === className);
    }
}

export interface QiskitClass {
    name: string;
    detail: string;
    documentation: string;
    arguments?: QiskitArgument[];
    methods: QiskitMethod[];
}

export interface QiskitMethod {
    name: string;
    type: string;
    detail: string;
    documentation: string;
    arguments?: QiskitArgument[];
}

export interface QiskitArgument {
    name: string;
    type: string;
    optional?: boolean;
}
