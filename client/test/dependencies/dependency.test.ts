/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */
import { Dependency } from '../../src/dependencies/dependency';
jest.mock('../../src/commandExecutor');
import { Version } from '../../src/version';

describe('Dependency', () => {
    describe('-related testing things', () => {
        it('is installed?', () => {
            // tslint:disable-next-line
            //expect.assertions(1);
            const depName = 'python';
            // tslint:disable-next-line
            const depVersion = new Version(3, 5, 0);

            const dep = new Dependency(depName, depVersion);
            return dep.isInstalled().then(result => {
                expect(JSON.stringify(result)).toMatch(/.*name.*python.*/g);
            });
        });

        it('the required version is not installed', () => {
            // tslint:disable-next-line
            expect.assertions(1);
            const depName = 'python';
            // tslint:disable-next-line
            const depVersion = new Version(3, 6, 6);

            const dep = new Dependency(depName, depVersion);
            return dep.isInstalled().catch(result => {
                expect(result).toBe(`Version >= 3.6.6 of package python is required`);
            });
        });
    });
});
