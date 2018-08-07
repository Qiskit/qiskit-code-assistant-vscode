/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { RenderBuilder } from '../../src/visualizations/renderBuilder';
jest.mock('../../src/visualizations/renderBuilder');
jest.mock('fs');

describe('PreformattedRenderer', () => {
    it('get input preformatted', () => {
        // tslint:disable-next-line
        expect.assertions(1);

        let inputObj = { '00': 514, '11': 510 };
        let codePath = '/src/file';

        let outputPar = JSON.parse(`{"result": { "00": 514, "11": 510 }}`);

        expect(RenderBuilder.instanceFrom(codePath, inputObj)).toEqual(outputPar);
    });
});
