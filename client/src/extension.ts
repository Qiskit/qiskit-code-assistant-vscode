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
//import {CommandPaletteHelper} from "./commandPaletteHelper";
import {DependencyMgr} from "./dependencyMgr";
import {PackageMgr} from "./packageMgr";

import { ResultProvider } from "./resultProvider";
import { CommandExecutor } from './commandExecutor';

export function activate(context: vscode.ExtensionContext) {

    console.log('Activating IBM Q Studio extension ...');

    vscode.window.showInformationMessage("✨ Activating IBM Q Studio extension... ✨");

    //registerQiskitCommands(context);

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

    checkDependencies()
        .then(() => {
            console.log('IBM Q Studio extension succesfully loaded!');
            vscode.window.showInformationMessage("🚀 IBM Q Studio extension loaded! 🚀");
        })
        .catch(err => {
            console.log('Dependencies error:',err);
            vscode.window.showErrorMessage(err);
        })

    /*function registerQiskitCommands(context: vscode.ExtensionContext): void {
        context.subscriptions.push(vscode.commands.registerCommand(`qiskitRun`, () => {
            return CommandPaletteHelper.run()
        }));
    }*/
    let resultProvider = new ResultProvider();

    context.subscriptions.push(
        vscode.commands.registerCommand("qstudio.reload", () => activate(context)),
        vscode.commands.registerCommand("qstudio.checkDependencies", () => checkDependencies()),
        vscode.workspace.registerTextDocumentContentProvider('qiskit-preview-result', resultProvider), 
        vscode.commands.registerCommand("qstudio.runCode", () => (new CommandExecutor).execPythonActiveEditor().then(codeResult => {
            let previewUri = vscode.Uri.parse(`qiskit-preview-result://authority/result-preview`);
            resultProvider.content = codeResult;
            console.log(previewUri);
            
            vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, "Execution result")
                .then((_success) => {}, (reason) => {
                    console.log(`Error: ${reason}`);
                    vscode.window.showErrorMessage(reason);
                });
            })),
        vscode.commands.registerCommand("qstudio.discoverLocalBackends", () => (new CommandExecutor).execPythonFile('../../resources/qiskitScripts/listLocalBackends.py').then(localBackends => {
            let previewUri = vscode.Uri.parse(`qiskit-preview-result://authority/backends-preview`);
            resultProvider.content = localBackends;
            console.log(previewUri);
            
            vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, "Local backends available")
                .then((_success) => {}, (reason) => {
                    console.log(`Error: ${reason}`);
                    vscode.window.showErrorMessage(reason);
                });
            })),
        
        //vscode.commands.registerCommand("qstudio.discoverRemoteBackends", () => executionFunctions.listRemoteBackends()),
        //vscode.commands.registerCommand("qstudio.listPendingJobs", () => executionFunctions.listPendingJobs()),
        //vscode.commands.registerCommand("qstudio.listExecutedJobs", () => executionFunctions.listExecutedJobs()),
        //vscode.commands.registerCommand("qstudio.getQueueStatus", () => executionFunctions.getQueueStatus()),
        //vscode.commands.registerCommand("qstudio.getUserCredits", () => executionFunctions.getUserCredits()),
    );
}

function checkDependencies(): Q.Promise<string> {
    let depMgr = new DependencyMgr();
    return Q.Promise((resolve, reject) => {
        return depMgr.checkDependencies()
            .then((deps) => {
                console.log('Checking for Python dependencies...');
                //vscode.window.showInformationMessage("Checking for Python dependencies...");
                let depsList :string = "";
                deps.forEach(dep => {
                    console.log("Package: " + dep.Name + " Version: " +
                        dep.InstalledVersion);
                        depsList+=("👌 " + dep.Name + " v " + dep.InstalledVersion+"\n");
                });
                vscode.window.showInformationMessage("IBM Q Studio dependencies found! "+depsList);
            // Check for pyhton packages!
            }).then(() => {
                console.log('Check for required python packages...');

                //vscode.window.showInformationMessage("Checking for required python packages...");
                
                let packMgr = new PackageMgr();
                return packMgr.check()
                    .then(results => {
                        console.log("packMgr.check extension.ts",results);
                        vscode.window.showInformationMessage(results);
                        //return Q.resolve(results);
                        return resolve();
                    }).catch(err => {
                        console.log("packMgr.check error extension.ts",err);
                        return Q.reject(err);
                    });
                
            // Iterate over the list of packages
            }).catch(error => {
                console.log('Seems like there was a problem: ' + error);
                //vscode.window.showWarningMessage('Seems like there was a problem: ' + error);
                vscode.window.showErrorMessage('Seems like there was a problem: ' + error);
                return reject(error);
            });
        }
    );
}

export function deactivate() {
    console.log('Deactivating Qiskit extension ...');
}