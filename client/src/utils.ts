/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */
import * as path from 'path';
import * as Q from 'q';
import * as vscode from 'vscode';
import { QLogger } from './logger';

export namespace Util {
    export function getOSDependentPath(_path: string): string {
        let pathInOS = path.resolve(__dirname, _path);
        if (process.platform === 'win32') {
            pathInOS = pathInOS.replace(/\\/g, '/');
        }
        return pathInOS;
    }
    export function isQConfigConfigured(): Q.Promise<boolean> {
        return Q.Promise((resolve, reject) => {
            try {
                let config = vscode.workspace.getConfiguration('qiskit-vscode');
                let tokenSetup = config.get('ibmq.token');
                if (tokenSetup !== '' && tokenSetup !== null && tokenSetup !== undefined) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            } catch (err) {
                return reject(err);
            }
        });
    }
    export function modalWarningOfferQConfigSetup(): Q.Promise<boolean> {
        return Q.Promise((resolve, reject) => {
            try {
                vscode.window
                    .showWarningMessage(
                        `QConfig is not configured. The command won't be launched. Do you want to setup the QConfig now?`,
                        'Ok, configure QConfig',
                        'Dismiss'
                    )
                    .then(selection => {
                        if (selection === 'Ok, configure QConfig') {
                            QLogger.verbose(`Clicked on OK!`, this);
                            vscode.commands.executeCommand('qiskit-vscode.initQConfig');
                            return resolve(true);
                        } else if (selection === 'Dismiss') {
                            QLogger.verbose(`Clicked on Dismiss!`, this);
                            return resolve(false);
                        } else {
                            QLogger.verbose(`Clicked on other element! Redirecting to configuration anyway`, this);
                            vscode.commands.executeCommand('qiskit-vscode.initQConfig');
                            return resolve(true);
                        }
                    });
            } catch (err) {
                QLogger.error(`Modal error offer QConfig setup has not been displayed`, this);
                return reject(err);
            }
        });
    }
    export function reloadAfterSavingSettings(): Q.Promise<string> {
        // vscode.window.showInformationMessage("Saving the QConfig...");
        return Q.Promise((resolve, reject) => {
            try {
                return vscode.window
                    .showInputBox({
                        ignoreFocusOut: true,
                        prompt: `👉 Settings saved! Do you want to reload the extension? 👈`,
                        placeHolder: 'YES',
                        value: 'YES'
                    })
                    .then((selection: string | undefined) => {
                        if (selection === undefined || selection.toUpperCase() !== 'YES') {
                            return resolve('Reload your extension manually to use your new config');
                        } else {
                            return resolve(vscode.commands.executeCommand('workbench.action.reloadWindow'));
                        }
                    });
            } catch (err) {
                return reject('offerExtensionReload failed');
            }
        });
    }
}
