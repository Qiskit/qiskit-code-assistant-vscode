'use strict';

import { ANTLRInputStream, CommonTokenStream, ANTLRErrorListener, CommonToken, Token, Recognizer, RecognitionException } from 'antlr4ts';
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
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new QasmParser(tokenStream);

    let errorListener = new ErrorListener();
    parser.addErrorListener(errorListener);

    let tree = parser.startProgram();

    // given a parser candidates can be calculated wihtout launching previous rules!!!
    let keywords = calculateCandidateKeywords(parser, 0);

    return {
        ast: tree,
        errors: errorListener.errors
    };


    /*
    var input = document.getElementById("code").value;
        var chars = new antlr4.InputStream(input);
        var lexer = new TodoLexer.todoLexer(chars);
        var tokens  = new antlr4.CommonTokenStream(lexer);
        var parser = new TodoParser.todoParser(tokens);
        parser.buildParseTrees = true;
        var errors = [];
        var listener = new MyErrorListener(errors);
        parser.removeErrorListeners();
        parser.addErrorListener(listener);
        var tree = parser.startProgram();
        console.log("Parsed: "+ tree);
        console.log(errors);
    */

    // parser.init();

    // let compilationResult = parser.parse(input);

    // return {
    //     ast: compilationResult,
    //     errors: compilationResult.errors.map((error) => {
    //         return toParserError(error);
    //     })
    // }
}

function calculateCandidateKeywords(parser: QasmParser, caretPosition: number): string[] {
    let core = new CodeCompletionCore(parser);
    let candidates = core.collectCandidates(caretPosition);

    let keywords: string[] = [];
    for (let candidate of candidates.tokens) {
        keywords.push(parser.vocabulary.getDisplayName(candidate[0]));
    }

    return keywords;
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
            line: line,
            start: charPositionInLine,
            end: charPositionInLine + 1,
            message: msg,
            level: ParseErrorLevel.ERROR
        });
    }

}