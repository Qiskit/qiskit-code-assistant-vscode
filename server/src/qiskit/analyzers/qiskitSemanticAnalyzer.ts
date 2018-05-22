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
import { SymbolTable } from '../../tools/symbolTable';
import {
    ProgramContext,
    Expr_stmtContext,
    PowerContext,
    AtomContext,
    TrailerContext,
    NumberContext,
    StrContext,
    StmtContext
} from '../antlr/Python3Parser';
import { QiskitSymbolTable } from '../compiler/qiskitSymbolTable';
import { Python3Lexer } from '../antlr/Python3Lexer';
import { StatementValidator } from './statementValidator';
import { Expression, Term, TermType, ArrayReference, Position, Statement } from './types';
import { ErrorListener } from '../parser';
import { CommonToken, ParserRuleContext, Token } from 'antlr4ts';

export class QiskitSemanticAnalyzer extends AbstractParseTreeVisitor<SymbolTable>
    implements Python3Visitor<SymbolTable> {
    private symbolTable: SymbolTable;
    private errorListener: ErrorListener;

    constructor(errorListener?: ErrorListener) {
        super();

        this.errorListener = errorListener || new ErrorListener();
    }

    defaultResult(): SymbolTable {
        return QiskitSymbolTable.build();
    }

    visitProgram(ctx: ProgramContext): SymbolTable {
        this.symbolTable = QiskitSymbolTable.build();

        return this.visitChildren(ctx);
    }

    visitExpr_stmt(ctx: Expr_stmtContext): SymbolTable {
        let expressionAnalyzer = new ExpressionAnalyzer();
        let expressions = ctx.testlist_star_expr().map(expression => expression.accept(expressionAnalyzer));
        let statement = Statement.withExpressions(expressions);

        let statementValidator = new StatementValidator(this.symbolTable, this.errorListener);
        statementValidator.validate(statement);

        return this.symbolTable;
    }
}

class ExpressionAnalyzer extends AbstractParseTreeVisitor<Expression> implements Python3Visitor<Expression> {
    defaultResult(): Expression {
        return Expression.empty();
    }

    visitPower(ctx: PowerContext): Expression {
        let terms: Term[] = [];

        let atomAnalyzer = new ExpressionAtomAnalyzer();
        let atom = ctx.atom().accept(atomAnalyzer);
        terms.push(atom);

        let trailerAnalyzer = new ExpressionTrailerAnalyzer();
        let trailers = ctx
            .trailer()
            .map(trailer => trailer.accept(trailerAnalyzer))
            .filter(term => term.type !== TermType.empty);
        terms.push(...trailers);

        let reducedTerms = this.reduceArrayReferences(terms);

        return Expression.withTerms(reducedTerms);
    }

    private reduceArrayReferences(terms: Term[]): Term[] {
        if (!this.isArrayReference(terms)) {
            return terms;
        }

        let arrayReference = this.toArrayReference(terms);

        let position = {
            line: terms[0].line,
            start: terms[0].start,
            end: terms[terms.length - 1].end
        } as Position;
        return [Term.asArrayReference(this.toArrayReference(terms), position)];
    }

    private isArrayReference(terms: Term[]): boolean {
        if (terms.length !== 2) {
            return false;
        }

        if (terms[0].type !== TermType.variable) {
            return false;
        }

        if (terms[1].type !== TermType.arrayDimension) {
            return false;
        }

        return true;
    }

    private toArrayReference(terms: Term[]): ArrayReference {
        let instance = new ArrayReference();
        instance.variable = terms[0].value;

        let arrayDimension = terms[1].value[0] as Expression;
        instance.position = arrayDimension.terms[0].value;
        instance.positionType = arrayDimension.terms[0].type;

        return instance;
    }
}

class ExpressionAtomAnalyzer extends AbstractParseTreeVisitor<Term> implements Python3Visitor<Term> {
    defaultResult(): Term {
        return Term.empty();
    }

    visitAtom(ctx: AtomContext): Term {
        let termResolver = new TermResolver();

        return ctx.accept(termResolver);
    }
}

class ExpressionTrailerAnalyzer extends AbstractParseTreeVisitor<Term> implements Python3Visitor<Term> {
    defaultResult(): Term {
        return Term.empty();
    }

    visitTrailer(ctx: TrailerContext): Term {
        if (ctx.text.startsWith('(')) {
            if (ctx.arglist() === undefined) {
                return Term.emptyArguments(PositionFrom.context(ctx));
            }

            let expressionAnalyzer = new ExpressionAnalyzer();
            let expressions = ctx
                .arglist()
                .argument()
                .map(argument => argument.accept(expressionAnalyzer));

            return Term.asArguments(expressions, PositionFrom.context(ctx));
        } else if (ctx.text.startsWith('[')) {
            if (ctx.subscriptlist() === undefined) {
                return Term.empty();
            }

            let expressionAnalyzer = new ExpressionAnalyzer();
            let expressions = ctx
                .subscriptlist()
                .subscript()
                .map(subscript => subscript.accept(expressionAnalyzer));

            return Term.asArrayDimension(expressions, PositionFrom.context(ctx));
        }

        let termResolver = new TermResolver();
        return ctx.NAME().accept(termResolver);
    }
}

class TermResolver extends AbstractParseTreeVisitor<Term> implements Python3Visitor<Term> {
    defaultResult(): Term {
        return Term.empty();
    }

    visitTerminal(node: TerminalNode): Term {
        if (node.symbol.type === Python3Lexer.NAME) {
            return Term.asVariable(node.text, PositionFrom.token(node.symbol));
        }

        return Term.empty();
    }

    visitNumber(ctx: NumberContext): Term {
        return Term.asNumber(ctx.text, PositionFrom.context(ctx));
    }

    visitStr(ctx: StrContext): Term {
        return Term.asString(ctx.text, PositionFrom.context(ctx));
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
