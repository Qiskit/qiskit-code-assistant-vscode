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
import { LanguagesActivation } from './languages';
import { ActivationUtils } from './activationUtils';
import { QLogger } from './logger';

export function activate(context: vscode.ExtensionContext) {
    QLogger.verbose('Activating IBM Q Studio extension ...', this);

    vscode.window.showInformationMessage('✨ Activating IBM Q Studio extension... ✨');

    let languagesActivation = new LanguagesActivation(context);

    let qasmLanguage = languagesActivation.qasmLanguageClient().start();
    context.subscriptions.push(qasmLanguage);

    let qiskitLanguage = languagesActivation.qiskitLanguageClient().start();
    context.subscriptions.push(qiskitLanguage);

    ActivationUtils.registerCommands(context);

    ActivationUtils.checkDependencies()
        .then(() => {
            QLogger.verbose('IBM Q Studio extension successfully loaded!', this);
            vscode.window.showInformationMessage('🚀 IBM Q Studio extension loaded! 🚀');
        })
        .catch(err => {
            QLogger.error(`Dependencies error: ${err}`, this);
            vscode.window.showErrorMessage(err);
        });
}

export function deactivate() {
    QLogger.verbose('Deactivating Qiskit extension ...', this);
}
