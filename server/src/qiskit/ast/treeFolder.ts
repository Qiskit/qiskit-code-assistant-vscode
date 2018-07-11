/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { AbstractParseTreeVisitor, TerminalNode } from 'antlr4ts/tree';
import { Python3Visitor } from '../antlr/Python3Visitor';
import {
    ProgramContext,
    Expr_stmtContext,
    PowerContext,
    TrailerContext,
    NumberContext,
    StrContext,
    StmtContext,
    Testlist_star_exprContext,
    DictorsetmakerContext,
    Simple_stmtContext,
    Compound_stmtContext,
    SuiteContext
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
    Visitor,
    QiskitBoolean,
    Dictionary,
    Block,
    CodeBlock,
    Position
} from './types';
import { ParserRuleContext, Token } from 'antlr4ts';
import { QLogger } from '../../logger';

export class TreeFolder extends AbstractParseTreeVisitor<Block> implements Python3Visitor<Block> {
    defaultResult(): Block {
        return new CodeBlock();
    }

    visitProgram(ctx: ProgramContext): Block {
        let toStatement = (statement: StmtContext) => statement.accept(new StatementFolder());
        let notUndefinedStatements = (block: Block) => block !== undefined;

        let innerBlocks = ctx
            .stmt()
            .map(toStatement)
            .filter(notUndefinedStatements);

        return new CodeBlock(innerBlocks);
    }
}

export class StatementFolder extends AbstractParseTreeVisitor<Block> implements Python3Visitor<Block> {
    defaultResult(): Block {
        return undefined;
    }

    visitSimple_stmt(ctx: Simple_stmtContext): Block {
        return ctx.accept(new ExpressionStatementFolder());
    }

    visitCompound_stmt(ctx: Compound_stmtContext): Block {
        let innerBlocks = ctx.accept(new CompoundStatementFolder());

        let result = new CodeBlock(innerBlocks);
        result.start = {
            line: ctx.start.line,
            column: ctx.start.charPositionInLine
        };
        result.end = {
            line: ctx.stop.line,
            column: ctx.stop.charPositionInLine
        };

        return result;
    }
}

export class CompoundStatementFolder extends AbstractParseTreeVisitor<Block[]> implements Python3Visitor<Block[]> {
    defaultResult(): Block[] {
        return [];
    }

    visitSuite(ctx: SuiteContext): Block[] {
        let toStatement = (statement: StmtContext) => statement.accept(new StatementFolder());
        let notUndefinedStatements = (block: Block) => block !== undefined;

        return ctx
            .stmt()
            .map(toStatement)
            .filter(notUndefinedStatements);
    }
}

export class ExpressionStatementFolder extends AbstractParseTreeVisitor<Statement>
    implements Python3Visitor<Statement> {
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
        return new MethodReference(variable.value, argsItem.args, variable.start, variable.end);
    }

    asArrayReference(variable: VariableReference, arrayIndex: ArrayIndex): ArrayReference {
        let index = arrayIndex.indexes.reduce((a, b) => this.numberValue(b) || a, 0);

        return new ArrayReference(variable.value, index, variable.start, variable.end);
    }

    numberValue(item: VisitableItem) {
        QLogger.debug(`Visiting number ${item}`, this);

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
        let start = PositionCalc.startContext(ctx);
        let end = PositionCalc.endContext(ctx);

        if (ctx.text.startsWith('(')) {
            if (ctx.arglist() === undefined) {
                return new Arguments([], start, end);
            }

            let expressionFolder = new ExpressionFolder();
            let args = ctx
                .arglist()
                .argument()
                .map(argument => argument.accept(expressionFolder));

            return new Arguments(args, start, end);
        } else if (ctx.text.startsWith('[')) {
            if (ctx.subscriptlist() === undefined) {
                return new ArrayIndex([], start, end);
            }

            let expressionFolder = new ExpressionFolder();
            let expressions = ctx
                .subscriptlist()
                .subscript()
                .map(subscript => subscript.accept(expressionFolder));

            return new ArrayIndex(expressions, start, end);
        }

        let terminalFolder = new TerminalFolder();
        return ctx.NAME().accept(terminalFolder);
    }
}

class TerminalFolder extends AbstractParseTreeVisitor<VisitableItem> implements Python3Visitor<VisitableItem> {
    private result: VisitableItem = null;

    defaultResult(): VisitableItem {
        return this.result;
    }

    visitTerminal(node: TerminalNode): VisitableItem {
        let start = PositionCalc.startToken(node.symbol);
        let end = PositionCalc.endToken(node.symbol);

        switch (node.symbol.type) {
            case Python3Lexer.NAME:
                return new VariableReference(node.text, start, end);
            case Python3Lexer.TRUE:
                return new QiskitBoolean(true, start, end);
            case Python3Lexer.FALSE:
                return new QiskitBoolean(false, start, end);
            default:
                return this.result;
        }
    }

    visitDictorsetmaker(ctx: DictorsetmakerContext): VisitableItem {
        let start = PositionCalc.startContext(ctx);
        let end = PositionCalc.endContext(ctx);

        this.result = new Dictionary(start, end);

        return this.result;
    }

    visitNumber(ctx: NumberContext): VisitableItem {
        let start = PositionCalc.startContext(ctx);
        let end = PositionCalc.endContext(ctx);

        if (ctx.text.includes('.')) {
            return new Float(+ctx.text, start, end);
        } else {
            return new Integer(+ctx.text, start, end);
        }
    }

    visitStr(ctx: StrContext): VisitableItem {
        let start = PositionCalc.startContext(ctx);
        let end = PositionCalc.endContext(ctx);

        return new Text(ctx.text, start, end);
    }
}

class Arguments extends VisitableItem {
    args: VisitableItem[] = [];

    constructor(args: VisitableItem[], start: Position, end: Position) {
        super();

        this.args = args;
        this.start = start;
        this.end = end;
    }

    accept<T>(_visitor: Visitor<T>): T {
        return null;
    }

    toString(): string {
        return `Arguments(${this.args.join(',')})`;
    }
}

class ArrayIndex extends VisitableItem {
    indexes: VisitableItem[] = [];

    constructor(indexes: VisitableItem[], start: Position, end: Position) {
        super();

        this.indexes = indexes;
        this.start = start;
        this.end = end;
    }

    accept<T>(_visitor: Visitor<T>): T {
        return null;
    }

    toString(): string {
        return `ArrayIndex(${this.indexes.join(',')})`;
    }
}

namespace PositionCalc {
    export function startContext(ctx: ParserRuleContext): Position {
        return {
            line: ctx.start.line - 1,
            column: ctx.start.charPositionInLine
        };
    }

    export function endContext(ctx: ParserRuleContext): Position {
        return {
            line: ctx.stop.line - 1,
            column: ctx.stop.charPositionInLine
        };
    }

    export function startToken(token: Token): Position {
        return {
            line: token.line - 1,
            column: token.charPositionInLine
        };
    }

    export function endToken(token: Token): Position {
        return {
            line: token.line - 1,
            column: token.charPositionInLine + token.text.length + 1
        };
    }
}
