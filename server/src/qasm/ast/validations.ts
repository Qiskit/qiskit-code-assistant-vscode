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

import { SymbolTable } from '../../tools/symbolTable';
import { ErrorListener } from '../parser';
import { ErrorMessages } from './errorMessages';
import { PositionAdapter, ErrorBuilder } from './errorBuilder';

export class PreviousDefinitionValidation {
    constructor(private symbolTable: SymbolTable, private errorListener: ErrorListener) {}

    apply(variableName: string, position: PositionAdapter) {
        if (this.symbolTable.lookup(variableName) === null) {
            return;
        }

        let message = ErrorMessages.previousDefinitionOf(variableName);
        let error = ErrorBuilder.warning(message, position);

        this.errorListener.addError(error);
    }
}
