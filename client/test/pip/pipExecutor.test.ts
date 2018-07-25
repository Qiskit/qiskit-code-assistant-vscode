/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */
import { PipExecutor } from '../../src/pip/pipExecutor';
import { FakePipCommandExecutor } from '../tools/fakePipCommandExecutor';
import { Version } from '../../src/version';

describe('A PipExecutor', () => {
    describe('testing pip commands using qiskit package', () => {
        let qReturned = `
Name: qiskit
Version: 0.5.5
Summary: Software for developing quantum computing programs
Home-page: https://github.com/QISKit/qiskit-core
Author: QISKit Development Team
Author-email: qiskit@us.ibm.com
License: Apache 2.0
Location: /Users/yeraydarias/Documents/workspace/qiskit-vscode/pyenv/lib/python3.6/site-packages
Requires: IBMQuantumExperience, sympy, networkx, numpy, matplotlib, pillow, scipy, ply
Required-by: qiskit-acqua, qiskit-acqua-chemistry`;

        let packageInfo = `qiskit`;
        let commandExecutor = new FakePipCommandExecutor();
        let pipExecutor = new PipExecutor(commandExecutor);

        it('should get info about the package', async () => {
            // tslint:disable-next-line
            expect.assertions(5);

            const result = await pipExecutor.getPackageInfo(packageInfo);
            expect(result.name).toBe('qiskit');
            //expect(result.version).toBe(Version.fromString('0.5.5'));
            expect(result.version).toEqual(Version.fromString('0.5.5'));
            expect(result.summary).toBe('Software for developing quantum computing programs');
            expect(result.location).toBe(
                '/Users/yeraydarias/Documents/workspace/qiskit-vscode/pyenv/lib/python3.6/site-packages'
            );
            expect(result.dependencies).toBe(
                'IBMQuantumExperience, sympy, networkx, numpy, matplotlib, pillow, scipy, ply'
            );
        });

        it('should install the package', async () => {
            expect.assertions(1);
            const result = await pipExecutor.install(packageInfo);
            expect(result).toBe(true);
        });

        it('should update the package', async () => {
            expect.assertions(1);
            const result = await pipExecutor.update(packageInfo);
            expect(result).toBe(true);
        });

        it('should search the package', async () => {
            expect.assertions(1);
            const result = await pipExecutor.search(packageInfo);
            expect(result).toBe(qReturned);
        });
        it('should list the package', async () => {
            expect.assertions(1);
            const result = await pipExecutor.list();
            expect(result).toBe(qReturned);
        });
    });
});
