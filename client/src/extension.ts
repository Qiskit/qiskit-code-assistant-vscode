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

export function activate(context: vscode.ExtensionContext) {
    console.log('Activating IBM Q Studio extension ...');

    ActivationUtils.showExtensionBootInfo('✨ Activating IBM Q Studio extension... ✨');

    let languagesActivation = new LanguagesActivation(context);

    let qasmLanguage = languagesActivation.qasmLanguageClient().start();
    context.subscriptions.push(qasmLanguage);

    let qiskitLanguage = languagesActivation.qiskitLanguageClient().start();
    context.subscriptions.push(qiskitLanguage);

    ActivationUtils.registerCommands(context);

    ActivationUtils.checkDependencies()
        .then(() => {
            console.log('IBM Q Studio extension successfully loaded!');
            ActivationUtils.showExtensionBootInfo('🚀 IBM Q Studio extension loaded! 🚀');
        })
        .catch(err => {
            console.log('Dependencies error:', err);
            vscode.window.showErrorMessage(err);
        });
}

export function deactivate() {
    console.log('Deactivating Qiskit extension ...');
}
