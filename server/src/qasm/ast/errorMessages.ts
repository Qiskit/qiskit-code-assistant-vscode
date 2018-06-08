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
}
