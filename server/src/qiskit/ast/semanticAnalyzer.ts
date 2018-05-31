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

import {
    Statement,
    Visitor,
    Assignment,
    Expression,
    VisitableItem,
    MethodReference,
    VariableReference,
    ArrayReference
} from './types';
import { SymbolTable, Type } from '../../tools/symbolTable';
import { ParserError, ParseErrorLevel } from '../../types';
import { VariableSymbol, ClassSymbol, MethodSymbol, ArgumentSymbol } from '../compiler/qiskitSymbolTable';

export namespace SemanticAnalyzer {
    export function analyze(statements: Statement[], symbolTable: SymbolTable): ParserError[] {
        let statementValidator = new StatementSemanticValidator(symbolTable);
        let validatingStatement = (a: ParserError[], b: Statement) => {
            a.push(...b.accept(statementValidator));
            return a;
        };
        return statements.reduce(validatingStatement, []);
    }
}

class StatementSemanticValidator implements Visitor<ParserError[]> {
    constructor(private symbolTable: SymbolTable) {}

    defaultValue(): ParserError[] {
        return [];
    }

    visitStatement(statement: Statement): ParserError[] {
        return statement.expression.accept(this);
    }

    visitAssignment(assignment: Assignment): ParserError[] {
        let leftErrors = assignment.left.accept(this);
        let rightErrors = assignment.right.accept(this);

        return leftErrors.concat(rightErrors);
    }

    visitExpression(expression: Expression): ParserError[] {
        let expressionAnalysis = expression.terms.reduce((a: ExpressionAnalysis, b: VisitableItem) => {
            let termValidator = new TermSemanticValidator(this.symbolTable, a);
            let currentAnalysis = b.accept(termValidator);

            return currentAnalysis;
        }, new ExpressionAnalysis());

        return expressionAnalysis.errors;
    }
}

class TermSemanticValidator implements Visitor<ExpressionAnalysis> {
    constructor(private symbolTable: SymbolTable, private currentAnalysis: ExpressionAnalysis) {}

    defaultValue(): ExpressionAnalysis {
        return this.currentAnalysis;
    }

    visitVariableReference(variable: VariableReference): ExpressionAnalysis {
        this.currentAnalysis.lastSymbol = this.symbolTable.lookup(variable.value);

        return this.currentAnalysis;
    }

    visitMethodReference(method: MethodReference): ExpressionAnalysis {
        let methodSymbol = this.findMethodSymbol(method.name, this.currentAnalysis.lastSymbol);
        if (methodSymbol === null || methodSymbol === undefined) {
            return this.currentAnalysis;
        }

        this.currentAnalysis.errors.push(...this.checkMethodArguments(method, methodSymbol));
        this.currentAnalysis.lastSymbol = methodSymbol.type;

        return this.currentAnalysis;
    }

    findMethodSymbol(methodName: string, lastSymbol: Type): MethodSymbol {
        if (lastSymbol === null) {
            return null;
        }

        if (lastSymbol instanceof VariableSymbol) {
            return this.extractMethodFromVariable(lastSymbol, methodName);
        }

        if (lastSymbol instanceof ClassSymbol) {
            return this.extractMethodFromClass(lastSymbol, methodName);
        }

        return null;
    }

    checkMethodArguments(method: MethodReference, methodSymbol: MethodSymbol): ParserError[] {
        let result: ParserError[] = [];

        // if (method === undefined || methodSymbol === undefined) {
        //     return result;
        // }

        // number of arguments check
        let requiredArguments = methodSymbol.arguments.filter(arg => arg.optional === false).length;
        if (method.args.length < requiredArguments) {
            let error = {
                line: method.line,
                start: method.start,
                end: method.end,
                message: `Expecting ${requiredArguments} arguments but ${method.args.length} received`,
                level: ParseErrorLevel.WARNING
            };
            result.push(error);
        }

        // argument type
        let errors: ParserError[] = [];
        methodSymbol.arguments.forEach((arg, position) => {
            if (method.args[position]) {
                let argumentValidator = new ArgumentSemanticValidator(arg, this.symbolTable);
                errors.push(...method.args[position].accept(argumentValidator));
            }
        });
        result.push(...errors);

        // array reference arguments size

        return result;
    }

