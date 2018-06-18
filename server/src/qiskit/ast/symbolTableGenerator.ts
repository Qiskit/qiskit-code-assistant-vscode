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
    Visitor,
    Statement,
    Assignment,
    Expression,
    VisitableItem,
    VariableReference,
    MethodReference,
    Float,
    Integer,
    Text
} from './types';
import { SymbolTable, Type } from '../../tools/symbolTable';
import {
    QiskitSymbolTable,
    VariableSymbol,
    ClassSymbol,
    VariableMetadata,
    MethodSymbol
} from '../compiler/qiskitSymbolTable';

export namespace SymbolTableGenerator {
    export function symbolTableFor(statements: Statement[]): SymbolTable {
        let symbolTable = QiskitSymbolTable.build();

        statements.forEach(statement => {
            let updater = new StatementSymbolTableUpdater(symbolTable);
            statement.accept(updater);
        });

        return symbolTable;
    }
}

class StatementSymbolTableUpdater implements Visitor<void> {
    constructor(private symbolTable: SymbolTable) {}

    defaultValue() {}

    visitStatement(statement: Statement) {
        if (statement.expression === null) {
            return;
        }

        let updater = new AssignmentSymbolTableUpdater(this.symbolTable);
        statement.expression.accept(updater);
    }
}

class AssignmentSymbolTableUpdater implements Visitor<MethodInvocationData> {
    constructor(private symbolTable: SymbolTable) {}

    defaultValue(): MethodInvocationData {
        return {
            type: this.symbolTable.lookup('void')
        };
    }

    visitAssignment(assignment: Assignment): MethodInvocationData {
        let variable = this.unwrapVariable(assignment.left);
        if (variable !== null && assignment.right) {
            let invocationData = assignment.right.accept(this);

            let symbol = new VariableSymbol(variable, invocationData.type, invocationData.metadata);

            this.symbolTable.define(symbol);

            return invocationData;
        }

        return this.symbolTable.lookup('void');
    }

    visitExpression(expression: Expression): MethodInvocationData {
        let lookingForTrailingType = (a: MethodInvocationData, b: VisitableItem) => {
            if (a === null) {
                return b.accept(this);
            }
            if (a.type instanceof ClassSymbol) {
                let unwrapper = new MethodCallUnwrapper(a.type, this.symbolTable);
                return b.accept(unwrapper);
            }

            return a;
        };

        return expression.terms.reduce(lookingForTrailingType, null);
    }

    visitVariableReference(reference: VariableReference): MethodInvocationData {
        return {
            type: this.theClassTypeOf(this.symbolTable.lookup(reference.value))
        };
    }

    visitMethodReference(reference: MethodReference): MethodInvocationData {
        let classSymbol = this.theClassTypeOf(this.symbolTable.lookup(reference.name));

        return {
            type: classSymbol,
            metadata: this.unwrapMetadata(classSymbol, reference)
        };
    }

    unwrapVariable(item: VisitableItem): string {
        let unwrapper = new VariableUnwrapper();
        return item.accept(unwrapper);
    }

    theClassTypeOf(currentType: Type): Type {
        if (currentType instanceof VariableSymbol) {
            return this.theClassTypeOf(currentType.type);
        }

        return currentType;
    }

    unwrapMetadata(classSymbol: Type, reference: MethodReference): VariableMetadata {
        if (classSymbol instanceof ClassSymbol) {
            let metadata: VariableMetadata = {};
            let argumentUnwrapper = new ArgumentUnwrapper();
            classSymbol.requiredArguments.forEach((arg, position) => {
                if (reference.args[position]) {
                    // TODO convert to real metadata { name: 'size' , value: 'unwrappedValue' }
                    if (arg.getName() === 'size') {
                        metadata.size = reference.args[position].accept(argumentUnwrapper);
                    }
                    if (arg.getName() === 'name') {
                        metadata.name = reference.args[position].accept(argumentUnwrapper);
                    }
                }
            });

            return metadata;
        }

        return null;
    }
}

class VariableUnwrapper implements Visitor<string> {
    defaultValue(): string {
        return null;
    }

    visitExpression(expression: Expression): string {
        return expression.terms.reduce((a: string, b: VisitableItem) => (a === null ? b.accept(this) : a), null);
    }

    visitVariableReference(variable: VariableReference): string {
        return variable.value;
    }
}

class ArgumentUnwrapper implements Visitor<any> {
    defaultValue(): any {
        return null;
    }

    visitExpression(expression: Expression): any {
        return expression.terms.reduce((a: string, b: VisitableItem) => (a === null ? b.accept(this) : a), null);
    }

    visitFloat(item: Float): any {
        return item.value;
    }

    visitInteger(item: Integer): any {
        return item.value;
    }

    visitText(item: Text): any {
        return item.value;
    }
}

class MethodCallUnwrapper implements Visitor<MethodInvocationData> {
    constructor(private currentType: ClassSymbol, private symbolTable: SymbolTable) {}

    defaultValue(): MethodInvocationData {
        return {
            type: this.symbolTable.lookup('void')
        };
    }

    visitMethodReference(reference: MethodReference): MethodInvocationData {
        let method = this.currentType.getMethods().find(method => method.name === reference.name);
        if (method) {
            return {
                type: method.type,
                metadata: this.unwrapMetadata(method, reference)
            };
        }

        return this.defaultValue();
    }

    unwrapMetadata(methodSymbol: Type, reference: MethodReference): VariableMetadata {
        if (methodSymbol instanceof MethodSymbol) {
            let metadata: VariableMetadata = {};
            let argumentUnwrapper = new ArgumentUnwrapper();
            methodSymbol.arguments.forEach((arg, position) => {
                if (reference.args[position]) {
                    // TODO convert to real metadata { name: 'size' , value: 'unwrappedValue' }
                    if (arg.getName() === 'size') {
                        metadata.size = reference.args[position].accept(argumentUnwrapper);
                    }
                    if (arg.getName() === 'name') {
                        metadata.name = reference.args[position].accept(argumentUnwrapper);
                    }
                }
            });

            return metadata;
        }

        return null;
    }
}

interface MethodInvocationData {
    type: Type;
    metadata?: VariableMetadata;
}
