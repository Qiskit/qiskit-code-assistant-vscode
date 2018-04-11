'use strict';

import { expect } from 'chai';
import { ArgumentsTester } from '../src/qiskit/compiler/argumentsTester';
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

        console.log(result);

        expect(result).to.has.length(2);
    });
    

});