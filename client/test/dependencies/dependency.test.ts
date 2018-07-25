/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */
import { Dependency } from '../../src/dependencies/dependency';
jest.mock('../../src/dependencies/dependency');
import { Version } from '../../src/version';

describe('Dependency', () => {
    describe('-related testing things', () => {
        it('is installed?', () => {
            // tslint:disable-next-line
            expect.assertions(1);
            const depName = 'qiskit';
            // tslint:disable-next-line
            const depVersion = new Version(0, 5, 5);

            const dep = new Dependency(depName, depVersion);
            return dep.isInstalled().then(result => {
                expect(JSON.stringify(result)).toMatch(/.*name.*qiskit.*/g);
            });
        });

        it('the required version is not installed', () => {
            // tslint:disable-next-line
            expect.assertions(1);
            const depName = 'qiskit';
            // tslint:disable-next-line
            const depVersion = new Version(0, 5, 6);

            const dep = new Dependency(depName, depVersion);
            return dep.isInstalled().catch(result => {
                expect(result).toBe('Version >= 0.5.6 of package qiskit is required');
            });
        });
    });
});
