/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as Q from 'q';

import { IDependency } from './interfaces';
import { Dependency } from './dependency';
import { Version } from './version';
import { workspace } from 'vscode';

export class DependencyMgr {
    static _dependencies: Q.Promise<IDependency[]> = [];
    constructor() {
        const config = workspace.getConfiguration('ibm-q-studio');
        const dependList = config.get('python.dependencies');

        Object.keys(dependList).forEach(function(key) {
            DependencyMgr._dependencies.push(
                new Dependency(key.toString(), Version.fromString(dependList[key].toString()))
            );
        });
    }

    checkDependencies(): Q.Promise<void> {
        let packages: Q.Promise<IDependency>[] = [];

        DependencyMgr._dependencies.forEach(dep => {
            packages.push(dep.isInstalled());
        });

        return Q.all(packages);
    }
}
