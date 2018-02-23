'use strict';

import * as parserEngine from './parserEngine';

// This function launches the parsing engine and transforms the errors into 
// ParserErrors which are understood by the extension
export function parse(input: string): ParserError[] {
    try {
        parserEngine.parse(input);
    } catch(e) {
        return [
            {
                line: e.location.start.line,
                start: e.location.start.column,
                end: e.location.end.column,
                message: e.message,
                level: ParseErrorLevel.ERROR
            }
        ];
    }
    
    return [];
}

export interface ParserError {
    line: number;
    start: number;
    end: number;
    message: string;
    level: ParseErrorLevel;
}

export enum ParseErrorLevel { ERROR, WARNING }
