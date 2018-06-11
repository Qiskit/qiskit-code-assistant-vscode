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
    ParserRuleContext,
    ANTLRInputStream,
    CommonTokenStream,
    ANTLRErrorListener,
    CommonToken,
    ConsoleErrorListener
} from 'antlr4ts';
import { QasmLexer } from './antlr/QasmLexer';
import { QasmParser } from './antlr/QasmParser';

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
