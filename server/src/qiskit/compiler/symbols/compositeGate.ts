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

import { SymbolTable } from "../../../tools/symbolTable";
import { ClassSymbol, MethodSymbol } from "../qiskitSymbolTable";

namespace CompositeGate {
    
    export function createFor(symbolTable: SymbolTable): ClassSymbol {
        let methods: MethodSymbol[] = [
            // createBarrierMethod(symbolTable),
            // createCifMethod(symbolTable),
            // createCcxMethod(symbolTable),
            // createChMethod(symbolTable),
            // createCheckCircuitMethod(symbolTable),
            // createCrzMethod(symbolTable),
            // createCswapMethod(symbolTable),
        ];

        return new ClassSymbol('QuantumProgram', symbolTable.lookup('class'), methods);
    }

}