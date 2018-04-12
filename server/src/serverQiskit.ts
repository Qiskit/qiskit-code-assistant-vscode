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

import {
    IPCMessageReader,
    IPCMessageWriter,
    createConnection,
    IConnection,
    TextDocuments,
    InitializeResult,
    TextDocumentPositionParams,
    CompletionItem
} from 'vscode-languageserver';
import {
    CompilationTool
} from './compilation';
import { QiskitSuggester } from './qiskit/suggester';
import { QiskitParser } from './qiskit/parser';

let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));

let documents: TextDocuments = new TextDocuments();
documents.listen(connection);

let compilationTool: CompilationTool = new CompilationTool(connection, new QiskitParser(), new QiskitSuggester());

connection.onInitialize((_params): InitializeResult => {

    connection.console.log('QISKit language support is being initialized ...');

    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            completionProvider: {
                resolveProvider: true
            }
        }
    };
});

documents.onDidChangeContent((change) => {
    compilationTool.validateDocument(change.document);
});

connection.onDidChangeConfiguration(() => {
    documents.all().forEach(compilationTool.validateDocument);
});

connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
    return compilationTool.availableCompletions(_textDocumentPosition);
});

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    return compilationTool.completionDetailsFor(item);
});

connection.listen();
