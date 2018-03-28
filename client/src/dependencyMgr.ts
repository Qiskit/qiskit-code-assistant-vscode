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

import {IDependency} from "./interfaces";
import {Dependency} from "./dependency";
import {Version} from "./version";

export class DependencyMgr {
    private static dependencies : IDependency[] = [
        new Dependency('pip', Version.fromString('9')),
        new Dependency('python', Version.fromString('3.5'))
    ];

    constructor() {
    }

    public static checkDependencies() : Q.Promise {
        // TODO: Read depdencies from external file
        // Check for python > 3.5
        // Check for pip
        let packages: Q.Promise<IDependency>[] = [];
        DependencyMgr.dependencies.forEach(dep => {
            packages.push(dep.isInstalled());
        });
        
        return Q.all(packages);
    }
}