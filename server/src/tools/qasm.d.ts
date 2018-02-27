import { CompilationResult } from './parserModel';

// export as namespace parser;

// export function parse(input: string): CompilationResult;

export namespace parser {
    export function parse(input: string): CompilationResult;
    export function init(): void;
}