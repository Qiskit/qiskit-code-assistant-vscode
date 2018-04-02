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
import {CommandPaletteHelper} from "./commandPaletteHelper";
import {DependencyMgr} from "./dependencyMgr";
import {PackageMgr} from "./packageMgr";

export function activate(context: vscode.ExtensionContext) {

    console.log('Activating Qiskit extension ...');

    registerQiskitCommands(context);

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

    let depMgr = new DependencyMgr();
    depMgr.checkDependencies()
    .then((deps) => {
        console.log('All dependencies are met!');
        vscode.window.showInformationMessage('All dependencies are met!');
        console.log(deps);
        deps.forEach(dep => {
            console.log("Package: " + dep.Name + " Version: " +
                dep.InstalledVersion);
                vscode.window.showInformationMessage("Package: " + dep.Name + " Version: " +
                dep.InstalledVersion);
        });
        return Q.resolve();
    // Check for pyhton packages!
    }).then(() => {
        console.log('Check for required python packages...');
        let packMgr = new PackageMgr();
        return packMgr.check().then(results => {
            console.log(results);
            vscode.window.showInformationMessage(results);
        })
    // Iterate over the list of packages
    }).catch(error => {
        console.log('Seems like there was a problem: ' + error);
        vscode.window.showErrorMessage('Seems like there was a problem: ' + error);
    });

    function registerQiskitCommands(context: vscode.ExtensionContext): void {
        context.subscriptions.push(vscode.commands.registerCommand(`qiskitRun`, () => {
            return CommandPaletteHelper.run()
        }));
    }
}

export function deactivate() {
    console.log('Deactivating Qiskit extension ...');
}