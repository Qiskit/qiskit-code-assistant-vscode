/*
  Copyright IBM Corp. 2018. All Rights Reserved.

  This code may only be used under the Apache 2.0 license found at
  http://www.apache.org/licenses/LICENSE-2.0.txt.

  Authors:
  - Yeray Darias <yeray.darias@ibm.com>
*/

'use strict';

import { ANTLRInputStream, CommonTokenStream, ANTLRErrorListener, CommonToken, Token, Recognizer, RecognitionException, ConsoleErrorListener, ParserRuleContext } from 'antlr4ts';
import { CodeCompletionCore } from 'antlr4-c3';
import { ParserResult, ParserError, ParseErrorLevel } from '../qasm/model';
import { QasmLexer } from './antlr/QasmLexer';
import { QasmParser, CodeContext } from './antlr/QasmParser';
import { Override } from 'antlr4ts/Decorators';
import { TreePrinter } from './compiler/treePrinter';

export class Parser {

    parse(input: string): ParserResult {
        let errorListener = new ErrorListener();
        let parser = this.buildQasmParser(input, errorListener);
    
        let tree = parser.code();

        // TreePrinter.print(parser.ruleNames, tree);
    
        return {
            ast: tree,
            errors: errorListener.errors
        };
    }

    private buildQasmParser(input: string, errorListener: ErrorListener): QasmParser {
        let inputStream = new ANTLRInputStream(input);
        let lexer = new QasmLexer(inputStream);
        lexer.removeErrorListener(ConsoleErrorListener.INSTANCE);
    
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new QasmParser(tokenStream);
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