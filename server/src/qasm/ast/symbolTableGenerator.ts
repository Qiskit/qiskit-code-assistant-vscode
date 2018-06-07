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
    CodeContext,
    QregDefinitionContext,
    CregDefinitionContext,
    GateDefinitionContext,
    OpaqueDefinitionContext
} from '../antlrV2/QasmParserV2';
import { SymbolTable } from '../../tools/symbolTable';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { QasmParserV2Visitor } from '../antlrV2/QasmParserV2Visitor';
import { SymbolTableBuilder, RegisterSymbol, VariableSymbol } from '../compiler/symbolTable';

export namespace SymbolTableGenerator {
    export function symbolTableFor(tree: CodeContext): SymbolTable {
        let symbolTable = SymbolTableBuilder.build();
        let matcher = new DefinitionMatcher(symbolTable);

        tree.accept(matcher);

        return symbolTable;
    }
}

class DefinitionMatcher extends AbstractParseTreeVisitor<void> implements QasmParserV2Visitor<void> {
    constructor(private symbolTable: SymbolTable) {
        super();
    }

    defaultResult() {}

    visitQregDefinition(ctx: QregDefinitionContext) {
        let registerName = ctx.identifier().text;
        let registerType = this.symbolTable.lookup('Qreg');
        let size = +ctx.dimension().text;
        let register = new RegisterSymbol(registerName, registerType, size);

        this.symbolTable.define(register);
    }

    visitCregDefinition(ctx: CregDefinitionContext) {
        let registerName = ctx.identifier().text;
        let registerType = this.symbolTable.lookup('Creg');
        let size = +ctx.dimension().text;
        let register = new RegisterSymbol(registerName, registerType, size);

        this.symbolTable.define(register);
    }

    visitGateDefinition(ctx: GateDefinitionContext) {
        let gateName = ctx.Id().text;
        let gateType = this.symbolTable.lookup('Gate');
        let gate = new VariableSymbol(gateName, gateType);

        this.symbolTable.define(gate);

        this.symbolTable.push(gateName);
        this.visitChildren(ctx);
        this.symbolTable.pop();
    }

    visitOpaqueDefinition(ctx: OpaqueDefinitionContext) {
        let opaqueName = ctx.Id().text;
        let gateType = this.symbolTable.lookup('Opaque');
        let gate = new VariableSymbol(opaqueName, gateType);

        this.symbolTable.define(gate);
    }
}
