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
import { QiskitParser } from '../src/qiskit/parser';
import { Parser, ParserResult, ParseErrorLevel, ParserError } from '../src/types';

describe('A QISKit parser', () => {

    let parser: Parser = new QiskitParser();

    describe('will end without errors', () => {
        it('when receives an empty input', () => {
            let result = parser.parse(``);
            expect(result.errors.length).to.be.eq(0);
        });

        it('when receives a valid Python hello world', () => {
            let result = parser.parse(`print("Hello, World!")\n`);
            expect(result.errors.length).to.be.eq(0);
        });
    });

});
