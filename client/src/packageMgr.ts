/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as Q from 'q';

import { IPackage, PackageInfo, IVersion } from './interfaces';
import { PipPackage } from './pipPackage';
import { workspace } from 'vscode';
import { QLogger } from './logger';
import { ChildProcessCommandExecutor, CommandExecutor } from './pip/pipCommandExecutor';
import { PackageInfoParser } from './pip/packageInfoParser';
import { Version } from './version';

export class PackageMgr {
    static _packages: Q.Promise<[IPackage]> = [];
    private _packagesV2: Q.Promise<[IPackage]> = [];

    private packageValidator: PackageValidator = new PipPackageValidator();

    constructor() {
        try {
            const config = workspace.getConfiguration('ibm-q-studio');
            const qiskitPacks = config.get('qiskit.packages');
            Object.keys(qiskitPacks).forEach(key => {
                //console.log(key.toString(), qiskitPacks[key].toString());
                PackageMgr._packages.push(new PipPackage(key.toString(), qiskitPacks[key].toString()));
            });

            this._packagesV2 = Object.keys(qiskitPacks).map(
                key => new PipPackage(key.toString(), qiskitPacks[key].toString())
            );
        } catch (err) {
            QLogger.error(`PackMGr ${err}`, this);
        }
    }

    check(verbose: boolean | false): Q.Promise<void> {
        let packages: Array<Q.Promise<IPackage>> = [];
        PackageMgr._packages.forEach(pkg => {
            packages.push(pkg.checkVersion(pkg.info.version, verbose));
        });
        return Q.all(packages);
    }

    checkInstallation(): Promise<boolean[]> {
        return this._packagesV2.map(pkg => {
            QLogger.debug(`Checking package ${pkg.info.name} ${pkg.info.version} installation`, this);
            return this.packageValidator.isInstalled(pkg.info.name, pkg.info.version);
        });
    }
}

interface PackageValidator {
    /**
     * Checks if the provided dependency name and version is installed (at least in that version).
     */
    isInstalled(name: string, version: IVersion): Promise<boolean>;
}

class PipPackageValidator implements PackageValidator {
    private pipExecutor: PipExecutor;

    constructor() {
        let commandExecutor = new ChildProcessCommandExecutor();
        this.pipExecutor = new PipExecutor(commandExecutor);
    }

    async isInstalled(name: string, version: IVersion): Promise<boolean> {
        try {
            let packageInfo = await this.pipExecutor.getPackageInfo(name);
            let installed = version.isGreater(packageInfo.version);

            QLogger.verbose(`Package ${name} ${version} is at version ${packageInfo.version}`, this);

            return Promise.resolve(installed);
        } catch (err) {
            QLogger.verbose(`Package ${name} ${version} is not installed`, this);

            return Promise.resolve(false);
        }
    }
}

class PipExecutor {
    constructor(private commandExecutor: CommandExecutor) {}

    async getPackageInfo(packageName: string): Promise<PackageInfo> {
        let stdout = await this.show(packageName);

        return {
            name: PackageInfoParser.parseName(stdout),
            version: Version.fromString(PackageInfoParser.parseVersion(stdout)),
            summary: PackageInfoParser.parseSummary(stdout),
            location: PackageInfoParser.parseLocation(stdout),
            dependencies: PackageInfoParser.parseDependencies(stdout)
        };
    }

    private async show(pkg: string): Promise<string> {
        return this.commandExecutor.exec('show', [pkg], (stdout: string) => stdout);
    }
}
