'use strict';

export interface Symbol {

    label: string,
    detail: string,
    documentation: string,
    type: string
}

export interface ParserResult {
    ast: any,
    errors: ParserError[]
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

export interface CompilationResult {
    ast: any,
    errors: CompilationError[]
}

export interface CompilationError {
    message: string, 
    location: {
        firstLine: number,
        lastLine: number,
        firstColumn: number,
        lastColumn: number
    }
}