/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as Q from 'q';
import { IPackageInfo, IVersion } from './interfaces';
import { Version } from './version';
import { CommandExecutor } from './pip/pipCommandExecutor';
import { PackageInfoParser } from './pip/packageInfoParser';

type ParserFunction = (out: string) => string;

export class PipWrapper implements IPackageInfo {
    public name: string;
    public version: IVersion;
    public summary: string;
    public location: string;
    public dependencies: string;

    constructor(private pipCommandExecutor: CommandExecutor) {}

    public getPackageInfo(pkgStr: string): Q.Promise<IPackageInfo> {
        return this.show(pkgStr)
            .then((stdout: string) => {
                let pkg = new PipWrapper(this.pipCommandExecutor);

                pkg.name = PackageInfoParser.parseName(stdout);
                pkg.version = Version.fromString(PackageInfoParser.parseVersion(stdout));
                pkg.summary = PackageInfoParser.parseSummary(stdout);
                pkg.location = PackageInfoParser.parseLocation(stdout);
                pkg.dependencies = PackageInfoParser.parseDependencies(stdout);

                return Q.resolve(pkg);
            })
            .catch(err => {
                return Q.reject(err);
            });
    }

    public show(pkg: string): Q.Promise<string> {
        let parserFunc: ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.pipCommandExecutor.exec('show', [pkg], parserFunc);
    }

    public search(pkg: string): Q.Promise<boolean> {
        let parserFunc: ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.pipCommandExecutor.exec('search', [pkg], parserFunc);
    }

    public install(pkg: string): Q.Promise<string> {
        let parserFunc: ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.pipCommandExecutor.exec('install', [pkg], parserFunc);
    }

    public update(pkg: string): Q.Promise<string> {
        let parserFunc: ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.pipCommandExecutor.exec('install', ['-U', '--no-cache-dir', pkg], parserFunc);
    }

    public list(): Q.Promise<string> {
        let parserFunc: ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.pipCommandExecutor.exec('list', [], parserFunc);
    }
}
