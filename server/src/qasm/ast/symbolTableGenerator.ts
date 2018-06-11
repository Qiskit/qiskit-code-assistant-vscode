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

import {
    QregDefinitionContext,
    CregDefinitionContext,
    GateDefinitionContext,
    OpaqueDefinitionContext,
    IncludeLibraryContext
} from '../antlr/QasmParser';
import { SymbolTable } from '../../tools/symbolTable';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { QasmParserVisitor } from '../antlr/QasmParserVisitor';
import { SymbolTableBuilder, RegisterSymbol, VariableSymbol } from '../compiler/symbolTable';
import path = require('path');
import fs = require('fs');
import { ParserRuleContext } from 'antlr4ts';
import { QASMSyntacticParser } from '../qasmSyntacticParser';
import { ErrorListener } from '../parser';
import { PositionAdapter } from './errorBuilder';
import { PreviousDefinitionValidation } from './validations';

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

        this.symbolTable.define(register);
    }

    visitCregDefinition(ctx: CregDefinitionContext) {
        this.previousDefinitionValidation.apply(ctx.Id().text, PositionAdapter.fromTerminalNode(ctx.Id()));

        let registerName = ctx.Id().text;
        let registerType = this.symbolTable.lookup('Creg');
        let size = +ctx.dimension().text;
        let register = new RegisterSymbol(registerName, registerType, size);

        this.symbolTable.define(register);
    }

    visitGateDefinition(ctx: GateDefinitionContext) {
        this.previousDefinitionValidation.apply(ctx.Id().text, PositionAdapter.fromTerminalNode(ctx.Id()));

        let gateName = ctx.Id().text;
        let gateType = this.symbolTable.lookup('Gate');
        let gate = new VariableSymbol(gateName, gateType);

        this.symbolTable.define(gate);

        this.symbolTable.push(gateName);
        this.visitChildren(ctx);
        this.symbolTable.pop();
    }

    visitOpaqueDefinition(ctx: OpaqueDefinitionContext) {
        this.previousDefinitionValidation.apply(ctx.Id().text, PositionAdapter.fromTerminalNode(ctx.Id()));

        let opaqueName = ctx.Id().text;
        let gateType = this.symbolTable.lookup('Opaque');
        let gate = new VariableSymbol(opaqueName, gateType);

        this.symbolTable.define(gate);
    }

    private getLibraryContent(libraryName: string): string {
        let libraryPath = path.join(__dirname, '..', 'libs', libraryName);
        return fs.readFileSync(libraryPath, 'utf8');
    }
}
