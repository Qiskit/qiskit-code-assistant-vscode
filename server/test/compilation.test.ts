/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { mock, instance } from 'ts-mockito';
import {
    createConnection,
    IConnection,
    IPCMessageWriter,
    IPCMessageReader,
    CompletionItem
} from 'vscode-languageserver';
import { CompilationTool } from '../src/compilation';
import { QASMParser } from '../src/qasm/parser';
import { QASMSuggester } from '../src/qasm/suggester';

describe('A compilation tool', () => {
    let messageReaderMock: IPCMessageReader = mock(IPCMessageReader);
    let messageWriterMock: IPCMessageWriter = mock(IPCMessageWriter);

    let messageReader: IPCMessageReader = instance(messageReaderMock);
    let messageWriter: IPCMessageWriter = instance(messageWriterMock);

    let connection: IConnection = createConnection(messageReader, messageWriter);

    let compilationTool: CompilationTool = new CompilationTool(connection, new QASMParser(), new QASMSuggester());

    describe('when asked for a completion item detail', () => {
        it('will not fail if there is no option available', () => {
            let item: CompletionItem = {
                label: 'foo'
            };

            let result = compilationTool.completionDetailsFor(item);

            expect(result.detail).toEqual('');
        });
    });
});
