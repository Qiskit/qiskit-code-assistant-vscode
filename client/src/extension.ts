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

import * as path from 'path';
import * as vscode from 'vscode';
import * as Q from "q";
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient';
import { CommandPaletteHelper } from "./commandPaletteHelper";
import { DependencyMgr } from "./dependencyMgr";
import { PackageMgr } from "./packageMgr";

class LanguageClientBuilder {

    constructor(private context: vscode.ExtensionContext) {}

    qasmLanguageClient(): LanguageClient {
        let serverModule = this.context.asAbsolutePath(path.join('server', 'server.js'));

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

        return new LanguageClient('qasmLang', 'QAsm Language support', serverOptions, clientOptions);
    }

    qiskitLanguageClient(): LanguageClient {
        let serverModule = this.context.asAbsolutePath(path.join('server', 'serverQiskit.js'));

        let debugOptions = {
            execArgv: ["--nolazy", "--inspect=6010"]
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
                language: 'qiskit-lang'
            }],
            synchronize: {
                configurationSection: 'qiskitLang',
                fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
            }
        }

        return new LanguageClient('qiskitLang', 'QISKit support', serverOptions, clientOptions);
    }

}

export function activate(context: vscode.ExtensionContext) {

    console.log('Activating Qiskit extension ...');

    registerQiskitCommands(context);
    registerQasmLanguageClient(context);
    registerQiskitLanguageClient(context);

    vscode.languages.registerDocumentFormattingEditProvider('qasm-lang', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): any {
            const firstLine = document.lineAt(0);

            return [vscode.TextEdit.insert(firstLine.range.start, 'Formatted QASM file\n')];
        }
    });

    DependencyMgr.checkDependencies().then((deps) => {
        console.log('All dependencies are met!');
        deps.forEach(dep => {
            console.log("Package: " + dep.Name + " Version: " +
                dep.InstalledVersion);
        });
        return Q.resolve();
        // Check for pyhton packages!
    }).then(() => {
        console.log('Check for required python packages...');
        return PackageMgr.check();
        // Iterate over the list of packages
    }).catch(error => {
        console.log('Seems like there was a problem: ' + error);
    });

    function registerQiskitCommands(context: vscode.ExtensionContext): void {
        context.subscriptions.push(vscode.commands.registerCommand(`qiskitRun`, () => {
            return CommandPaletteHelper.run()
        }));
    }

    function registerQasmLanguageClient(context: vscode.ExtensionContext): void {
        let languageClientBuilder = new LanguageClientBuilder(context);
        let qasmLanguageClient = languageClientBuilder.qasmLanguageClient().start();

        context.subscriptions.push(qasmLanguageClient);
    }

    function registerQiskitLanguageClient(context: vscode.ExtensionContext): void {
        let languageClientBuilder = new LanguageClientBuilder(context);
        let qiskitLanguageClient = languageClientBuilder.qiskitLanguageClient().start();

        context.subscriptions.push(qiskitLanguageClient);
    }

}

export function deactivate() {
    console.log('Deactivating Qiskit extension ...');
}