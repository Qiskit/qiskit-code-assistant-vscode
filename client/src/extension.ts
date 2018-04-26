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

import * as vscode from 'vscode';
import * as Q from "q";
import {DependencyMgr} from "./dependencyMgr";
import {PackageMgr} from "./packageMgr";
import { LanguagesActivation } from './languages';

export function activate(context: vscode.ExtensionContext) {

    console.log('Activating IBM Q Studio extension ...');

    vscode.window.showInformationMessage("✨ Activating IBM Q Studio extension... ✨");

    //registerQiskitCommands(context);

    let languagesActivation = new LanguagesActivation(context);

    let qasmLanguage = languagesActivation.qasmLanguageClient().start();
    context.subscriptions.push(qasmLanguage);

    let qiskitLanguage = languagesActivation.qiskitLanguageClient().start();
    context.subscriptions.push(qiskitLanguage);

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

    context.subscriptions.push(
        vscode.commands.registerCommand("qstudio.reload", () => activate(context)),
        vscode.commands.registerCommand("qstudio.checkDependencies", () => checkDependencies()),
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
                    console.log(`Package: ${dep.Name} Version: ${dep.InstalledVersion}`);
                        depsList+=(`👌 ${dep.Name} v ${dep.InstalledVersion}\n`);
                });
                vscode.window.showInformationMessage(`IBM Q Studio dependencies found! ${depsList}`);
            // Check for pyhton packages!
            }).then(() => {
                console.log('Check for required python packages...');

                //vscode.window.showInformationMessage("Checking for required python packages...");
                
                let packMgr = new PackageMgr();
                return packMgr.check()
                    .then(results => {
                        console.log(`packMgr.check extension.ts ${results}`);
                        vscode.window.showInformationMessage(results);
                        //return Q.resolve(results);
                        return resolve();
                    }).catch(err => {
                        console.log(`packMgr.check error extension.ts ${err}`);
                        return Q.reject(err);
                    });
                
            // Iterate over the list of packages
            }).catch(error => {
                console.log(`Seems like there was a problem: ${error}`);
                //vscode.window.showWarningMessage('Seems like there was a problem: ' + error);
                vscode.window.showErrorMessage(`Seems like there was a problem: ${error}`);
                return reject(error);
            });
        }
    );
}

export function deactivate() {
    console.log('Deactivating Qiskit extension ...');
}