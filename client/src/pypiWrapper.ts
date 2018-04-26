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
import * as httpm from 'typed-rest-client/HttpClient';
import { IPackageInfo, IVersion } from "./interfaces";
import { PipPackage } from "./pipPackage";
import { Version } from "./version";

const PYPI_BASE_URL = 'http://pypi.python.org/pypi/';

export class PyPiWrapper implements IPackageInfo {
    public Name: string;
    public Version: IVersion;
    public Summary: string;
    public Location: string;
    public Dependencies: string;

    constructor(){}

    public getPackageInfo(pkg: string) : Q.Promise<IPackageInfo> {
        let url: string = PYPI_BASE_URL + pkg + '/json';
        let httpc: httpm.HttpClient = new httpm.HttpClient('vsts-node-api');
        return httpc.get(url).then((res: httpm.HttpClientResponse) => {
            return res.readBody().then((body: string) => {
                let pypiPkgJson = JSON.parse(body);
                let pkg = new PipPackage(pypiPkgJson.info.name, pypiPkgJson.info.version);
                pkg.Info.Dependencies = pypiPkgJson.info.requires_dist;
                pkg.Info.Location = pypiPkgJson.info.package_url;
                pkg.Info.Summary = pypiPkgJson.info.summary;
                pkg.Info.Version = Version.fromString(pypiPkgJson.info.version);
                return Q.resolve(pkg.Info);
            });
        });
    }
}