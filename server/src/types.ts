// Copyright 2018 IBM RESEARCH. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

'use strict';

export interface Parser {
    parse(input: string): ParserResult;
}

export interface Suggester {
    calculateSuggestionsFor(input: string): Symbol[];
    availableSymbols(): Symbol[];
}

export interface Symbol {

    label: string;
    detail: string;
    documentation: string;
    type: string;
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
    ERROR, WARNING
}

export interface CompilationResult {
    ast: any;
    errors: CompilationError[];
}

export interface CompilationError {
    message: string;
    location: {
        firstLine: number,
        lastLine: number,
        firstColumn: number,
        lastColumn: number
    };
}