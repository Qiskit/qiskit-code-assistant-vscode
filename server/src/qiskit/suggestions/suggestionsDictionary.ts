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

import { SuggestionSymbol } from '../../types';

export class SuggestionsDictionary {
    symbols = [
        {
            label: 'QuantumProgram',
            detail: 'Quantum Program Class',
            documentation: 'Quantum Program Class.',
            type: 'class'
        },
        {
            label: 'create_quantum_register',
            detail: 'Creates a quantum register',
            documentation: "create_quantum_register('register_name', size)",
            type: 'method'
        },
        {
            label: 'create_classical_register',
            detail: 'Creates a classical register',
            documentation: "create_classical_register('register_name', size)",
            type: 'method'
        },
        {
            label: 'create_circuit',
            detail: 'Creates a quantum circuit',
            documentation: "create_circuit('circuit_name', quantum_registers, classical_registers)",
            type: 'method'
        },
        {
            label: 'QuantumCircuit',
            detail: 'Quantum circuit',
            documentation: 'Quantum circuit.',
            type: 'class'
        },
        {
            label: 'h',
            detail: 'Applies a Hadamard gate',
            documentation: 'h(quantum_register)',
            type: 'method'
        },
        {
            label: 'QuantumRegister',
            detail: 'Quantum register',
            documentation: 'Implement a quantum register.',
            type: 'class'
        },
        {
            label: 'ClassicalRegister',
            detail: 'Classical register',
            documentation: 'Implement a classical register.',
            type: 'class'
        }
    ];

    allSymbols(): SuggestionSymbol[] {
        return this.symbols;
    }

    symbolsWithTypeIn(types: string[]): SuggestionSymbol[] {
        let isContainedInTypes = (symbol: SuggestionSymbol) => types.indexOf(symbol.type) > -1;

        return this.symbols.filter(isContainedInTypes);
    }
}
