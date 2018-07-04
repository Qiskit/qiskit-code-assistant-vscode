/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { PipWrapper } from '../src/pipWrapper';
import { FakePipCommandExecutor } from './tools/fakePipCommandExecutor';
import { Version } from '../src/version';

describe('PipWrapper', () => {
    // tslint:disable-next-line
    let expectedVersion = new Version(0, 5, 5);

    it('should return info for the given package', () => {
        let commandExecutor = new FakePipCommandExecutor();
        let pipWrapper = new PipWrapper(commandExecutor).getPackageInfo('qiskit');

        return pipWrapper.then(data => expect(data.version).toEqual(expectedVersion));
    });
});
