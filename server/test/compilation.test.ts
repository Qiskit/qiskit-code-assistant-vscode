import { expect } from 'chai';
import { mock, instance } from 'ts-mockito';
import { createConnection, IConnection, IPCMessageWriter, IPCMessageReader, CompletionItem } from 'vscode-languageserver';
import { CompilationTool } from '../src/compilation';

describe('A compilation tool', () => {

    let messageReaderMock:IPCMessageReader = mock(IPCMessageReader);
    let messageWriterMock:IPCMessageWriter = mock(IPCMessageWriter);

    let messageReader:IPCMessageReader = instance(messageReaderMock);
    let messageWriter:IPCMessageWriter = instance(messageWriterMock);

    let connection:IConnection = createConnection(messageReader, messageWriter);

    let compilationTool:CompilationTool = new CompilationTool(connection);
    
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