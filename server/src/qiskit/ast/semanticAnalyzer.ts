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
    ArrayReference,
    Block
} from './types';
import { ParserError } from '../../types';
import { VariableSymbol, ClassSymbol, MethodSymbol, ArgumentSymbol } from '../compiler/symbols';
import { ErrorBuilder } from './tools/errorBuilder';
import { SymbolTable } from '../../compiler/types';
import { Type, BuiltInTypeSymbol } from '../../compiler/symbols';

export namespace SemanticAnalyzer {
    export function analyze(codeBlock: Block, symbolTable: SymbolTable): ParserError[] {
        let statementValidator = new StatementSemanticValidator(symbolTable);
        let validatingStatement = (a: ParserError[], b: Statement) => a.concat(b.accept(statementValidator));

        return codeBlock.childs.reduce(validatingStatement, []);
    }
}

class StatementSemanticValidator implements Visitor<ParserError[]> {
    constructor(private symbolTable: SymbolTable) {}

    defaultValue(): ParserError[] {
        return [];
    }

    visitCodeBlock(block: Block): ParserError[] {
        return block.childs
            .map(innerBlock => innerBlock.accept(new StatementSemanticValidator(this.symbolTable)))
            .reduce((acc, value) => acc.concat(value), []);
    }

    visitStatement(statement: Statement): ParserError[] {
        // in partial compilations this case could happen *do not delete without thinking twice*
        if (statement.expression === null) {
            return this.defaultValue();
        }

        return statement.expression.accept(this);
    }

    visitAssignment(assignment: Assignment): ParserError[] {
        let leftErrors = assignment.left.accept(this);
        let rightErrors = assignment.right.accept(this);

        return leftErrors.concat(rightErrors);
    }

    visitExpression(expression: Expression): ParserError[] {
        let visitingTerms = (a: ExpressionAnalysis, b: VisitableItem) => {
            // in partial compilations this case could happen *do not delete without thinking twice*
            if (b === null) {
                return a;
            }

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
        this.currentAnalysis.lastSymbol = this.symbolTable.lookup(variable.value, variable.start.line);

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
            let error = ErrorBuilder.warning(message, method);

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
        return classSymbol.methods.find(symbol => symbol.name === method);
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
        let variableSymbol = this.symbolTable.lookup(variable.value, variable.start.line);
        if (variableSymbol === null) {
            return [];
        }

        if (variableSymbol instanceof VariableSymbol) {
            return this.checkVariableType(variable, variableSymbol, variable.value);
        }

        return [];
    }

    visitArrayReference(arrayReference: ArrayReference): ParserError[] {
        let variableSymbol = this.symbolTable.lookup(arrayReference.variable, arrayReference.start.line);
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
            let symbol = this.symbolTable.lookup(expectedType, item.start.line);
            if (symbol === null || symbol instanceof BuiltInTypeSymbol) {
                return [];
            }

            let errorMessage = `Expecting argument of type ${expectedType}, but ${name} doesn't match it`;

            return [ErrorBuilder.warning(errorMessage, item)];
        }

        return [];
    }

    checkArrayPosition(variable: ArrayReference, variableSymbol: VariableSymbol): ParserError[] {
        if (variableSymbol.hasSize() && variable.index >= variableSymbol.size()) {
            let message = `Position ${variable.index} is not valid at ${variable.variable}`;
            return [ErrorBuilder.warning(message, variable)];
        }

        return [];
    }
}

class ExpressionAnalysis {
    errors: ParserError[] = [];
    lastSymbol: Type;
}
