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

"use strict";

import * as vscode from "vscode";
import { LanguagesActivation } from "./languages";

import { ResultProvider } from "./resultProvider";
import { CommandExecutor } from "./commandExecutor";
import { VizManager } from "./visualizations";
import { Util } from "./utils";
import { ActivationUtils } from "./activationUtils";

export function activate(context: vscode.ExtensionContext) {
    console.log("Activating IBM Q Studio extension ...");

    vscode.window.showInformationMessage(
        "✨ Activating IBM Q Studio extension... ✨"
    );

    //registerQiskitCommands(context);

    let languagesActivation = new LanguagesActivation(context);

    let qasmLanguage = languagesActivation.qasmLanguageClient().start();
    context.subscriptions.push(qasmLanguage);

    let qiskitLanguage = languagesActivation.qiskitLanguageClient().start();
    context.subscriptions.push(qiskitLanguage);

    /*
    vscode.languages.registerDocumentFormattingEditProvider('qasm-lang', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): any {
            const firstLine = document.lineAt(0);
            
            return [vscode.TextEdit.insert(firstLine.range.start, 'Formatted QASM file\n')];
        }
    });
    */

    ActivationUtils.checkDependencies()
        .then(() => {
            console.log("IBM Q Studio extension successfully loaded!");
            vscode.window.showInformationMessage(
                "🚀 IBM Q Studio extension loaded! 🚀"
            );
        })
        .catch(err => {
            console.log("Dependencies error:", err);
            vscode.window.showErrorMessage(err);
        });

    /*function registerQiskitCommands(context: vscode.ExtensionContext): void {
        context.subscriptions.push(vscode.commands.registerCommand(`qiskitRun`, () => {
            return CommandPaletteHelper.run()
        }));
    }*/

    const config = vscode.workspace.getConfiguration("ibm-q-studio");
    const executeQASMScript = Util.getOSDependentPath(
        "../../resources/qiskitScripts/executeQASM.py"
    );
    const localBackendsScript = Util.getOSDependentPath(
        "../../resources/qiskitScripts/listLocalBackends.py"
    );
    const remoteBackendsScript = Util.getOSDependentPath(
        "../../resources/qiskitScripts/listRemoteBackends.py"
    );
    const pendingJobsScript = Util.getOSDependentPath(
        "../../resources/qiskitScripts/listPendingJobs.py"
    );
    const executedJobsScript = Util.getOSDependentPath(
        "../../resources/qiskitScripts/listExecutedJobs.py"
    );
    const getQueueStatusScript = Util.getOSDependentPath(
        "../../resources/qiskitScripts/getQueueStatus.py"
    );
    const getUserCreditsScript = Util.getOSDependentPath(
        "../../resources/qiskitScripts/getUserCredits.py"
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("qstudio.reload", () =>
            activate(context)
        ),
        vscode.commands.registerCommand("qstudio.checkDependencies", () =>
            ActivationUtils.checkDependencies()
        ),
        vscode.commands.registerCommand("qstudio.runQISKitCode", () =>
            CommandExecutor.execPythonActiveEditor().then(codeResult => {
                let resultProvider = new ResultProvider();
                vscode.workspace.registerTextDocumentContentProvider(
                    "qiskit-preview-result",
                    resultProvider
                );
                let previewUri = vscode.Uri.parse(
                    `qiskit-preview-result://authority/result-preview`
                );

                const codeFile = vscode.window.activeTextEditor.document;
                codeFile.save();
                resultProvider.displayContent(
                    VizManager.createViz(
                        codeFile.fileName.toString(),
                        codeResult
                    ),
                    previewUri
                );

                vscode.commands
                    .executeCommand(
                        "vscode.previewHtml",
                        previewUri,
                        vscode.ViewColumn.Two,
                        "Execution result - QISKit"
                    )
                    .then(
                        _success => { },
                        reason => {
                            console.log(`Error: ${reason}`);
                            vscode.window.showErrorMessage(reason);
                        }
                    );
            })
        ),
        vscode.commands.registerCommand("qstudio.runQASMCode", () =>
            CommandExecutor.execQasmActiveEditor(executeQASMScript).then(
                codeResult => {
                    let resultProvider = new ResultProvider();
                    vscode.workspace.registerTextDocumentContentProvider(
                        "qasm-preview-result",
                        resultProvider
                    );
                    let previewUri = vscode.Uri.parse(
                        `qasm-preview-result://authority/result-preview`
                    );
                    let execPath = Util.getOSDependentPath(
                        executeQASMScript
                    );
                    resultProvider.displayContent(
                        VizManager.createViz(execPath, codeResult),
                        previewUri
                    );

                    vscode.commands
                        .executeCommand(
                            "vscode.previewHtml",
                            previewUri,
                            vscode.ViewColumn.Two,
                            "Execution result - QASM"
                        )
                        .then(
                            _success => { },
                            reason => {
                                console.log(`Error: ${reason}`);
                                vscode.window.showErrorMessage(reason);
                            }
                        );
                }
            )
        ),
        vscode.commands.registerCommand("qstudio.discoverLocalBackends", () =>
            CommandExecutor.execPythonFile(localBackendsScript, []).then(
                localBackends => {
                    let resultProvider = new ResultProvider();
                    vscode.workspace.registerTextDocumentContentProvider(
                        "qiskit-localBackends-result",
                        resultProvider
                    );
                    let previewUri = vscode.Uri.parse(
                        `qiskit-localBackends-result://authority/backends-preview`
                    );

                    let execPath = Util.getOSDependentPath(
                        localBackendsScript
                    );
                    resultProvider.displayContent(
                        VizManager.createViz(execPath, localBackends),
                        previewUri
                    );

                    vscode.commands
                        .executeCommand(
                            "vscode.previewHtml",
                            previewUri,
                            vscode.ViewColumn.Two,
                            "Local backends available"
                        )
                        .then(
                            _success => { },
                            reason => {
                                console.log(`Error: ${reason}`);
                                vscode.window.showErrorMessage(reason);
                            }
                        );
                }
            )
        ),

        vscode.commands.registerCommand("qstudio.discoverRemoteBackends", () =>
            CommandExecutor.execPythonFile(remoteBackendsScript, [
                "--apiToken",
                config.get("qiskit.token"),
                "--url",
                config.get("qiskit.url"),
                "--hub",
                config.get("qiskit.hub"),
                "--group",
                config.get("qiskit.group"),
                "--project",
                config.get("qiskit.project")
            ]).then(remoteBackends => {
                let resultProvider = new ResultProvider();
                vscode.workspace.registerTextDocumentContentProvider(
                    "qiskit-remoteBackends-result",
                    resultProvider
                );
                let previewUri = vscode.Uri.parse(
                    `qiskit-remoteBackends-result://authority/backends-preview`
                );
                let execPath = Util.getOSDependentPath(
                    remoteBackendsScript
                );
                resultProvider.displayContent(
                    VizManager.createViz(execPath, remoteBackends),
                    previewUri
                );

                vscode.commands
                    .executeCommand(
                        "vscode.previewHtml",
                        previewUri,
                        vscode.ViewColumn.Two,
                        "Remote backends available"
                    )
                    .then(
                        _success => { },
                        reason => {
                            console.log(`Error: ${reason}`);
                            vscode.window.showErrorMessage(reason);
                        }
                    );
            })
        ),

        vscode.commands.registerCommand("qstudio.getDevicesStatus", () =>
            CommandExecutor.execPythonFile(remoteBackendsScript, [
                "--apiToken",
                config.get("qiskit.token"),
                "--url",
                config.get('qiskit.url'),
                "--hub",
                config.get('qiskit.hub'),
                "--group",
                config.get('qiskit.group'),
                "--project",
                config.get('qiskit.project'),
                "--status", "True"
            ]).then(remoteDevicesStatus => {
                let resultProvider = new ResultProvider();
                vscode.workspace.registerTextDocumentContentProvider(
                    'qiskit-devicesStatus-result',
                    resultProvider
                );
                let previewUri = vscode.Uri.parse(
                    `qiskit-devicesStatus-result://authority/status-preview`
                );
                let execPath = Util.getOSDependentPath(
                    remoteBackendsScript
                );
                resultProvider.displayContent(
                    VizManager.createViz(execPath, remoteDevicesStatus),
                    previewUri
                );

                vscode.commands
                    .executeCommand(
                        'vscode.previewHtml',
                        previewUri,
                        vscode.ViewColumn.Two,
                        "Status for remote devices"
                    )
                    .then(
                        _success => { },
                        reason => {
                            console.log(`Error: ${reason}`);
                            vscode.window.showErrorMessage(reason);
                        }
                    );
            })
        ),

        vscode.commands.registerCommand("qstudio.listPendingJobs", () =>
            CommandExecutor.execPythonFile(pendingJobsScript, [
                "--apiToken",
                config.get("qiskit.token"),
                "--url",
                config.get("qiskit.url"),
                "--hub",
                config.get("qiskit.hub"),
                "--group",
                config.get("qiskit.group"),
                "--project",
                config.get("qiskit.project")
            ]).then(pendingJobs => {
                let resultProvider = new ResultProvider();
                vscode.workspace.registerTextDocumentContentProvider(
                    "qiskit-pendingJobs-result",
                    resultProvider
                );
                let previewUri = vscode.Uri.parse(
                    `qiskit-pendingJobs-result://authority/list-preview`
                );

                let execPath = Util.getOSDependentPath(
                    pendingJobsScript
                );
                resultProvider.displayContent(
                    VizManager.createViz(execPath, pendingJobs),
                    previewUri
                );

                vscode.commands
                    .executeCommand(
                        "vscode.previewHtml",
                        previewUri,
                        vscode.ViewColumn.Two,
                        "User's pending jobs"
                    )
                    .then(
                        _success => { },
                        reason => {
                            console.log(`Error: ${reason}`);
                            vscode.window.showErrorMessage(reason);
                        }
                    );
            })
        ),

        vscode.commands.registerCommand("qstudio.listExecutedJobs", () =>
            CommandExecutor.execPythonFile(executedJobsScript, [
                "--apiToken",
                config.get("qiskit.token"),
                "--url",
                config.get("qiskit.url"),
                "--hub",
                config.get("qiskit.hub"),
                "--group",
                config.get("qiskit.group"),
                "--project",
                config.get("qiskit.project")
            ]).then(executedJobs => {
                let resultProvider = new ResultProvider();
                vscode.workspace.registerTextDocumentContentProvider(
                    "qiskit-executedJobs-result",
                    resultProvider
                );
                let previewUri = vscode.Uri.parse(
                    `qiskit-executedJobs-result://authority/list-preview`
                );

                let execPath = Util.getOSDependentPath(
                    executedJobsScript
                );
                resultProvider.displayContent(
                    VizManager.createViz(execPath, executedJobs),
                    previewUri
                );

                vscode.commands
                    .executeCommand(
                        "vscode.previewHtml",
                        previewUri,
                        vscode.ViewColumn.Two,
                        "User's executed jobs"
                    )
                    .then(
                        _success => { },
                        reason => {
                            console.log(`Error: ${reason}`);
                            vscode.window.showErrorMessage(reason);
                        }
                    );
            })
        ),

        vscode.commands.registerCommand("qstudio.getQueueStatus", () =>
            CommandExecutor.execPythonFile(getQueueStatusScript, [
                "--apiToken",
                config.get("qiskit.token"),
                "--url",
                config.get("qiskit.url"),
                "--hub",
                config.get("qiskit.hub"),
                "--group",
                config.get("qiskit.group"),
                "--project",
                config.get("qiskit.project")
            ]).then(queueStatus => {
                let resultProvider = new ResultProvider();
                vscode.workspace.registerTextDocumentContentProvider(
                    "qiskit-queueStatus-result",
                    resultProvider
                );
                let previewUri = vscode.Uri.parse(
                    `qiskit-queueStatus-result://authority/status-preview`
                );

                let execPath = Util.getOSDependentPath(
                    getQueueStatusScript
                );
                resultProvider.displayContent(
                    VizManager.createViz(execPath, queueStatus),
                    previewUri
                );

                vscode.commands
                    .executeCommand(
                        "vscode.previewHtml",
                        previewUri,
                        vscode.ViewColumn.Two,
                        "Queue status"
                    )
                    .then(
                        _success => { },
                        reason => {
                            console.log(`Error: ${reason}`);
                            vscode.window.showErrorMessage(reason);
                        }
                    );
            })
        ),

        vscode.commands.registerCommand("qstudio.getUserCredits", () =>
            CommandExecutor.execPythonFile(getUserCreditsScript, [
                "--apiToken",
                config.get("qiskit.token"),
                "--url",
                config.get("qiskit.url"),
                "--hub",
                config.get("qiskit.hub"),
                "--group",
                config.get("qiskit.group"),
                "--project",
                config.get("qiskit.project")
            ]).then(userCredits => {
                let resultProvider = new ResultProvider();
                vscode.workspace.registerTextDocumentContentProvider(
                    "qiskit-userCredits-result",
                    resultProvider
                );
                let previewUri = vscode.Uri.parse(
                    `qiskit-userCredits-result://authority/credits-preview`
                );

                let execPath = Util.getOSDependentPath(
                    getUserCreditsScript
                );
                resultProvider.displayContent(
                    VizManager.createViz(execPath, userCredits),
                    previewUri
                );

                vscode.commands
                    .executeCommand(
                        "vscode.previewHtml",
                        previewUri,
                        vscode.ViewColumn.Two,
                        "User's credits"
                    )
                    .then(
                        _success => { },
                        reason => {
                            console.log(`Error: ${reason}`);
                            vscode.window.showErrorMessage(reason);
                        }
                    );
            })
        ),
        vscode.commands.registerCommand("qstudio.initQConfig", () =>
            ActivationUtils.initQConfig()
                .then(result => {
                    vscode.window.showInformationMessage(result);
                })
                .catch(err => {
                    vscode.window.showErrorMessage(err);
                })
        )
    );
}

export function deactivate() {
    console.log("Deactivating Qiskit extension ...");
}
