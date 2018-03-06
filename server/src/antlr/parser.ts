'use strict';

import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
// import { parser } from './qasm';
import { ParserResult } from '../tools/parserModel';
import { QasmLexer } from './QasmLexer';
import { QasmParser } from './QasmParser';
// import { toParserError } from '../tools/qasmParserErrorsAdapter';

// This function launches the parsing engine and transforms the errors into 
// ParserErrors which are understood by the extension
export function parse(input: string): ParserResult {
    let inputStream = new ANTLRInputStream(input);
    let lexer = new QasmLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new QasmParser(tokenStream);

    let tree = parser.startProgram();

    return {
        ast: tree,
        errors: []
    };




    // parser.init();

    // let compilationResult = parser.parse(input);

    // return {
    //     ast: compilationResult,
    //     errors: compilationResult.errors.map((error) => {
    //         return toParserError(error);
    //     })
    // }
}