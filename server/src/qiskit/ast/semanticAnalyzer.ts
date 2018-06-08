/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

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
import { SymbolTable, Type, BuiltInTypeSymbol } from '../../tools/symbolTable';
import { ParserError, ParseErrorLevel } from '../../types';
import { VariableSymbol, ClassSymbol, MethodSymbol, ArgumentSymbol } from '../compiler/qiskitSymbolTable';

export namespace SemanticAnalyzer {
    export function analyze(statements: Statement[], symbolTable: SymbolTable): ParserError[] {
        let statementValidator = new StatementSemanticValidator(symbolTable);
        let validatingStatement = (a: ParserError[], b: Statement) => a.concat(b.accept(statementValidator));

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
        let visitingTerms = (a: ExpressionAnalysis, b: VisitableItem) => {
            let termValidator = new TermSemanticValidator(this.symbolTable, a);
            let currentAnalysis = b.accept(termValidator);

            return currentAnalysis;
        };
        let expressionAnalysis = expression.terms.reduce(visitingTerms, new ExpressionAnalysis());

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
        if (methodSymbol) {
            this.currentAnalysis.errors.push(...this.checkMethodArguments(method, methodSymbol));
            this.currentAnalysis.lastSymbol = methodSymbol.type;
        }

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
        return []
            .concat(this.checkArgumentsNumber(method, methodSymbol))
            .concat(this.checkArgumentsType(method, methodSymbol));
    }

    checkArgumentsNumber(method: MethodReference, methodSymbol: MethodSymbol): ParserError[] {
        let result: ParserError[] = [];

        let requiredArguments = methodSymbol.arguments.filter(arg => arg.optional === false).length;
        if (method.args.length < requiredArguments) {
            let message = `Expecting ${requiredArguments} arguments but ${method.args.length} received`;
            let error = this.warning(message, method);

            result.push(error);
        }

        return result;
    }

    checkArgumentsType(method: MethodReference, methodSymbol: MethodSymbol): ParserError[] {
        let errors: ParserError[] = [];
        methodSymbol.arguments.forEach((arg, position) => {
            if (method.args[position]) {
                let argumentValidator = new ArgumentSemanticValidator(arg, this.symbolTable);
                errors.push(...method.args[position].accept(argumentValidator));
            }
        });

        return errors;
    }

    extractMethodFromVariable(variable: VariableSymbol, method: string): MethodSymbol {
        let classSymbol = variable.type;
        if (classSymbol instanceof ClassSymbol) {
            return this.extractMethodFromClass(classSymbol, method);
        }

        return null;
    }

    extractMethodFromClass(classSymbol: ClassSymbol, method: string): MethodSymbol {
        return classSymbol.getMethods().find(symbol => symbol.name === method);
    }

    warning(message: string, item: VisitableItem): ParserError {
        return {
            line: item.line,
            start: item.start,
            end: item.end,
            message: message,
            level: ParseErrorLevel.WARNING
        };
    }
}

class ArgumentSemanticValidator implements Visitor<ParserError[]> {
    constructor(private requiredArgument: ArgumentSymbol, private symbolTable: SymbolTable) {}

    defaultValue(): ParserError[] {
        return [];
    }

    visitExpression(expression: Expression): ParserError[] {
        return expression.terms.reduce((a: ParserError[], b: VisitableItem) => a.concat(b.accept(this)), []);
    }

    visitVariableReference(variable: VariableReference): ParserError[] {
        let variableSymbol = this.symbolTable.lookup(variable.value);
        if (variableSymbol === null) {
            return [];
        }

        if (variableSymbol instanceof VariableSymbol) {
            return this.checkVariableType(variable, variableSymbol, variable.value);
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
            result.push(...this.checkVariableType(arrayReference, variableSymbol, arrayReference.variable));
            result.push(...this.checkArrayPosition(arrayReference, variableSymbol));
            return result;
        }

        return [];
    }

    checkVariableType(item: VisitableItem, variableSymbol: VariableSymbol, name: string) {
        if (variableSymbol.type !== this.requiredArgument.type) {
            let expectedType = this.requiredArgument.type.getName();

            // checks on primitive types should be avoided because this kind of variables are not properly
            // registered at the symbol table
            let symbol = this.symbolTable.lookup(expectedType);
            if (symbol === null || symbol instanceof BuiltInTypeSymbol) {
                return [];
            }

            let errorMessage = `Expecting argument of type ${expectedType}, but ${name} doesn't match it`;

            return [this.warning(errorMessage, item)];
        }

        return [];
    }

    checkArrayPosition(variable: ArrayReference, variableSymbol: VariableSymbol): ParserError[] {
        if (variableSymbol.hasSize() && variable.index >= variableSymbol.size()) {
            let message = `Position ${variable.index} is not valid at ${variable.variable}`;
            return [this.warning(message, variable)];
        }

        return [];
    }

    warning(message: string, item: VisitableItem): ParserError {
        return {
            line: item.line,
            start: item.start,
            end: item.end,
            message: message,
            level: ParseErrorLevel.WARNING
        };
    }
}

class ExpressionAnalysis {
    errors: ParserError[] = [];
    lastSymbol: Type;
}
