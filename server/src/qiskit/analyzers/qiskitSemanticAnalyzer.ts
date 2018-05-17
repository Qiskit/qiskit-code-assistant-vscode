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

import { AbstractParseTreeVisitor, TerminalNode } from "antlr4ts/tree";
import { Python3Visitor } from "../antlr/Python3Visitor";
import { SymbolTable } from "../../tools/symbolTable";
import { ANTLRErrorListener, CommonToken } from "antlr4ts";
import { ProgramContext, Expr_stmtContext, PowerContext, AtomContext, TrailerContext, NumberContext, StrContext } from "../antlr/Python3Parser";
import { QiskitSymbolTable } from "../compiler/qiskitSymbolTable";
import { Python3Lexer } from "../antlr/Python3Lexer";

export class QiskitSemanticAnalyzer extends AbstractParseTreeVisitor<void> implements Python3Visitor<void> {
    private symbolTable: SymbolTable;

    constructor(private errorListener: ANTLRErrorListener<CommonToken>) {
        super();
    }

    defaultResult() {}

    visitProgram(ctx: ProgramContext) {
        console.log('>>> Visiting program');

        console.log('\tInitializing symbol table');
        this.symbolTable = QiskitSymbolTable.build();

        let statementAnalyzer = new StatementAnalyzer(this.symbolTable, this.errorListener);
        ctx.stmt().forEach(statement => statement.accept(statementAnalyzer));

        console.log('<<< program');
    }
}

class StatementAnalyzer extends AbstractParseTreeVisitor<void> implements Python3Visitor<void> {
    constructor(private symbolTable: SymbolTable, private errorListener: ANTLRErrorListener<CommonToken>) {
        super();
    }

    defaultResult() {}

    visitExpr_stmt(ctx: Expr_stmtContext) {
        console.log('>>> Visiting expr_stmt');

        let expressionAnalyzer = new ExpressionAnalyzer(this.symbolTable, this.errorListener);
        let expressions = ctx.testlist_star_expr()
            .map(expression => expression.accept(expressionAnalyzer));

        console.log(`Expressions => ${expressions.join(', ')}`);

        console.log('<<< expr_stmt');
    }
}

class ExpressionAnalyzer extends AbstractParseTreeVisitor<Expression> implements Python3Visitor<Expression> {
    constructor(private symbolTable: SymbolTable, private errorListener: ANTLRErrorListener<CommonToken>) {
        super();
    }

    defaultResult(): Expression {
        return Expression.empty();
    }

    visitPower(ctx: PowerContext): Expression {
        console.log('>>> Visiting power');

        let terms: Term[] = [];

        let atomAnalyzer = new ExpressionAtomAnalyzer(this.symbolTable, this.errorListener);
        let atom = ctx.atom().accept(atomAnalyzer);
        terms.push(atom);
        
        let trailerAnalyzer = new ExpressionTrailerAnalyzer(this.symbolTable, this.errorListener);
        let trailers = ctx.trailer()
            .map(trailer => trailer.accept(trailerAnalyzer))
            .filter(term => term.type !== TermType.empty);
        terms.push(... trailers);
        
        let reducedTerms = this.reduceArrayReferences(terms);

        return Expression.withTerms(reducedTerms);
    }

    private reduceArrayReferences(terms: Term[]): Term[] {
        if (!this.isArrayReference(terms)) {
            return terms;
        }

        let arrayReference = this.toArrayReference(terms);

        return [Term.asArrayReference(this.toArrayReference(terms))];
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
    constructor(private symbolTable: SymbolTable, private errorListener: ANTLRErrorListener<CommonToken>) {
        super();
    }

    defaultResult(): Term {
        return Term.empty();
    }

    visitAtom(ctx: AtomContext): Term {
        console.log('>>> Visiting atom');

        let termResolver = new TermResolver();
        let result = ctx.accept(termResolver);

        console.log('<<< atom');

        return result;
    }
}

class ExpressionTrailerAnalyzer extends AbstractParseTreeVisitor<Term> implements Python3Visitor<Term> {
    constructor(private symbolTable: SymbolTable, private errorListener: ANTLRErrorListener<CommonToken>) {
        super();
    }

