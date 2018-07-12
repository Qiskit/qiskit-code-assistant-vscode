/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

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
} from 'vscode-languageserver/lib/main';
import { CompilationTool } from './compilation';
import { QiskitSuggester } from './qiskit/suggester';
import { QiskitParser } from './qiskit/parser';

let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));

let documents: TextDocuments = new TextDocuments();
documents.listen(connection);

let compilationTool: CompilationTool = new CompilationTool(connection, new QiskitParser(), new QiskitSuggester());

connection.onInitialize((_params): InitializeResult => {
    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            completionProvider: {
                resolveProvider: true
            }
        }
    };
});

documents.onDidChangeContent(change => {
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
