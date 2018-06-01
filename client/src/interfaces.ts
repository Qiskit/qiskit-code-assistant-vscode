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

export interface IVersionInfo {
    Major: Number;
    Minor: Number;
    Maintenance: Number;
}

export interface IVersion {
    Info: IVersionInfo;
    toString(): string;
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
    checkVersion(pkgVersion: string): Q.Promise<void>;
    update(pkg: string): Q.Promise<string>;
    install(pkg: string): Q.Promise<string>;
}