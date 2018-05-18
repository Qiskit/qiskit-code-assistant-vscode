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
import { QiskitSymbolTable } from '../src/qiskit/compiler/qiskitSymbolTable';
import { StatementValidator } from '../src/qiskit/analyzers/statementValidator';
import { ErrorListener } from '../src/qiskit/parser';
import { Expression, Term } from '../src/qiskit/analyzers/types';

describe('A statement validator with QISKit symbol table', () => {
    let symbolTable = QiskitSymbolTable.build();
    let errorListener = new ErrorListener();
    let statementValidator = new StatementValidator(symbolTable, errorListener);

    describe('with input qp = QuamtumProgram()', () => {
        let expressions = [
            Expression.withTerms([Term.asVariable('qp')]),
            Expression.withTerms([Term.asVariable('QuantumProgram')])
        ];

        it('should introduce new symbol into the symbol table', () => {
            statementValidator.validate(expressions);

            expect(symbolTable.lookup('qp')).to.include({
                name: 'qp',
                type: symbolTable.lookup('QuantumProgram')
            });
        });
    });
});
