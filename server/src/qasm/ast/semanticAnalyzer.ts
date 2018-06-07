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

import { ParserRuleContext } from 'antlr4ts';
import { SymbolTable } from '../../tools/symbolTable';
import { ParserError, ParseErrorLevel } from '../../types';
import { AbstractParseTreeVisitor, TerminalNode } from 'antlr4ts/tree';
import { QasmParserV2Visitor } from '../antlrV2/QasmParserV2Visitor';
import { CodeContext, ConditionalContext, QubitContext, CbitContext } from '../antlrv2/QasmParserV2';
import { RegisterSymbol } from '../compiler/symbolTable';

export namespace SemanticAnalyzer {
    export function analyze(tree: ParserRuleContext, symbolTable: SymbolTable): ParserError[] {
        let validator = new SemanticValidator(symbolTable);
        return tree.accept(validator);
    }
}

class SemanticValidator extends AbstractParseTreeVisitor<ParserError[]> implements QasmParserV2Visitor<ParserError[]> {
    constructor(private symbolTable: SymbolTable) {
        super();
    }

    defaultResult(): ParserError[] {
        return [];
    }

    visitCode(ctx: CodeContext): ParserError[] {
        let validator = new SentenceValidator(this.symbolTable);

        return ctx.sentences().accept(validator);
    }
}

class SentenceValidator extends AbstractParseTreeVisitor<ParserError[]> implements QasmParserV2Visitor<ParserError[]> {
    errors: ParserError[] = [];

    constructor(private symbolTable: SymbolTable) {
        super();
    }

    defaultResult(): ParserError[] {
        return this.errors;
    }

    visitConditional(ctx: ConditionalContext): ParserError[] {
        this.checkClassicalRegisterType(ctx.Id());
        this.checkComparationValue(ctx.Id(), ctx.Int());

        return this.errors;
    }

    visitQubit(ctx: QubitContext): ParserError[] {
        this.checkQbitReference(ctx.Id(), ctx.Int());

        return this.errors;
    }

    visitCbit(ctx: CbitContext): ParserError[] {
        this.checkCbitReference(ctx.Id(), ctx.Int());

        return this.errors;
    }

    checkClassicalRegisterType(id: TerminalNode) {
        let symbol = this.symbolTable.lookup(id.text);
        if (symbol === null) {
            let message = `Symbol ${id.text} is not previously defined.`;
            let error = {
                line: id.symbol.line,
                start: id.symbol.charPositionInLine,
                end: id.symbol.charPositionInLine + id.text.length,
                message: message,
                level: ParseErrorLevel.ERROR
            };
            this.errors.push(error);
        } else {
            if (symbol.type.getName() !== 'Creg') {
                let message = `${id.text} is not a classical register, but conditionals requires one.`;
                let error = {
                    line: id.symbol.line,
                    start: id.symbol.charPositionInLine,
                    end: id.symbol.charPositionInLine + id.text.length,
                    message: message,
                    level: ParseErrorLevel.ERROR
                };
                this.errors.push(error);
            }
        }
    }

    private checkComparationValue(id: TerminalNode, position: TerminalNode) {
        let symbol = this.symbolTable.lookup(id.text);
        if (symbol instanceof RegisterSymbol) {
            let positionValue = +position.text;
            let maximumValue = Math.pow(2, symbol.size);

            if (positionValue >= maximumValue) {
                let message = `${positionValue} is not a valid comparisson because ${id.text} is a register of size ${
                    symbol.size
                }.`;
                let error = {
                    line: id.symbol.line,
                    start: id.symbol.charPositionInLine,
                    end: id.symbol.charPositionInLine + id.text.length,
                    message: message,
                    level: ParseErrorLevel.ERROR
                };
                this.errors.push(error);
            }
        }
    }

    private checkQbitReference(id: TerminalNode, position: TerminalNode) {
        let symbol = this.symbolTable.lookup(id.text);
        if (symbol.type.getName() === 'Qreg') {
            let register = symbol as RegisterSymbol;
            let positionValue = +position.text;

            if (positionValue >= register.size) {
                let message = `Index out of bound register ${id.text} has size ${position.text}`;
                let error = {
                    line: id.symbol.line,
                    start: id.symbol.charPositionInLine,
                    end: id.symbol.charPositionInLine + id.text.length,
                    message: message,
                    level: ParseErrorLevel.ERROR
                };
                this.errors.push(error);
            }
        } else {
            let message = `Expecting a quantum register but ${id.text} has type ${symbol.type.getName()}`;
            let error = {
                line: id.symbol.line,
                start: id.symbol.charPositionInLine,
                end: id.symbol.charPositionInLine + id.text.length,
                message: message,
                level: ParseErrorLevel.ERROR
            };
            this.errors.push(error);
        }
    }

    private checkCbitReference(id: TerminalNode, position: TerminalNode) {
        let symbol = this.symbolTable.lookup(id.text);
        if (symbol.type.getName() === 'Creg') {
            let register = symbol as RegisterSymbol;
            let positionValue = +position.text;

            if (positionValue >= register.size) {
                let message = `Index out of bound register ${id.text} has size ${position.text}`;
                let error = {
                    line: id.symbol.line,
                    start: id.symbol.charPositionInLine,
                    end: id.symbol.charPositionInLine + id.text.length,
                    message: message,
                    level: ParseErrorLevel.ERROR
                };
                this.errors.push(error);
            }
        } else {
            let message = `Expecting a classical register but ${id.text} has type ${symbol.type.getName()}`;
            let error = {
                line: id.symbol.line,
                start: id.symbol.charPositionInLine,
                end: id.symbol.charPositionInLine + id.text.length,
                message: message,
                level: ParseErrorLevel.ERROR
            };
            this.errors.push(error);
        }
    }
}
