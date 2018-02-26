import * as Q from "q";
import {CommandExecutor} from "./commandExecutor";
import {Version} from "./version";
import {IDependency, IVersion} from "./interfaces";

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
                if(installedVersion.isGreater(this.RequiredVersion) ||
                   installedVersion.isEqual(this.RequiredVersion)) {
                     resolve(this);
                } else {
                    reject("Version >= " + this.RequiredVersion.toString() + "of " +
                        "package " + this.Name + " is required");
                }
            });
        });
    }

    private getInstalledVersion(force: boolean = false): Q.Promise<IVersion> {
        return Q.Promise((resolve) => {
            if(!force && this.InstalledVersion != null) {
                return resolve(this.InstalledVersion)
            }

            return (new CommandExecutor).exec(this.Name,["--version"])
            .then((stdout) => {
                this.InstalledVersion = Version.fromString(stdout.split(" ")[1]);
                resolve(this.InstalledVersion);
            });
        });
    }

}