/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { ParserRuleContext } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { QasmParserVisitor } from '../antlr/QasmParserVisitor';
import {
    CodeContext,
    ConditionalContext,
    QubitContext,
    CbitContext,
    MeasureContext,
    QbitOrQregContext,
    BarrierGateContext,
    CustomArglistContext
} from '../antlr/QasmParser';
import {
    SemanticRulesValidator,
    RegistersOfSameSizeRule,
    ExistingSymbolValidationRule,
    ClassicalRegisterTypeRule,
    ClassicalRegisterComparationRule,
    QuantumRegisterTypeRule,
    SemanticRule,
    ValidRegisterReferenceRule
} from './validations/validations';
import { PositionAdapter } from '../../tools/positionAdapter';
import { ErrorListener } from '../../tools/errorListener';
import { SymbolTable } from '../../compiler/types';

export namespace SemanticAnalyzer {
    export function analyze(tree: ParserRuleContext, symbolTable: SymbolTable, errorListener: ErrorListener) {
        let validator = new SemanticValidator(symbolTable, errorListener);
        tree.accept(validator);
    }
}

class SemanticValidator extends AbstractParseTreeVisitor<void> implements QasmParserVisitor<void> {
    constructor(private symbolTable: SymbolTable, private errorListener: ErrorListener) {
        super();
    }

    defaultResult() {}

    visitCode(ctx: CodeContext) {
        if (ctx.sentences() === undefined) {
            return;
        }

        let validator = new SentenceValidator(this.symbolTable, this.errorListener);
        ctx.sentences().accept(validator);
    }
}

class SentenceValidator extends AbstractParseTreeVisitor<void> implements QasmParserVisitor<void> {
    private rulesValidator: SemanticRulesValidator;

    constructor(symbolTable: SymbolTable, errorListener: ErrorListener) {
        super();
        this.rulesValidator = new SemanticRulesValidator(symbolTable, errorListener);
    }

    defaultResult() {}

    visitConditional(ctx: ConditionalContext) {
        let position = PositionAdapter.fromTerminalNode(ctx.Id());
        this.rulesValidator.validate([
            new ExistingSymbolValidationRule(ctx.Id().text, position),
            new ClassicalRegisterTypeRule(ctx.Id().text, position),
            new ClassicalRegisterComparationRule(ctx.Id().text, +ctx.Int().text, position)
        ]);
    }

    visitMeasure(ctx: MeasureContext) {
        if (ctx._classicalRegister !== undefined && ctx._quantumRegister !== undefined) {
            let qRegister = ctx._quantumRegister.text;
            let qRegisterPosition = PositionAdapter.fromToken(ctx._quantumRegister);
            let cRegister = ctx._classicalRegister.text;
            let cRegisterPosition = PositionAdapter.fromToken(ctx._classicalRegister);

            this.rulesValidator.validate([
                new ExistingSymbolValidationRule(qRegister, qRegisterPosition),
                new QuantumRegisterTypeRule(qRegister, qRegisterPosition),
                new ExistingSymbolValidationRule(cRegister, cRegisterPosition),
                new ClassicalRegisterTypeRule(cRegister, cRegisterPosition),
                new RegistersOfSameSizeRule(qRegister, cRegister, cRegisterPosition)
            ]);
        }

        this.visitChildren(ctx);
    }

    visitBarrierGate(ctx: BarrierGateContext) {
        if (ctx.Id() !== undefined) {
            let position = PositionAdapter.fromTerminalNode(ctx.Id());

            this.rulesValidator.validate([
                new ExistingSymbolValidationRule(ctx.Id().text, position),
                new QuantumRegisterTypeRule(ctx.Id().text, position)
            ]);
        }

        this.visitChildren(ctx);
    }

    visitCustomArglist(ctx: CustomArglistContext) {
        if (ctx._gate !== undefined) {
            let position = PositionAdapter.fromToken(ctx._gate);

            this.rulesValidator.validate([new ExistingSymbolValidationRule(ctx._gate.text, position)]);
        }

        this.visitChildren(ctx);
    }

    visitQbitOrQreg(ctx: QbitOrQregContext) {
        let rules: SemanticRule[] = [];
        let position = PositionAdapter.fromTerminalNode(ctx.Id());

        rules.push(new ExistingSymbolValidationRule(ctx.Id().text, position));
        rules.push(new QuantumRegisterTypeRule(ctx.Id().text, position));

        if (ctx.Int()) {
            rules.push(new ValidRegisterReferenceRule(ctx.Id().text, +ctx.Int().text, position));
        }

        this.rulesValidator.validate(rules);
    }

    visitQubit(ctx: QubitContext) {
        let position = PositionAdapter.fromTerminalNode(ctx.Id());

        this.rulesValidator.validate([
            new ExistingSymbolValidationRule(ctx.Id().text, position),
            new QuantumRegisterTypeRule(ctx.Id().text, position),
            new ValidRegisterReferenceRule(ctx.Id().text, +ctx.Int().text, position)
        ]);
    }

    visitCbit(ctx: CbitContext) {
        let position = PositionAdapter.fromTerminalNode(ctx.Id());

        this.rulesValidator.validate([
            new ExistingSymbolValidationRule(ctx.Id().text, position),
            new ClassicalRegisterTypeRule(ctx.Id().text, position),
            new ValidRegisterReferenceRule(ctx.Id().text, +ctx.Int().text, position)
        ]);
    }
}
