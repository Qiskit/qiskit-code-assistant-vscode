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

import { ParserRuleContext, Token } from 'antlr4ts';
import { SymbolTable } from '../../tools/symbolTable';
import { ParserError, ParseErrorLevel } from '../../types';
import { AbstractParseTreeVisitor, TerminalNode } from 'antlr4ts/tree';
import { QasmParserV2Visitor } from '../antlrV2/QasmParserV2Visitor';
import {
    CodeContext,
    ConditionalContext,
    QubitContext,
    CbitContext,
    MeasureContext,
    QbitOrQregContext,
    BarrierGateContext
} from '../antlrv2/QasmParserV2';
import { RegisterSymbol } from '../compiler/symbolTable';
import { ErrorMessages } from './errorMessages';
import { ErrorBuilder, PositionAdapter } from './errorBuilder';

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
        if (ctx.sentences() === undefined) {
            return [];
        }

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

    visitMeasure(ctx: MeasureContext): ParserError[] {
        if (ctx._classicalRegister !== undefined && ctx._quantumRegister !== undefined) {
            this.checkQuantumRegister(ctx._quantumRegister);
            this.checkClassicalRegister(ctx._classicalRegister);
        }

        this.visitChildren(ctx);

        return this.errors;
    }

    visitBarrierGate(ctx: BarrierGateContext): ParserError[] {
        if (ctx.Id() !== undefined) {
            this.checkQuantumRegister2(ctx.Id());
        }

        this.visitChildren(ctx);

        return this.errors;
    }

    visitQbitOrQreg(ctx: QbitOrQregContext): ParserError[] {
        console.log(`Visiting QbitOrQreg with ${ctx.text}`);

        let validator = new RegisterValidator(this.symbolTable, this.errors);
        let position = PositionAdapter.fromTerminalNode(ctx.Id());

        validator.validateQuantumRegister(ctx.Id().text, position);

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
                line: id.symbol.line - 1,
                start: id.symbol.charPositionInLine,
                end: id.symbol.charPositionInLine + id.text.length,
                message: message,
                level: ParseErrorLevel.ERROR
            };
            this.errors.push(error);
        } else {
            if (symbol.type.getName() !== 'Creg') {
                let message = `Symbol ${id.text} must be a classical register to be compared.`;
                let error = {
                    line: id.symbol.line - 1,
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
                    line: id.symbol.line - 1,
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
        if (symbol === null) {
            let message = ErrorMessages.notPreviouslyDefined(id.text);
            let error = ErrorBuilder.error(message, PositionAdapter.fromTerminalNode(id));
            this.errors.push(error);

            return;
        }

        if (symbol.type.getName() === 'Qreg') {
            let register = symbol as RegisterSymbol;
            let positionValue = +position.text;

            if (positionValue >= register.size) {
                let message = ErrorMessages.indexOutOfBound(id.text, register.size);
                let error = ErrorBuilder.error(message, PositionAdapter.fromTerminalNode(id));
                this.errors.push(error);
            }
        } else {
            let message = ErrorMessages.expectingQuantumRegister(id.text);
            let error = ErrorBuilder.error(message, PositionAdapter.fromTerminalNode(id));
            this.errors.push(error);
        }
    }

    private checkCbitReference(id: TerminalNode, position: TerminalNode) {
        let symbol = this.symbolTable.lookup(id.text);
        if (symbol === null) {
            let message = `Variable ${id.text} is not previously defined.`;
            let error = {
                line: id.symbol.line - 1,
                start: id.symbol.charPositionInLine,
                end: id.symbol.charPositionInLine + id.text.length,
                message: message,
                level: ParseErrorLevel.ERROR
            };
            this.errors.push(error);

            return;
        }

        if (symbol.type.getName() === 'Creg') {
            let register = symbol as RegisterSymbol;
            let positionValue = +position.text;

            if (positionValue >= register.size) {
                let message = ErrorMessages.indexOutOfBound(id.text, register.size);
                let error = ErrorBuilder.error(message, PositionAdapter.fromTerminalNode(id));
                this.errors.push(error);
            }
        } else {
            let message = `Expecting a classical register but ${id.text} has type ${symbol.type.getName()}`;
            let error = {
                line: id.symbol.line - 1,
                start: id.symbol.charPositionInLine,
                end: id.symbol.charPositionInLine + id.text.length,
                message: message,
                level: ParseErrorLevel.ERROR
            };
            this.errors.push(error);
        }
    }

    checkQuantumRegister(token: Token) {
        let symbol = this.symbolTable.lookup(token.text);
        if (symbol === null) {
            let message = `Symbol ${token.text} is not previously defined.`;
            let error = {
                line: token.line - 1,
                start: token.charPositionInLine,
                end: token.charPositionInLine + token.text.length,
                message: message,
                level: ParseErrorLevel.ERROR
            };
            this.errors.push(error);
        } else {
            if (symbol.type.getName() !== 'Qreg') {
                let message = `Expecting quantum register at ${token.text} but it is another type.`;
                let error = {
                    line: token.line - 1,
                    start: token.charPositionInLine,
                    end: token.charPositionInLine + token.text.length,
                    message: message,
                    level: ParseErrorLevel.ERROR
                };
                this.errors.push(error);
            }
        }
    }

    checkQuantumRegister2(node: TerminalNode) {
        let symbol = this.symbolTable.lookup(node.text);
        if (symbol === null) {
            let message = ErrorMessages.notPreviouslyDefined(node.text);
            let error = ErrorBuilder.error(message, PositionAdapter.fromTerminalNode(node));
            this.errors.push(error);
        } else {
            if (symbol.type.getName() !== 'Qreg') {
                let message = ErrorMessages.expectingQuantumRegister(node.text);
                let error = ErrorBuilder.error(message, PositionAdapter.fromTerminalNode(node));
                this.errors.push(error);
            }
        }
    }

    checkClassicalRegister(token: Token) {
        let symbol = this.symbolTable.lookup(token.text);
        if (symbol === null) {
            let message = `Symbol ${token.text} is not previously defined.`;
            let error = {
                line: token.line - 1,
                start: token.charPositionInLine,
                end: token.charPositionInLine + token.text.length,
                message: message,
                level: ParseErrorLevel.ERROR
            };
            this.errors.push(error);
        } else {
            if (symbol.type.getName() !== 'Creg') {
                let message = `Expecting classical register at ${token.text} but it is another type.`;
                let error = {
                    line: token.line - 1,
                    start: token.charPositionInLine,
                    end: token.charPositionInLine + token.text.length,
                    message: message,
                    level: ParseErrorLevel.ERROR
                };
                this.errors.push(error);
            }
        }
    }
}

class RegisterValidator {
    constructor(private symbolTable: SymbolTable, private errors: ParserError[]) {}

    validateQuantumRegister(name: string, position: PositionAdapter) {
        let symbol = this.symbolTable.lookup(name);
        if (symbol === null) {
            let message = ErrorMessages.notPreviouslyDefined(name);
            let error = ErrorBuilder.error(message, position);
            this.errors.push(error);
        } else {
            if (symbol.type.getName() !== 'Qreg') {
                let message = ErrorMessages.expectingQuantumRegister(name);
                let error = ErrorBuilder.error(message, position);
                this.errors.push(error);
            }
        }
    }
}
