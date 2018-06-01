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
import * as vscode from "vscode";
import * as Q from "q";
import { DependencyMgr } from "./dependencyMgr";
import { PackageMgr } from "./packageMgr";
import { Util } from "./utils";
import { ResultProvider } from "./resultProvider";
import { CommandExecutor } from "./commandExecutor";
import { VizManager } from "./visualizations";

export namespace ActivationUtils {

    export function checkDependencies(): Q.Promise<string> {
        let depMgr = new DependencyMgr();
        return Q.Promise((resolve, reject) => {
            return depMgr
                .checkDependencies()
                .then(deps => {
                    console.log("Checking for Python dependencies...");
                    //vscode.window.showInformationMessage("Checking for Python dependencies...");
                    let depsList: string = "";
                    deps.forEach(dep => {
                        console.log(
                            `Package: ${dep.Name} Version: ${dep.InstalledVersion}`
                        );
                        depsList += `👌 ${dep.Name} v ${dep.InstalledVersion}\n`;
                    });
                    vscode.window.showInformationMessage(
                        `IBM Q Studio dependencies found! ${depsList}`
                    );
                    // Check for pyhton packages!
                })
                .then(() => {
                    console.log("Check for required python packages...");
                    //vscode.window.showInformationMessage("Checking for required python packages...");

                    let packMgr = new PackageMgr();
                    return packMgr
                        .check()
                        .then(results => {
                            console.log(`packMgr.check extension.ts ${results}`);
                            vscode.window.showInformationMessage(results);
                            //return Q.resolve(results);
                            return resolve();
                        })
                        .catch(err => {
                            console.log(`packMgr.check error extension.ts ${err}`);
                            return Q.reject(err);
                        });

                    // Iterate over the list of packages
                })
                .catch(error => {
                    console.log(`Seems like there was a problem: ${error}`);
                    //vscode.window.showWarningMessage('Seems like there was a problem: ' + error);
                    vscode.window.showErrorMessage(
                        `Seems like there was a problem: ${error}`
                    );
                    return reject(error);
                });
        });
    }

