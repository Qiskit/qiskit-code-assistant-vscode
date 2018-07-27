/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { SymbolTableBuilder, VariableSymbol, RegisterSymbol } from '../src/qasm/compiler/symbolTable';
import { SymbolTable } from '../src/compiler/types';

describe('A symbol table', () => {
    let symbolTable: SymbolTable;

    beforeEach(() => {
        symbolTable = SymbolTableBuilder.build();
    });

    describe('after construction', () => {
        it('contains the built in types', () => {
            expect(symbolTable.lookup('Creg').name).toEqual('Creg');
            expect(symbolTable.lookup('Qreg').name).toEqual('Qreg');
            expect(symbolTable.lookup('Int').name).toEqual('Int');
            expect(symbolTable.lookup('Real').name).toEqual('Real');
            expect(symbolTable.lookup('Gate').name).toEqual('Gate');
            expect(symbolTable.lookup('Opaque').name).toEqual('Opaque');
        });

        it('returns null if a symbol is not defined', () => {
            expect(symbolTable.lookup('a')).toBeNull();
        });
    });

    // describe('can define a variable symbol', () => {
    //     it('with QREG type', () => {
    //         let qregSymbol = symbolTable.lookup('Qreg');
    //         symbolTable.define(new VariableSymbol('q', qregSymbol.type), 0);

    //         expect(symbolTable.lookup('q').type).to.be.equals(qregSymbol.type);
    //     });

    //     it('of quantum register type', () => {
    //         let qregSymbol = symbolTable.lookup('Qreg');
    //         symbolTable.define(new RegisterSymbol('q', qregSymbol.type, 4), 0);

    //         let result = symbolTable.lookup('q') as RegisterSymbol;

    //         expect(result)
    //             .to.have.property('size')
    //             .to.be.equals(4);
    //     });

    //     it('in a child scope', () => {
    //         symbolTable.push('foo', 0);
    //         let qregSymbol = symbolTable.lookup('Qreg');
    //         symbolTable.define(new VariableSymbol('q', qregSymbol.type), 0);

    //         expect(symbolTable.lookup('q').type).to.be.equals(qregSymbol.type);
    //     });
    // });

    // describe('when discards a scope', () => {
    //     it('can no longer access to previous scope variables', () => {
    //         let gateSymbol = symbolTable.lookup('Gate');
    //         symbolTable.define(new VariableSymbol('foo', gateSymbol.type), 0);
    //         symbolTable.push('foo', 0);
    //         let qregSymbol = symbolTable.lookup('Qreg');
    //         symbolTable.define(new VariableSymbol('q', qregSymbol.type), 0);
    //         symbolTable.pop(1000);

    //         expect(symbolTable.lookup('q')).to.be.null;
    //     });
    // });

    // describe('when a previous scope defines a variable', () => {
    //     it('newer scopes return its own symbol', () => {
    //         let cregSymbol = symbolTable.lookup('Creg');
    //         symbolTable.define(new VariableSymbol('myReg', cregSymbol.type), 0);
    //         symbolTable.push('foo', 0);
    //         let qregSymbol = symbolTable.lookup('Qreg');
    //         symbolTable.define(new VariableSymbol('myReg', cregSymbol.type), 0);

    //         expect(symbolTable.lookup('myReg').type).to.be.equals(qregSymbol.type);
    //     });
    // });

    // describe('when returns the defined symbols', () => {
    //     it('does not return the built in type symbols', () => {
    //         let gateSymbol = symbolTable.lookup('Gate');
    //         symbolTable.define(new VariableSymbol('foo', gateSymbol.type), 0);
    //         symbolTable.push('foo', 0);
    //         let qregSymbol = symbolTable.lookup('Qreg');
    //         symbolTable.define(new VariableSymbol('q', qregSymbol.type), 0);

    //         expect(symbolTable.currentSymbols()).to.be.length(2);
    //         expect(symbolTable.currentSymbols().map(symbol => symbol.name))
    //             .to.include('q')
    //             .to.include('foo');
    //     });
    // });
});
