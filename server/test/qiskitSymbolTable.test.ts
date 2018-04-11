'use strict';

import { expect } from 'chai';
import { ArgumentSymbol, QiskitSymbolTable } from '../src/qiskit/compiler/qiskitSymbolTable'
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

    describe('of type int', () => {
        let argumentSymbol = new ArgumentSymbol('size', symbolTable.lookup('int'));

        it('is not the same type than "a"', () => {
            expect(argumentSymbol.isSameType("'a'")).to.be.false;
        });

        it('is the same type than 2', () => {
            expect(argumentSymbol.isSameType(2)).to.be.true;
        });
    });
    
});