    export function registerCommands(context: vscode.ExtensionContext): Q.Promise<string> {
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
            ),
            vscode.commands.registerCommand("qstudio.activateVisualizations", () =>
                ActivationUtils.setVisualizationFlag(true)
                    .then(result => {
                        vscode.window.showInformationMessage(result);
                    })
                    .catch(err => {
                        vscode.window.showErrorMessage(err);
                    })
            ),
            vscode.commands.registerCommand("qstudio.deactivateVisualizations", () =>
                ActivationUtils.setVisualizationFlag(false)
                    .then(result => {
                        vscode.window.showInformationMessage(result);
                    })
                    .catch(err => {
                        vscode.window.showErrorMessage(err);
                    })
            )
        );
    }

    export function initQConfig(): Q.Promise<string> {
        let apiToken = null;
        let hub = null;
        let group = null;
        let project = null;
        let url = null;
        return Q.Promise((resolve, reject) => {
            return vscode.window
                .showInputBox({
                    ignoreFocusOut: true,
                    prompt: `👉 Let's configure your QConfig! Please introduce your API Token 👈`,
                    password: true
                })
                .then((token: string | undefined) => {
                    if (token !== undefined) {
                        apiToken = token;
                        return vscode.window.showInputBox({
                            ignoreFocusOut: true,
                            prompt: `👉 Ok! Do you need to set up your hub/group/project and custom URL (probably not) 👈`,
                            placeHolder:
                                "Type YES if you need that, or NO if you do not need that (or not sure to need)"
                        });
                    } else {
                        return reject(
                            "Empty API Token, your QConfig won't be created"
                        );
                    }
                })
                .then((selection: string | undefined) => {
                    if (selection.toUpperCase() === "YES") {
                        vscode.window
                            .showInputBox({
                                ignoreFocusOut: true,
                                prompt: `👉 Let's configure your QConfig! Please introduce your Hub 👈`,
                                placeHolder: "Your hub's name"
                            })
                            .then((_hub: string | undefined) => {
                                if (_hub !== "" || _hub !== undefined) {
                                    hub = _hub;
                                }
                                return vscode.window.showInputBox({
                                    ignoreFocusOut: true,
                                    prompt: `👉 Let's configure your QConfig! Please introduce your Group 👈`,
                                    placeHolder: "Your group's name"
                                });
                            })
                            .then((_group: string | undefined) => {
                                if (_group !== "" || _group !== undefined) {
                                    group = _group;
                                }
                                return vscode.window.showInputBox({
                                    ignoreFocusOut: true,
                                    prompt: `👉 Let's configure your QConfig! Please introduce your Project 👈`,
                                    placeHolder: "Your project's name"
                                });
                            })
                            .then((_project: string | undefined) => {
                                if (_project !== "" || _project !== undefined) {
                                    project = _project;
                                }
                                return vscode.window.showInputBox({
                                    ignoreFocusOut: true,
                                    prompt: `👉 Let's configure your QConfig! Please introduce your custom URL 👈`,
                                    placeHolder: "Your custom's URL"
                                });
                            })
                            .then((_url: string | undefined) => {
                                if (_url !== "" || _url !== undefined) {
                                    console.log("url", url);
                                    url = _url;
                                }
                                saveQConfig(apiToken, hub, group, project, url)
                                    .then(result => {
                                        return resolve(result);
                                    })
                                    .catch(err => {
                                        return reject(err);
                                    });
                            });
                    } else {
                        // The user does not need to configure the Hub/Group/Project and URL in the QConfig.py
                        saveQConfig(apiToken, "", "", "", "")
                            .then(result => {
                                return resolve(result);
                            })
                            .catch(err => {
                                return reject(err);
                            });
                    }
                });
        });
    }

    export function saveQConfig(
        apiToken: string,
        hub: string | undefined,
        group: string | undefined,
        project: string | undefined,
        url: string | undefined
    ): Q.Promise<string> {
        // vscode.window.showInformationMessage("Saving the QConfig...");

        return Q.Promise((resolve, reject) => {
            try {
                const config = vscode.workspace.getConfiguration("ibm-q-studio");
                try {
                    return config
                        .update("qiskit.token", apiToken, true)
                        .then(() => {
                            if (hub !== undefined || hub !== "") {
                                config.update("qiskit.hub", hub, true).then(() => { return null; });
                            } else {
                                config.update("qiskit.hub", "", true).then(() => { return null; });
                            }
                        })
                        .then(() => {
                            if (url !== undefined || url !== "") {
                                config.update("qiskit.url", url, true).then(() => { return null; });
                            } else {
                                config.update("qiskit.url", "", true).then(() => { return null; });
                            }
                        })
                        .then(() => {
                            if (group !== undefined || group !== "") {
                                config.update("qiskit.group", group, true).then(() => { return null; });
                            } else {
                                config.update("qiskit.group", "", true).then(() => { return null; });
                            }
                        })
                        .then(() => {
                            if (project !== undefined || project !== "") {
                                config.update(
                                    "qiskit.project",
                                    project,
                                    true
                                ).then(() => { return null; });
                            } else {
                                config.update("qiskit.project", "", true).then(() => { return null; });
                            }
                        })
                        .then(() => {
                            return vscode.window.showInputBox({
                                ignoreFocusOut: true,
                                prompt: `👉 QConfig saved! Do you want to reload the extension? 👈`,
                                placeHolder: "YES",
                                value: "YES"
                            });
                        }).then((selection: string | undefined) => {
                            if (selection === "YES") {
                                return resolve(
                                    vscode.commands.executeCommand("workbench.action.reloadWindow"));
                            }
                            else {
                                return resolve("Reload your extension manually to use your brand-new QConfig");
                            }
                        }
                        );
                } catch (err) {
                    return reject("🙁 QConfig cannot be saved! 🙁");
                }
            } catch (err) {
                return reject("Error saving QConfig!");
            }
        });
    }
    export function setVisualizationFlag(
        flag: boolean,
    ): Q.Promise<string> {
        return Q.Promise((resolve, reject) => {
            try {
                let config = vscode.workspace.getConfiguration("ibm-q-studio");
                try {
                    config.update("config.visualizationsFlag", flag, true)
                        .then(() => {
                            let message: string;
                            if (flag === true) {
                                message = "Now the visualizations for code execution are enabled!";
                            } else {
                                message = "Now the visualizations for code execution are disabled!";
                            }
                            return vscode.window.showInputBox({
                                ignoreFocusOut: true,
                                prompt: `👉 ${message} Do you want to reload the extension? 👈`,
                                placeHolder: "YES",
                                value: "YES"
                            });
                        }).then((selection: string | undefined) => {
                            if (selection === "YES") {
                                return resolve(
                                    vscode.commands.executeCommand("workbench.action.reloadWindow"));
                            }
                            else {
                                return resolve("Reload your extension manually to use your brand-new visualization flag");
                            }
                        }
                        );
                } catch (err) {
                    return reject("ERROR: The flag for visualizations in code execution has not been changed");
                }
            } catch (err) {
                return reject("Error modifying the flag for visualizations");
            }
        });
    }
}
