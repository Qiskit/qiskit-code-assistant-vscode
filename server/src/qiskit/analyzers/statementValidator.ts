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
import { ANTLRErrorListener, CommonToken } from 'antlr4ts';
import { Expression, Term, TermType } from './types';
import { VariableSymbol, ClassSymbol } from '../compiler/qiskitSymbolTable';

export class StatementValidator {
    constructor(private symbolTable: SymbolTable, private errorListener: ANTLRErrorListener<CommonToken>) {}

    validate(expressions: Expression[]) {
        if (this.isAnAssignment(expressions)) {
            let type = this.typeOf(expressions[1].terms); // this.symbolTable.lookup(expressions[1].terms[0].value);
            let value = expressions[0].terms[0].value;

            this.symbolTable.define(new VariableSymbol(value, type));
        }

        this.symbolTable.print();
    }

    private isAnAssignment(expressions: Expression[]) {
        return expressions.length > 1;
    }

    private typeOf(terms: Term[]): Type {
        let identity = this.symbolTable.lookup('void');
        let typeDiscovery = (a: Type, b: Term) => {
            if (b.type === TermType.variable) {
                let currentSymbol = this.symbolTable.lookup(b.value);
                if (currentSymbol !== null) {
                    if (currentSymbol.type instanceof BuiltInTypeSymbol) {
                        return currentSymbol;
                    } else {
                        return currentSymbol.type;
                    }
                }

                if (a instanceof ClassSymbol) {
                    let variable = a as ClassSymbol;
                    let compatibleMethod = variable.methods.filter(m => m.getName() === b.value);
                    if (compatibleMethod.length > 0) {
                        return this.symbolTable.lookup(compatibleMethod[0].type.getName());
                    }
                }

                return identity;
            }

            return a;
        };

        return this.fold(identity, typeDiscovery, terms);
    }

    private fold(identity: any, operation: any, list: any[]) {
        let accumulator = identity;
        list.forEach(value => (accumulator = operation(accumulator, value)));

        return accumulator;
    }
}
