'use strict';

import { expect } from 'chai';
import { ArgumentsTester, ArgumentErrorBuilder } from '../src/qiskit/compiler/argumentsTester';
import { MethodCall } from '../src/qiskit/compiler/assignmentsStack';
import { QiskitSymbolTable, ClassSymbol, VariableSymbol } from '../src/qiskit/compiler/qiskitSymbolTable'
import { SymbolTable } from '../src/tools/symbolTable';

describe('An arguments tester on a QISKit grammar', () => {

    let symbolTable: SymbolTable;
    
    beforeEach(() => {
        symbolTable = QiskitSymbolTable.build();

        symbolTable.define(new VariableSymbol('qp', symbolTable.lookup('QuantumProgram')));
    });

    it('detect errors on qr = qp.create_quamtum_register(2, "qr")', () => {
        let tester = new ArgumentsTester(symbolTable);
        let call = new MethodCall('qp');
        call.addTrailingMethod('create_quantum_register');
        call.addArgument(2);
        call.addArgument('"qr"');

        let result = tester.check(call);

        expect(result).to.has.length(2);
    });

    it('detect errors on qr = qp.create_quamtum_register("qr")', () => {
        let tester = new ArgumentsTester(symbolTable);
        let call = new MethodCall('qp');
        call.addTrailingMethod('create_quantum_register');
        call.addArgument('"qr"');

        let result = tester.check(call);

        expect(result).to.be.an('array').with.length(1);
        expect(result[0]).to.be.deep.equals(ArgumentErrorBuilder.wrongArgumentsNumber(2, 1));
    });
    
    it('do not detect errors on qr = qp.create_quantum_register("qr", 2)', () => {
        let tester = new ArgumentsTester(symbolTable);
        let call = new MethodCall('qp');
        call.addTrailingMethod('create_quantum_register');
        call.addArgument('"qr"');
        call.addArgument(2);

        let result = tester.check(call);

        expect(result).to.has.length(0);
    });

});