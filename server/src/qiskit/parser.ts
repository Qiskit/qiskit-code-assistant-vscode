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
    ANTLRInputStream,
    CommonTokenStream,
    ANTLRErrorListener,
    CommonToken,
    Token,
    Recognizer,
    RecognitionException,
    ConsoleErrorListener
} from 'antlr4ts';
import { Override } from 'antlr4ts/Decorators';
import { Parser, ParserResult, ParserError, ParseErrorLevel } from '../types';
import { Python3Parser } from './antlr/Python3Parser';
import { Python3Lexer } from './antlr/Python3Lexer';
import { TreeFolder } from './ast/treeFolder';
import { SymbolTableGenerator } from './ast/symbolTableGenerator';
import { SemanticAnalyzer } from './ast/semanticAnalyzer';
import { ImportsAnalyzer } from './ast/importsAnalyzer';
import { ErrorListener } from '../tools/errorListener';
import { TreePrinter } from '../tools/treePrinter';

export class QiskitParser implements Parser {
    parse(input: string): ParserResult {
        let errorListener = new ErrorListener();
        let parser = this.buildQiskitParser(input, errorListener);

        let tree = parser.program();
        let folder = new TreeFolder();
        let codeBlock = folder.visit(tree);
        let symbolTable = SymbolTableGenerator.symbolTableFor(codeBlock);

        symbolTable.print();

        let errors = SemanticAnalyzer.analyze(codeBlock, symbolTable);
        ImportsAnalyzer.analyze(tree, errorListener);

        return {
            ast: tree,
            errors: errorListener.errors.concat(errors)
        };
    }

    private buildQiskitParser(input: string, errorListener: ErrorListener): Python3Parser {
        let inputStream = new ANTLRInputStream(input);
        let lexer = new Python3Lexer(inputStream);
        lexer.removeErrorListener(ConsoleErrorListener.INSTANCE);

        let tokenStream = new CommonTokenStream(lexer);
        let parser = new Python3Parser(tokenStream);
        parser.addErrorListener(errorListener);

        return parser;
    }
}
