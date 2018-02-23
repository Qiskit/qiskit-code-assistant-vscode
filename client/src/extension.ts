'use strict';

import * as path from 'path';
import * as vscode from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient';

export function activate(context: vscode.ExtensionContext) {

    let serverModule = context.asAbsolutePath(path.join('server', 'server.js'));
    
    let debugOptions = {
        execArgv: ["--nolazy", "--inspect=6009"]
    };

    let serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions
        }
    }

    let clientOptions: LanguageClientOptions = {
        documentSelector: [{
            scheme: 'file',
            language: 'qasm-lang'
        }],
        synchronize: {
            configurationSection: 'qasmLang',
            fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
        }
    }

    let disposable = new LanguageClient('qasmLang', 'QAsm Language support', serverOptions, clientOptions).start();

    context.subscriptions.push(disposable);

    vscode.languages.registerDocumentFormattingEditProvider('qasm-lang', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): any {
            const firstLine = document.lineAt(0);
            
            return [vscode.TextEdit.insert(firstLine.range.start, 'Formatted QASM file\n')];
        }
    });
}