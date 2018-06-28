/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { Parser, ParserResult } from '../types';
import { SymbolTableGenerator } from './compiler/symbolTableGenerator';
import { SemanticAnalyzer } from './compiler/semanticAnalyzer';
import { QASMSyntacticParser } from './compiler/qasmSyntacticParser';
import { ErrorListener } from '../tools/errorListener';

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
