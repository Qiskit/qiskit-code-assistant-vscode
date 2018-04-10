'use strict';

export class AssignmentsStack {

    private assignments: Assignment[] = [];

    newAssignmentOn(symbol: string): void {
        this.assignments.push(new Assignment(symbol));
    }

    popLastAssignment(): Assignment {
        return this.assignments.pop() || null;
    }

    setVariable(variable: string): void {
        this.applyOnLastAssignment((lastAssignment: Assignment) => {
            lastAssignment.setVariable(variable);
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

    private variable: string = null;

    private trailingMethods: string[] = [];

    constructor(private symbol: string) {}

    setVariable(variable: string): void {
        this.variable = variable;
    }

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