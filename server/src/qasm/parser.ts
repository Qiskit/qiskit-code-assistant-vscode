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

import { Parser, ParserResult } from '../types';
import { SymbolTableGenerator } from './compiler/symbolTableGenerator';
import { SemanticAnalyzer } from './compiler/semanticAnalyzer';
import { QASMSyntacticParser } from './compiler/qasmSyntacticParser';
import { ErrorListener } from './compiler/tools/errorListener';

export class QASMParser implements Parser {
    parse(input: string): ParserResult {
        let errorListener = new ErrorListener();

        let tree = QASMSyntacticParser.parseWithErrorListener(input, errorListener);
        let symbolTable = SymbolTableGenerator.symbolTableFor(tree, errorListener);
        SemanticAnalyzer.analyze(tree, symbolTable, errorListener);

        return {
            ast: tree,
            errors: errorListener.errors
        };
    }
}
