/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as Q from 'q';
import { CommandExecutor } from '../commandExecutor';
import { Version } from '../version';
import { IDependency, IVersion } from '../interfaces';

export class Dependency implements IDependency {
    name: string;
    requiredVersion: IVersion;

    private installedVersion: IVersion;

    constructor(name: string, version: IVersion) {
        this.name = name;
        this.requiredVersion = version;
        this.installedVersion = null;
    }

    public isInstalled(): Q.Promise<IDependency> {
        // We can check if Python is installed by invoking it with the
        // --version option.
        return Q.Promise((resolve, reject) => {
            return this.getInstalledVersion().then(installedVersion => {
                if (
                    installedVersion.isGreater(this.requiredVersion) ||
                    installedVersion.isEqual(this.requiredVersion)
                ) {
                    resolve(this);
                } else {
                    reject(`Version >= ${this.requiredVersion.toString()} of package ${this.name} is required`);
                }
            });
        });
    }

    private getInstalledVersion(force = false): Q.Promise<IVersion> {
        return Q.Promise((resolve, reject) => {
            if (!force && this.installedVersion !== null) {
                return resolve(this.installedVersion);
            }

            return CommandExecutor.exec(this.name, ['--version'])
                .then(stdout => {
                    this.installedVersion = Version.fromString(stdout.split(' ')[1]);
                    resolve(this.installedVersion);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}
