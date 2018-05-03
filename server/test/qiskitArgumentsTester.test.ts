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

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { SymbolTable } from "../src/tools/symbolTable";
import { QiskitSymbolTable, VariableSymbol } from "../src/qiskit/compiler/qiskitSymbolTable";
import { ArgumentsTester, ArgumentsErrorHandler } from "../src/qiskit/antlr/tools/argumentsTester";
import { MethodCall } from '../src/qiskit/antlr/tools/methodCall';
import { Python3Lexer } from '../src/qiskit/antlr/Python3Lexer';
import { Token } from './utils/tokens';

chai.use(sinonChai);

class FakeErrorHandler extends ArgumentsErrorHandler {

    handleError(offendingToken: Token, message: string): void {
    }

}

describe('An arguments tester on a QISKit grammar', () => {

    let symbolTable: SymbolTable;

    let errorHandler: ArgumentsErrorHandler;

    let tester: ArgumentsTester;

    describe('when checking for arguments type', () => {

        beforeEach(() => {
            symbolTable = QiskitSymbolTable.build();
            symbolTable.define(new VariableSymbol('qp', symbolTable.lookup('QuantumProgram')));
    
            errorHandler = new FakeErrorHandler();
    
            tester = new ArgumentsTester(symbolTable, errorHandler);
    
            sinon.spy(errorHandler, 'handleError');
        });
    
        it('should detect errors on qr = qp.create_quamtum_register(2, "qr")', () => {
            let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qp', 1, 1));
            call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'create_quantum_register', 1, 1));
            call.addArgument(
                Token.build(Python3Lexer.BIN_INTEGER, '2', 1, 1),
                symbolTable.lookup('int'));
            call.addArgument(
                Token.build(Python3Lexer.STRING_LITERAL, '"qr"', 1, 1),
                symbolTable.lookup('string'));
    
            tester.check(call);
    
            chai.expect(errorHandler.handleError).to.have.been.calledTwice;
        });
    
        it('should detect errors on qr = qp.create_quamtum_register("qr")', () => {
            let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qp', 1, 1));
            call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'create_quantum_register', 1, 1));
            call.addArgument(
                Token.build(Python3Lexer.STRING_LITERAL, '"qr"', 1, 1),
                symbolTable.lookup('string'));
    
            tester.check(call);
    
            chai.expect(errorHandler.handleError).to.have.been.calledOnce;
        });
        
        it('should do not detect errors on qr = qp.create_quantum_register("qr", 2)', () => {
            let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qp', 1, 1));
            call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'create_quantum_register', 1, 1));
            call.addArgument(
                Token.build(Python3Lexer.STRING_LITERAL, '"qr"', 1, 1),
                symbolTable.lookup('string'));
            call.addArgument(
                Token.build(Python3Lexer.BIN_INTEGER, '2', 1, 1),
                symbolTable.lookup('int'));
    
            tester.check(call);
    
            chai.expect(errorHandler.handleError).to.not.have.been.called;
        });

    });
    
    describe('when checking for array arguments', () => {

        beforeEach(() => {
            let registerMetadata = {
                name: 'qr',
                size: 2
            };

            symbolTable = QiskitSymbolTable.build();
            symbolTable.define(new VariableSymbol('qp', symbolTable.lookup('QuantumProgram')));
            symbolTable.define(new VariableSymbol('qr', symbolTable.lookup('QuantumRegister'), registerMetadata));
            symbolTable.define(new VariableSymbol('qc', symbolTable.lookup('QuantumCircuit')));
    
            errorHandler = new FakeErrorHandler();
    
            tester = new ArgumentsTester(symbolTable, errorHandler);
    
            sinon.spy(errorHandler, 'handleError');
        });

        it('should detect when an array access a position larger than its size', () => {
            let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qc', 1, 1));
            call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'h', 1, 1));
            call.addArgument(
                Token.build(Python3Lexer.NAME, 'qr', 1, 1),
                symbolTable.lookup('qr'));
            call.addArrayDimension(2);
    
            tester.check(call);

            chai.expect(errorHandler.handleError).to.have.been.calledOnce;
        });

        it('should do not detect errors if arrays are between limits', () => {
            let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qc', 1, 1));
            call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'h', 1, 1));
            call.addArgument(
                Token.build(Python3Lexer.NAME, 'qr', 1, 1),
                symbolTable.lookup('qr'));
            call.addArrayDimension(1);
    
            tester.check(call);

            chai.expect(errorHandler.handleError).to.not.have.been.called;
        });

    });

});
