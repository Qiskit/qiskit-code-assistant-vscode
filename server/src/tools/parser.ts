'use strict';

import { parser } from './qasm';
import { ParserResult } from './parserModel';
import { toParserError } from './qasmParserErrorsAdapter';

// This function launches the parsing engine and transforms the errors into 
// ParserErrors which are understood by the extension
export function parse(input: string): ParserResult {
    parser.init();

    let compilationResult = parser.parse(input);

    return {
        ast: compilationResult,
        errors: compilationResult.errors.map((error) => {
            return toParserError(error);
        })
    }
}