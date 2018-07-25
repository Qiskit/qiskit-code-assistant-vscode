/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { CommandExecutor, ParserFunction } from '../../src/pip/pipCommandExecutor';
import * as Q from 'q';

export class FakePipCommandExecutor implements CommandExecutor {
    exec(_command: string, _args: string[], _parser: ParserFunction): Q.Promise<string> {
        return Q(`
Name: qiskit
Version: 0.5.5
Summary: Software for developing quantum computing programs
Home-page: https://github.com/QISKit/qiskit-core
Author: QISKit Development Team
Author-email: qiskit@us.ibm.com
License: Apache 2.0
Location: /Users/qiskitter/Documents/workspace/qiskit-vscode/pyenv/lib/python3.6/site-packages
Requires: IBMQuantumExperience, sympy, networkx, numpy, matplotlib, pillow, scipy, ply
Required-by: qiskit-acqua, qiskit-acqua-chemistry`);
    }
}