    defaultResult(): Term {
        return Term.empty();
    }

    visitTrailer(ctx: TrailerContext): Term {
        console.log(`>>> Visiting trailer ${ctx.text}`);
        
        let termResolver = new TermResolver();
        if (ctx.text.startsWith('(')) {
            if (ctx.arglist() === undefined) {
                return Term.empty();                
            }

            let expressionAnalyzer = new ExpressionAnalyzer(this.symbolTable, this.errorListener);
            let expressions = ctx.arglist().argument().map(argument => argument.accept(expressionAnalyzer));

            return Term.asArguments(expressions);
        } else if (ctx.text.startsWith('[')) {
            if (ctx.subscriptlist() === undefined) {
                return Term.empty();
            } 

            let expressionAnalyzer = new ExpressionAnalyzer(this.symbolTable, this.errorListener);
            let expressions = ctx.subscriptlist().subscript().map(subscript => subscript.accept(expressionAnalyzer));

            return Term.asArrayDimension(expressions);
        }

        return ctx.NAME().accept(termResolver);
    }
}

class TermResolver extends AbstractParseTreeVisitor<Term> implements Python3Visitor<Term> {
    defaultResult(): Term {
        return Term.empty();
    }

    visitTerminal(node: TerminalNode): Term {
        console.log('\tTerm is terminal');

        if (node.symbol.type === Python3Lexer.NAME) {
            return Term.asVariable(node.text);
        }

        return Term.empty();
    }

    visitNumber(ctx: NumberContext): Term {
        console.log('\tTerm is number');

        return Term.asNumber(ctx.text);
    }

    visitStr(ctx: StrContext): Term {
        console.log('\tTerm is string');

        return Term.asString(ctx.text);
    }
}

class Expression {
    terms: Term[] = [];

    static empty(): Expression {
        return new Expression();
    }

    static withTerms(terms: Term[]): Expression {
        let entity = new Expression();
        entity.terms = terms;

        return entity;
    }

    toString(): string {
        return `Expression(${this.terms.join(', ')})`;
    }
}

class Term {
    value: any;
    type: TermType;

    static empty(): Term {
        return this._builder('');
    }

    static asString(value: string): Term {
        return this._builder(value, TermType.string);
    }

    static asVariable(value: string): Term {
        return this._builder(value, TermType.variable);
    }

    static asNumber(value: string): Term {
        return this._builder(value, TermType.number);
    }

    static asArguments(value: Expression[]): Term {
        return this._builder(value, TermType.arguments);
    }

    static asArrayReference(value: ArrayReference): Term {
        return this._builder(value, TermType.arrayReference);
    }

    static asArrayDimension(value: Expression[]): Term {
        return this._builder(value, TermType.arrayDimension);
    }

    static asExpression(value: Expression): Term {
        return this._builder(value, TermType.expression);
    }

    private static _builder(value: any, type?: TermType): Term {
        let entity = new Term();
        entity.value = value;
        entity.type = type || TermType.empty;

        return entity;
    }

    toString(): string {
        return `Term(${this.value} | ${this.type})`;
    }
}

class ArrayReference {
    variable: string;
    position: string;
    positionType: TermType;

    toString(): string {
        return `ArrayReference(${this.variable}[${this.position}] | ${this.positionType})`;
    }
}

enum TermType {
    empty = 'EMPTY',
    number = 'NUMBER',
    string = 'STRING',
    variable = 'VARIABLE',
    arguments = 'ARGUMENTS',
    arrayDimension = 'ARRAY_DIMENSION',
    arrayReference = 'ARRAY_REFERENCE',
    expression = 'EXPRESSION'
}
