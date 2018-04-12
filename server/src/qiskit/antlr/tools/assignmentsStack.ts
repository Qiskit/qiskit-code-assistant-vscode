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

import { Token } from "antlr4ts";
import { Type } from "../../../tools/symbolTable";

export class AssignmentsStack {

    assignments: Assignment[] = [];

    newAssignmentOn(symbol: Token): void {
        this.assignments.push(new Assignment(symbol));
    }

    popLastAssignment(): Assignment {
        return this.assignments.pop();
    }

    setVariable(variable: Token): void {
        this.applyOnLastAssignment((assignment) => {
            assignment.call = new MethodCall(variable);
        });
    }

    addTrailingMethod(methodName: Token): void {
        this.applyOnLastAssignment((assignment) => {
            assignment.call.addTrailingMethod(methodName);
        });
    }

    addArgument(argument: Token, type: Type): void {
        this.applyOnLastAssignment((assignment) => {
            assignment.call.addArgument(argument, type);
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

    call: MethodCall;

    constructor(public symbol: Token) {}

}

export class MethodCall {

    trailingMethods: Method[] = [];

    constructor(public variable: Token) {}

    addTrailingMethod(methodName: Token): void {
        this.trailingMethods.push(new Method(methodName));
    }

    addArgument(argument: Token, type: Type): void {
        let lastTrailingMethod = this.trailingMethods.pop();
        lastTrailingMethod.addArgument(argument, type);
        this.trailingMethods.push(lastTrailingMethod);
    }

    hasTrailingMethods(): boolean {
        return this.trailingMethods.length > 0;
    }

}

export class Method {

    arguments: Argument[] = [];

    constructor(public methodName: Token) {}

    addArgument(token: Token, type: Type) {
        this.arguments.push(new Argument(token, type));
    }

    hasArguments(): boolean {
        return this.arguments.length > 0;
    }

}

export class Argument {

    constructor(public token: Token, public type: Type) {}

}
