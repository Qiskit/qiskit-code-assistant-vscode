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
    it('should format a version given a string', () => {
        // tslint:disable-next-line
        let expectedVersion = new Version(0, 5, 5);
        let version = Version.fromString('0.5.5');

        expect(version).toEqual(expectedVersion);
    });

    it('should format a string given a version', () => {
        // tslint:disable-next-line
        let version = Version.fromString('0.5.5');

        expect(version.toString()).toBe('0.5.5');
    });

    it('should format a string given a version', () => {
        // tslint:disable-next-line
        let version = Version.fromString('0.5.5');

        expect(version.toString()).toBe('0.5.5');
    });

    it('should be equal than other', () => {
        // tslint:disable-next-line
        let v1 = Version.fromString('0.5.5');
        let v2 = Version.fromString('0.5.5');

        expect(v2.isEqual(v1)).toBe(true);
    });

    it('should not be equal than other', () => {
        // tslint:disable-next-line
        let v1 = Version.fromString('0.5.5');
        let v2 = Version.fromString('0.5.4');

        expect(v2.isEqual(v1)).toBe(false);
    });

    it('should be greater than other', () => {
        // tslint:disable-next-line
        let v1 = Version.fromString('0.5.5');
        let v2 = Version.fromString('0.5.4');

        expect(v1.isGreater(v2)).toBe(true);
    });

    it('should not be greater than other (is lesser)', () => {
        // tslint:disable-next-line
        let v1 = Version.fromString('0.5.5');
        let v2 = Version.fromString('0.5.4');

        expect(v2.isGreater(v1)).toBe(false);
    });

    it('should not be greater than other (is equal)', () => {
        // tslint:disable-next-line
        let v1 = Version.fromString('0.5.5');
        let v2 = Version.fromString('0.5.5');

        expect(v2.isGreater(v1)).toBe(false);
    });

    it('should be lesser than other', () => {
        // tslint:disable-next-line
        let v1 = Version.fromString('0.5.5');
        let v2 = Version.fromString('0.5.4');

        expect(v2.isLesser(v1)).toBe(true);
    });

    it('should not be lesser than other (is greater)', () => {
        // tslint:disable-next-line
        let v1 = Version.fromString('0.5.5');
        let v2 = Version.fromString('0.5.4');

        expect(v1.isLesser(v2)).toBe(false);
    });

    it('should not be lesser than other (is equal)', () => {
        // tslint:disable-next-line
        let v1 = Version.fromString('0.5.5');
        let v2 = Version.fromString('0.5.5');

        expect(v1.isLesser(v2)).toBe(false);
    });
});
