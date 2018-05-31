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

import { Statement, Visitor, Assignment, Expression, VisitableItem, MethodReference, VariableReference } from './types';
import { SymbolTable, Type } from '../../tools/symbolTable';
import { ParserError, ParseErrorLevel } from '../../types';
import { VariableSymbol, ClassSymbol, MethodSymbol } from '../compiler/qiskitSymbolTable';

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
        if (methodSymbol === null) {
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

class ExpressionAnalysis {
    errors: ParserError[] = [];
    lastSymbol: Type;
}
