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
import { ArgumentSymbol, QiskitSymbolTable } from '../src/qiskit/compiler/qiskitSymbolTable';
import { SymbolTable } from '../src/tools/symbolTable';

describe('An argument symbol', () => {
    let symbolTable = QiskitSymbolTable.build();

    describe('of type string', () => {
        let argumentSymbol = new ArgumentSymbol('name', symbolTable.lookup('string'));

        it('is the same type than "a"', () => {
            expect(argumentSymbol.isSameType("'a'")).to.be.true;
        });

        it('is not the same type than 2', () => {
            expect(argumentSymbol.isSameType(2)).to.be.false;
        });
    });

    describe('of type number', () => {
        let argumentSymbol = new ArgumentSymbol('size', symbolTable.lookup('number'));

        it('is not the same type than "a"', () => {
            expect(argumentSymbol.isSameType("'a'")).to.be.false;
        });

        it('is the same type than 2', () => {
            expect(argumentSymbol.isSameType(2)).to.be.true;
        });
    });
});
