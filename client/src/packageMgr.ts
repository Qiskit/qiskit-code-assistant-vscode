/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as Q from 'q';

import { IPackage } from './interfaces';
import { PipPackage } from './pipPackage';
import { workspace } from 'vscode';
import { QLogger } from './logger';

export class PackageMgr {
    static _packages: Q.Promise<[IPackage]> = [];

    constructor() {
        try {
            const config = workspace.getConfiguration('ibm-q-studio');
            const qiskitPacks = config.get('qiskit.packages');
            Object.keys(qiskitPacks).forEach(function(key) {
                //console.log(key.toString(), qiskitPacks[key].toString());
                PackageMgr._packages.push(new PipPackage(key.toString(), qiskitPacks[key].toString()));
            });
        } catch (err) {
            QLogger.error(`PackMGr ${err}`, this);
        }
    }

    check(verbose: boolean | false): Q.Promise<void> {
        let packages: Q.Promise<IPackage>[] = [];
        PackageMgr._packages.forEach(pkg => {
            packages.push(pkg.checkVersion(pkg.Info.Version, verbose));
        });
        return Q.all(packages);
    }
}
