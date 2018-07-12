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
import { QiskitSymbolTableBuilder } from '../src/qiskit/compiler/qiskitSymbolTableBuilder';
import { SymbolTable } from '../src/compiler/types';
import { VariableSymbol, QiskitSymbols } from '../src/qiskit/compiler/symbols';

let secondLine = 2;
let thirdLine = 3;
let fithLine = 5;
let sixthLine = 6;
let seventhLine = 7;

describe('A persistent symbol table', () => {
    describe('with a variable b in a global scope', () => {
        let symbolTable: SymbolTable;

        beforeEach(() => {
            symbolTable = QiskitSymbolTableBuilder.create();
            let numberB = new VariableSymbol('b', symbolTable.lookup(QiskitSymbols.number));
            symbolTable.define(numberB, secondLine);
        });

        it('is able to recover the original declaration of b as a number', () => {
            let result = symbolTable.lookup('b');

            expect(result.type).to.be.eq(symbolTable.lookup(QiskitSymbols.number));
        });

        it('is able to recover the last redefinition of b as a string', () => {
            let stringB = new VariableSymbol('b', symbolTable.lookup(QiskitSymbols.string));
            symbolTable.define(stringB, thirdLine);

            let result = symbolTable.lookup('b');

            expect(result.type).to.be.eq(stringB.type);
        });

        it('is able to recover a previous definition of b as a number', () => {
            let stringB = new VariableSymbol('b', symbolTable.lookup(QiskitSymbols.string));
            symbolTable.define(stringB, thirdLine);

            let result = symbolTable.lookup('b', thirdLine);

            expect(result.type).to.be.eq(symbolTable.lookup(QiskitSymbols.number));
        });
    });

    describe('with a variable c in a local scope', () => {
        let symbolTable = QiskitSymbolTableBuilder.create();
        let numberB = new VariableSymbol('b', symbolTable.lookup(QiskitSymbols.number));
        symbolTable.define(numberB, secondLine);
        symbolTable.push('new scope', thirdLine);
        let stringC = new VariableSymbol('c', symbolTable.lookup(QiskitSymbols.string));
        symbolTable.define(stringC, fithLine);
        symbolTable.pop(seventhLine);

        it('is not able to recover the definition of c at the global scope', () => {
            let result = symbolTable.lookup('c');

            expect(result).to.be.null;
        });

        it('is able to recover the definition of c even with the scope closed', () => {
            let result = symbolTable.lookup('c', sixthLine);

            expect(result.type).to.be.eq(stringC.type);
        });
    });

    describe('currently in a local scope', () => {
        let symbolTable = QiskitSymbolTableBuilder.create();
        let numberB = new VariableSymbol('b', symbolTable.lookup(QiskitSymbols.number));
        symbolTable.define(numberB, secondLine);
        symbolTable.push('new scope', thirdLine);

        it('should recover parent scope symbols', () => {
            let result = symbolTable.lookup('b');

            expect(result.type).to.be.eq(numberB.type);
        });
    });
});
