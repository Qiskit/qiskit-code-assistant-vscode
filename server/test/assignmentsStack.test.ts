'use strict';

import { expect } from 'chai';
import { AssignmentsStack } from '../src/qiskit/compiler/assignmentsStack';

describe('An assignments stack', () => {

    it('should store a new assignment boo = foo.applyBar().applyTutu().applyBoo()', () => {
        let assignmentsStack = new AssignmentsStack();

        assignmentsStack.newAssignmentOn('boo');
        assignmentsStack.setVariable('foo');
        assignmentsStack.addTrailingMethod('applyBar');
        assignmentsStack.addTrailingMethod('applyTutu');
        assignmentsStack.addTrailingMethod('applyBoo');

        let assignment = assignmentsStack.popLastAssignment();

        expect(assignment.symbol).to.be.equal('boo');
        expect(assignment.call.variable).to.be.equal('foo');
        expect(assignment.call.hasTrailingMethods()).to.be.true;
        expect(assignment.call.trailingMethods[0]).to.include({name: 'applyBar'});
        expect(assignment.call.trailingMethods[1]).to.include({name: 'applyTutu'});
        expect(assignment.call.trailingMethods[2]).to.include({name: 'applyBoo'});
    });

    it('should store a new assignment qp = QuantumProgram()', ()  => {
        let assignmentsStack = new AssignmentsStack();

        assignmentsStack.newAssignmentOn('qp');
        assignmentsStack.setVariable('QuantumProgram');

        let assignment = assignmentsStack.popLastAssignment();

        expect(assignment.symbol).to.be.equal('qp');
        expect(assignment.call.hasTrailingMethods()).to.be.false;
    });

    it('should store assignment qr = qp.create_quantum_register("qr", 2)', () => {
        let assignmentsStack = new AssignmentsStack();

        assignmentsStack.newAssignmentOn('qr');
        assignmentsStack.setVariable('qp');
        assignmentsStack.addTrailingMethod('create_quantum_register');
        assignmentsStack.addArgument('"qr"');
        assignmentsStack.addArgument(2);

        let assignment = assignmentsStack.popLastAssignment();

        expect(assignment.symbol).to.be.equal('qr');
        expect(assignment.call.variable).to.be.equal('qp');
        expect(assignment.call.hasTrailingMethods()).to.be.true;
        expect(assignment.call.trailingMethods[0].name).to.be.equal('create_quantum_register');
        expect(assignment.call.trailingMethods[0].arguments).to.include.ordered.members(['"qr"', 2]);
    });

});