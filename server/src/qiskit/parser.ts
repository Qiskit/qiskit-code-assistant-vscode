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

import { ANTLRInputStream, CommonTokenStream, ANTLRErrorListener, CommonToken, Token, Recognizer, RecognitionException, ConsoleErrorListener, ParserRuleContext } from 'antlr4ts';
import { Override } from 'antlr4ts/Decorators';
import { Parser, ParserResult, ParserError, ParseErrorLevel } from "../types";
import { Python3Parser } from './antlr/Python3Parser';
import { Python3Lexer } from './antlr/Python3Lexer';
import { TreePrinter } from '../tools';

export class QiskitParser implements Parser {

    parse(input: string): ParserResult {
        let errorListener = new ErrorListener();
        let parser = this.buildQiskitParser(input, errorListener);

        let tree = parser.file_input();

        TreePrinter.print(parser.ruleNames, tree);

        // parser.symbolTable.print();

        return {
            ast: tree,
            errors: errorListener.errors
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

class ErrorListener implements ANTLRErrorListener<CommonToken> {

    errors: ParserError[] = [];

    @Override
    syntaxError<T extends Token>(
        _recognizer: Recognizer<T, any>,
        offendingSymbol: T | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        _e: RecognitionException | undefined): void {

        this.errors.push({
            line: line - 1,
            start: charPositionInLine,
            end: charPositionInLine + offendingSymbol.text.length,
            message: msg,
            level: ParseErrorLevel.ERROR
        });
    }

}