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
import { LanguageClient, ServerOptions, TransportKind, LanguageClientOptions } from "vscode-languageclient/lib/main";
import { ExtensionContext } from "vscode";

export class LanguagesActivation {

    constructor(private context: ExtensionContext) {};

    qasmLanguageClient(): LanguageClient {
        let serverModule = this.context.asAbsolutePath(path.join('server', 'serverQasm.js'));

        let debugOptions = {
            execArgv: ["--nolazy", "--inspect=6009"]
        };

        let serverOptions = this.buildServerOptions(serverModule, debugOptions);

        let clientOptions = this.buildClientOptions('qasm-lang', 'qasmLang');

        return new LanguageClient('qasmLang', 'QAsm Language support', serverOptions, clientOptions);
    }

    qiskitLanguageClient(): LanguageClient {
        let serverModule = this.context.asAbsolutePath(path.join('server', 'serverQiskit.js'));

        let debugOptions = {
            execArgv: ["--nolazy", "--inspect=6010"]
        };

        let serverOptions = this.buildServerOptions(serverModule, debugOptions);

        let clientOptions = this.buildClientOptions('qiskit-lang', 'qiskitLang');

        return new LanguageClient('qiskitLang', 'QISKit support', serverOptions, clientOptions);
    }

    private buildServerOptions(serverModule: string, debugOptions: any): ServerOptions {
        return {
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
    }

    private buildClientOptions(language: string, configurationSection: string): LanguageClientOptions {
        return {
            documentSelector: [{
                scheme: 'file',
                language: language
            }],
            synchronize: {
                configurationSection: configurationSection,
                fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
            }
        }
    }

}