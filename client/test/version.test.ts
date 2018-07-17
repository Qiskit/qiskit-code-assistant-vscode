/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { Version } from '../src/version';

describe('Version', () => {
    it('should format a given string version', () => {
        // tslint:disable-next-line
        let expectedVersion = new Version(0, 5, 5);
        let version = Version.fromString('0.5.5');

        expect(version).toEqual(expectedVersion);
    });
});
