/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as Q from 'q';
import * as httpm from 'typed-rest-client/HttpClient';
import { IPackageInfo, IVersion } from './interfaces';
import { PipPackage } from './pipPackage';
import { Version } from './version';

const PYPI_BASE_URL = 'https://pypi.python.org/pypi/';

export class PyPiWrapper implements IPackageInfo {
    public name: string;
    public version: IVersion;
    public summary: string;
    public location: string;
    public dependencies: string;

    constructor() {}

    public getPackageInfo(pkg: string): Q.Promise<IPackageInfo> {
        let url: string = PYPI_BASE_URL + pkg + '/json';
        let httpc: httpm.HttpClient = new httpm.HttpClient('vsts-node-api');
        return httpc.get(url).then((res: httpm.HttpClientResponse) => {
            return res.readBody().then((body: string) => {
                let pypiPkgJson = JSON.parse(body);
                let pkg = new PipPackage(pypiPkgJson.info.name, pypiPkgJson.info.version);
                pkg.info.dependencies = pypiPkgJson.info.requires_dist;
                pkg.info.location = pypiPkgJson.info.package_url;
                pkg.info.summary = pypiPkgJson.info.summary;
                pkg.info.version = Version.fromString(pypiPkgJson.info.version);

                return Q.resolve(pkg.info);
            });
        });
    }
}
