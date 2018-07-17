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
                let config = vscode.workspace.getConfiguration('ibm-q-studio');
                let displayBubbles = config.get('qiskit.token');
                if (displayBubbles === true) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            } catch (err) {
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
