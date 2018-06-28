/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

export interface Parser {
    parse(input: string): ParserResult;
}

export interface Suggester {
    calculateSuggestionsFor(input: string): SuggestionSymbol[];
    availableSymbols(): SuggestionSymbol[];
}

export interface SuggestionSymbol {
    label: string;
    detail: string;
    documentation: string;
    type: string;
    parent: string;
}

export enum SuggestionSymbolType {
    method = 'method',
    class = 'class'
}

export interface ParserResult {
    ast: any;
    errors: ParserError[];
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
    ast: any;
    errors: CompilationError[];
}

export interface CompilationError {
    message: string;
    location: {
        firstLine: number;
        lastLine: number;
        firstColumn: number;
        lastColumn: number;
    };
}

export interface ContentPosition {
    line: number;
    start: number;
    end: number;
}
