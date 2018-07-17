/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { workspace } from 'vscode';
import { Version } from './version';
import { PackageInfo } from './interfaces';

export namespace QiskitVSCodeConfiguration {
    export function requiredPackages(): PackageInfo[] {
        let config = workspace.getConfiguration('qiskit-vscode');
        let qiskitPackages = config.get('qiskit.packages');

        return Object.keys(qiskitPackages).map(key => ({
            name: key,
            version: Version.fromString(qiskitPackages[key])
        }));
    }
}
