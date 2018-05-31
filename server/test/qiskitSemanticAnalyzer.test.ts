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
import { SemanticAnalyzer } from '../src/qiskit/ast/semanticAnalyzer';

let validSource = `
from qiskit import ClassicalRegister, QuantumRegister
from qiskit import QuantumCircuit, execute
q = QuantumRegister(2)
c = ClassicalRegister(2)
qc = QuantumCircuit(q, c)
qc.h(q[0])
qc.cx(q[0], q[1])
qc.measure(q, c)
job_sim = execute(qc, "local_qasm_simulator")
sim_result = job_sim.result()
`;

describe('From a parsed and folded QISKit code of a valid source', () => {
    let folder = new TreeFolder();
    let tree = parse(validSource);
    let statements = folder.visit(tree);
    let symbolTable = SymbolTableGenerator.symbolTableFor(statements);

    describe('when a semantic analysis is executed', () => {
        let errors = SemanticAnalyzer.analyze(statements, symbolTable);

        it('does no contain errors', () => {
            expect(errors).to.be.empty;
        });
    });
});

let wrongSource = `
from qiskit import ClassicalRegister, QuantumRegister
from qiskit import QuantumCircuit, execute
q = QuantumRegister(2)
c = ClassicalRegister(2)
qc = QuantumCircuit(q, q)
qc.h(c[3])
qc.cx(q[5])
qc.measure(q, c)
job_sim = execute(qc, "local_qasm_simulator")
sim_result = job_sim.result()
`;

describe('From a parsed and folded QISKit code of a wrong source', () => {
    let folder = new TreeFolder();
    let tree = parse(wrongSource);
    let statements = folder.visit(tree);
    let symbolTable = SymbolTableGenerator.symbolTableFor(statements);

    describe('when a semantic analysis is executed', () => {
        let errors = SemanticAnalyzer.analyze(statements, symbolTable);

        it('does contain 3 errors', () => {
            expect(errors).to.be.length(3);
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
