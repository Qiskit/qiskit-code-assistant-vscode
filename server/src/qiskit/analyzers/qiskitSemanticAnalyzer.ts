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
import { ANTLRErrorListener, CommonToken } from 'antlr4ts';
import { SymbolTable, Type } from '../../tools/symbolTable';
import { QiskitSymbolTable, VariableSymbol } from '../compiler/qiskitSymbolTable';
import { stat } from 'fs';
import {
    AtomContext,
    TrailerContext,
    TermContext,
    Testlist_star_exprContext,
    StmtContext,
    ProgramContext,
    Expr_stmtContext,
    Star_exprContext,
    NumberContext,
    StrContext,
    ArglistContext,
    SubscriptlistContext,
    PowerContext
} from '../antlr/Python3Parser';
import { Python3Lexer } from '../antlr/Python3Lexer';
import { SymbolsTable } from '../../qasm/antlr/utils';

export class QiskitSemanticAnalyzerV2 extends AbstractParseTreeVisitor<void> implements Python3Visitor<void> {
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
        
        console.log('<<< power');

        return Expression.withTerms(terms);
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

// // Initializes the symbol table and starts the process
// export class QiskitSemanticAnalyzer extends AbstractParseTreeVisitor<void> implements Python3Visitor<void> {
//     defaultResult() {}

//     visitProgram(ctx: ProgramContext) {
//         let symbolTable = QiskitSymbolTable.build();
//         let statementProcessor = new StatementProcessor(symbolTable);
//         ctx.stmt().forEach(statement => statement.accept(statementProcessor));
//     }
// }

// // Checks the statement and updates the symbol table with new symbols
// class StatementProcessor extends AbstractParseTreeVisitor<void> implements Python3Visitor<void> {
//     constructor(private symbolTable: SymbolTable) {
//         super();
//     }

//     defaultResult() {}

//     visitExpr_stmt(ctx: Expr_stmtContext) {
//         let expressionProcessor = new ExpressionProcessor();
//         let expressions = ctx.testlist_star_expr().map(expression => expression.accept(expressionProcessor));

//         console.log(`Detected statement ${expressions.join(', ')}`);
//     }
// }

// // Extracts the expression with all its terms
// class ExpressionProcessor extends AbstractParseTreeVisitor<Expression> implements Python3Visitor<Expression> {
//     defaultResult(): Expression {
//         return Expression.empty();
//     }

//     visitStar_expr(ctx: Star_exprContext): Expression {
//         let termsProcessor = new TermsProcessor();
//         let terms = termsProcessor.visit(ctx);

//         return Expression.withTerms(terms);
//     }
// }

// // Extracts all the terminals at the term
// class TermsProcessor extends AbstractParseTreeVisitor<Term[]> implements Python3Visitor<Term[]> {
//     private terms: Term[] = [];

//     defaultResult(): Term[] {
//         return this.terms;
//     }

//     visitTerm(ctx: TermContext): Term[] {
//         let terminalSymbolsProcessor = new TerminalSymbolsProcessor();
//         let terminals = terminalSymbolsProcessor.visit(ctx);

//         console.log(`Processed terminals ${terminals.join(', ')}`);
//         terminals.map(terminal => {
//             console.log(`\tTerminal ${terminal}`);
//             console.log(JSON.stringify(terminal));
//         });

//         this.terms.push(Term.withTerminals(terminals));

//         return this.terms;
//     }
// }

// class TerminalSymbolsProcessor extends AbstractParseTreeVisitor<TerminalSymbol[]>
//     implements Python3Visitor<TerminalSymbol[]> {
//     private terminals: TerminalSymbol[] = [];

//     defaultResult(): TerminalSymbol[] {
//         return this.terminals;
//     }

//     visitAtom(ctx: AtomContext): TerminalSymbol[] {
//         let atomProcessor = new TerminalAtomProcessor();
//         let terminal = atomProcessor.visit(ctx);

//         this.terminals.push(terminal);

//         return this.terminals;
//     }

//     visitTrailer(ctx: TrailerContext): TerminalSymbol[] {
//         let trailerProcessor = new TerminalTrailerProcessor();
//         let terminals = trailerProcessor.visit(ctx);

//         this.terminals.push(...terminals);

//         return this.terminals;
//     }
// }

// class TerminalAtomProcessor extends AbstractParseTreeVisitor<TerminalSymbol> implements Python3Visitor<TerminalSymbol> {
//     defaultResult(): TerminalSymbol {
//         return TerminalSymbol.empty();
//     }

//     visitTerminal(node: TerminalNode): TerminalSymbol {
//         if (node.symbol.type === Python3Lexer.NAME) {
//             return TerminalSymbol.asVariable(node.text);
//         }

//         return TerminalSymbol.empty();
//     }

//     visitNumber(ctx: NumberContext): TerminalSymbol {
//         return TerminalSymbol.asNumber(ctx.text);
//     }

//     visitStr(ctx: StrContext): TerminalSymbol {
//         return TerminalSymbol.asString(ctx.text);
//     }
// }

// class TerminalTrailerProcessor extends AbstractParseTreeVisitor<TerminalSymbol[]>
//     implements Python3Visitor<TerminalSymbol[]> {
//     private terminals: TerminalSymbol[] = [];

//     defaultResult(): TerminalSymbol[] {
//         return this.terminals;
//     }

//     visitTerminal(node: TerminalNode): TerminalSymbol[] {
//         if (node.symbol.type === Python3Lexer.NAME) {
//             this.terminals.push(TerminalSymbol.asVariable(node.text));
//         }

//         return this.terminals;
//     }

//     visitArglist(ctx: ArglistContext): TerminalSymbol[] {
//         let argumentProcessor = new ArgumentProcessor();
//         let args = ctx.argument().map(arg => arg.accept(argumentProcessor));

//         this.terminals.push(TerminalSymbol.asArguments(args));

//         return this.terminals;
//     }

//     visitSubscriptlist(ctx: SubscriptlistContext): TerminalSymbol[] {
//         let argumentProcessor = new ArgumentProcessor();
//         let references = ctx.subscript().map(ref => ref.accept(argumentProcessor));

//         this.terminals.push(TerminalSymbol.asArrayDimension(references));

//         return this.terminals;
//     }
// }

// class ArgumentProcessor extends AbstractParseTreeVisitor<Term> implements Python3Visitor<Term> {
//     defaultResult(): Term {
//         return Term.empty();
//     }

//     visitTerm(ctx: TermContext): Term {
//         let terminalSymbolsProcessor = new TerminalSymbolsProcessor();
//         let terminals = terminalSymbolsProcessor.visit(ctx);

//         return Term.withTerminals(terminals);
//     }
// }

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

interface ArrayReference {
    variable: string;
    position: string;
    positionType: TermType;
}

// export class Term {
//     terminals: TerminalSymbol[] = [];

//     static empty(): Term {
//         return new Term();
//     }

//     static withTerminals(terminals: TerminalSymbol[]): Term {
//         let entity = new Term();
//         entity.terminals = terminals;

//         return entity;
//     }

//     toString(): string {
//         return `Term(${this.terminals.join(', ')})`;
//     }
// }

// export class ArrayReference {
//     variable: string;
//     position: TerminalSymbol;
// }

// export class TerminalSymbol {
//     value: any;
//     type: TerminalType;

//     static empty(): TerminalSymbol {
//         return this._builder('');
//     }

//     static asNumber(value: string): TerminalSymbol {
//         return this._builder(value, TerminalType.number);
//     }

//     static asString(value: string): TerminalSymbol {
//         return this._builder(value, TerminalType.string);
//     }

//     static asVariable(value: string): TerminalSymbol {
//         return this._builder(value, TerminalType.variable);
//     }

//     static asArguments(value: any): TerminalSymbol {
//         return this._builder(value, TerminalType.arguments);
//     }

//     static asArrayReference(value: ArrayReference): TerminalSymbol {
//         return this._builder(value, TerminalType.arrayReference);
//     }

//     static asArrayDimension(value: Term[]): TerminalSymbol {
//         return this._builder(value, TerminalType.arrayDimension);
//     }

//     private static _builder(value: any, type?: TerminalType): TerminalSymbol {
//         let entity = new TerminalSymbol();
//         entity.value = value;
//         entity.type = type || TerminalType.empty;

//         return entity;
//     }

//     toString(): string {
//         return `Terminal(${this.value} | ${this.type})`;
//     }
// }

export enum TermType {
    empty = 'EMPTY',
    number = 'NUMBER',
    string = 'STRING',
    variable = 'VARIABLE',
    arguments = 'ARGUMENTS',
    arrayDimension = 'ARRAY_DIMENSION',
    arrayReference = 'ARRAY_REFERENCE',
    expression = 'EXPRESSION'
}

// export enum TerminalType {
//     empty = 'EMPTY',
//     number = 'NUMBER',
//     string = 'STRING',
//     variable = 'VARIABLE',
//     arguments = 'ARGUMENTS',
//     arrayDimension = 'ARRAY_DIMENSION',
//     arrayReference = 'ARRAY_REFERENCE'
// }
