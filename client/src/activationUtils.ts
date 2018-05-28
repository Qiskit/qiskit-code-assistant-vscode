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
                                return config.update("qiskit.hub", hub, true);
                            } else {
                                return config.update("qiskit.hub", "", true);
                            }
                        })
                        .then(() => {
                            if (url !== undefined || url !== "") {
                                return config.update("qiskit.url", url, true);
                            } else {
                                return config.update("qiskit.url", "", true);
                            }
                        })
                        .then(() => {
                            if (group !== undefined || group !== "") {
                                return config.update("qiskit.group", group, true);
                            } else {
                                return config.update("qiskit.group", "", true);
                            }
                        })
                        .then(() => {
                            if (project !== undefined || project !== "") {
                                return config.update(
                                    "qiskit.project",
                                    project,
                                    true
                                );
                            } else {
                                return config.update("qiskit.project", "", true);
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
                                return resolve("Reload your extension manually to use your new-brand QConfig");
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
}
