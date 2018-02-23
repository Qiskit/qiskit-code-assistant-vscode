'use strict';

import * as parserEngine from './qasmParserEngine';

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

function toParserError(error: QasmParserEngineError): ParserError {
    return {
        line: getErrorLine(error),
        start: error.hash.loc.first_column || 0,
        end: error.hash.loc.last_column || 0,
        message: error.message,
        level: ParseErrorLevel.ERROR
    }
}

function getErrorLine(error: QasmParserEngineError): number {
    if (error.hash.line)
        return error.hash.line;

    return error.hash.loc.first_line - 1;
}

interface QasmParserEngineError {
    message: string;
    hash: QasmParserEngineErrorHash;
}

interface QasmParserEngineErrorHash {
    text: string;
    line: number;
    loc: QasmParserEngineErrorHashLocation;
}

interface QasmParserEngineErrorHashLocation {
    first_line: number;
    first_column: number;
    last_line: number;
    last_column: number;
}

export interface ParserError {
    line: number;
    start: number;
    end: number;
    message: string;
    level: ParseErrorLevel;
}

export enum ParseErrorLevel {
    ERROR,
    WARNING
}