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

let source = `
from qiskit import ClassicalRegister, QuantumRegister
from qiskit import QuantumCircuit
a = q = QuantumRegister(2)
c = ClassicalRegister(2)
qc = QuantumCircuit(q, c)
qp = QuantumProgram()
qr = qp.create_quantum_register("qr", 2)
`;

describe('From a parser and folded QISKit code', () => {
    let folder = new TreeFolder();
    let tree = parse(source);
    let statements = folder.visit(tree);

    describe('when a symbol table is generated', () => {
        let symbolTable = SymbolTableGenerator.symbolTableFor(statements);

        it('contains a QuantumRegister named a', () => {
            expect(symbolTable.lookup('a')).to.include({ type: symbolTable.lookup('QuantumRegister') });
        });
        it('contains a QuantumRegister named q', () => {
            expect(symbolTable.lookup('q')).to.include({ type: symbolTable.lookup('QuantumRegister') });
        });
        it('contains a ClassicalRegister named c', () => {
            expect(symbolTable.lookup('c')).to.include({ type: symbolTable.lookup('ClassicalRegister') });
        });
        it('contains a QuantumCircuit named qc', () => {
            expect(symbolTable.lookup('qc')).to.include({ type: symbolTable.lookup('QuantumCircuit') });
        });
        it('contains a QuantumRegister named qr', () => {
            expect(symbolTable.lookup('qr')).to.include({ type: symbolTable.lookup('QuantumRegister') });
        });
    });
});

function parse(source: string): ParserRuleContext {
    let inputStream = new ANTLRInputStream(source);
    let lexer = new Python3Lexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new Python3Parser(tokenStream);

    return parser.program();
}
