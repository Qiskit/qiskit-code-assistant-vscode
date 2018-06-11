/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import * as vscode from 'vscode';
import { LanguagesActivation } from './languages';
import { ActivationUtils } from './activationUtils';
import { QLogger } from './logger';

export function activate(context: vscode.ExtensionContext) {
    QLogger.verbose('Activating IBM Q Studio extension ...', this);

    ActivationUtils.showExtensionBootInfo('✨ Activating IBM Q Studio extension... ✨', false);

    let languagesActivation = new LanguagesActivation(context);

    let qasmLanguage = languagesActivation.qasmLanguageClient().start();
    context.subscriptions.push(qasmLanguage);

    let qiskitLanguage = languagesActivation.qiskitLanguageClient().start();
    context.subscriptions.push(qiskitLanguage);

    ActivationUtils.registerCommands(context);

    ActivationUtils.checkDependencies(false)
        .then(() => {
            QLogger.verbose('IBM Q Studio extension successfully loaded!', this);
            ActivationUtils.showExtensionBootInfo('🚀 IBM Q Studio extension loaded! 🚀', false);
        })
        .catch(err => {
            QLogger.error(`Dependencies error: ${err}`, this);
            vscode.window.showErrorMessage(err);
        });
}

export function deactivate() {
    QLogger.verbose('Deactivating Qiskit extension ...', this);
}
