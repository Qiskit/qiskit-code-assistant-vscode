/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { Util } from '../src/utils';

describe('utils', () => {
    it('getOSDependent path', () => {
        // tslint:disable-next-line
        expect.assertions(1);
        let unixPath = '/src/file';
        let windowsPath = `\\src\\file`;
        if (process.platform === 'win32') {
            expect(Util.getOSDependentPath(windowsPath).indexOf(`${unixPath}`)).toBeGreaterThanOrEqual(0);
        } else {
            expect(Util.getOSDependentPath(unixPath)).toEqual(`${unixPath}`);
        }
    });
});
