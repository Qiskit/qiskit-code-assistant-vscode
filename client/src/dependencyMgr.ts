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
import {workspace} from "vscode";


export class DependencyMgr {
    static _dependencies : Q.Promise<IDependency[]> = [];
    constructor() {
        const config = workspace.getConfiguration('ibm-q-studio');
        const dependList = config.get("python.dependencies");

        Object.keys(dependList).forEach(function(key) {
            DependencyMgr._dependencies.push(new Dependency(key.toString(), Version.fromString(dependList[key].toString())));     
          });
    }

    checkDependencies() : Q.Promise {
        let packages: Q.Promise<IDependency>[] = [];
        
        DependencyMgr._dependencies.forEach(dep => {
            packages.push(dep.isInstalled());
        });
        
        return Q.all(packages);
    }
}