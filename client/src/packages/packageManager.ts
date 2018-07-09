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

export class PackageManager {
    constructor(private pipExecutor: PipExecutor) {}

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
            let systemPackageInfo = await this.pipExecutor.getPackageInfo(packageInfo.name);
            let needsUpdate = systemPackageInfo.version.isLesser(packageInfo.version);

            if (needsUpdate) {
                QLogger.verbose(`Starting update process for ${packageInfo.name} ...`, this);

                oldVersionCallback(packageInfo);
            }
        } catch (err) {
            QLogger.verbose(`Starting installation process for ${packageInfo.name} ...`, this);

            notInstalledCallback(packageInfo);
        }
    }
}
