'use strict';

import * as parserEngine from './qasmParserEngine';
import { ParserError } from './parserModel';
import { toParserError } from './qasmParserErrorsAdapter';

// This function launches the parsing engine and transforms the errors into 
// ParserErrors which are understood by the extension
export function parse(input: string): ParserError[] {
    try {
        parserEngine.parse(input);
    } catch (e) {
        console.log("Errors detected > " + JSON.stringify(e));

        return [toParserError(e)];
    }

    return [];
}