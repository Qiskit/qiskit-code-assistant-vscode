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
import { SemanticAnalyzer } from '../src/qiskit/ast/semanticAnalyzer';
import { Parser } from './tools/tools';

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

describe('From a parsed and folded Qiskit code of a valid source', () => {
    let folder = new TreeFolder();
    let tree = Parser.parse(validSource);
    let statements = folder.visit(tree);
    let symbolTable = SymbolTableGenerator.symbolTableFor(statements);

    describe('when a semantic analysis is executed', () => {
        let errors = SemanticAnalyzer.analyze(statements, symbolTable);

        it('does no contain errors', () => {
            expect(errors).toHaveLength(0);
        });
    });
});

let wrongSource = `
from qiskit import ClassicalRegister, QuantumRegister
from qiskit import QuantumCircuit, execute
q = QuantumRegister(2)
c = ClassicalRegister(2)
qc = QuantumCircuit(q, q)
qc.h(c[1])
qc.cx(q[5])
qc.measure(q, c)
job_sim = execute(qc, "local_qasm_simulator")
sim_result = job_sim.result()

`;

describe('From a parsed and folded Qiskit code of a wrong source', () => {
    let folder = new TreeFolder();
    let tree = Parser.parse(wrongSource);
    let statements = folder.visit(tree);
    let symbolTable = SymbolTableGenerator.symbolTableFor(statements);

    describe('when a semantic analysis is executed', () => {
        const expectedErrors = 3;
        let errors = SemanticAnalyzer.analyze(statements, symbolTable);

        it('does contain 3 errors', () => {
            expect(errors).toHaveLength(expectedErrors);
        });
    });
});
