/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { expect } from 'chai';
import { QASMParser } from '../src/qasm/parser';
import { Parser, ParseErrorLevel, ParserError } from '../src/types';
import { ErrorMessages } from '../src/qasm/compiler/tools/errorMessages';

describe('A QASM parser', () => {
    let parser: Parser = new QASMParser();

    describe('with an empty input', () => {
        it('will end without errors', () => {
            let result = parser.parse('');
            expect(result.errors.length).to.be.eq(0);
        });
    });

    describe('with an input with only clean', () => {
        it('will end without errors', () => {
            let result = parser.parse('clean');
            expect(result.errors.length).to.be.eq(0);
        });
    });

    describe('with headers', () => {
        it('defining only ASM version will end without errors', () => {
            let input = 'OPENQASM 2.0;';

            let result = parser.parse(input);
            expect(result.errors.length).to.be.eq(0);
        });

        it('including a functions library will end without errors', () => {
            let input = `
        OPENQASM 2.0;
        include "qelib1.inc";
        `;

            let result = parser.parse(input);
            expect(result.errors.length).to.be.eq(0);
        });
    });

    describe('with sentences', () => {
        it('will accept registers definition', () => {
            let input = `
        qreg q[5];
        creg c[5];
        `;

            let result = parser.parse(input);
            expect(result.errors.length).to.be.eq(0);
        });

        it('will accept gates definition', () => {
            let input = `
        gate u1(lamda) q {
          U(0,0,lambda) q;
        }
        `;

            let result = parser.parse(input);
            expect(result.errors.length).to.be.eq(0);
        });

        it('will not accept gates definition with a barrier', () => {
            let input = `
        gate u1(lamda) q {
          U(0,0,lambda) q;
          barrier q;
        }
        `;

            let result = parser.parse(input);
            // TODO this expectation should be much better > Expect.oneErrorLike
            expect(result.errors.length).to.be.eq(1);
            expect(result.errors[0].line).to.be.eq(3);
        });

        it('will accept a barrier outside a gate definition', () => {
            let input = `
        qreg q[5];
        creg c[5];
        barrier q[1];`;

            let result = parser.parse(input);
            expect(result.errors.length).to.be.eq(0);
        });

        it('will accept opaque definition', () => {
            let input = 'opaque foo(a, b, c) q;';

            let result = parser.parse(input);
            expect(result.errors.length).to.be.eq(0);
        });

        it('will accept expressions', () => {
            let input = `
        gate cx c,t {
          CX c,t; 
        }
        
        qreg q[5];
        creg c[5];
        cx q[1],q[0];
        measure q[1] -> c[1];
        reset q;`;

            let result = parser.parse(input);
            expect(result.errors.length).to.be.eq(0);
        });

        it('will accept conditional expressions', () => {
            let input = `
        qreg q[5];
        creg a[5];
        if (a == 2)
          barrier q[2];
        `;

            let result = parser.parse(input);
            expect(result.errors.length).to.be.eq(0);
        });
    });

    describe('with an input from QX composer', () => {
        it('will end without errors', () => {
            let input = `
        OPENQASM 2.0;
        include "qelib1.inc";

        qreg q[5];
        creg c[5];
        
        u1(pi) q[0];
        x q[1];
        x q[1];
        cx q[1],q[0];
        measure q[1] -> c[1];`;

            let result = parser.parse(input);
            expect(result.errors.length).to.be.eq(0);
        });
    });

    describe('with a wrong q registry defined', () => {
        it('will throw one error', () => {
            let input = `
        OPENQASM 2.0;
        include "qelib1.inc";

        qreg q;`;

            let result = parser.parse(input);
            // TODO this expectation should be much better > Expect.oneErrorLike
            expect(result.errors.length).to.be.eq(1);
            expect(result.errors[0].line).to.be.eq(4);
        });
    });

    describe('with a semantically wrong  input', () => {
        let input = 'qreg q[3];creg c[3];measure foo[1]->c[1];';

        it('will throw one error', () => {
            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.notPreviouslyDefined('foo'),
                start: 28,
                end: 31
            }).at(result.errors);
        });
    });

    describe('generates a duplication error', () => {
        it('if a quatum register uses a previously defined symbol', () => {
            let input = 'qreg q[5];creg c[5];qreg q[5];';

            let result = parser.parse(input);

            Expect.oneWarningLike({
                message: ErrorMessages.previousDefinitionOf('q'),
                start: 25,
                end: 26
            }).at(result.errors);
        });

        it('if a classic register uses a previously defined symbol', () => {
            let input = 'qreg q[5];creg q[5];';

            let result = parser.parse(input);

            Expect.oneWarningLike({
                message: ErrorMessages.previousDefinitionOf('q'),
                start: 15,
                end: 16
            }).at(result.errors);
        });

        it('if a gate uses a previously defined symbol', () => {
            let input = `qreg cx[5];gate cx c,t {
          CX c,t; 
        }`;

            let result = parser.parse(input);

            Expect.oneWarningLike({
                message: ErrorMessages.previousDefinitionOf('cx'),
                start: 16,
                end: 18
            }).at(result.errors);
        });

        it('if an opaque uses a previously defined symbol', () => {
            let input = `qreg foo[5];opaque foo(a, b, c) q;`;

            let result = parser.parse(input);

            Expect.oneWarningLike({
                message: ErrorMessages.previousDefinitionOf('foo'),
                start: 19,
                end: 22
            }).at(result.errors);
        });
    });

    describe('throws a semantic error', () => {
        it('if one register is used beyond its size', () => {
            let input = `qreg foo[5];creg bar[5];measure foo[6] -> bar[4];`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.indexOutOfBound('foo', 5),
                start: 32,
                end: 35
            }).at(result.errors);
        });

        it('if expecting a different type of register', () => {
            let input = `creg foo[5];creg bar[5];measure foo -> bar;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.expectingQuantumRegister('foo'),
                start: 32,
                end: 35
            }).at(result.errors);
        });

        it('if registers sizes are different at measure', () => {
            let input = `qreg foo[5];creg bar[3];measure foo -> bar;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.classicalRegisterTooSmall('foo', 'bar'),
                start: 39,
                end: 42
            }).at(result.errors);
        });

        it('if a gate is used before its definition', () => {
            let input = `qreg q[4];u1(pi) q;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.notPreviouslyDefined('u1'),
                start: 10,
                end: 12
            }).at(result.errors);
        });

        it('if a creg is used as a qreg when a gate is invoked', () => {
            let input = `gate u1(lamda) q {U(0,0,lambda) q;} creg c[5]; u1(pi) c;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.expectingQuantumRegister('c'),
                start: 54,
                end: 55
            }).at(result.errors);
        });

        it('if a creg is used as a qreg when a Cx gate is invoked', () => {
            let input = `creg c[5]; CX c;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.expectingQuantumRegister('c'),
                start: 14,
                end: 15
            }).at(result.errors);
        });

        it('if a creg is used as a qreg when a barrier gate is invoked', () => {
            let input = `creg c[5]; barrier c;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.expectingQuantumRegister('c'),
                start: 19,
                end: 20
            }).at(result.errors);
        });

        it('if a creg is used as a qreg when a reset gate is invoked', () => {
            let input = `creg c[5]; reset c;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.expectingQuantumRegister('c'),
                start: 17,
                end: 18
            }).at(result.errors);
        });

        it('if an opaque gate is defined twice', () => {
            let input = `opaque a(foo) q; opaque a(foo, bar) q;`;

            let result = parser.parse(input);

            Expect.oneWarningLike({
                message: ErrorMessages.previousDefinitionOf('a'),
                start: 24,
                end: 25
            }).at(result.errors);
        });

        it('if an opaque gate is defined without arguments inside parenthesis', () => {
            let input = `opaque a() q;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: 'Expecting arguments before symbol )',
                start: 9,
                end: 10
            }).at(result.errors);
        });

        it('if a qreg is used as argument of a conditional', () => {
            let input = `qreg q[5]; if (q == 25) barrier q;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.expectingClassicalRegister('q'),
                start: 15,
                end: 16
            }).at(result.errors);
        });

        it('if a measure is applied on a non defined cbit', () => {
            let input = `qreg q[3];measure q -> a;`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.notPreviouslyDefined('a'),
                start: 23,
                end: 24
            }).at(result.errors);
        });

        it('if a comparisson uses a value too large to the register', () => {
            let input = `include "qelib1.inc";qreg q[2];creg c[1];if(c==2) h q[1];`;

            let result = parser.parse(input);

            Expect.oneErrorLike({
                message: ErrorMessages.incompatibleComparationValue('c', 1),
                start: 44,
                end: 45
            }).at(result.errors);
        });
    });
});

namespace Expect {
    export function oneErrorLike(error: Error): OneErrorLike {
        return new OneErrorLike(error);
    }

    export function oneWarningLike(error: Error): OneWarningLike {
        return new OneWarningLike(error);
    }
}

class OneErrorLike {
    expectedError: Error;

    constructor(expectedError: Error) {
        this.expectedError = expectedError;
    }

    public at(errors: ParserError[]): void {
        expect(errors)
            .to.be.an('array')
            .with.length(1);
        expect(errors[0]).to.deep.equal({
            message: this.expectedError.message,
            line: this.expectedError.line || 0,
            start: this.expectedError.start,
            end: this.expectedError.end,
            level: ParseErrorLevel.ERROR
        });
    }
}

class OneWarningLike {
    expectedError: Error;

    constructor(expectedError: Error) {
        this.expectedError = expectedError;
    }

    public at(errors: ParserError[]): void {
        expect(errors)
            .to.be.an('array')
            .with.length(1);
        expect(errors[0]).to.deep.equal({
            message: this.expectedError.message,
            line: this.expectedError.line || 0,
            start: this.expectedError.start,
            end: this.expectedError.end,
            level: ParseErrorLevel.WARNING
        });
    }
}

interface Error {
    message: string;

    start: number;

    end: number;

    line?: number;
}
