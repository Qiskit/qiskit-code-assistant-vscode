/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { CommandExecutor } from './pipCommandExecutor';
import { PackageInfo } from '../interfaces';
import { PackageInfoParser } from './packageInfoParser';
import { Version } from '../version';

export class PipExecutor {
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
