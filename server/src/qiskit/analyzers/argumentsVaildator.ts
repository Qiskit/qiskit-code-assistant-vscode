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

import { SymbolTable, Type } from '../../tools/symbolTable';
import { ErrorListener } from '../parser';
import { Term, TermType, Expression, ArrayReference } from './types';
import { VariableSymbol, ClassSymbol, MethodSymbol } from '../compiler/qiskitSymbolTable';
import { ParseErrorLevel, ParserError } from '../../types';
import { createServerSocketTransport } from 'vscode-jsonrpc';

export class ArgumentsValidator {
    constructor(private symbolTable: SymbolTable, private errorListener: ErrorListener) {}

    validate(terms: Term[]): void {
        let currentType: Type = null;

        terms.forEach(term => {
            if (term.type === TermType.variable) {
                currentType = this.calculateVariableType(currentType, term.value);
            }
            if (term.type === TermType.arguments) {
                let args = (term.value[0] as Expression).terms;
                this.validateArguments(currentType, args);
            }
        });
    }

    private calculateVariableType(currentType: Type, symbolReference: string): Type {
        if (currentType === null) {
            return this.safeSymbol(symbolReference);
        }

        if (currentType instanceof VariableSymbol) {
            let variableSymbol = currentType as VariableSymbol;
            return this.calculateVariableType(variableSymbol.type, symbolReference);
        }

        if (currentType instanceof ClassSymbol) {
            let classSymbol = currentType as ClassSymbol;
            let methods = classSymbol.methods.filter(method => method.name === symbolReference);
            if (methods.length > 0) {
                return methods[0];
            }
        }

        return this.symbolTable.lookup('void');
    }

    private validateArguments(currentType: Type, args: Term[]): void {
        if (currentType instanceof MethodSymbol) {
            let methodSymbol = currentType as MethodSymbol;
            this.validateNumberOfArguments(methodSymbol, args);
            this.validateArgumentsType(methodSymbol, args);
        }
    }

    private validateNumberOfArguments(methodSymbol: MethodSymbol, args: Term[]): void {
        let mandatoryArguments = methodSymbol.getArguments().filter(arg => arg.optional === false).length;
        if (args.length < mandatoryArguments) {
            this.wrongNumberOfArgumentsError(args, mandatoryArguments);
        }
    }

    private validateArgumentsType(methodSymbol: MethodSymbol, args: Term[]): void {
        args.forEach(arg => {
            let argumentType = this.calculateArgumentType(arg);
            let matchedTypes = methodSymbol.getArguments().filter(arg => arg.type === argumentType);
            if (matchedTypes.length < 1) {
                this.wrongTypeOfArgumentError(arg, argumentType);
            }
        });
    }

    private wrongNumberOfArgumentsError(args: Term[], mandatoryArguments: number): void {
        let error = {
            line: args[0].line,
            start: args[0].start,
            end: args[args.length - 1].end,
            message: `Expecting ${mandatoryArguments} arguments but ${args.length} received`,
            level: ParseErrorLevel.WARNING
        } as ParserError;

        this.errorListener.semanticError(error);
    }

    private wrongTypeOfArgumentError(arg: Term, argumentType: Type): void {
        let error = {
            line: arg.line,
            start: arg.start,
            end: arg.end,
            message: `Expecting argument of type ${argumentType.getName()}, but ${arg.value} doesn't match it`,
            level: ParseErrorLevel.WARNING
        } as ParserError;

        this.errorListener.semanticError(error);
    }

    private calculateArgumentType(arg: Term): Type {
        switch (arg.type) {
            case TermType.string: {
                return this.symbolTable.lookup('string');
            }
            case TermType.number: {
                return this.symbolTable.lookup('int');
            }
            case TermType.variable: {
                let symbol = this.safeSymbol(arg.value);
                if (symbol instanceof VariableSymbol) {
                    return symbol.type;
                }

                return symbol;
            }
            case TermType.arrayReference: {
                let arrayReference = arg.value as ArrayReference;
                let symbol = this.safeSymbol(arrayReference.variable);
                if (symbol instanceof VariableSymbol) {
                    return symbol.type;
                }

                return symbol;
            }
            default: {
                return this.symbolTable.lookup('void');
            }
        }
    }

    private safeSymbol(name: string): Type {
        let symbol = this.symbolTable.lookup(name);
        if (symbol === null) {
            symbol = this.symbolTable.lookup('void');
        }

        return symbol;
    }
}
