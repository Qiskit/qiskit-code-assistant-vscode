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

import { SymbolTable, Symbol } from '../../tools/symbolTable';
import { ANTLRErrorListener, CommonToken } from 'antlr4ts';
import { Expression } from './types';

export class StatementValidator {
    constructor(private symbolTable: SymbolTable, private errorListener: ANTLRErrorListener<CommonToken>) {}

    validate(expressions: Expression[]) {
        if (this.isAnAssignment(expressions)) {
            let type = this.symbolTable.lookup(expressions[1].terms[0].value);
            let value = expressions[0].terms[0].value;

            this.symbolTable.define(new Symbol(value, type));
        }
    }

    private isAnAssignment(expressions: Expression[]) {
        return expressions.length > 1;
    }
}
