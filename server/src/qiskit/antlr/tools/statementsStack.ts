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

import { MethodCall } from "./methodCall";
import { Token } from "antlr4ts";
import { Type } from "../../../tools/symbolTable";

export class StatementsStack {

    stack: Statement[] = [];

    push(): void {
        this.stack.push(new Statement());
    }

    pop(): Statement {
        return this.stack.pop();
    }

    last(): Statement {
        let result: Statement;
        this.applyOnLastStatement((statement) => result = statement);

        return result;
    }

    addVariable(variable: Token): void {
        this.applyOnLastStatement((statement) => statement.addVariable(variable));
    }

    addTrailingMethod(method: Token): void {
        this.applyOnLastStatement((statement) => statement.addTrailingMethod(method));
    }

    addArgument(argument: Token, type: Type): void {
        this.applyOnLastStatement((statement) => statement.addArgument(argument, type));
    }

    startAssignation(): void {
        this.applyOnLastStatement((statement) => statement.startAssignation());
    }

    private applyOnLastStatement(f: (lastStatement: Statement) => void): void {
        let lastAssignment = this.stack.pop();
        if (lastAssignment) {
            f(lastAssignment);
        }
        this.stack.push(lastAssignment);
    }

}

export class Statement {

    private onRightSide = false;

    leftSide: MethodCall = null;

    rightSide: MethodCall = null;

    startAssignation(): void {
        this.onRightSide = true;
    }

    addVariable(variable: Token): void {
        if (this.onRightSide) {
            this.rightSide = new MethodCall(variable);
        } else {
            this.leftSide = new MethodCall(variable);
        }
    }

    addTrailingMethod(method: Token): void {
        this.currentSide().addTrailingMethod(method);
    }

    addArgument(argument: Token, type: Type): void {
        this.currentSide().addArgument(argument, type);
    }

    toString(): string {
        return `{ leftSide: ${this.leftSide}, rightSide: ${this.rightSide} }`;
    }

    private currentSide(): MethodCall {
        if (this.onRightSide) {
            return this.rightSide;
        }

        return this.leftSide;
    }

}