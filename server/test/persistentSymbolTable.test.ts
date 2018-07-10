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
import { PersistentSymbolTable, QiskitInitialScope } from '../src/qiskit/compiler/persistentSymbolTable';
import { VariableSymbol, QiskitSymbols } from '../src/qiskit/compiler/qiskitSymbolTable';

let secondLine = 2;

describe('A persistent symbol table', () => {
    let initialScope = QiskitInitialScope.create();
    let symbolTable = new PersistentSymbolTable(initialScope);

    describe('with a variable b in a global scope', () => {
        let numberB = new VariableSymbol('b', symbolTable.lookup(QiskitSymbols.number));
        symbolTable.define(numberB, secondLine);

        it('is able to recover the original declaration of b', () => {
            let result = symbolTable.lookup('b');

            expect(result.type).to.be.eq(numberB.type);
        });
    });
});
