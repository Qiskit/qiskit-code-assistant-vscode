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
        let expressions = ctx.testlist_star_expr().map(expression => expression.accept(expressionVisitor));

        let statement = new Statement(expressions);

        console.log(`STATEMENT => ${statement}`);
    }
}

class ExpressionVisitor extends AbstractParseTreeVisitor<Expression> implements Python3Visitor<Expression> {
    defaultResult(): Expression {
        return new Expression();
    }

    visitPower(ctx: PowerContext): Expression {
        let trailerVisitor = new TrailerVisitor();

        let expression = new Expression();
        expression.atom = ctx.atom().text;
        expression.trailing = ctx.trailer().map(trailer => trailer.accept(trailerVisitor));

        return expression;
    }
}

class TrailerVisitor extends AbstractParseTreeVisitor<Trailer> implements Python3Visitor<Trailer> {
    defaultResult(): Trailer {
        return Trailer.empty();
    }

    visitAtom(ctx: AtomContext): Trailer {
        let trailer = new Trailer();
        trailer.value = ctx.text;
        trailer.type = TrailerType.Arguments;

        return trailer;
    }

    visitTrailer(ctx: TrailerContext): Trailer {
        if (ctx.text.startsWith('(')) {
            return this.processArgumentsTrailer(ctx);
        } else if (ctx.text.startsWith('[')) {
            return this.processArrayReferenceTrailer(ctx);
        } else {
            return this.processMethodReferenceTrailer(ctx);
        }
    }

    private processArgumentsTrailer(ctx: TrailerContext): Trailer {
        if (ctx.arglist() === undefined) {
            return Trailer.empty();
        }

        let argumentVisitor = new ArgumentVisitor();

        let trailer = new Trailer();
        trailer.value = ctx.arglist().argument().map(argument => argument.accept(argumentVisitor));
        trailer.type = TrailerType.Arguments;
        
        return trailer;
    }

    private processArrayReferenceTrailer(ctx: TrailerContext): Trailer {
        let trailer = new Trailer(); 
        trailer.value = ctx.text;
        trailer.type = TrailerType.ArrayReference;

        return trailer;
    }

    private processMethodReferenceTrailer(ctx: TrailerContext): Trailer {
        let trailer = new Trailer(); 
        trailer.value = ctx.NAME().text;
        trailer.type = TrailerType.MethodCall;

        return trailer;
    }
}

class ArgumentVisitor extends AbstractParseTreeVisitor<Argument> implements Python3Visitor<Argument> {
    defaultResult(): Argument {
        return new Argument();
    }

    visitPower(ctx: PowerContext): Argument {
        let argumentTypeVisitor = new ArgumentTypeVisitor();

        let argument = new Argument();
        argument.value = ctx.text;
        argument.type = ctx.atom().accept(argumentTypeVisitor);
        
        return argument;
    }
}

class ArgumentTypeVisitor extends AbstractParseTreeVisitor<ArgumentType> implements Python3Visitor<ArgumentType> {
    defaultResult(): ArgumentType {
        return ArgumentType.VariableReference;
    }

    visitNumber(_ctx: NumberContext): ArgumentType {
        return ArgumentType.Int;
    }

    visitStr(_ctx: StrContext): ArgumentType {
        return ArgumentType.String;
    }
}

class Statement {
    constructor(private expressions: Expression[]) {}

    toString(): string {
        return `Statement { ${this.expressions.join(', ')} }`;
    }
}

class Expression {
    atom: string;
    trailing: Trailer[];

    toString(): string {
        return `Expression { ${this.atom}(${this.trailing.join(', ')}) }`;
    }
}

class Trailer {
    value: any;
    type: TrailerType;

    static empty(): Trailer {
        let emptyTrailer = new Trailer();
        emptyTrailer.value = '';
        emptyTrailer.type = TrailerType.Empty;

        return emptyTrailer;
    }

    toString(): string {
        return `Trailer { ${this.value} is ${this.type} }`;
    }
}

class Argument {
    value: string;
    type: ArgumentType;

    toString(): string { 
        return `{ ${this.value} is ${this.type} }`;
    }
}

enum TrailerType {
    Arguments = 'ARGUMENTS',
    MethodCall = 'METHOD',
    ArrayReference = 'ARRAY',
    Empty = 'EMPTY'
}

enum ArgumentType {
    Int = 'INT',
    String = 'STRING',
    VariableReference= 'VARIABLE'
}
