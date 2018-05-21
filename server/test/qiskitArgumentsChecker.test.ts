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
import { QiskitSymbolTable } from '../src/qiskit/compiler/qiskitSymbolTable';
import { ErrorListener } from '../src/qiskit/parser';
import { ArgumentsChecker } from '../src/qiskit/analyzers/statementValidator';
import { ArrayReference, TermType, Expression, Term } from '../src/qiskit/analyzers/types';

describe('An arguments checker with QISKit symbol table', () => {
    let symbolTable: SymbolTable;
    let errorListener;
    let argumentsChecker;

    beforeEach(() => {
        symbolTable = QiskitSymbolTable.build();
        errorListener = new ErrorListener();
        argumentsChecker = new ArgumentsChecker(symbolTable, errorListener);
    });

    describe('with input qc.h(c[1])', () => {
        let arrayReference = new ArrayReference();
        arrayReference.variable = 'q';
        arrayReference.position = '1';
        arrayReference.positionType = TermType.number;

        let expressions = [
            Expression.withTerms([
                Term.asVariable('qc'),
                Term.asVariable('h'),
                Term.asArguments([Expression.withTerms([Term.asArrayReference(arrayReference)])])
            ])
        ];

        it('should detect an error if c is not QuantumRegister type', () => {
            argumentsChecker.check(expressions);

            expect(errorListener.errors.length).to.be.equal(1);
        });
    });
});
