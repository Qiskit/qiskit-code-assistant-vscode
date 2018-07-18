/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as vscode from 'vscode';
import * as Q from 'q';
import { DependencyMgr } from './dependencies/dependencyMgr';
import { Util } from './utils';
import { ResultProvider } from './resultProvider';
import { CommandExecutor } from './commandExecutor';
import { VizManager } from './visualizations';
import { QLogger } from './logger';
import { DeviceStatusVisualization } from './visualizations/deviceStatusVisualization';
import { PackageManager } from './packages/packageManager';
import { ChildProcessCommandExecutor } from './pip/pipCommandExecutor';
import { PipExecutor } from './pip/pipExecutor';
import { QiskitVSCodeConfiguration } from './configuration';
import { PackageInfo } from './interfaces';
import { PyPiExecutor } from './pip/pypiExecutor';

export namespace ActivationUtils {
    export function checkFirstRun(): Q.Promise<string> {
        return Q.Promise((resolve, reject) => {
            try {
                let config = vscode.workspace.getConfiguration('qiskit-vscode');
                let firstRun = config.get('config.firstRun');

                if (firstRun === true) {
                    vscode.workspace
                        .getConfiguration('qiskit-vscode')
                        .update('config.firstRun', false, vscode.ConfigurationTarget.Global)
                        .then(() => {
                            return resolve(true);
                        });
                } else {
                    return resolve(false);
                }
            } catch (err) {
                return reject('Error modifying the flag for the first run of the extension');
            }
        });
    }

    export function showInfoBubbles(verbose: boolean | false): Q.Promise<string> {
        return Q.Promise((resolve, reject) => {
            if (checkFirstRun() === true) {
                return resolve(true);
            } else {
                try {
                    let config = vscode.workspace.getConfiguration('qiskit-vscode');
                    let displayBubbles = config.get('config.displayBootInfo');
                    if (verbose === true || displayBubbles === true) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                } catch (err) {
                    return reject('Error getting the displayBootInfo flag');
                }
            }
        });
    }

    export function showExtensionBootInfo(message: string, verbose: boolean | false) {
        showInfoBubbles(verbose).then(result => {
            if (result === true) {
                vscode.window.showInformationMessage(message);
            } else {
                QLogger.verbose(message, this);
            }
        });
    }

    export function checkDependencies(verbose: boolean | false): Q.Promise<string> {
        let depMgr = new DependencyMgr();
        return Q.Promise((resolve, reject) => {
            return depMgr
                .checkDependencies()
                .then(deps => {
                    QLogger.verbose('Checking for Python dependencies...', this);
                    //vscode.window.showInformationMessage("Checking for Python dependencies...");
                    let depsList = '';
                    deps.forEach(dep => {
                        QLogger.verbose(`Package: ${dep.name} Version: ${dep.installedVersion}`, this);
                        depsList += `👌 ${dep.name} v ${dep.installedVersion}\n`;
                    });
                    showExtensionBootInfo(`Qiskit VSCode Extension dependencies found! ${depsList}`, verbose);
                    // Check for pyhton packages!
                })
                .then(() => {
                    QLogger.verbose('Check for required python packages...', this);
                    //vscode.window.showInformationMessage("Checking for required python packages...");

                    let commandExecutor = new ChildProcessCommandExecutor();
                    let pipExecutor = new PipExecutor(commandExecutor);
                    let pypiExecutor = new PyPiExecutor();
                    let packageManager = new PackageManager(pipExecutor, pypiExecutor);

                    let notInstalled = (packageInfo: PackageInfo) =>
                        QLogger.info(`Go to install ${packageInfo.name}`, this);
                    let oldVersion = (packageInfo: PackageInfo) =>
                        QLogger.info(`Go to update ${packageInfo.name}`, this);

                    packageManager.verifyAndApply(
                        QiskitVSCodeConfiguration.requiredPackages(),
                        notInstalled,
                        oldVersion
                    );
                    return resolve();
                })
                .catch(error => {
                    QLogger.error(`Seems like there was a problem: ${error}`, this);
                    vscode.window.showErrorMessage(`Seems like there was a problem: ${error}`);
                    return reject(error);
                });
        });
    }

