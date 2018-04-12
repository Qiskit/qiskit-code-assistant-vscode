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
import { mock, verify, anyString, anything } from 'ts-mockito';
import { SymbolTable } from "../src/tools/symbolTable";
import { QiskitSymbolTable, VariableSymbol } from "../src/qiskit/compiler/qiskitSymbolTable";
import { ArgumentsTester, ArgumentsErrorHandler } from "../src/qiskit/antlr/tools/argumentsTester";
import { MethodCall } from '../src/qiskit/antlr/tools/assignmentsStack';
import { Python3Lexer } from '../src/qiskit/antlr/Python3Lexer';
import { Token } from './utils/tokens';

describe('An arguments tester on a QISKit grammar', () => {

    let symbolTable: SymbolTable;

    let argumentsErrorHandlerSpy: ArgumentsErrorHandler;

    let tester: ArgumentsTester;
    
    beforeEach(() => {
        symbolTable = QiskitSymbolTable.build();
        symbolTable.define(new VariableSymbol('qp', symbolTable.lookup('QuantumProgram')));

        argumentsErrorHandlerSpy = mock(ArgumentsErrorHandler);

        tester = new ArgumentsTester(symbolTable, argumentsErrorHandlerSpy);
    });

    it('detect errors on qr = qp.create_quamtum_register(2, "qr")', () => {
        let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qp', 1, 1));
        call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'create_quantum_register', 1, 1));
        call.addArgument(
            Token.build(Python3Lexer.BIN_INTEGER, '2', 1, 1),
            symbolTable.lookup('int'));
        call.addArgument(
            Token.build(Python3Lexer.STRING_LITERAL, '"qr"', 1, 1),
            symbolTable.lookup('string'));

        tester.check(call);

        verify(argumentsErrorHandlerSpy.handleError(anything(), anyString())).once()
        verify(argumentsErrorHandlerSpy.handleError(anything(), anyString())).once()
    });

    it('detect errors on qr = qp.create_quamtum_register("qr")', () => {
        let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qp', 1, 1));
        call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'create_quantum_register', 1, 1));
        call.addArgument(
            Token.build(Python3Lexer.STRING_LITERAL, '"qr"', 1, 1),
            symbolTable.lookup('string'));

        tester.check(call);

        verify(argumentsErrorHandlerSpy.handleError(anything(), anyString())).once();
    });
    
    it('do not detect errors on qr = qp.create_quantum_register("qr", 2)', () => {
        let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qp', 1, 1));
        call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'create_quantum_register', 1, 1));
        call.addArgument(
            Token.build(Python3Lexer.STRING_LITERAL, '"qr"', 1, 1),
            symbolTable.lookup('string'));
        call.addArgument(
            Token.build(Python3Lexer.BIN_INTEGER, '2', 1, 1),
            symbolTable.lookup('int'));

        tester.check(call);

        verify(argumentsErrorHandlerSpy.handleError(anything(), anything())).never();
    });

});