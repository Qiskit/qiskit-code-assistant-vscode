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
import { ANTLRInputStream, CommonTokenStream, ParserRuleContext } from 'antlr4ts';
import { Python3Lexer } from '../src/qiskit/antlr/Python3Lexer';
import { Python3Parser } from '../src/qiskit/antlr/Python3Parser';
import { TreeFolder } from '../src/qiskit/ast/treeFolder';
import { SymbolTableGenerator } from '../src/qiskit/ast/symbolTableGenerator';

let validSource = `
from qiskit import ClassicalRegister, QuantumRegister, QuantumProgram
from qiskit import QuantumCircuit
a = q = QuantumRegister(2)
c = ClassicalRegister(2)
qc = QuantumCircuit(q, c)
qp = QuantumProgram()
qr = qp.create_quantum_register("qr", 2)
`;

describe('From a parsed and folded QISKit code of a valid source', () => {
    let folder = new TreeFolder();
    let tree = parse(validSource);
    let statements = folder.visit(tree);

    describe('when a symbol table is generated', () => {
        let symbolTable = SymbolTableGenerator.symbolTableFor(statements);

        it('contains a QuantumRegister named a with size 2', () => {
            expect(symbolTable.lookup('a').type.getName()).to.be.equal('QuantumRegister');
            expect(symbolTable.lookup('a')).to.deep.include({ metadata: { size: 2 } });
        });
        it('contains a QuantumRegister named q', () => {
            expect(symbolTable.lookup('q').type.getName()).to.be.equal('QuantumRegister');
        });
        it('contains a ClassicalRegister named c', () => {
            expect(symbolTable.lookup('c').type.getName()).to.be.equal('ClassicalRegister');
        });
        it('contains a QuantumCircuit named qc', () => {
            expect(symbolTable.lookup('qc').type.getName()).to.be.equal('QuantumCircuit');
        });
        it('contains a QuantumRegister named qr with size 2 and name "qr"', () => {
            expect(symbolTable.lookup('qr').type.getName()).to.be.equal('QuantumRegister');
            expect(symbolTable.lookup('qr')).to.deep.include({ metadata: { size: 2, name: '"qr"' } });
        });
    });
});

let wrongSource = `
from qiskit import QuantumProgram
qp = QuantumProgram()
qr = qp.
`;

describe('From a parser and folded QISKit code of a wrong source', () => {
    let folder = new TreeFolder();
    let tree = parse(wrongSource);
    let statements = folder.visit(tree);

    describe('when a symbol table is generated', () => {
        let symbolTable = SymbolTableGenerator.symbolTableFor(statements);

        it('contains a QuantumProgram named qp', () => {
            expect(symbolTable.lookup('qp').type.getName()).to.be.equal('QuantumProgram');
        });
        it('contains a QuantumProgram named qr (partial detection)', () => {
            expect(symbolTable.lookup('qr')).to.be.null;
        });
    });
});

function parse(validSource: string): ParserRuleContext {
    let inputStream = new ANTLRInputStream(validSource);
    let lexer = new Python3Lexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new Python3Parser(tokenStream);

    return parser.program();
}
