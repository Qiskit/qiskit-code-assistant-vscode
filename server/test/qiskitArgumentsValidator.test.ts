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

import { expect } from 'chai';
import { SymbolTable } from '../src/tools/symbolTable';
import { QiskitSymbolTable, VariableSymbol } from '../src/qiskit/compiler/qiskitSymbolTable';
import { ErrorListener } from '../src/qiskit/parser';
import { ArrayReference, TermType, Expression, Term, Position } from '../src/qiskit/analyzers/types';
import { ArgumentsValidator } from '../src/qiskit/analyzers/argumentsValidator';

describe('An arguments checker with QISKit symbol table', () => {
    let symbolTable: SymbolTable;
    let errorListener: ErrorListener;
    let validator: ArgumentsValidator;
    let defaultPosition = {
        line: 1,
        start: 1,
        end: 1
    } as Position;

    beforeEach(() => {
        symbolTable = QiskitSymbolTable.build();
        errorListener = new ErrorListener();
        validator = new ArgumentsValidator(symbolTable, errorListener);
    });

    describe('with input qc.h(c[1])', () => {
        let arrayReference = new ArrayReference();
        arrayReference.variable = 'c';
        arrayReference.position = '1';
        arrayReference.positionType = TermType.number;

        let terms = [
            Term.asVariable('qc', defaultPosition),
            Term.asVariable('h', defaultPosition),
            Term.asArguments(
                [Expression.withTerms([Term.asArrayReference(arrayReference, defaultPosition)])],
                defaultPosition
            )
        ];

        it('should detect an error if c is not QuantumRegister type', () => {
            symbolTable.define(new VariableSymbol('qc', symbolTable.lookup('QuantumCircuit')));
            symbolTable.define(new VariableSymbol('c', symbolTable.lookup('ClassicalRegister')));

            symbolTable.print();

            validator.validate(terms);

            expect(errorListener.errors.length).to.be.equal(1);
        });
    });
});
