/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as Q from 'q';
import { CommandExecutor } from './commandExecutor';
import { IPackageInfo, IVersion } from './interfaces';
import { Version } from './version';

type ParserFunction = (out: string) => string;

export class PipWrapper implements IPackageInfo {
    private static PIP_COMMAND = 'pip';

    public name: string;
    public version: IVersion;
    public summary: string;
    public location: string;
    public dependencies: string;

    constructor() {}

    public getPackageInfo(pkgStr: string): Q.Promise<IPackageInfo> {
        const packageInfo = 2;

        return this.show(pkgStr)
            .then((stdout: string) => {
                let regEx = new RegExp(/(Name:\ |Version:\ |Summary:\ |Location:\ |Requires:\ )(.*)/g);
                let pkg = new PipWrapper();
                let pkgInfo;

                pkgInfo = regEx.exec(stdout);
                if (pkgInfo === null) {
                    return Q.reject(`ERROR: Couldn't parse package information from
                    'pip show' command output!`);
                }

                pkg.name = pkgInfo[packageInfo];
                pkg.version = Version.fromString(pkgInfo[packageInfo]);
                pkg.summary = pkgInfo[packageInfo];
                pkg.location = pkgInfo[packageInfo];
                pkg.dependencies = pkgInfo[packageInfo];

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
        return this.exec('show', [pkg], parserFunc);
    }

    public search(pkg: string): Q.Promise<boolean> {
        let parserFunc: ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec('search', [pkg], parserFunc);
    }

    public install(pkg: string): Q.Promise<string> {
        let parserFunc: ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec('install', [pkg], parserFunc);
    }

    public update(pkg: string): Q.Promise<string> {
        let parserFunc: ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec('install', ['-U', '--no-cache-dir', pkg], parserFunc);
    }

    public list(): Q.Promise<string> {
        let parserFunc: ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec('list', [], parserFunc);
    }

    private exec(command: string, args: string[], parser: ParserFunction): Q.Promise<string> {
        return CommandExecutor.exec(PipWrapper.PIP_COMMAND, [command].concat(args))
            .then(stdout => {
                return Q.resolve(parser(stdout));
            })
            .catch(err => {
                return Q.reject(err);
            });
    }
}
