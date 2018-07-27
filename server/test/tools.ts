/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { ParserRuleContext, ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { Python3Lexer } from '../src/qiskit/antlr/Python3Lexer';
import { Python3Parser } from '../src/qiskit/antlr/Python3Parser';

export namespace Parser {
    export function parse(validSource: string): ParserRuleContext {
        let inputStream = new ANTLRInputStream(validSource);
        let lexer = new Python3Lexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new Python3Parser(tokenStream);

        return parser.program();
    }
}