    extractMethodFromVariable(variable: VariableSymbol, method: string): MethodSymbol {
        let classSymbol = variable.type;
        if (classSymbol instanceof ClassSymbol) {
            return this.extractMethodFromClass(classSymbol, method);
        }

        return null;
    }

    extractMethodFromClass(klass: ClassSymbol, method: string): MethodSymbol {
        return klass.getMethods().find(symbol => symbol.name === method);
    }
}

class ArgumentSemanticValidator implements Visitor<ParserError[]> {
    constructor(private requiredArgument: ArgumentSymbol, private symbolTable: SymbolTable) {}

    defaultValue(): ParserError[] {
        return [];
    }

    visitExpression(expression: Expression): ParserError[] {
        return expression.terms.reduce((a: ParserError[], b: VisitableItem) => {
            a.push(...b.accept(this));
            return a;
        }, []);
    }

    visitVariableReference(variable: VariableReference): ParserError[] {
        let variableSymbol = this.symbolTable.lookup(variable.value);
        if (variableSymbol === null) {
            return [];
        }

        if (variableSymbol instanceof VariableSymbol) {
            return this.checkArgumentType(variable, variableSymbol);
        }

        return [];
    }

    visitArrayReference(arrayReference: ArrayReference): ParserError[] {
        let variableSymbol = this.symbolTable.lookup(arrayReference.variable);

        if (variableSymbol === null) {
            return [];
        }

        if (variableSymbol instanceof VariableSymbol) {
            let result = [];
            result.push(...this.checkArgumentTypev2(arrayReference, variableSymbol));
            result.push(...this.checkArrayPosition(arrayReference, variableSymbol));
            return result;
        }

        return [];
    }

    checkArgumentType(variable: VariableReference, variableSymbol: VariableSymbol): ParserError[] {
        if (variableSymbol.type !== this.requiredArgument.type) {
            let errorMessage =
                this.requiredArgument.type !== null
                    ? `Expecting argument of type ${this.requiredArgument.type.getName()}, but ${
                          variable.value
                      } doesn't match it`
                    : `${variable.value} does not match the expected type`;
            let error = {
                line: variable.line,
                start: variable.start,
                end: variable.end,
                message: errorMessage,
                level: ParseErrorLevel.WARNING
            } as ParserError;
            return [error];
        }

        return [];
    }

    checkArgumentTypev2(variable: ArrayReference, variableSymbol: VariableSymbol): ParserError[] {
        if (variableSymbol.type !== this.requiredArgument.type) {
            let errorMessage =
                this.requiredArgument.type !== null
                    ? `Expecting argument of type ${this.requiredArgument.type.getName()}, but ${
                          variable.variable
                      } doesn't match it`
                    : `${variable.variable} does not match the expected type`;
            let error = {
                line: variable.line,
                start: variable.start,
                end: variable.end,
                message: errorMessage,
                level: ParseErrorLevel.WARNING
            } as ParserError;
            return [error];
        }

        return [];
    }

    checkArrayPosition(variable: ArrayReference, variableSymbol: VariableSymbol): ParserError[] {
        if (variableSymbol.hasSize() && variable.index >= variableSymbol.size()) {
            let error = {
                line: variable.line,
                start: variable.start,
                end: variable.end,
                message: `Position ${variable.index} is not valid at ${variable.variable}`,
                level: ParseErrorLevel.WARNING
            } as ParserError;
            return [error];
        }

        return [];
    }
}

class ExpressionAnalysis {
    errors: ParserError[] = [];
    lastSymbol: Type;
}
