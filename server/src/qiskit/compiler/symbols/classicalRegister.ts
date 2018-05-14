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

import { ClassSymbol, MethodSymbol, ArgumentSymbol } from "../qiskitSymbolTable";
import { SymbolTable } from "../../../tools/symbolTable";

export namespace ClassicalRegister {

    export function createFor(symbolTable: SymbolTable): ClassSymbol {
        let classType = symbolTable.lookup('class');
        let methods = [
            createCheckRangeMethod(symbolTable),
            createQasmMethod(symbolTable)
        ];

        return new ClassSymbol('ClassicalRegister', classType, methods);
    }

    function createCheckRangeMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('boolean');
        let requiredArguments = [
            new ArgumentSymbol('position', symbolTable.lookup('int'))
        ];

        return new MethodSymbol('check_range', type, requiredArguments);
    }

    function createQasmMethod(symbolTable: SymbolTable): MethodSymbol {
        let type = symbolTable.lookup('string');
        let requiredArguments: ArgumentSymbol[] = [];

        return new MethodSymbol('qasm', type, requiredArguments);
    }

}