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
import { QiskitSymbolTable, VariableSymbol } from '../src/qiskit/compiler/qiskitSymbolTable';
import { StatementValidator } from '../src/qiskit/analyzers/statementValidator';
import { ErrorListener } from '../src/qiskit/parser';
import { Expression, Term, ArrayReference, TermType, Position, Statement } from '../src/qiskit/analyzers/types';
import { ParseErrorLevel } from '../src/types';
import { SymbolTable } from '../src/tools/symbolTable';

describe('A statement validator with QISKit symbol table', () => {
    let symbolTable: SymbolTable;
    let errorListener;
    let statementValidator;
    let defaultPosition = {
        line: 1,
        start: 1,
        end: 1
    } as Position;

    beforeEach(() => {
        symbolTable = QiskitSymbolTable.build();
        errorListener = new ErrorListener();
        statementValidator = new StatementValidator(symbolTable, errorListener);
    });

    describe('with input qp = QuamtumProgram()', () => {
        let expressions = [
            Expression.withTerms([Term.asVariable('qp', defaultPosition)]),
            Expression.withTerms([Term.asVariable('QuantumProgram', defaultPosition)])
        ];

        it('should introduce new symbol into the symbol table', () => {
            statementValidator.validate(Statement.withExpressions(expressions));

            expect(symbolTable.lookup('qp')).to.include({
                name: 'qp',
                type: symbolTable.lookup('QuantumProgram')
            });
        });
    });

    describe('with input qr = qp.create_quantum_register("qr", 2)', () => {
        let expressions = [
            Expression.withTerms([Term.asVariable('qr', defaultPosition)]),
            Expression.withTerms([
                Term.asVariable('qp', defaultPosition),
                Term.asVariable('create_quantum_register', defaultPosition),
                Term.asArguments(
                    [Expression.withTerms([Term.asString('qr', defaultPosition), Term.asNumber('2', defaultPosition)])],
                    defaultPosition
                )
            ])
        ];

        it('should introduce new symbol into the symbol table', () => {
            let type = symbolTable.lookup('QuantumProgram');
            let symbol = new VariableSymbol('qp', type);
            symbolTable.define(symbol);

            statementValidator.validate(Statement.withExpressions(expressions));
            let qrVariable = symbolTable.lookup('qr') as VariableSymbol;

            expect(qrVariable.name).to.be.equal('qr');
            expect(qrVariable.type).to.be.equal(symbolTable.lookup('QuantumRegister'));
            expect(qrVariable.metadata).to.include({
                name: 'qr',
                size: 2
            });
        });
    });
});
