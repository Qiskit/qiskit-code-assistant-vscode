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
    ParserRuleContext,
    ANTLRInputStream,
    CommonTokenStream,
    ANTLRErrorListener,
    CommonToken,
    ConsoleErrorListener
} from 'antlr4ts';
import { QasmLexer } from '../antlr/QasmLexer';
import { QasmParser } from '../antlr/QasmParser';

export namespace QASMSyntacticParser {
    export function parse(input: string): ParserRuleContext {
        let inputStream = new ANTLRInputStream(input);
        let lexer = new QasmLexer(inputStream);

        let tokenStream = new CommonTokenStream(lexer);
        let parser = new QasmParser(tokenStream);

        return parser.code();
    }

    export function parseWithErrorListener(
        input: string,
        errorListener: ANTLRErrorListener<CommonToken>
    ): ParserRuleContext {
        let inputStream = new ANTLRInputStream(input);
        let lexer = new QasmLexer(inputStream);
        lexer.removeErrorListener(ConsoleErrorListener.INSTANCE);

        let tokenStream = new CommonTokenStream(lexer);
        let parser = new QasmParser(tokenStream);
        parser.addErrorListener(errorListener);

        return parser.code();
    }

    export function ruleNames(): string[] {
        return QasmParser.ruleNames;
    }
}
