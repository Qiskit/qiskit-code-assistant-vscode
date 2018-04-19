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
import { StatementsStack } from '../src/qiskit/antlr/tools/statementsStack';
import { Python3Lexer } from '../src/qiskit/antlr/Python3Lexer';
import { Token } from './utils/tokens';
import { Type } from '../src/tools/symbolTable';
import { FactorContext } from '../src/qiskit/antlr/Python3Parser';

describe('A statements stack', () => {

    let statementsStack: StatementsStack;

    beforeEach(() => {
        statementsStack = new StatementsStack();
    });

    it('should be initialized with left and right side null', () => {
        statementsStack.push();

        let result = statementsStack.pop();

        expect(result.leftSide).to.be.null;
        expect(result.rightSide).to.be.null;
    });

    describe('if working on the left side', () => {

        beforeEach(() => {
            statementsStack.push();
        });

        it('should store a variable', () => {
            statementsStack.addVariable(Token.build(Python3Lexer.NAME, 'foo', 1, 1));
    
            let result = statementsStack.pop();
    
            expect(result.leftSide.variable.text).to.be.equal('foo');
        });
    
        it('should store the trailing methods', () => {
            statementsStack.addVariable(Token.build(Python3Lexer.NAME, 'foo', 1, 1));
            statementsStack.addTrailingMethod(Token.build(Python3Lexer.NAME, 'my_method', 1, 1));
            statementsStack.addTrailingMethod(Token.build(Python3Lexer.NAME, 'my_other_method', 1, 1));
    
            let result = statementsStack.pop();
    
            expect(result.leftSide.trailingMethods[0].methodName.text).to.be.equal('my_method');
            expect(result.leftSide.trailingMethods[1].methodName.text).to.be.equal('my_other_method');
        });
    
        it('should store the arguments', () => {
            statementsStack.addVariable(Token.build(Python3Lexer.NAME, 'foo', 1, 1));
            statementsStack.addTrailingMethod(Token.build(Python3Lexer.NAME, 'my_method', 1, 1));
            statementsStack.addTrailingMethod(Token.build(Python3Lexer.NAME, 'my_other_method', 1, 1));
            statementsStack.addArgument(Token.build(Python3Lexer.STRING_LITERAL, 'a', 1, 1), new FakeSymbol());
    
            let result = statementsStack.pop();
    
            expect(result.leftSide.trailingMethods[1].arguments[0].token.text).to.be.equal('a');
            expect(result.leftSide.trailingMethods[1].arguments[0].type).to.be.deep.equal(new FakeSymbol());
        });    

    });

    describe('if working on the right side', () => {

        beforeEach(() => {
            statementsStack.push();
            statementsStack.addVariable(Token.build(Python3Lexer.NAME, 'foo', 1, 1));
            statementsStack.startAssignation();
        });

        it('should store a variable', () => {
            statementsStack.addVariable(Token.build(Python3Lexer.NAME, 'fooRight', 1, 1));
    
            let result = statementsStack.pop();
    
            expect(result.rightSide.variable.text).to.be.equal('fooRight');
        });

        it('should store the trailing methods', () => {
            statementsStack.addVariable(Token.build(Python3Lexer.NAME, 'fooRight', 1, 1));
            statementsStack.addTrailingMethod(Token.build(Python3Lexer.NAME, 'my_right_method', 1, 1));
            statementsStack.addTrailingMethod(Token.build(Python3Lexer.NAME, 'my_other_right_method', 1, 1));
    
            let result = statementsStack.pop();
    
            expect(result.rightSide.trailingMethods[0].methodName.text).to.be.equal('my_right_method');
            expect(result.rightSide.trailingMethods[1].methodName.text).to.be.equal('my_other_right_method');
        });
    
        it('should store the arguments', () => {
            statementsStack.addVariable(Token.build(Python3Lexer.NAME, 'fooRight', 1, 1));
            statementsStack.addTrailingMethod(Token.build(Python3Lexer.NAME, 'my_right_method', 1, 1));
            statementsStack.addTrailingMethod(Token.build(Python3Lexer.NAME, 'my_other_right_method', 1, 1));
            statementsStack.addArgument(Token.build(Python3Lexer.STRING_LITERAL, 'a', 1, 1), new FakeSymbol());
    
            let result = statementsStack.pop();
    
            expect(result.rightSide.trailingMethods[1].arguments[0].token.text).to.be.equal('a');
            expect(result.rightSide.trailingMethods[1].arguments[0].type).to.be.deep.equal(new FakeSymbol());
        });    

    });
    
});

class FakeSymbol implements Type {

    getName() {
        return "I'm a fake symbol";
    }

}

