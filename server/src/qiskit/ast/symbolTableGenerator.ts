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

import { Visitor, Statement, Assignment, Expression, VisitableItem, VariableReference, MethodReference } from './types';
import { SymbolTable, Type } from '../../tools/symbolTable';
import { QiskitSymbolTable, VariableSymbol, ClassSymbol } from '../compiler/qiskitSymbolTable';
import { stat } from 'fs';

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
        let updater = new AssignmentSymbolTableUpdater(this.symbolTable);
        statement.expression.accept(updater);
    }
}

class AssignmentSymbolTableUpdater implements Visitor<Type> {
    constructor(private symbolTable: SymbolTable) {}

    defaultValue(): Type {
        return this.symbolTable.lookup('void');
    }

    visitAssignment(assignment: Assignment): Type {
        let variable = this.unwrapVariable(assignment.left);
        if (variable !== null) {
            let type = assignment.right.accept(this);

            let symbol = new VariableSymbol(variable, type);

            this.symbolTable.define(symbol);

            return type;
        }

        return this.symbolTable.lookup('void');
    }

    visitExpression(expression: Expression): Type {
        let lookingForTrailingType = (a: Type, b: VisitableItem) => {
            if (a === null) {
                return b.accept(this);
            }
            if (a instanceof ClassSymbol) {
                let unwrapper = new MethodCallUnwrapper(a, this.symbolTable);
                return b.accept(unwrapper);
            }

            return a;
        };

        return expression.terms.reduce(lookingForTrailingType, null);
    }

    visitVariableReference(reference: VariableReference): Type {
        return this.theClassTypeOf(this.symbolTable.lookup(reference.value));
    }

    visitMethodReference(reference: MethodReference): Type {
        return this.theClassTypeOf(this.symbolTable.lookup(reference.name));
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

class MethodCallUnwrapper implements Visitor<Type> {
    constructor(private currentType: ClassSymbol, private symbolTable: SymbolTable) {}

    defaultValue(): Type {
        return this.symbolTable.lookup('void');
    }

    visitMethodReference(reference: MethodReference): Type {
        let method = this.currentType.getMethods().find(method => method.name === reference.name);
        if (method) {
            return method.type;
        }

        return this.defaultValue();
    }
}
