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

import { AbstractParseTreeVisitor, TerminalNode } from 'antlr4ts/tree';
import { Python3Visitor } from '../antlr/Python3Visitor';
import {
    ProgramContext,
    Expr_stmtContext,
    PowerContext,
    AtomContext,
    TrailerContext,
    NumberContext,
    StrContext,
    StmtContext,
    Simple_stmtContext,
    Testlist_star_exprContext
} from '../antlr/Python3Parser';
import { Python3Lexer } from '../antlr/Python3Lexer';
import {
    Statement,
    ArrayReference,
    Expression,
    Text,
    VisitableItem,
    Assignment,
    VariableReference,
    Float,
    Integer,
    MethodReference,
    Visitor
} from './types';
import { Position } from '../analyzers/types';
import { ParserRuleContext, Token } from 'antlr4ts';

export class TreeFolder extends AbstractParseTreeVisitor<Statement[]> implements Python3Visitor<Statement[]> {
    defaultResult(): Statement[] {
        return [];
    }

    visitProgram(ctx: ProgramContext): Statement[] {
        let toStatement = (statement: StmtContext) => {
            let statementFolder = new StatementFolder();
            return statement.accept(statementFolder);
        };

        return ctx.stmt().map(toStatement);
    }
}

export class StatementFolder extends AbstractParseTreeVisitor<Statement> implements Python3Visitor<Statement> {
    foldedStatement: Statement;

    defaultResult(): Statement {
        return this.foldedStatement;
    }

    visitExpr_stmt(ctx: Expr_stmtContext): Statement {
        let toExpression = (expression: Testlist_star_exprContext) => {
            let expressionFolder = new ExpressionFolder();
            return expression.accept(expressionFolder);
        };
        let creatingAssignments = (a: VisitableItem, b: VisitableItem) => (b !== null ? new Assignment(b, a) : b);

        let expression = ctx
            .testlist_star_expr()
            .map(toExpression)
            .reduceRight(creatingAssignments);

        this.foldedStatement = new Statement(expression);

        return this.foldedStatement;
    }
}

export class ExpressionFolder extends AbstractParseTreeVisitor<VisitableItem> implements Python3Visitor<VisitableItem> {
    defaultResult(): VisitableItem {
        return null;
    }

    visitPower(ctx: PowerContext): VisitableItem {
        let terminalFolder = new TerminalFolder();
        let trailerFolder = new TrailerFolder();

        let terms: VisitableItem[] = [];

        terms.push(ctx.atom().accept(terminalFolder));
        terms.push(...ctx.trailer().map(trailer => trailer.accept(trailerFolder)));

        return this.asExpressionWithFoldedTerms(terms);
    }

    asExpressionWithFoldedTerms(terms: VisitableItem[]): Expression {
        let translatingFromDisposableItem = (a: VisitableItem[], b: VisitableItem) => {
            if (b instanceof Arguments) {
                let variable = a.pop() as VariableReference;
                a.push(this.asMethodReference(variable, b));
            } else if (b instanceof ArrayIndex) {
                let variable = a.pop() as VariableReference;
                a.push(this.asArrayReference(variable, b));
            } else {
                a.push(b);
            }

            return a;
        };

        return new Expression(terms.reduce(translatingFromDisposableItem, []));
    }

    asMethodReference(variable: VariableReference, argsItem: Arguments): MethodReference {
        let position = {
            line: variable.line,
            start: variable.start,
            end: variable.end
        } as Position;

        return new MethodReference(variable.value, argsItem.args, position);
    }

    asArrayReference(variable: VariableReference, arrayIndex: ArrayIndex): ArrayReference {
        let position = {
            line: variable.line,
            start: variable.start,
            end: variable.end
        } as Position;
        let index = arrayIndex.indexes.reduce((a, b) => this.numberValue(b) || a, 0);

        return new ArrayReference(variable.value, index, position);
    }

    numberValue(item: VisitableItem) {
        console.log(`Visiting number ${item}`);

        if (item instanceof Expression) {
            return item.terms.reduce((a, b) => (b instanceof Integer ? b.value : a), 0);
        }

        return 0;
    }
}

class TrailerFolder extends AbstractParseTreeVisitor<VisitableItem> implements Python3Visitor<VisitableItem> {
    defaultResult(): VisitableItem {
        return null;
    }

    visitTrailer(ctx: TrailerContext): VisitableItem {
        if (ctx.text.startsWith('(')) {
            if (ctx.arglist() === undefined) {
                return new Arguments([], PositionFrom.context(ctx));
            }

            let expressionFolder = new ExpressionFolder();
            let args = ctx
                .arglist()
                .argument()
                .map(argument => argument.accept(expressionFolder));

            return new Arguments(args, PositionFrom.context(ctx));
        } else if (ctx.text.startsWith('[')) {
            if (ctx.subscriptlist() === undefined) {
                return new ArrayIndex([], PositionFrom.context(ctx));
            }

            let expressionFolder = new ExpressionFolder();
            let expressions = ctx
                .subscriptlist()
                .subscript()
                .map(subscript => subscript.accept(expressionFolder));

            return new ArrayIndex(expressions, PositionFrom.context(ctx));
        }

        let terminalFolder = new TerminalFolder();
        return ctx.NAME().accept(terminalFolder);
    }
}

class TerminalFolder extends AbstractParseTreeVisitor<VisitableItem> implements Python3Visitor<VisitableItem> {
    defaultResult(): VisitableItem {
        return null;
    }

    visitTerminal(node: TerminalNode): VisitableItem {
        if (node.symbol.type === Python3Lexer.NAME) {
            return new VariableReference(node.text, PositionFrom.token(node.symbol));
        }

        return null;
    }

    visitNumber(ctx: NumberContext): VisitableItem {
        if (ctx.text.includes('.')) {
            return new Float(+ctx.text, PositionFrom.context(ctx));
        } else {
            return new Integer(+ctx.text, PositionFrom.context(ctx));
        }
    }

    visitStr(ctx: StrContext): VisitableItem {
        return new Text(ctx.text, PositionFrom.context(ctx));
    }
}

namespace PositionFrom {
    export function context(ctx: ParserRuleContext): Position {
        return {
            line: ctx.start.line - 1,
            start: ctx.start.charPositionInLine,
            end: ctx.stop.charPositionInLine + 1
        };
    }

    export function token(token: Token): Position {
        return {
            line: token.line - 1,
            start: token.charPositionInLine,
            end: token.charPositionInLine + token.text.length + 1
        };
    }
}

class Arguments extends VisitableItem {
    args: VisitableItem[] = [];

    constructor(args: VisitableItem[], position: Position) {
        super();

        this.args = args;
        this.line = position.line;
        this.start = position.start;
        this.end = position.end;
    }

    accept(_visitor: Visitor) {}

    toString(): string {
        return `Arguments(${this.args.join(',')})`;
    }
}

class ArrayIndex extends VisitableItem {
    indexes: VisitableItem[] = [];

    constructor(indexes: VisitableItem[], position: Position) {
        super();

        this.indexes = indexes;
        this.line = position.line;
        this.start = position.start;
        this.end = position.end;
    }

    accept(_visitor: Visitor) {}

    toString(): string {
        return `ArrayIndex(${this.indexes.join(',')})`;
    }
}
