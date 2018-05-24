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

import { expect } from 'chai';
import { ArgumentSymbol, QiskitSymbolTable } from '../src/qiskit/compiler/qiskitSymbolTable';
import { SymbolTable } from '../src/tools/symbolTable';

describe('An argument symbol', () => {
    let symbolTable = QiskitSymbolTable.build();

    describe('of type string', () => {
        let argumentSymbol = new ArgumentSymbol('name', symbolTable.lookup('string'));

        it('is the same type than "a"', () => {
            expect(argumentSymbol.isSameType("'a'")).to.be.true;
        });

        it('is not the same type than 2', () => {
            expect(argumentSymbol.isSameType(2)).to.be.false;
        });
    });

    describe('of type number', () => {
        let argumentSymbol = new ArgumentSymbol('size', symbolTable.lookup('number'));

        it('is not the same type than "a"', () => {
            expect(argumentSymbol.isSameType("'a'")).to.be.false;
        });

        it('is the same type than 2', () => {
            expect(argumentSymbol.isSameType(2)).to.be.true;
        });
    });
});
