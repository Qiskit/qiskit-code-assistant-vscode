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
import { CommonToken } from 'antlr4ts';
import { AssignmentsStack, MethodCall, Method } from '../src/qiskit/antlr/tools/assignmentsStack';
import { Python3Lexer } from '../src/qiskit/antlr/Python3Lexer';

describe('An assignments stack', () => {

    let assignmentsStack: AssignmentsStack;

    beforeEach(() => {
        assignmentsStack = new AssignmentsStack();
    });

    it('should store a new assigment', () => {
        assignmentsStack.newAssignmentOn(token(Python3Lexer.NAME, 'foo', 1, 3));

        let result = assignmentsStack.popLastAssignment();

        expect(result.symbol.text).to.be.equal('foo');
    });

    it('should store the variable on the assignation side', () => {
        assignmentsStack.newAssignmentOn(token(Python3Lexer.NAME, 'foo', 1, 4));
        assignmentsStack.setVariable(token(Python3Lexer.NAME, 'boo', 7, 10));

        let result = assignmentsStack.popLastAssignment();

        expect(result.call.variable.text).to.be.equal('boo');
    });

    it('should store a method on the assignation side', () => {
        assignmentsStack.newAssignmentOn(token(Python3Lexer.NAME, 'foo', 1, 4));
        assignmentsStack.setVariable(token(Python3Lexer.NAME, 'boo', 7, 10));
        assignmentsStack.addTrailingMethod(token(Python3Lexer.NAME, 'my_method', 11, 20));

        let result = assignmentsStack.popLastAssignment();

        expect(result.call.trailingMethods[0].method.text).to.be.equal('my_method');
    });

    it('should store a tailing method on the assignation side', () => {
        assignmentsStack.newAssignmentOn(token(Python3Lexer.NAME, 'foo', 1, 4));
        assignmentsStack.setVariable(token(Python3Lexer.NAME, 'boo', 7, 10));
        assignmentsStack.addTrailingMethod(token(Python3Lexer.NAME, 'my_method', 11, 20));
        assignmentsStack.addTrailingMethod(token(Python3Lexer.NAME, 'my_trailed_method', 21, 38));

        let result = assignmentsStack.popLastAssignment();

        expect(result.call.trailingMethods[1].method.text).to.be.equal('my_trailed_method');
    });

    it('should store the arguments of a method call', () => {
        assignmentsStack.newAssignmentOn(token(Python3Lexer.NAME, 'foo', 1, 4));
        assignmentsStack.setVariable(token(Python3Lexer.NAME, 'boo', 7, 10));
        assignmentsStack.addTrailingMethod(token(Python3Lexer.NAME, 'my_method', 11, 20));
        assignmentsStack.addTrailingMethod(token(Python3Lexer.NAME, 'my_trailed_method', 21, 38));
        assignmentsStack.addArgument(token(Python3Lexer.STRING_LITERAL, '"a"', 39, 42));
        assignmentsStack.addArgument(token(Python3Lexer.BIN_INTEGER, '2', 44, 45));

        let result = assignmentsStack.popLastAssignment();

        expect(result.call.trailingMethods[1].arguments[0].text).to.be.equal('"a"');
        expect(result.call.trailingMethods[1].arguments[1].text).to.be.equal('2');
    });

});

describe('A MethodCall', () => {

    it('when new it has no trailing methods', () => {
        let methodCall = new MethodCall(token(Python3Lexer.NAME, 'var', 1, 4));

        expect(methodCall.hasTrailingMethods()).to.be.false;
    });

    it('has trailing methods after those are added', () => {
        let methodCall = new MethodCall(token(Python3Lexer.NAME, 'var', 1, 4));

        methodCall.addTrailingMethod(token(Python3Lexer.NAME, 'method', 1, 7));

        expect(methodCall.hasTrailingMethods()).to.be.true;
    });

});

function token(type: number, text: string, start: number, stop: number) {
    let token = new CommonToken(type, text);
    token.startIndex = start;
    token.stopIndex = stop;
    token.line = 1;

    return token;
}