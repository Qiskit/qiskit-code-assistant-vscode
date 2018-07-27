/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { QiskitParser } from '../src/qiskit/parser';
import { ErrorMessages } from '../src/qiskit/compiler/tools/errorMessages';
import { Parser } from '../src/types';

describe('A Qiskit parser', () => {
    let parser: Parser = new QiskitParser();

    describe('will end without errors', () => {
        it('when receives an empty input', () => {
            let result = parser.parse(``);
            expect(result.errors.length).toEqual(0);
        });

        it('when receives a valid Python hello world', () => {
            let result = parser.parse(`print("Hello, World!")\n`);
            expect(result.errors.length).toEqual(0);
        });
    });

    describe('will show warnings if', () => {
        it('a Qiskit element is used without its import', () => {
            let code = `q = QuantumRegister(2)\n`;
            let result = parser.parse(code);

            expect(result.errors.length).toEqual(1);
            expect(result.errors[0].message).toEqual(ErrorMessages.notPreviouslyImported('QuantumRegister'));
        });
    });
});
