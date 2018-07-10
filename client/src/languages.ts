/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import * as path from 'path';
import * as vscode from 'vscode';
import { LanguageClient, ServerOptions, TransportKind, LanguageClientOptions } from 'vscode-languageclient/lib/main';
import { ExtensionContext } from 'vscode';

export class LanguagesActivation {
    constructor(private context: ExtensionContext) {}

    qasmLanguageClient(): LanguageClient {
        let serverModule = this.context.asAbsolutePath(path.join('server', 'serverQasm.js'));

        let debugOptions = {
            execArgv: ['--nolazy', '--inspect=6009']
        };

        let serverOptions = this.buildServerOptions(serverModule, debugOptions);

        let clientOptions = this.buildClientOptions('qasm-lang', 'qasmLang');

        return new LanguageClient('qasmLang', 'QAsm Language support', serverOptions, clientOptions);
    }

    qiskitLanguageClient(): LanguageClient {
        let serverModule = this.context.asAbsolutePath(path.join('server', 'serverQiskit.js'));

        let debugOptions = {
            execArgv: ['--nolazy', '--inspect=6010']
        };

        let serverOptions = this.buildServerOptions(serverModule, debugOptions);

        let clientOptions = this.buildClientOptions('python', 'qiskitLang');

        return new LanguageClient('qiskitLang', 'Qiskit support', serverOptions, clientOptions);
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
        };
    }

    private buildClientOptions(language: string, configurationSection: string): LanguageClientOptions {
        return {
            documentSelector: [
                {
                    scheme: 'file',
                    language
                }
            ],
            synchronize: {
                configurationSection,
                fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
            }
        };
    }
}
