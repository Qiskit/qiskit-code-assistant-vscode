'use strict';

import {ParserError, ParseErrorLevel} from './parserModel';

export function toParserError(error: QasmParserEngineError): ParserError {
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
