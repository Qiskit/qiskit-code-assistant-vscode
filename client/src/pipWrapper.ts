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
import {CommandExecutor} from "./commandExecutor";
import {IPackageInfo, IVersion} from "./interfaces";
import {Version} from "./version";

type ParserFunction = (out: string) => string;

export class PipWrapper implements IPackageInfo {
    public Name: string;
    public Version: IVersion;
    public Summary: string;
    public Location: string;
    public Dependencies: string;
    
    private static PIP_COMMAND = "pip";

    constructor(){}

    public getPackageInfo(pkgStr: string) : Q.Promise<IPackageInfo> {
        return this.show(pkgStr)
        .then((stdout: string) => {
            let regEx = new RegExp(/(Name:\ |Version:\ |Summary:\ |Location:\ |Requires:\ )(.*)/g);
            let pkg = new PipWrapper();
            let pkgInfo;
            let failed: boolean = false;
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Name = pkgInfo[2];
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Version = Version.fromString(pkgInfo[2]);
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Summary = pkgInfo[2];
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Location = pkgInfo[2];
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Dependencies = pkgInfo[2];
            if(failed){
                return Q.reject(`ERROR: Couldn't parse package information from
                               'pip show' command output!`);
            }
            return Q.resolve(pkg);
        }).catch(err => {
            return Q.reject(err);
        });
    }

    public show(pkg: string): Q.Promise<string> {
        let parserFunc : ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec("show", [pkg], parserFunc);
    }

    public search(pkg: string): Q.Promise<boolean> {
        let parserFunc : ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec("search", [pkg], parserFunc);
    }

    public install(pkg: string): Q.Promise<string>{
        let parserFunc : ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec("install", [pkg], parserFunc);
    }

    public update(pkg: string): Q.Promise<string>{
        let parserFunc : ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec("install", ["-U", "--no-cache-dir", pkg], parserFunc);
    }

    public list(): Q.Promise<string>{
        let parserFunc : ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec("list", [], parserFunc);
    }

    private exec(command: string, args:string [], parser: ParserFunction): 
        Q.Promise<string> {
        return (new CommandExecutor).exec(PipWrapper.PIP_COMMAND,[command].concat(args))
            .then((stdout) => {
                return Q.resolve(parser(stdout));
            }).catch(err => {
                return Q.reject(err);
            });
    }
}