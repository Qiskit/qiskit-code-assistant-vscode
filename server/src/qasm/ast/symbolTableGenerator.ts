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
    IncludeLibraryContext,
    CodeContext
} from '../antlrV2/QasmParserV2';
import { SymbolTable } from '../../tools/symbolTable';
import { AbstractParseTreeVisitor, TerminalNode } from 'antlr4ts/tree';
import { QasmParserV2Visitor } from '../antlrV2/QasmParserV2Visitor';
import { SymbolTableBuilder, RegisterSymbol, VariableSymbol } from '../compiler/symbolTable';
import path = require('path');
import fs = require('fs');
import { ParserRuleContext } from 'antlr4ts';
import { QASMSyntacticParser } from '../qasmSyntacticParser';
import { SymbolTableResult } from './types';
import { ParserError, ParseErrorLevel } from '../../types';

export namespace SymbolTableGenerator {
    export function symbolTableFor(tree: ParserRuleContext): SymbolTableResult {
        let symbolTable = SymbolTableBuilder.build();
        let matcher = new DefinitionMatcher(symbolTable);

        let errors = tree.accept(matcher);

        return {
            symbolTable: symbolTable,
            errors: errors
        };
    }
}

class DefinitionMatcher extends AbstractParseTreeVisitor<ParserError[]> implements QasmParserV2Visitor<ParserError[]> {
    private errors: ParserError[] = [];

    constructor(private symbolTable: SymbolTable) {
        super();
    }

    defaultResult(): ParserError[] {
        return this.errors;
    }

    visitCode(ctx: CodeContext): ParserError[] {
        this.errors = [];

        this.visitChildren(ctx);

        return this.errors;
    }

    visitIncludeLibrary(ctx: IncludeLibraryContext): ParserError[] {
        let input = this.getLibraryContent(ctx.Library().text);
        let tree = QASMSyntacticParser.parse(input);

        let librarySymbolTable = SymbolTableGenerator.symbolTableFor(tree);
        this.symbolTable.mergeWith(librarySymbolTable.symbolTable.currentScope);

        this.visitChildren(ctx);

        return this.errors;
    }

    visitQregDefinition(ctx: QregDefinitionContext): ParserError[] {
        this.checkPreviouslyDefinedVariable(ctx.Id());

        let registerName = ctx.Id().text;
        let registerType = this.symbolTable.lookup('Qreg');
        let size = +ctx.dimension().text;
        let register = new RegisterSymbol(registerName, registerType, size);

        this.symbolTable.define(register);

        return this.errors;
    }

    visitCregDefinition(ctx: CregDefinitionContext): ParserError[] {
        this.checkPreviouslyDefinedVariable(ctx.Id());

        let registerName = ctx.Id().text;
        let registerType = this.symbolTable.lookup('Creg');
        let size = +ctx.dimension().text;
        let register = new RegisterSymbol(registerName, registerType, size);

        this.symbolTable.define(register);

        return this.errors;
    }

    visitGateDefinition(ctx: GateDefinitionContext): ParserError[] {
        this.checkPreviouslyDefinedVariable(ctx.Id());

        let gateName = ctx.Id().text;
        let gateType = this.symbolTable.lookup('Gate');
        let gate = new VariableSymbol(gateName, gateType);

        this.symbolTable.define(gate);

        this.symbolTable.push(gateName);
        this.visitChildren(ctx);
        this.symbolTable.pop();

        return this.errors;
    }

    visitOpaqueDefinition(ctx: OpaqueDefinitionContext): ParserError[] {
        this.checkPreviouslyDefinedVariable(ctx.Id());

        let opaqueName = ctx.Id().text;
        let gateType = this.symbolTable.lookup('Opaque');
        let gate = new VariableSymbol(opaqueName, gateType);

        this.symbolTable.define(gate);

        return this.errors;
    }

    private getLibraryContent(libraryName: string): string {
        let libraryPath = path.join(__dirname, '..', 'libs', libraryName);
        return fs.readFileSync(libraryPath, 'utf8');
    }

    private checkPreviouslyDefinedVariable(node: TerminalNode) {
        if (this.symbolTable.lookup(node.text) === null) {
            return;
        }

        let message = `Variable "${node.text}" was previously defined.`;
        let error = {
            line: node.symbol.line - 1,
            start: node.symbol.charPositionInLine,
            end: node.symbol.charPositionInLine + node.text.length,
            message: message,
            level: ParseErrorLevel.WARNING
        };

        this.errors.push(error);
    }
}
