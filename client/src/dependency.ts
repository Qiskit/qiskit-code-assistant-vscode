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

import * as Q from "q";
import { CommandExecutor } from "./commandExecutor";
import { Version } from "./version";
import { IDependency, IVersion } from "./interfaces";

export class Dependency implements IDependency {
    Name: string;
    RequiredVersion: IVersion;

    private InstalledVersion: IVersion;

    constructor(name: string, version: IVersion) {
        this.Name = name;
        this.RequiredVersion = version;
        this.InstalledVersion = null;
    }

    public isInstalled(): Q.Promise<IDependency> {
        // We can check if Python is installed by invoking it with the
        // --version option.
        return Q.Promise((resolve, reject) => {
            return this.getInstalledVersion().then(installedVersion => {
                if (
                    installedVersion.isGreater(this.RequiredVersion) ||
                    installedVersion.isEqual(this.RequiredVersion)
                ) {
                    resolve(this);
                } else {
                    reject(
                        `Version >= ${this.RequiredVersion.toString()} of package ${
                            this.Name
                        } is required`
                    );
                }
            });
        });
    }

    private getInstalledVersion(force: boolean = false): Q.Promise<IVersion> {
        return Q.Promise((resolve, reject) => {
            if (!force && this.InstalledVersion !== null) {
                return resolve(this.InstalledVersion);
            }

            return CommandExecutor.exec(this.Name, ["--version"])
                .then(stdout => {
                    this.InstalledVersion = Version.fromString(
                        stdout.split(" ")[1]
                    );
                    resolve(this.InstalledVersion);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}
