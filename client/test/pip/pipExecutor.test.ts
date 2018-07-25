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

describe('A PipExecutor', () => {
    describe('testing pip commands using qiskit package', () => {
        let packageInfo = `qiskit`;
        let commandExecutor = new FakePipCommandExecutor();
        let pipExecutor = new PipExecutor(commandExecutor);

        it('should install the package', async () => {
            const result = await pipExecutor.install(packageInfo);
            expect(result).toBe(true);
        });

        it('should update the package', async () => {
            const result = await pipExecutor.update(packageInfo);
            expect(result).toBe(true);
        });
    });
});
