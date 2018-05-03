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
import { QiskitSymbolTable } from '../src/qiskit/compiler/qiskitSymbolTable';
import { MetadataExtractor } from '../src/qiskit/antlr/tools/metadataExtractor';
import { MethodCall } from '../src/qiskit/antlr/tools/methodCall';
import { Token } from './utils/tokens';
import { Python3Lexer } from '../src/qiskit/antlr/Python3Lexer';
import { SymbolTable, Symbol } from '../src/tools/symbolTable';

describe('A metadata extractor tool', () => {

    describe('with a default QISKit symbol table with a QuantumProgram declared', () => {

        let symbolTable: SymbolTable;

        let extractor: MetadataExtractor;

        beforeEach(() => {
            symbolTable = QiskitSymbolTable.build();
            symbolTable.define(new Symbol('qp', symbolTable.lookup('QuantumProgram')));

            extractor = new MetadataExtractor(symbolTable);
        });

        it('should detect method call metadata at qp.create_quantum_register("qr", 2)', () => {
            let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qp', 1, 1));
            call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'create_quantum_register', 1, 1));
            call.addArgument(Token.build(Python3Lexer.STRING_LITERAL, '"qr"', 1, 1), symbolTable.lookup('string'));
            call.addArgument(Token.build(Python3Lexer.BIN_INTEGER, '2', 1, 1), symbolTable.lookup('int'));

            let result = extractor.from(call);

            expect(result)
                .to.include({name: '"qr"'})
                .to.include({size: '2'});
        });

        it('should return null with qt.fake_function("a")', () => {
            let call = new MethodCall(Token.build(Python3Lexer.NAME, 'qt', 1, 1));
            call.addTrailingMethod(Token.build(Python3Lexer.NAME, 'fake_function', 1, 1));
            call.addArgument(Token.build(Python3Lexer.STRING_LITERAL, '"a"', 1, 1), symbolTable.lookup('string'));

            let result = extractor.from(call);

            expect(result).to.be.null;
        });

    });

});