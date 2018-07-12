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
import { PyPiExecutor } from '../pip/pyPiExecutor';
import * as vscode from 'vscode';
import { Version } from '../version';

export class PackageManager {
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
                const updateAccepted = await this.offerUpdate(packageInfo, packageInfo.version, needsMandatoryUpdate);
                if (updateAccepted) {
                    const updated = await this.update(packageInfo.name);
                    if (updated === true) {
                        QLogger.error(`Package ${packageInfo} updated`, this);
                        oldVersionCallback(packageInfo);
                    } else {
                        QLogger.error(`Package ${packageInfo} do not updated`, this);
                        oldVersionCallback(packageInfo);
                    }
                } else {
                    oldVersionCallback(packageInfo);
                }
            } else {
                QLogger.verbose(`Starting non-mandatory update process for ${packageInfo.name} ...`, this);
                const pypiPackageInfo = await this.pypiExecutor.getPackageInfo(packageInfo.name);
                const availableUpdate = await pypiPackageInfo.version.isGreater(systemPackageInfo.version);
                if (availableUpdate === true) {
                    QLogger.verbose(`Starting update process for ${packageInfo.name} ...`, this);

                    if ((await this.offerUpdate(packageInfo, pypiPackageInfo.version, needsMandatoryUpdate)) === true) {
                        const updated = await this.update(packageInfo.name);
                        if (updated) {
                            QLogger.error(`Package ${packageInfo} updated`, this);
                            oldVersionCallback(packageInfo);
                        } else {
                            QLogger.error(`Package ${packageInfo} do not updated`, this);
                            oldVersionCallback(packageInfo);
                        }
                    } else {
                        oldVersionCallback(packageInfo);
                    }
                }
            }
        } catch (err) {
            QLogger.verbose(`Starting installation process for ${packageInfo.name} ...`, this);

            const installAccepted = await this.offerInstall(packageInfo);
            if (installAccepted) {
                const installed = await this.install(packageInfo.name);
                if (installed === true) {
                    QLogger.error(`Package ${packageInfo} installed`, this);
                    oldVersionCallback(packageInfo);
                } else {
                    QLogger.error(`Package ${packageInfo} do not installed`, this);
                    notInstalledCallback(packageInfo);
                }
            } else {
                notInstalledCallback(packageInfo);
            }
        }
    }

    private async offerUpdate(packageInfo: PackageInfo, offerVersion: Version, mandatory: boolean): Promise<boolean> {
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
        const selection = await vscode.window.showInformationMessage(updateMsg, 'Ok', 'Dismiss');
        if (selection === 'Ok') {
            QLogger.verbose(`Clicked on OK!`, this);
            return true;
        } else if (selection === 'Dismiss') {
            QLogger.verbose(`Clicked on Dismiss!`, this);
            return false;
        } else {
            QLogger.verbose(`Clicked on other element!`, this);
            return false;
        }
    }

    private async update(packageName: string): Promise<boolean> {
        vscode.window.showInformationMessage(`Updating ${packageName}... (this may take some time, be patient 🙏)`);

        const updated = await this.pipExecutor.update(packageName);
        if (updated) {
            return true;
        } else {
            return false;
        }
    }

    private async offerInstall(packageInfo: PackageInfo): Promise<boolean> {
        let installMsg = `You must install ${
            packageInfo.name
        } to use properly this extension. Do you want to install it now?`;

        const selection = await vscode.window.showInformationMessage(installMsg, 'Ok', 'Dismiss');
        if (selection === 'Ok') {
            QLogger.verbose(`Clicked on OK!`, this);
            return true;
        } else if (selection === 'Dismiss') {
            QLogger.verbose(`Clicked on Dismiss!`, this);
            return false;
        } else {
            QLogger.verbose(`Clicked on other element!`, this);
            return false;
        }
    }

    private async install(packageName: string): Promise<boolean> {
        vscode.window.showInformationMessage(`Installing ${packageName}... (this may take some time, be patient 🙏)`);

        const updated = await this.pipExecutor.install(packageName);
        if (updated) {
            return true;
        } else {
            return false;
        }
    }
}
