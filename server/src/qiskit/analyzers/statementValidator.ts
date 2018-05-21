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

import { SymbolTable, Symbol, Type, BuiltInTypeSymbol } from '../../tools/symbolTable';
import { Expression, Term, TermType, ArrayReference } from './types';
import { VariableSymbol, ClassSymbol, VariableMetadata, MethodSymbol } from '../compiler/qiskitSymbolTable';
import { ErrorListener } from '../parser';
import { ParseErrorLevel, ParserError } from '../../types';
import { ArgumentsValidator } from './argumentsValidator';

export class StatementValidator {
    constructor(private symbolTable: SymbolTable, private errorListener: ErrorListener) {}

    validate(expressions: Expression[]) {
        if (this.isAnAssignment(expressions)) {
            let termsFold = this.foldTerms(expressions[1].terms);
            if (termsFold === null) {
                return;
            }
            let value = expressions[0].terms[0].value;

            this.symbolTable.define(new VariableSymbol(value, termsFold.type, termsFold.metadata));
        } else {
            let argumentsChecker = new ArgumentsValidator(this.symbolTable, this.errorListener);
            argumentsChecker.validate(expressions[0].terms);
        }
    }

    private isAnAssignment(expressions: Expression[]) {
        return expressions.length > 1;
    }

    private foldTerms(terms: Term[]): TermsFold {
        let identity = {} as TermsFold;
        let termWalker = (fold: TermsFold, term: Term) => {
            if (term.type === TermType.variable) {
                fold.type = this.typeForTerm(term, fold.type);
            }
            if (term.type === TermType.arguments) {
                // this.checkArguments(term, fold.type);
                fold.metadata = this.metadataForTerm(term, fold.type);
            }
            return fold;
        };

        return this.fold(identity, termWalker, terms);
    }

    private typeForTerm(term: Term, currentType: Type): Type {
        if (currentType instanceof ClassSymbol) {
            let variable = currentType as ClassSymbol;
            let compatibleMethod = variable.methods.filter(m => m.getName() === term.value);
            if (compatibleMethod.length > 0) {
                return this.symbolTable.lookup(compatibleMethod[0].type.getName());
            }
        }

        let currentSymbol = this.symbolTable.lookup(term.value);
        if (currentSymbol !== null) {
            if (currentSymbol.type instanceof BuiltInTypeSymbol) {
                return currentSymbol;
            } else {
                return currentSymbol.type;
            }
        }

        return this.symbolTable.lookup('void');
    }

    private metadataForTerm(_term: Term, currentType: Type): VariableMetadata {
        if (currentType instanceof ClassSymbol) {
            let classSymbol = currentType as ClassSymbol;
            let declaredArguments = (_term.value[0] as Expression).terms;
            // TODO refactor
            let toMetada = (metadata: VariableMetadata, argument: Term) => {
                if (this.declaredSizeArgument(classSymbol, argument)) {
                    if (metadata === null) {
                        metadata = {
                            size: +argument.value
                        } as VariableMetadata;
                    } else {
                        metadata.size = +argument.value;
                    }
                }
                if (this.declaredNameArgument(classSymbol, argument)) {
                    if (metadata === null) {
                        metadata = {
                            name: argument.value
                        } as VariableMetadata;
                    } else {
                        metadata.name = argument.value;
                    }
                }

                return metadata;
            };

            return this.fold(null, toMetada, declaredArguments);
        }
        return null;
    }

    private declaredSizeArgument(classSymbol: ClassSymbol, argument: Term): boolean {
        let sizeArguments = classSymbol.requiredArguments.filter(arg => arg.name === 'size');
        if (sizeArguments.length > 0) {
            return argument.type === TermType.number;
        }

        return false;
    }

    private declaredNameArgument(classSymbol: ClassSymbol, argument: Term): boolean {
        let nameArguments = classSymbol.requiredArguments.filter(arg => arg.name === 'name');
        if (nameArguments.length > 0) {
            return argument.type === TermType.string;
        }

        return false;
    }

    private fold(identity: any, operation: any, list: any[]) {
        let accumulator = identity;
        list.forEach(value => (accumulator = operation(accumulator, value)));

        return accumulator;
    }
}

interface TermsFold {
    type: Type;
    metadata: VariableMetadata;
}
