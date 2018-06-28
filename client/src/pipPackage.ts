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
import { Version } from './version';
import { IPackageInfo, IPackage } from './interfaces';
import { PipWrapper } from './pipWrapper';
import { PyPiWrapper } from './pypiWrapper';
import { ActivationUtils } from './activationUtils';
import { QLogger } from './logger';

export class PipPackage implements IPackage {
    //TODO: Get Info form local installation
    public info: IPackageInfo = {
        name: '',
        version: Version.fromString('-1.-1.-1'),
        summary: '',
        location: '',
        dependencies: '',
        getPackageInfo: () => {}
    };

    private pip: PipWrapper = new PipWrapper();
    private pypi: PyPiWrapper = new PyPiWrapper();

    constructor(name: string, version: string) {
        this.info.name = name;
        this.info.version = Version.fromString(version);
    }

    public checkVersion(pkgVersion: string, verbose: boolean | false): Q.Promise<void> {
        QLogger.verbose(`pkgVersion: ${pkgVersion}`, this);
        let packageName = this.info.name;
        return this.pip
            .getPackageInfo(this.info.name)
            .then((installedPkgInfo: IPackageInfo) => {
                //console.log(installedPkgInfo);
                this.info = installedPkgInfo;
                // Let's check for new versions
                return this.pypi.getPackageInfo(this.info.name);
            })
            .then((pkgInfo: IPackageInfo) => {
                // If there is a new version, offer to the user the update.

                if (this.info.version.isLesser(Version.fromString(pkgVersion.toString()))) {
                    QLogger.verbose(`New mandatory version ${pkgInfo.version.toString()}`, this);
                    return vscode.window.showInputBox({
                        ignoreFocusOut: true,
                        prompt: `👉 There's a new mandatory ${packageName} release: ${pkgInfo.version.toString()}. You must upgrade it to enjoy this extension 👈`,
                        value: 'Yes'
                    });
                } else {
                    if (pkgInfo.version.isGreater(this.info.version)) {
                        QLogger.verbose(`New version ${pkgInfo.version.toString()}`, this);
                        return vscode.window.showInputBox({
                            ignoreFocusOut: true,
                            prompt: `👉 There's a new ${packageName} release: ${pkgInfo.version.toString()}. Do you want to upgrade? 👈`,
                            value: 'Yes'
                        });
                    }
                    return null;
                }
                // There's a new version... If user want to update, do that!
            })
            .then((selection: string | undefined) => {
                //Getting the selection from last showInputBox
                if (selection === 'Yes') {
                    return this.update(packageName);
                } else {
                    if (this.info.version.isLesser(Version.fromString(pkgVersion.toString()))) {
                        return Q.reject(
                            `The ${packageName} version you have installed is older than the version required (v.${pkgVersion}). The extension will not work properly`
                        );
                    } else {
                        return null;
                    }
                }
            })
            .then(() => {
                // Check if the software is installed, if not offer the install
                return this.pip
                    .list()
                    .then(result => {
                        //console.log(`pip list ${result}`);
                        if (result.search(packageName) === -1) {
                            QLogger.verbose(`${packageName} not installed`, this);
                            return vscode.window.showInputBox({
                                ignoreFocusOut: true,
                                prompt: `👉 You don't have installed ${packageName}. Do you want to install it? 👈`,
                                value: 'Yes'
                            });
                        } else {
                            QLogger.verbose(`${packageName} is already installed`, this);
                            ActivationUtils.showExtensionBootInfo(`👌 ${packageName} is already installed`, verbose);
                            return Q.resolve();
                        }
                    })
                    .then((selection: string | undefined) => {
                        //Getting the selection from last showInputBox
                        if (selection === 'Yes') {
                            this.install(packageName)
                                .then(result => {
                                    return Q.resolve(result);
                                })
                                .catch(err => {
                                    return Q.reject(err);
                                });
                        }
                    })
                    .catch(err => {
                        QLogger.error(`Error: pip list ${err}`, this);
                        return Q.reject(err);
                    });
            })
            .catch(err => {
                QLogger.error(err, this);
                if (String(err).includes('version you have installed is older than the version required') === false) {
                    return this.pip
                        .list()
                        .then(result => {
                            //console.log(`pip list ${result}`);
                            if (result.search(packageName) === -1) {
                                QLogger.verbose(`${packageName} not installed`, this);
                                return vscode.window.showInputBox({
                                    ignoreFocusOut: true,
                                    prompt: `👉 You don't have installed ${packageName}. Do you want to install it? 👈`,
                                    value: 'Yes'
                                });
                            } else {
                                QLogger.verbose(`${packageName} is already installed`, this);
                                ActivationUtils.showExtensionBootInfo(`👌 ${packageName} is already installed`, false);
                                return Q.resolve();
                            }
                        })
                        .then((selection: string | undefined) => {
                            //Getting the selection from last showInputBox
                            if (selection === 'Yes') {
                                this.install(packageName)
                                    .then(result => {
                                        return Q.resolve(result);
                                    })
                                    .catch(err => {
                                        return Q.reject(err);
                                    });
                            } else {
                                return Q.reject('QISKit not installed. The extension will not work properly');
                            }
                        })
                        .catch(err => {
                            QLogger.error(`Error: pip list ${err}`, this);
                            return Q.reject(err);
                        });
                } else {
                    return Q.reject(err);
                }
            });
    }

    public update(packageName: string): Q.Promise<string> {
        vscode.window.showInformationMessage(`Updating ${packageName}... (this may take some time, be patient 🙏)`);
        return this.pip
            .update(packageName)
            .then(stdout => {
                QLogger.verbose(stdout, this);
                //return Q.resolve();
            })
            .then(result => {
                QLogger.verbose(result, this);
                vscode.window.showInformationMessage(`${packageName} updated! 🎉🎉🎉`);
                return Q.resolve();
            })
            .catch(error => {
                QLogger.error(error, this);
                vscode.window.showErrorMessage(`ERROR: Couldn't upgrade ${packageName}. ${error}`);
                return Q.reject(error);
            });
    }

    public install(packageName: string): Q.Promise<string> {
        vscode.window.showInformationMessage(`Installing ${packageName}... (this may take some time, be patient 🙏)`);
        return this.pip
            .install(packageName)
            .then(stdout => {
                QLogger.verbose(stdout, this);
                //return Q.resolve();
            })
            .then(result => {
                QLogger.verbose(result, this);
                vscode.window.showInformationMessage(`${packageName} installed! 🎉🎉🎉`);
                return Q.resolve();
            })
            .catch(error => {
                QLogger.error(error, this);
                vscode.window.showErrorMessage(`ERROR: Couldn't install ${packageName}. ${error}`);
                return Q.reject(error);
            });
    }
}
