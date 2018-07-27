/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { TreeFolder } from '../src/qiskit/ast/treeFolder';
import { SymbolTableGenerator } from '../src/qiskit/ast/symbolTableGenerator';
import { Parser } from './tools/tools';

let validSource = `
from qiskit import ClassicalRegister, QuantumRegister, QuantumProgram
from qiskit import QuantumCircuit
a = q = QuantumRegister(2)
c = ClassicalRegister(2)
qc = QuantumCircuit(q, c)
qp = QuantumProgram()
qr = qp.create_quantum_register("qr", 2)
`;

describe('From a parsed and folded Qiskit code of a valid source', () => {
    let folder = new TreeFolder();
    let tree = Parser.parse(validSource);
    let statements = folder.visit(tree);

    describe('when a symbol table is generated', () => {
        let symbolTable = SymbolTableGenerator.symbolTableFor(statements);

        it('contains a QuantumRegister named a with size 2', () => {
            expect(symbolTable.lookup('a').type.getName()).toEqual('QuantumRegister');
            expect(symbolTable.lookup('a')).toHaveProperty('metadata', { size: 2 });
        });
        it('contains a QuantumRegister named q', () => {
            expect(symbolTable.lookup('q').type.getName()).toEqual('QuantumRegister');
        });
        it('contains a ClassicalRegister named c', () => {
            expect(symbolTable.lookup('c').type.getName()).toEqual('ClassicalRegister');
        });
        it('contains a QuantumCircuit named qc', () => {
            expect(symbolTable.lookup('qc').type.getName()).toEqual('QuantumCircuit');
        });
        it('contains a QuantumRegister named qr with size 2 and name "qr"', () => {
            expect(symbolTable.lookup('qr').type.getName()).toEqual('QuantumRegister');
            expect(symbolTable.lookup('qr')).toHaveProperty('metadata', { size: 2, name: '"qr"' });
        });
    });
});

let wrongSource = `
from qiskit import QuantumProgram
qp = QuantumProgram()
qr = qp.
`;

describe('From a parser and folded Qiskit code of a wrong source', () => {
    let folder = new TreeFolder();
    let tree = Parser.parse(wrongSource);
    let statements = folder.visit(tree);

    describe('when a symbol table is generated', () => {
        let symbolTable = SymbolTableGenerator.symbolTableFor(statements);

        it('contains a QuantumProgram named qp', () => {
            expect(symbolTable.lookup('qp').type.getName()).toEqual('QuantumProgram');
        });
        it('contains a QuantumProgram named qr (partial detection)', () => {
            expect(symbolTable.lookup('qr')).toBeNull();
        });
    });
});
