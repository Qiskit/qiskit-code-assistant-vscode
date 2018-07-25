/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */
import { PyPiExecutor } from '../../src/pip/pypiExecutor';

describe('A PipyExecutor', () => {
    describe('testing pypi commands using the qiskit package', () => {
        let pypiExecutor = new PyPiExecutor();

        it('should get info about the package', async () => {
            // tslint:disable-next-line
            expect.assertions(4);
            const result = await pypiExecutor.getPackageInfo('qiskit');
            expect(result.location).toBe('https://pypi.org/project/qiskit/');
            expect(result.name).toBe('qiskit');
            expect(result.summary).toBeDefined();
            expect(result.version.toString()).toMatch(/.*\..*\..*/g);
        });
    });
});
