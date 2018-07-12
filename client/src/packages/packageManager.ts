/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { PackageInfo } from '../interfaces';
import { QLogger } from '../logger';
import { PipExecutor } from '../pip/pipExecutor';
import { InstallationCallback } from './types';
import { PipPackage } from '../pipPackage';
import { PyPiExecutor } from '../pip/pyPiExecutor';
import * as vscode from 'vscode';
import { Version } from '../version';

export class PackageManager {
    private pipPack: PipPackage;
    constructor(private pipExecutor: PipExecutor, private pypiExecutor: PyPiExecutor) {}

    verifyAndApply(
        packages: PackageInfo[],
        notInstalledCallback: InstallationCallback,
        oldVersionCallback: InstallationCallback
    ) {
        packages.forEach(pkg => {
            QLogger.debug(`Checking package ${pkg.name} ${pkg.version} installation`, this);
            this.verifyInstallation(pkg, notInstalledCallback, oldVersionCallback);
        });
    }

    private async verifyInstallation(
        packageInfo: PackageInfo,
        notInstalledCallback: InstallationCallback,
        oldVersionCallback: InstallationCallback
    ) {
        try {
            const systemPackageInfo = await this.pipExecutor.getPackageInfo(packageInfo.name);

            const needsMandatoryUpdate = systemPackageInfo.version.isLesser(packageInfo.version);
            if (needsMandatoryUpdate) {
                QLogger.verbose(`Starting mandatory update process for ${packageInfo.name} ...`, this);
                const updateAccepted = this.offerUpdate(packageInfo, packageInfo.version, needsMandatoryUpdate);
                if (updateAccepted) {
                    this.pipPack
                        .update(packageInfo.name)
                        .then(() => {
                            oldVersionCallback(packageInfo);
                        })
                        .catch(err => {
                            QLogger.error(`${err}`, this);
                            oldVersionCallback(packageInfo);
                        });
                } else {
                    oldVersionCallback(packageInfo);
                }
            } else {
                QLogger.verbose(`Starting non-mandatory update process for ${packageInfo.name} ...`, this);
                const pypiPackageInfo = await this.pypiExecutor.getPackageInfo(packageInfo.name);

                const availableUpdate = pypiPackageInfo.version.isGreater(systemPackageInfo.version);
                if (availableUpdate) {
                    QLogger.verbose(`Starting update process for ${packageInfo.name} ...`, this);

                    const updateAccepted = await this.offerUpdate(
                        packageInfo,
                        pypiPackageInfo.version,
                        needsMandatoryUpdate
                    );

                    if (updateAccepted) {
                        this.pipPack
                            .update(packageInfo.name)
                            .then(() => {
                                oldVersionCallback(packageInfo);
                            })
                            .catch(err => {
                                QLogger.error(`${err}`, this);
                                oldVersionCallback(packageInfo);
                            });
                    } else {
                        oldVersionCallback(packageInfo);
                    }
                }
            }
        } catch (err) {
            QLogger.verbose(`Starting installation process for ${packageInfo.name} ...`, this);

            notInstalledCallback(packageInfo);
        }
    }

    private async offerUpdate(packageInfo: PackageInfo, offerVersion: Version, mandatory: boolean) {
        let updateMsg = `There is a new ${packageInfo.name} release (v${offerVersion})! Update ${
            packageInfo.name
        } now?`;
        if (mandatory) {
            updateMsg = `The ${
                packageInfo.name
            } version you have installed is older than the version required (v${offerVersion}). Update ${
                packageInfo.name
            } now?`;
        }
        vscode.window.showInformationMessage(updateMsg, 'Ok', 'Dismiss').then(selection => {
            if (selection === 'Ok') {
                console.log('Clicked on OK!');
                return true;
            } else if (selection === 'Dismiss') {
                return false;
                console.log('Clicked on Dismiss!');
            } else {
                return false;
                console.log('Clicked on other element!');
            }
        });
    }

    private async update(packageName: string) {
        vscode.window.showInformationMessage(`Updating ${packageName}... (this may take some time, be patient 🙏)`);

        //TODO -> include update code
    }
}
