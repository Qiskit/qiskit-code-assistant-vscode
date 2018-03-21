/*
  Copyright IBM Corp. 2018. All Rights Reserved.

  This code may only be used under the Apache 2.0 license found at
  http://www.apache.org/licenses/LICENSE-2.0.txt.

  Authors:
  - Yeray Darias <yeray.darias@ibm.com>
*/

import { expect } from 'chai';
import { SymbolTable, SymbolTableBuilder, VariableSymbol } from '../src/qasm/compiler/symbolTable'

describe('A symbol table', () => {

    let symbolTable: SymbolTable;

    beforeEach(() => {
        symbolTable = SymbolTableBuilder.build();
    });

    describe('after construction', () => {
        it('contains the built in types', () => {
            expect(symbolTable.lookup('CREG').name).to.be.equals('CREG');
            expect(symbolTable.lookup('QREG').name).to.be.equals('QREG');
            expect(symbolTable.lookup('INT').name).to.be.equals('INT');
            expect(symbolTable.lookup('REAL').name).to.be.equals('REAL');
        });

        it('throws an error when looking up for a symbol not defined', () => {
            expect(() => symbolTable.lookup('a')).to.throw('Not defined symbol');
        });
    });

    describe('can define a variable symbol', () => {
        it('with QREG type', () => {
            let qregSymbol = symbolTable.lookup('QREG');
            symbolTable.define(new VariableSymbol('q', qregSymbol.type));

            expect(symbolTable.lookup('q').type).to.be.equals(qregSymbol.type);
        });

        it('in a child scope', () => {
            symbolTable.push('foo');
            let qregSymbol = symbolTable.lookup('QREG');
            symbolTable.define(new VariableSymbol('q', qregSymbol.type));

            expect(symbolTable.lookup('q').type).to.be.equals(qregSymbol.type);
        });
    });

});