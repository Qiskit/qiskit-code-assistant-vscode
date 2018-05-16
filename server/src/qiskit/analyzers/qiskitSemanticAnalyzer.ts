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

import { ParseTree, AbstractParseTreeVisitor, TerminalNode } from 'antlr4ts/tree';
import { Python3Visitor } from '../antlr/Python3Visitor';
import { ANTLRErrorListener } from 'antlr4ts';
import { SymbolTable, Type } from '../../tools/symbolTable';
import { QiskitSymbolTable, VariableSymbol } from '../compiler/qiskitSymbolTable';
import { stat } from 'fs';
import { AtomContext, TrailerContext, TermContext, Testlist_star_exprContext, StmtContext, ProgramContext, Expr_stmtContext, Star_exprContext, NumberContext, StrContext } from '../antlr/Python3Parser';
import { Python3Lexer } from '../antlr/Python3Lexer';

// Initializes the symbol table and starts the process
export class QiskitSemanticAnalyzer extends AbstractParseTreeVisitor<void> implements Python3Visitor<void> {
    defaultResult() {}

    visitProgram(ctx: ProgramContext) {
        let symbolTable = QiskitSymbolTable.build();
        let statementProcessor = new StatementProcessor(symbolTable);
        ctx.stmt().forEach(statement => statement.accept(statementProcessor));
    }
}

// Checks the statement and updates the symbol table with new symbols
class StatementProcessor extends AbstractParseTreeVisitor<void> implements Python3Visitor<void> {
    constructor(private symbolTable: SymbolTable) {
        super();
    }

    defaultResult() {}

    visitExpr_stmt(ctx: Expr_stmtContext) {
        let expressionProcessor = new ExpressionProcessor();
        let expressions = ctx.testlist_star_expr().map(expression => expression.accept(expressionProcessor));

        console.log(`Detected statement ${expressions.join(', ')}`);
    }
}

// Extracts the expression with all its terms
class ExpressionProcessor extends AbstractParseTreeVisitor<Expression> implements Python3Visitor<Expression> {
    defaultResult(): Expression {
        return Expression.empty();
    }

    visitStar_expr(ctx: Star_exprContext): Expression {
        let termsProcessor = new TermsProcessor();
        let terms = termsProcessor.visit(ctx);

        return Expression.withTerms(terms);
    }
}

// Extracts all the terminals at the term
class TermsProcessor extends AbstractParseTreeVisitor<Term[]> implements Python3Visitor<Term[]> {
    private terms: Term[] = [];

    defaultResult(): Term[] {
        return this.terms;
    }

    visitTerm(ctx: TermContext): Term[] {
        let terminalSymbolsProcessor = new TerminalSymbolsProcessor();
        let terminals = terminalSymbolsProcessor.visit(ctx);
        this.terms.push(Term.withTerminals(terminals));

        return this.terms;
    }
}

class TerminalSymbolsProcessor extends AbstractParseTreeVisitor<TerminalSymbol[]> implements Python3Visitor<TerminalSymbol[]> {
    private terminals: TerminalSymbol[] = [];

    defaultResult(): TerminalSymbol[] {
        return this.terminals;
    }

    visitAtom(ctx: AtomContext): TerminalSymbol[] {
        let atomProcessor = new TerminalAtomProcessor();
        let terminal = atomProcessor.visit(ctx);
        
        this.terminals.push(terminal);

        return this.terminals;
    }

    visitTrailer(_ctx: TrailerContext): TerminalSymbol[] {
        let terminal = TerminalSymbol.empty();// ctx.text);
        this.terminals.push(terminal);

        return this.terminals;
    }
}

class TerminalAtomProcessor extends AbstractParseTreeVisitor<TerminalSymbol> implements Python3Visitor<TerminalSymbol> {
    defaultResult(): TerminalSymbol {
        return TerminalSymbol.empty();
    }

    visitTerminal(node: TerminalNode): TerminalSymbol {
        if (node.symbol.type === Python3Lexer.NAME) {
            return TerminalSymbol.asVariable(node.text);
        }

        return TerminalSymbol.empty();
    }

    visitNumber(ctx: NumberContext): TerminalSymbol {
        return TerminalSymbol.asNumber(ctx.text);
    }

    visitStr(ctx: StrContext): TerminalSymbol {
        return TerminalSymbol.asString(ctx.text);
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
    terminals: TerminalSymbol[] = [];

    static withTerminals(terminals: TerminalSymbol[]): Term {
        let entity = new Term();
        entity.terminals = terminals;

        return entity;
    }

    toString(): string { 
        return `Term(${this.terminals.join(', ')})`;
    }
}

class TerminalSymbol {
    value: string;
    type: TerminalType;
    
    static empty(): TerminalSymbol {
        return this._builder('');
    }

    static asNumber(value: string): TerminalSymbol {
        return this._builder(value, TerminalType.number);
    }

    static asString(value: string): TerminalSymbol {
        return this._builder(value, TerminalType.string);
    }

    static asVariable(value: string): TerminalSymbol {
        return this._builder(value, TerminalType.variable);
    }

    private static _builder(value: string, type?: TerminalType): TerminalSymbol {
        let entity = new TerminalSymbol();
        entity.value = value;
        entity.type = type || TerminalType.empty;

        return entity;
    }

    toString(): string { 
        return `Terminal(${this.value}<${this.type}>)`;
    }
}

enum TerminalType {
    empty = 'EMPTY',
    number = 'NUMBER',
    string = 'STRING',
    variable = 'VARIABLE'
}