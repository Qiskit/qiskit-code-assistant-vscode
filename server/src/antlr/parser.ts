'use strict';

import { ANTLRInputStream, CommonTokenStream, ANTLRErrorListener, CommonToken, Token, Recognizer, RecognitionException, ConsoleErrorListener } from 'antlr4ts';
import { CodeCompletionCore } from 'antlr4-c3';
import { ParserResult, ParserError, ParseErrorLevel } from '../tools/parserModel';
import { QasmLexer } from './QasmLexer';
import { QasmParser } from './QasmParser';
import { Override } from 'antlr4ts/Decorators';

// This function launches the parsing engine and transforms the errors into 
// ParserErrors which are understood by the extension
export function parse(input: string): ParserResult {
    let inputStream = new ANTLRInputStream(input);
    let lexer = new QasmLexer(inputStream);
    lexer.removeErrorListener(ConsoleErrorListener.INSTANCE);

    let tokenStream = new CommonTokenStream(lexer);
    let parser = new QasmParser(tokenStream);

    let errorListener = new ErrorListener();
    parser.addErrorListener(errorListener);

    let tree = parser.startProgram();

    return {
        ast: tree,
        errors: errorListener.errors
    };
}

class ErrorListener implements ANTLRErrorListener<CommonToken> {

    errors: ParserError[] = [];

    @Override
    syntaxError<T extends Token>(
        _recognizer: Recognizer<T, any>,
        _offendingSymbol: T | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        _e: RecognitionException | undefined): void {

        this.errors.push({
            line: line - 1,
            start: charPositionInLine,
            end: charPositionInLine + 1,
            message: msg,
            level: ParseErrorLevel.ERROR
        });
    }

}