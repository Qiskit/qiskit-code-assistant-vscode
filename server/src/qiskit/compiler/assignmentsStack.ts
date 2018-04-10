'use strict';

export class AssignmentsStack {

    private assignments: Assignment[] = [];

    newAssignmentOn(symbol: string): void {
        let assigment = new Assignment();
        assigment.symbol = symbol;

        this.assignments.push(assigment);
    }

    // DEPRECATED
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

    // New methods -----------------------------------------------

    setVariable(variable: string): void {
        this.applyOnLastAssignment((lastAssignment: Assignment) => {
            lastAssignment.variable = variable;
        });
    }

    addTrailingMethod(method: string): void {
        this.applyOnLastAssignment((lastAssignment: Assignment) => {
            lastAssignment.addTrailingMethod(method);
        });
    }

    private applyOnLastAssignment(f: (lastAssignment: Assignment) => void): void {
        let lastAssignment = this.assignments.pop();
        if (lastAssignment) {
            f(lastAssignment);
        }
        this.assignments.push(lastAssignment);
    }

}

export class Assignment {

    symbol: string = null;

    variable: string = null;

    trailingMethods: string[] = [];

    // DEPRECATED
    type: string = null;

    addTrailingMethod(method: string): void {
        this.trailingMethods.push(method);
    }

    getSymbol(): string {
        return this.symbol;
    }

    getVariable(): string {
        return this.variable;
    }

    getTrailingMethods(): string[] {
        return this.trailingMethods;
    }

    hasTrailingMethods(): boolean {
        return this.trailingMethods.length > 0;
    }

}