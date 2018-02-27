'use strict';

import * as parserEngine from './qasm';
import { ParserError } from './parserModel';
import { toParserError } from './qasmParserErrorsAdapter';

// This function launches the parsing engine and transforms the errors into 
// ParserErrors which are understood by the extension
export function parse(input: string): ParserError[] {
    try {
        let output = parserEngine.parse(input);

        console.log('Output > ' + JSON.stringify(output));
    } catch (e) {
        return [toParserError(e)];
    }

    return [];
}