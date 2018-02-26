import * as Q from "q";

export interface IVersionInfo {
    Major: Number;
    Minor: Number;
    Maintenance: Number;
}

export interface IVersion  {
    Info: IVersionInfo;
    toString() : string;
    isEqual(version: IVersion): boolean;
    isGreater(version: IVersion): boolean;
    isLesser(version: IVersion): boolean;
}

export interface IPackageInfo {
    Name: string;
    Version: IVersion;
    Summary: string;
    Location: string;
    Dependencies: string; //TODO:Should be [IPackageInfo]
    getPackageInfo(pkg: string): Q.Promise<IPackageInfo>;
}

export interface IDependency {
    Name: string;
    RequiredVersion: IVersion;
    isInstalled(): Q.Promise<void>;
}

export interface IPackage {
    Info: IPackageInfo;
    // Checks whether or not the package is installed, and if installed, check
    // for newer versions
    check(): Q.Promise<void>;
    update(): Q.Promise<string>;
}