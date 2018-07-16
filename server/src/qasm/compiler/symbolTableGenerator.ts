/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import {
    QregDefinitionContext,
    CregDefinitionContext,
    GateDefinitionContext,
    OpaqueDefinitionContext,
    IncludeLibraryContext
} from '../antlr/QasmParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { QasmParserVisitor } from '../antlr/QasmParserVisitor';
import { SymbolTableBuilder, RegisterSymbol, VariableSymbol } from './symbolTable';
import path = require('path');
import fs = require('fs');
import { ParserRuleContext } from 'antlr4ts';
import { QASMSyntacticParser } from './qasmSyntacticParser';
import { PreviousDefinitionValidation } from './validations/validations';
import { PositionAdapter } from '../../tools/positionAdapter';
import { ErrorListener } from '../../tools/errorListener';
import { SymbolTable } from '../../compiler/types';

export namespace SymbolTableGenerator {
    export function symbolTableFor(tree: ParserRuleContext, _errorListener?: ErrorListener): SymbolTable {
        let symbolTable = SymbolTableBuilder.build();

        let errorListener = _errorListener || new ErrorListener();
        let matcher = new DefinitionMatcher(symbolTable, errorListener);
        tree.accept(matcher);

        return symbolTable;
    }
}

class DefinitionMatcher extends AbstractParseTreeVisitor<void> implements QasmParserVisitor<void> {
    private previousDefinitionValidation: PreviousDefinitionValidation;

    constructor(private symbolTable: SymbolTable, private errorListener: ErrorListener) {
        super();
        this.previousDefinitionValidation = new PreviousDefinitionValidation(this.symbolTable, this.errorListener);
    }

    defaultResult() {}

    visitIncludeLibrary(ctx: IncludeLibraryContext) {
        let input = this.getLibraryContent(ctx.Library().text);
        let tree = QASMSyntacticParser.parse(input);

        let symbolTable = SymbolTableGenerator.symbolTableFor(tree, this.errorListener);
        this.symbolTable.mergeWith(symbolTable.currentScope);

        this.visitChildren(ctx);
    }

    visitQregDefinition(ctx: QregDefinitionContext) {
        this.previousDefinitionValidation.apply(ctx.Id().text, PositionAdapter.fromTerminalNode(ctx.Id()));

        let registerName = ctx.Id().text;
        let registerType = this.symbolTable.lookup('Qreg');
        let size = +ctx.dimension().text;
        let register = new RegisterSymbol(registerName, registerType, size);

        this.symbolTable.define(register, ctx.start.line);
    }

    visitCregDefinition(ctx: CregDefinitionContext) {
        this.previousDefinitionValidation.apply(ctx.Id().text, PositionAdapter.fromTerminalNode(ctx.Id()));

        let registerName = ctx.Id().text;
        let registerType = this.symbolTable.lookup('Creg');
        let size = +ctx.dimension().text;
        let register = new RegisterSymbol(registerName, registerType, size);

        this.symbolTable.define(register, ctx.start.line);
    }

    visitGateDefinition(ctx: GateDefinitionContext) {
        this.previousDefinitionValidation.apply(ctx.Id().text, PositionAdapter.fromTerminalNode(ctx.Id()));

        let gateName = ctx.Id().text;
        let gateType = this.symbolTable.lookup('Gate');
        let gate = new VariableSymbol(gateName, gateType);

        this.symbolTable.define(gate, ctx.start.line);

        this.symbolTable.push(gateName, ctx.start.line);
        this.visitChildren(ctx);
        this.symbolTable.pop(ctx.stop.line);
    }

    visitOpaqueDefinition(ctx: OpaqueDefinitionContext) {
        this.previousDefinitionValidation.apply(ctx.Id().text, PositionAdapter.fromTerminalNode(ctx.Id()));

        let opaqueName = ctx.Id().text;
        let gateType = this.symbolTable.lookup('Opaque');
        let gate = new VariableSymbol(opaqueName, gateType);

        this.symbolTable.define(gate, ctx.start.line);
    }

    private getLibraryContent(libraryName: string): string {
        let libraryPath = path.join(__dirname, '..', 'libs', libraryName);
        return fs.readFileSync(libraryPath, 'utf8');
    }
}
