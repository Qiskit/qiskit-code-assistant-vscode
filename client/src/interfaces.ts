/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as Q from 'q';

export interface IVersionInfo {
    major: number;
    minor: number;
    maintenance: number;
}

export interface IVersion {
    info: IVersionInfo;

    toString(): string;
    isEqual(version: IVersion): boolean;
    isGreater(version: IVersion): boolean;
    isLesser(version: IVersion): boolean;
}

export interface IPackageInfo {
    name: string;
    version: IVersion;
    summary: string;
    location: string;
    dependencies: string; //TODO:Should be [IPackageInfo]

    getPackageInfo(pkg: string): Q.Promise<IPackageInfo>;
}

export interface PackageInfo {
    name: string;
    version: IVersion;
    summary: string;
    location: string;
    dependencies: string; //TODO:Should be [PackageInfo]
}

export interface IDependency {
    name: string;
    requiredVersion: IVersion;

    isInstalled(): Q.Promise<void>;
}

export interface IPackage {
    info: IPackageInfo;
    // Checks whether or not the package is installed, and if installed, check
    // for newer versions
    checkVersion(pkgVersion: string, verbose: boolean | false): Q.Promise<void>;
    update(pkg: string): Q.Promise<string>;
    install(pkg: string): Q.Promise<string>;
}
