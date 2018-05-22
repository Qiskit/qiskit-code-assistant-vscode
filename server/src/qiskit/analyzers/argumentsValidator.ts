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
    argumentsValidations: ArgumentValidation[] = [];
    constructor(private symbolTable: SymbolTable, private errorListener: ErrorListener) {
        this.argumentsValidations = [
            new ArgumentsNumberValidation(errorListener),
            new ArgumentsTypeValidation(symbolTable, errorListener)
        ];
    }

    validate(terms: Term[]): void {
        let currentType: Type = null;

        terms.forEach(term => {
            if (term.type === TermType.variable) {
                currentType = this.calculateVariableType(currentType, term.value);
            }
            if (term.type === TermType.arguments || term.type === TermType.emptyArgs) {
                this.argumentsValidations.forEach(validation => validation.validate(currentType, term));
            }
        });
    }

    private calculateVariableType(currentType: Type, symbolReference: string): Type {
        if (currentType === null) {
            return this.symbolTable.lookup(symbolReference);
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
}

abstract class ArgumentValidation {
    abstract validate(currentType: Type, argsTerm: Term): void;

    unfoldArgs(argsTerm: Term): Term[] {
        if (argsTerm.type === TermType.arguments) {
            return (argsTerm.value[0] as Expression).terms;
        }

        return [];
    }

    isMethodSymbol(currentType: Type): boolean {
        return currentType instanceof MethodSymbol;
    }
}

class ArgumentsNumberValidation extends ArgumentValidation {
    constructor(private errorListener: ErrorListener) {
        super();
    }

    validate(currentType: Type, argsTerm: Term): void {
        if (!this.isMethodSymbol(currentType)) {
            return;
        }

        let methodSymbol = currentType as MethodSymbol;
        let args = this.unfoldArgs(argsTerm);
        let mandatoryArguments = methodSymbol.getArguments().filter(arg => arg.optional === false).length;
        if (args.length < mandatoryArguments) {
            this.wrongNumberOfArgumentsError(argsTerm, args, mandatoryArguments);
        }
    }

    private wrongNumberOfArgumentsError(argsTerm: Term, args: Term[], mandatoryArguments: number): void {
        let error = {
            line: argsTerm.line,
            start: argsTerm.start,
            end: argsTerm.end,
            message: `Expecting ${mandatoryArguments} arguments but ${args.length} received`,
            level: ParseErrorLevel.WARNING
        } as ParserError;

        this.errorListener.semanticError(error);
    }
}

class ArgumentsTypeValidation extends ArgumentValidation {
    constructor(private symbolTable: SymbolTable, private errorListener: ErrorListener) {
        super();
    }

    validate(currentType: Type, argsTerm: Term): void {
        if (!this.isMethodSymbol(currentType)) {
            return;
        }

        let methodSymbol = currentType as MethodSymbol;
        let args = this.unfoldArgs(argsTerm);
        args.forEach(arg => {
            let argumentType = this.calculateArgumentType(arg);
            let matchedTypes = methodSymbol.getArguments().filter(arg => arg.type === argumentType);
            if (matchedTypes.length < 1) {
                this.wrongTypeOfArgumentError(arg, argumentType);
            }
        });
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
                let symbol = this.symbolTable.lookup(arg.value);
                if (symbol instanceof VariableSymbol) {
                    return symbol.type;
                }

                return symbol;
            }
            case TermType.arrayReference: {
                let arrayReference = arg.value as ArrayReference;
                let symbol = this.symbolTable.lookup(arrayReference.variable);
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

    private wrongTypeOfArgumentError(arg: Term, argumentType: Type): void {
        let argValue = arg.type === TermType.arrayReference ? (arg.value as ArrayReference).variable : arg.value;
        let errorMessage =
            argumentType !== null
                ? `Expecting argument of type ${argumentType.getName()}, but ${argValue} doesn't match it`
                : `${argValue} does not match the expected type`;
        let error = {
            line: arg.line,
            start: arg.start,
            end: arg.end,
            message: errorMessage,
            level: ParseErrorLevel.WARNING
        } as ParserError;

        this.errorListener.semanticError(error);
    }
}
