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
                let pkg = new PipPackage(pypiPkgJson.info.name)
                pkg.Info.Dependencies = pypiPkgJson.info.requires_dist;
                pkg.Info.Location = pypiPkgJson.info.package_url;
                pkg.Info.Summary = pypiPkgJson.info.summary;
                pkg.Info.Version = Version.fromString(pypiPkgJson.info.version);
                return Q.resolve(pkg.Info);
            });
        });
    }
}