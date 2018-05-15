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

import { ParseTree, AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { Python3Visitor } from '../antlr/Python3Visitor';
import { ANTLRErrorListener } from 'antlr4ts';
import {
    ProgramContext,
    StmtContext,
    Expr_stmtContext,
    Testlist_star_exprContext,
    NumberContext,
    TrailerContext,
    AtomContext,
    ArglistContext,
    PowerContext,
    StrContext
} from '../antlr/Python3Parser';
import { SymbolTable } from '../../tools/symbolTable';
import { QiskitSymbolTable, VariableSymbol } from '../compiler/qiskitSymbolTable';
import { stat } from 'fs';

export class QiskitStaticAnalyzer extends AbstractParseTreeVisitor<void> implements Python3Visitor<void> {
    private symbolTable: SymbolTable;

    defaultResult(): void {}

    visitProgram(ctx: ProgramContext): void {
        this.symbolTable = QiskitSymbolTable.build();
        this.visitChildren(ctx);
    }

    visitExpr_stmt(ctx: Expr_stmtContext): void {
        let expressionVisitor = new ExpressionVisitor();
        let expressions = ctx.testlist_star_expr()
            .map(expression => expression.accept(expressionVisitor));

        let statement = new Statement(expressions);

        console.log(`STATEMENT => ${statement}`);
    }
}

class ExpressionVisitor extends AbstractParseTreeVisitor<Expression> implements Python3Visitor<Expression> {
    defaultResult(): Expression {
        return new Expression('');
    }

    visitPower(ctx: PowerContext): Expression {
        return new Expression(ctx.text);
    }
}

class Statement {
    constructor(private expressions: Expression[]) {}

    toString(): string {
        return `{ terms: [ ${this.expressions.join(', ')} ] }`;
    }
}

class Expression {
    constructor(private value: string) {}

    toString(): string {
        return `{ value: ${this.value} }`;
    }
}
