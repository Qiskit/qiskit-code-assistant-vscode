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

    addArgument(argument: any): void {
        this.applyOnLastAssignment((lastAssignment: Assignment) => {
            lastAssignment.addArgument(argument);
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

    private trailingMethods: Method[] = [];

    constructor(private symbol: string) {}

    setVariable(variable: string): void {
        this.variable = variable;
    }

    addTrailingMethod(method: string): void {
        this.trailingMethods.push(new Method(method));
    }

    addArgument(argument: any): void {
        let lastMethod = this.trailingMethods.pop();
        lastMethod.addArgument(argument);
        this.trailingMethods.push(lastMethod);
    }

    getSymbol(): string {
        return this.symbol;
    }

    getVariable(): string {
        return this.variable;
    }

    getTrailingMethods(): Method[] {
        return this.trailingMethods;
    }

    hasTrailingMethods(): boolean {
        return this.trailingMethods.length > 0;
    }

}

class Method {

    private arguments: any[] = [];

    constructor(private name: string) {}

    getName(): string {
        return this.name;
    }

    addArgument(argument: any): void {
        this.arguments.push(argument);
    }

    getArguments(): any[] {
        return this.arguments;
    }

}