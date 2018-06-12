/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

export namespace ErrorMessages {
    export function notPreviouslyDefined(name: string): string {
        return `Symbol ${name} is not previously defined.`;
    }

    export function previousDefinitionOf(name: string): string {
        return `Symbol ${name} is previously defined.`;
    }

    export function expectingQuantumRegister(name: string): string {
        return `Expecting quantum register at ${name} but it is another type.`;
    }

    export function expectingClassicalRegister(name: string): string {
        return `Expecting classical register at ${name} but it is another type.`;
    }

    export function indexOutOfBound(name: string, size: number): string {
        return `Index out of bound, register ${name} has size ${size}.`;
    }

    export function classicalRegisterTooSmall(quantumRegister: string, classicalRegister: string): string {
        return `The quatum register ${quantumRegister} cannot be mapped to a smaller classic register ${classicalRegister}.`;
    }

    export function incompatibleComparationValue(classicalRegister: string, maxSize: number): string {
        return `${classicalRegister} cannot be compared with a value larger than ${maxSize}`;
    }
}
