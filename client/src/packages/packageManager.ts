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
import { PyPiExecutor } from '../pip/pypiExecutor';
import * as vscode from 'vscode';
import { Version } from '../version';
import { ActivationUtils } from '../activationUtils';

export class PackageManager {
    constructor(private pipExecutor: PipExecutor, private pypiExecutor: PyPiExecutor) {}

    async verifyAndApply(
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
                    if (updated) {
                        QLogger.error(`Package ${packageInfo} updated`, this);
                        oldVersionCallback(packageInfo);
                    } else {
                        QLogger.error(`Package ${packageInfo} do not updated`, this);
                        oldVersionCallback(packageInfo);
                    }
                } else {
                    QLogger.info(`Package ${packageInfo} do not updated. The user rejected the update`, this);
                    oldVersionCallback(packageInfo);
                }
            } else {
                QLogger.verbose(`Starting non-mandatory update process for ${packageInfo.name} ...`, this);
                const pypiPackageInfo = await this.pypiExecutor.getPackageInfo(packageInfo.name);
                const availableUpdate = await pypiPackageInfo.version.isGreater(systemPackageInfo.version);
                if (availableUpdate) {
                    QLogger.verbose(`Starting update process for ${packageInfo.name} ...`, this);
                    const updateAccepted = await this.offerUpdate(
                        packageInfo,
                        pypiPackageInfo.version,
                        needsMandatoryUpdate
                    );
                    if (updateAccepted) {
                        const updated = await this.update(packageInfo.name);
                        if (updated) {
                            QLogger.info(`Package ${packageInfo} updated`, this);
                            vscode.window.showInformationMessage(`${packageInfo.name} updated! 🎉🎉🎉`);
                            oldVersionCallback(packageInfo);
                        } else {
                            QLogger.error(`Package ${packageInfo} do not updated`, this);
                            oldVersionCallback(packageInfo);
                        }
                    } else {
                        QLogger.info(`Package ${packageInfo} do not updated. The user rejected the update`, this);
                        oldVersionCallback(packageInfo);
                    }
                } else {
                    QLogger.verbose(`${packageInfo.name} is already installed`, this);
                    ActivationUtils.showExtensionBootInfo(`👌 ${packageInfo.name} is already installed`, false);
                    return oldVersionCallback(packageInfo);
                }
            }
        } catch (err) {
            QLogger.verbose(`Starting installation process for ${packageInfo.name} ...`, this);

            const installAccepted = await this.offerInstall(packageInfo);
            if (installAccepted) {
                const installed = await this.install(packageInfo.name);
                if (installed) {
                    QLogger.info(`Package ${packageInfo} installed`, this);
                    vscode.window.showInformationMessage(`${packageInfo.name} installed! 🎉🎉🎉`);
                    notInstalledCallback(packageInfo);
                } else {
                    QLogger.error(`Package ${packageInfo} do not installed`, this);
                    notInstalledCallback(packageInfo);
                }
            } else {
                QLogger.info(`Package ${packageInfo} do not updated. The user rejected the update`, this);
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
            QLogger.verbose(`Clicked on another element! Cancelling update`, this);
            return false;
        }
    }

    private async update(packageName: string): Promise<boolean> {
        try {
            vscode.window.showInformationMessage(`Updating ${packageName}... (this may take some time, be patient 🙏)`);

            const updated = await this.pipExecutor.update(packageName);
            if (updated) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            QLogger.error(`ERROR: Couldn't upgrade ${packageName}. ${error}`, this);
            vscode.window.showErrorMessage(`ERROR: Couldn't upgrade ${packageName}. ${error}`);
            return false;
        }
    }

    private async offerInstall(packageInfo: PackageInfo): Promise<boolean> {
        let installMsg = `You must install ${
            packageInfo.name
        } to take advantage of this extension. Do you want to install it now?`;

        const selection = await vscode.window.showInformationMessage(installMsg, 'Ok', 'Dismiss');
        if (selection === 'Ok') {
            QLogger.verbose(`Clicked on OK!`, this);
            return true;
        } else if (selection === 'Dismiss') {
            QLogger.verbose(`Clicked on Dismiss!`, this);
            return false;
        } else {
            QLogger.verbose(`Clicked on another element! Cancelling install`, this);
            return false;
        }
    }

    private async install(packageName: string): Promise<boolean> {
        try {
            vscode.window.showInformationMessage(
                `Installing ${packageName}... (this may take some time, be patient 🙏)`
            );

            const installed = await this.pipExecutor.install(packageName);
            if (installed) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            QLogger.error(`ERROR: Couldn't install ${packageName}. ${error}`, this);
            vscode.window.showErrorMessage(`ERROR: Couldn't install ${packageName}. ${error}`);
            return false;
        }
    }
}
