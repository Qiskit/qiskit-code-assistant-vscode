'use strict';

import { parser } from './qasm';
import { ParserError } from './parserModel';
import { toParserError } from './qasmParserErrorsAdapter';

// This function launches the parsing engine and transforms the errors into 
// ParserErrors which are understood by the extension
export function parse(input: string): ParserError[] {
    parser.init();
    let compilationResult = parser.parse(input);
    return compilationResult.errors.map((error) => {
        return toParserError(error);
    });
}