    export function registerCommands(context: vscode.ExtensionContext): Q.Promise<string> {
        const config = vscode.workspace.getConfiguration('qiskit-vscode');
        const executeQASMScript = Util.getOSDependentPath('../../resources/qiskitScripts/executeQASM.py');
        const localBackendsScript = Util.getOSDependentPath('../../resources/qiskitScripts/listLocalBackends.py');
        const remoteBackendsScript = Util.getOSDependentPath('../../resources/qiskitScripts/listRemoteBackends.py');
        const pendingJobsScript = Util.getOSDependentPath('../../resources/qiskitScripts/listPendingJobs.py');
        const executedJobsScript = Util.getOSDependentPath('../../resources/qiskitScripts/listExecutedJobs.py');
        const getQueueStatusScript = Util.getOSDependentPath('../../resources/qiskitScripts/getQueueStatus.py');
        const getUserCreditsScript = Util.getOSDependentPath('../../resources/qiskitScripts/getUserCredits.py');

        context.subscriptions.push(
            vscode.commands.registerCommand('qiskit-vscode.checkDependencies', () =>
                ActivationUtils.checkDependencies(true)
            ),
            vscode.commands.registerCommand('qiskit-vscode.runQiskitCode', () =>
                CommandExecutor.execPythonActiveEditor().then(codeResult => {
                    let resultProvider = new ResultProvider();
                    vscode.workspace.registerTextDocumentContentProvider('qiskit-preview-result', resultProvider);
                    let previewUri = vscode.Uri.parse(`qiskit-preview-result://authority/result-preview`);

                    const codeFile = vscode.window.activeTextEditor.document;
                    codeFile.save();
                    resultProvider.displayContent(
                        VizManager.createViz(codeFile.fileName.toString(), codeResult),
                        previewUri
                    );

                    vscode.commands
                        .executeCommand(
                            'vscode.previewHtml',
                            previewUri,
                            vscode.ViewColumn.Two,
                            'Execution result - Qiskit'
                        )
                        .then(
                            _success => {},
                            reason => {
                                QLogger.error(`Error: ${reason}`, this);
                                vscode.window.showErrorMessage(reason);
                            }
                        );
                })
            ),
            vscode.commands.registerCommand('qiskit-vscode.runQASMCode', () =>
                CommandExecutor.execQasmActiveEditor(executeQASMScript).then(codeResult => {
                    let resultProvider = new ResultProvider();
                    vscode.workspace.registerTextDocumentContentProvider('qasm-preview-result', resultProvider);
                    let previewUri = vscode.Uri.parse(`qasm-preview-result://authority/result-preview`);
                    let execPath = Util.getOSDependentPath(executeQASMScript);
                    resultProvider.displayContent(VizManager.createViz(execPath, codeResult), previewUri);

                    vscode.commands
                        .executeCommand(
                            'vscode.previewHtml',
                            previewUri,
                            vscode.ViewColumn.Two,
                            'Execution result - QASM'
                        )
                        .then(
                            _success => {},
                            reason => {
                                QLogger.error(`Error: ${reason}`, this);
                                vscode.window.showErrorMessage(reason);
                            }
                        );
                })
            ),
            vscode.commands.registerCommand('qiskit-vscode.discoverLocalBackends', () =>
                CommandExecutor.execPythonFile(localBackendsScript, []).then(localBackends => {
                    let resultProvider = new ResultProvider();
                    vscode.workspace.registerTextDocumentContentProvider('qiskit-localBackends-result', resultProvider);
                    let previewUri = vscode.Uri.parse(`qiskit-localBackends-result://authority/backends-preview`);

                    let execPath = Util.getOSDependentPath(localBackendsScript);
                    resultProvider.displayContent(VizManager.createViz(execPath, localBackends), previewUri);

                    vscode.commands
                        .executeCommand(
                            'vscode.previewHtml',
                            previewUri,
                            vscode.ViewColumn.Two,
                            'Local backends available'
                        )
                        .then(
                            _success => {},
                            reason => {
                                QLogger.error(`Error: ${reason}`, this);
                                vscode.window.showErrorMessage(reason);
                            }
                        );
                })
            ),

            vscode.commands.registerCommand('qiskit-vscode.discoverRemoteBackends', () =>
                Util.isQConfigConfigured()
                    .then(result => {
                        if (result === true) {
                            CommandExecutor.execPythonFile(remoteBackendsScript, [
                                '--apiToken',
                                config.get('ibmq.token'),
                                '--url',
                                config.get('ibmq.url'),
                                '--hub',
                                config.get('ibmq.hub'),
                                '--group',
                                config.get('ibmq.group'),
                                '--project',
                                config.get('ibmq.project')
                            ]).then(remoteBackends => {
                                let resultProvider = new ResultProvider();
                                vscode.workspace.registerTextDocumentContentProvider(
                                    'qiskit-remoteBackends-result',
                                    resultProvider
                                );
                                let previewUri = vscode.Uri.parse(
                                    `qiskit-remoteBackends-result://authority/backends-preview`
                                );
                                let execPath = Util.getOSDependentPath(remoteBackendsScript);
                                resultProvider.displayContent(
                                    VizManager.createViz(execPath, remoteBackends),
                                    previewUri
                                );

                                vscode.commands
                                    .executeCommand(
                                        'vscode.previewHtml',
                                        previewUri,
                                        vscode.ViewColumn.Two,
                                        'Remote backends available'
                                    )
                                    .then(
                                        _success => {},
                                        reason => {
                                            QLogger.error(`Error: ${reason}`, this);
                                            vscode.window.showErrorMessage(reason);
                                        }
                                    );
                            });
                        } else {
                            QLogger.info(`QConfig is not configured. The command won't be launched`, this);
                            Util.modalWarningOfferQConfigSetup()
                                .then(result => {
                                    if (result === false) {
                                        QLogger.error(`QConfig setup rejected by the user`, this);
                                        vscode.window.showErrorMessage(
                                            `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                        );
                                    }
                                })
                                .catch(error => {
                                    QLogger.error(error, this);
                                    vscode.window.showErrorMessage(
                                        `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                    );
                                });
                        }
                    })
                    .catch(err => {
                        QLogger.error(`Error checking the IBMQ Token: ${err}`, this);
                        vscode.window.showErrorMessage(err);
                    })
            ),

            vscode.commands.registerCommand('qiskit-vscode.getDevicesStatus', () =>
                Util.isQConfigConfigured()
                    .then(result => {
                        if (result === true) {
                            CommandExecutor.execPythonFile(remoteBackendsScript, [
                                '--apiToken',
                                config.get('ibmq.token'),
                                '--url',
                                config.get('ibmq.url'),
                                '--hub',
                                config.get('ibmq.hub'),
                                '--group',
                                config.get('ibmq.group'),
                                '--project',
                                config.get('ibmq.project'),
                                '--status',
                                'True'
                            ]).then(remoteDevicesStatus => {
                                let resultProvider = new ResultProvider();
                                vscode.workspace.registerTextDocumentContentProvider(
                                    'qiskit-devicesStatus-result',
                                    resultProvider
                                );
                                let previewUri = vscode.Uri.parse(
                                    `qiskit-devicesStatus-result://authority/status-preview`
                                );

                                resultProvider.displayContent(
                                    DeviceStatusVisualization.render(remoteDevicesStatus),
                                    previewUri
                                );

                                vscode.commands
                                    .executeCommand(
                                        'vscode.previewHtml',
                                        previewUri,
                                        vscode.ViewColumn.Two,
                                        'Status for remote devices'
                                    )
                                    .then(
                                        _success => {},
                                        reason => {
                                            QLogger.error(`Error: ${reason}`, this);
                                            vscode.window.showErrorMessage(reason);
                                        }
                                    );
                            });
                        } else {
                            QLogger.info(`QConfig is not configured. The command won't be launched`, this);
                            Util.modalWarningOfferQConfigSetup()
                                .then(result => {
                                    if (result === false) {
                                        QLogger.error(`QConfig setup rejected by the user`, this);
                                        vscode.window.showErrorMessage(
                                            `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                        );
                                    }
                                })
                                .catch(error => {
                                    QLogger.error(error, this);
                                    vscode.window.showErrorMessage(
                                        `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                    );
                                });
                        }
                    })
                    .catch(err => {
                        QLogger.error(`Error checking the IBMQ Token: ${err}`, this);
                        vscode.window.showErrorMessage(err);
                    })
            ),

            vscode.commands.registerCommand('qiskit-vscode.listPendingJobs', () =>
                Util.isQConfigConfigured()
                    .then(result => {
                        if (result === true) {
                            CommandExecutor.execPythonFile(pendingJobsScript, [
                                '--apiToken',
                                config.get('ibmq.token'),
                                '--url',
                                config.get('ibmq.url'),
                                '--hub',
                                config.get('ibmq.hub'),
                                '--group',
                                config.get('ibmq.group'),
                                '--project',
                                config.get('ibmq.project')
                            ]).then(pendingJobs => {
                                let resultProvider = new ResultProvider();
                                vscode.workspace.registerTextDocumentContentProvider(
                                    'qiskit-pendingJobs-result',
                                    resultProvider
                                );
                                let previewUri = vscode.Uri.parse(`qiskit-pendingJobs-result://authority/list-preview`);

                                let execPath = Util.getOSDependentPath(pendingJobsScript);
                                resultProvider.displayContent(VizManager.createViz(execPath, pendingJobs), previewUri);

                                vscode.commands
                                    .executeCommand(
                                        'vscode.previewHtml',
                                        previewUri,
                                        vscode.ViewColumn.Two,
                                        "User's pending jobs"
                                    )
                                    .then(
                                        _success => {},
                                        reason => {
                                            QLogger.error(`Error: ${reason}`, this);
                                            vscode.window.showErrorMessage(reason);
                                        }
                                    );
                            });
                        } else {
                            QLogger.info(`QConfig is not configured. The command won't be launched`, this);
                            Util.modalWarningOfferQConfigSetup()
                                .then(result => {
                                    if (result === false) {
                                        QLogger.error(`QConfig setup rejected by the user`, this);
                                        vscode.window.showErrorMessage(
                                            `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                        );
                                    }
                                })
                                .catch(error => {
                                    QLogger.error(error, this);
                                    vscode.window.showErrorMessage(
                                        `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                    );
                                });
                        }
                    })
                    .catch(err => {
                        QLogger.error(`Error checking the IBMQ Token: ${err}`, this);
                        vscode.window.showErrorMessage(err);
                    })
            ),

            vscode.commands.registerCommand('qiskit-vscode.listExecutedJobs', () =>
                Util.isQConfigConfigured()
                    .then(result => {
                        if (result === true) {
                            CommandExecutor.execPythonFile(executedJobsScript, [
                                '--apiToken',
                                config.get('ibmq.token'),
                                '--url',
                                config.get('ibmq.url'),
                                '--hub',
                                config.get('ibmq.hub'),
                                '--group',
                                config.get('ibmq.group'),
                                '--project',
                                config.get('ibmq.project')
                            ]).then(executedJobs => {
                                let resultProvider = new ResultProvider();
                                vscode.workspace.registerTextDocumentContentProvider(
                                    'qiskit-executedJobs-result',
                                    resultProvider
                                );
                                let previewUri = vscode.Uri.parse(
                                    `qiskit-executedJobs-result://authority/list-preview`
                                );

                                let execPath = Util.getOSDependentPath(executedJobsScript);
                                resultProvider.displayContent(VizManager.createViz(execPath, executedJobs), previewUri);

                                vscode.commands
                                    .executeCommand(
                                        'vscode.previewHtml',
                                        previewUri,
                                        vscode.ViewColumn.Two,
                                        "User's executed jobs"
                                    )
                                    .then(
                                        _success => {},
                                        reason => {
                                            QLogger.error(`Error: ${reason}`, this);
                                            vscode.window.showErrorMessage(reason);
                                        }
                                    );
                            });
                        } else {
                            QLogger.info(`QConfig is not configured. The command won't be launched`, this);
                            Util.modalWarningOfferQConfigSetup()
                                .then(result => {
                                    if (result === false) {
                                        QLogger.error(`QConfig setup rejected by the user`, this);
                                        vscode.window.showErrorMessage(
                                            `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                        );
                                    }
                                })
                                .catch(error => {
                                    QLogger.error(error, this);
                                    vscode.window.showErrorMessage(
                                        `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                    );
                                });
                        }
                    })
                    .catch(err => {
                        QLogger.error(`Error checking the IBMQ Token: ${err}`, this);
                        vscode.window.showErrorMessage(err);
                    })
            ),

            vscode.commands.registerCommand('qiskit-vscode.getQueueStatus', () =>
                Util.isQConfigConfigured()
                    .then(result => {
                        if (result === true) {
                            CommandExecutor.execPythonFile(getQueueStatusScript, [
                                '--apiToken',
                                config.get('ibmq.token'),
                                '--url',
                                config.get('ibmq.url'),
                                '--hub',
                                config.get('ibmq.hub'),
                                '--group',
                                config.get('ibmq.group'),
                                '--project',
                                config.get('ibmq.project')
                            ]).then(queueStatus => {
                                let resultProvider = new ResultProvider();
                                vscode.workspace.registerTextDocumentContentProvider(
                                    'qiskit-queueStatus-result',
                                    resultProvider
                                );
                                let previewUri = vscode.Uri.parse(
                                    `qiskit-queueStatus-result://authority/status-preview`
                                );

                                let execPath = Util.getOSDependentPath(getQueueStatusScript);
                                resultProvider.displayContent(VizManager.createViz(execPath, queueStatus), previewUri);

                                vscode.commands
                                    .executeCommand(
                                        'vscode.previewHtml',
                                        previewUri,
                                        vscode.ViewColumn.Two,
                                        'Queue status'
                                    )
                                    .then(
                                        _success => {},
                                        reason => {
                                            QLogger.error(`Error: ${reason}`, this);
                                            vscode.window.showErrorMessage(reason);
                                        }
                                    );
                            });
                        } else {
                            QLogger.info(`QConfig is not configured. The command won't be launched`, this);
                            Util.modalWarningOfferQConfigSetup()
                                .then(result => {
                                    if (result === false) {
                                        QLogger.error(`QConfig setup rejected by the user`, this);
                                        vscode.window.showErrorMessage(
                                            `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                        );
                                    }
                                })
                                .catch(error => {
                                    QLogger.error(error, this);
                                    vscode.window.showErrorMessage(
                                        `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                    );
                                });
                        }
                    })
                    .catch(err => {
                        QLogger.error(`Error checking the IBMQ Token: ${err}`, this);
                        vscode.window.showErrorMessage(err);
                    })
            ),

            vscode.commands.registerCommand('qiskit-vscode.getUserCredits', () =>
                Util.isQConfigConfigured()
                    .then(result => {
                        if (result === true) {
                            CommandExecutor.execPythonFile(getUserCreditsScript, [
                                '--apiToken',
                                config.get('ibmq.token'),
                                '--url',
                                config.get('ibmq.url'),
                                '--hub',
                                config.get('ibmq.hub'),
                                '--group',
                                config.get('ibmq.group'),
                                '--project',
                                config.get('ibmq.project')
                            ]).then(userCredits => {
                                let resultProvider = new ResultProvider();
                                vscode.workspace.registerTextDocumentContentProvider(
                                    'qiskit-userCredits-result',
                                    resultProvider
                                );
                                let previewUri = vscode.Uri.parse(
                                    `qiskit-userCredits-result://authority/credits-preview`
                                );

                                let execPath = Util.getOSDependentPath(getUserCreditsScript);
                                resultProvider.displayContent(VizManager.createViz(execPath, userCredits), previewUri);

                                vscode.commands
                                    .executeCommand(
                                        'vscode.previewHtml',
                                        previewUri,
                                        vscode.ViewColumn.Two,
                                        "User's credits"
                                    )
                                    .then(
                                        _success => {},
                                        reason => {
                                            QLogger.error(`Error: ${reason}`, this);
                                            vscode.window.showErrorMessage(reason);
                                        }
                                    );
                            });
                        } else {
                            QLogger.info(`QConfig is not configured. The command won't be launched`, this);
                            Util.modalWarningOfferQConfigSetup()
                                .then(result => {
                                    if (result === false) {
                                        QLogger.error(`QConfig setup rejected by the user`, this);
                                        vscode.window.showErrorMessage(
                                            `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                        );
                                    }
                                })
                                .catch(error => {
                                    QLogger.error(error, this);
                                    vscode.window.showErrorMessage(
                                        `QConfig is not configured. The command won't be launched. Setup your QConfig using the extension before launching this command`
                                    );
                                });
                        }
                    })
                    .catch(err => {
                        QLogger.error(`Error checking the IBMQ Token: ${err}`, this);
                        vscode.window.showErrorMessage(err);
                    })
            ),
            vscode.commands.registerCommand('qiskit-vscode.initQConfig', () =>
                ActivationUtils.initQConfig()
                    .then(result => {
                        vscode.window.showInformationMessage(result);
                    })
                    .catch(err => {
                        vscode.window.showErrorMessage(err);
                    })
            ),
            vscode.commands.registerCommand('qiskit-vscode.activateVisualizations', () =>
                ActivationUtils.setVisualizationFlag(true)
                    .then(result => {
                        vscode.window.showInformationMessage(result);
                        Util.reloadAfterSavingSettings();
                    })
                    .catch(err => {
                        vscode.window.showErrorMessage(err);
                    })
            ),
            vscode.commands.registerCommand('qiskit-vscode.deactivateVisualizations', () =>
                ActivationUtils.setVisualizationFlag(false)
                    .then(result => {
                        vscode.window.showInformationMessage(result);
                        Util.reloadAfterSavingSettings();
                    })
                    .catch(err => {
                        vscode.window.showErrorMessage(err);
                    })
            ),
            vscode.commands.registerCommand('qiskit-vscode.enableBootInfo', () =>
                ActivationUtils.setBootInfoFlag(true)
                    .then(result => {
                        vscode.window.showInformationMessage(result);
                        Util.reloadAfterSavingSettings();
                    })
                    .catch(err => {
                        vscode.window.showErrorMessage(err);
                    })
            ),
            vscode.commands.registerCommand('qiskit-vscode.disableBootInfo', () =>
                ActivationUtils.setBootInfoFlag(false)
                    .then(result => {
                        vscode.window.showInformationMessage(result);
                        Util.reloadAfterSavingSettings();
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
                                'Type YES if you need that, or NO if you do not need that (or not sure to need)'
                        });
                    } else {
                        return reject("Empty API Token, your QConfig won't be created");
                    }
                })
                .then((selection: string | undefined) => {
                    if (selection === undefined || selection.toUpperCase() !== 'YES') {
                        // The user does not need to configure the Hub/Group/Project and URL in the QConfig.py
                        saveQConfig(apiToken, '', '', '', '')
                            .then(result => {
                                return resolve(result);
                            })
                            .catch(err => {
                                return reject(err);
                            });
                    } else {
                        // The user need to configure the Hub/Group/Project and URL in the QConfig.py
                        vscode.window
                            .showInputBox({
                                ignoreFocusOut: true,
                                prompt: `👉 Let's configure your QConfig! Please introduce your Hub 👈`,
                                placeHolder: "Your hub's name"
                            })
                            .then((_hub: string | undefined) => {
                                if (_hub !== '' || _hub !== undefined) {
                                    hub = _hub;
                                }
                                return vscode.window.showInputBox({
                                    ignoreFocusOut: true,
                                    prompt: `👉 Let's configure your QConfig! Please introduce your Group 👈`,
                                    placeHolder: "Your group's name"
                                });
                            })
                            .then((_group: string | undefined) => {
                                if (_group !== '' || _group !== undefined) {
                                    group = _group;
                                }
                                return vscode.window.showInputBox({
                                    ignoreFocusOut: true,
                                    prompt: `👉 Let's configure your QConfig! Please introduce your Project 👈`,
                                    placeHolder: "Your project's name"
                                });
                            })
                            .then((_project: string | undefined) => {
                                if (_project !== '' || _project !== undefined) {
                                    project = _project;
                                }
                                return vscode.window.showInputBox({
                                    ignoreFocusOut: true,
                                    prompt: `👉 Let's configure your QConfig! Please introduce your custom URL 👈`,
                                    placeHolder: "Your custom's URL"
                                });
                            })
                            .then((_url: string | undefined) => {
                                if (_url !== '' || _url !== undefined) {
                                    QLogger.verbose(`url: ${url}`, this);
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
                const config = vscode.workspace.getConfiguration('qiskit-vscode');
                try {
                    config
                        .update('ibmq.token', apiToken, vscode.ConfigurationTarget.Global)
                        .then(() => {
                            if (hub !== undefined || hub !== '') {
                                config.update('ibmq.hub', hub, vscode.ConfigurationTarget.Global).then(() => {
                                    return null;
                                });
                            } else {
                                config.update('ibmq.hub', '', vscode.ConfigurationTarget.Global).then(() => {
                                    return null;
                                });
                            }
                        })
                        .then(() => {
                            if (url !== undefined || url !== '') {
                                config.update('ibmq.url', url, vscode.ConfigurationTarget.Global).then(() => {
                                    return null;
                                });
                            } else {
                                config.update('ibmq.url', '', vscode.ConfigurationTarget.Global).then(() => {
                                    return null;
                                });
                            }
                        })
                        .then(() => {
                            if (group !== undefined || group !== '') {
                                config.update('ibmq.group', group, vscode.ConfigurationTarget.Global).then(() => {
                                    return null;
                                });
                            } else {
                                config.update('ibmq.group', '', vscode.ConfigurationTarget.Global).then(() => {
                                    return null;
                                });
                            }
                        })
                        .then(() => {
                            if (project !== undefined || project !== '') {
                                config.update('ibmq.project', project, vscode.ConfigurationTarget.Global).then(() => {
                                    return null;
                                });
                            } else {
                                config.update('ibmq.project', '', vscode.ConfigurationTarget.Global).then(() => {
                                    return null;
                                });
                            }
                        })
                        .then(() => {
                            Util.reloadAfterSavingSettings().then(result => {
                                return resolve(result);
                            });
                        });
                } catch (err) {
                    return reject('🙁 QConfig cannot be saved! 🙁');
                }
            } catch (err) {
                return reject('Error saving QConfig!');
            }
        });
    }
    export function setVisualizationFlag(flag: boolean): Q.Promise<string> {
        return Q.Promise((resolve, reject) => {
            try {
                vscode.workspace
                    .getConfiguration('qiskit-vscode')
                    .update('config.visualizationsFlag', flag, vscode.ConfigurationTarget.Global)
                    .then(() => {
                        if (flag === true) {
                            return resolve('Now the visualizations for code execution are enabled!');
                        } else {
                            return resolve('Now the visualizations for code execution are disabled!');
                        }
                    });
            } catch (err) {
                return reject('Error modifying the flag for visualizations');
            }
        });
    }

    export function setBootInfoFlag(flag: boolean): Q.Promise<string> {
        return Q.Promise((resolve, reject) => {
            try {
                vscode.workspace
                    .getConfiguration('qiskit-vscode')
                    .update('config.displayBootInfo', flag, vscode.ConfigurationTarget.Global)
                    .then(() => {
                        if (flag === true) {
                            return resolve('Now the visual information about activation is enabled!');
                        } else {
                            return resolve('Now the visual information about activation is disabled!');
                        }
                    });
            } catch (err) {
                return reject('Error modifying the flag for displaying the extension boot info');
            }
        });
    }
}
