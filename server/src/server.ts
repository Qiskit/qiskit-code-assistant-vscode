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

let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));

let documents: TextDocuments = new TextDocuments();
documents.listen(connection);

let compilationTool: CompilationTool = new CompilationTool(connection);

connection.onInitialize((_params): InitializeResult => {

    console.log('Extension being initialized ... create something that could be needed here');

    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            completionProvider: {
                resolveProvider: true
            }
        }
    }
});

documents.onDidChangeContent((change) => {
    compilationTool.validateDocument(change.document);
});

connection.onDidChangeConfiguration(() => {

    console.log('Configuration changed so all docments must be reparsed');

    documents.all().forEach(compilationTool.validateDocument);
});

connection.onDidChangeWatchedFiles((_change) => {
    connection.console.log('We received a file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
    return compilationTool.availableCompletions(_textDocumentPosition);
});

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    return compilationTool.completionDetailsFor(item);
});

/*
connection.onDidOpenTextDocument((params) => {
	// A text document got opened in VSCode.
	// params.uri uniquely identifies the document. For documents store on disk this is a file URI.
	// params.text the initial full content of the document.
	connection.console.log(`${params.textDocument.uri} opened.`);
});
connection.onDidChangeTextDocument((params) => {
	// The content of a text document did change in VSCode.
	// params.uri uniquely identifies the document.
	// params.contentChanges describe the content changes to the document.
	connection.console.log(`${params.textDocument.uri} changed: ${JSON.stringify(params.contentChanges)}`);
});
connection.onDidCloseTextDocument((params) => {
	// A text document got closed in VSCode.
	// params.uri uniquely identifies the document.
	connection.console.log(`${params.textDocument.uri} closed.`);
});
*/

// Listen on the connection
connection.listen();
