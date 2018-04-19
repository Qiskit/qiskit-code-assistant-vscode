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
import { mock, instance } from 'ts-mockito';
import { createConnection, IConnection, IPCMessageWriter, IPCMessageReader, CompletionItem } from 'vscode-languageserver';
import { CompilationTool } from '../src/compilation';
import { QASMParser } from '../src/qasm/parser';
import { QASMSuggester } from '../src/qasm/suggester';

describe('A compilation tool', () => {

    let messageReaderMock:IPCMessageReader = mock(IPCMessageReader);
    let messageWriterMock:IPCMessageWriter = mock(IPCMessageWriter);

    let messageReader:IPCMessageReader = instance(messageReaderMock);
    let messageWriter:IPCMessageWriter = instance(messageWriterMock);

    let connection:IConnection = createConnection(messageReader, messageWriter);

    let compilationTool:CompilationTool = new CompilationTool(connection, new QASMParser(), new QASMSuggester());
    
    describe('when asked for a completion item detail', () => {
        it('will not fail if there is no option available', () => {
            let item:CompletionItem = {
                label: 'foo'
            };

            let result = compilationTool.completionDetailsFor(item);

            expect(result.detail).to.be.eq('');
        });
    });

});