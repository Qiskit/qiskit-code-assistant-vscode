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

        expect(assignment.getSymbol()).to.be.equal('boo');
        expect(assignment.getVariable()).to.be.equal('foo');
        expect(assignment.hasTrailingMethods()).to.be.true;
        expect(assignment.getTrailingMethods()).to.have.ordered.members(['applyBar', 'applyTutu', 'applyBoo']);
    });

    it('should store a new assignment qp = QuantumProgram()', ()  => {
        let assignmentsStack = new AssignmentsStack();

        assignmentsStack.newAssignmentOn('qp');
        assignmentsStack.setVariable('QuantumProgram');

        let assignment = assignmentsStack.popLastAssignment();

        expect(assignment.getSymbol()).to.be.equal('qp');
        expect(assignment.hasTrailingMethods()).to.be.false;
    });

});