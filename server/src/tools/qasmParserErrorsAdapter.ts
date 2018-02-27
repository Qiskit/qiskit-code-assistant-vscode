'use strict';

import {
    ParserError, ParseErrorLevel, CompilationError
} from './parserModel';

export function toParserError(error: CompilationError): ParserError {
    return {
        line: error.location.firstLine - 1,
        start: error.location.firstColumn || 0,
        end: error.location.lastColumn || 0,
        message: error.message,
        level: ParseErrorLevel.ERROR
    }
}
