'use strict';

export class AssignmentsStack {

    private assignments: Assignment[] = [];

    newAssignmentOn(symbol: string): void {
        let assigment = new Assignment();
        assigment.symbol = symbol;

        this.assignments.push(assigment);
    }

    addLastAssignmentWithoutType(type: string): void {
        let lastAssignment = this.assignments.pop();
        if (lastAssignment && lastAssignment.type === null) {
            lastAssignment.type = type;
        }
        this.assignments.push(lastAssignment);
    }

    popLastAssignment(): Assignment {
        return this.assignments.pop() || null;
    }

}

export class Assignment {

    symbol: string = null;

    type: string = null;

}