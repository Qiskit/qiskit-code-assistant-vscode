/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { PreformattedRenderer } from '../../src/visualizations/preformattedRenderer';
jest.mock('fs');

describe('PreformattedRenderer', () => {
    it('get input preformatted', () => {
        // tslint:disable-next-line
        expect.assertions(1);
        let inputObj = { '00': 514, '11': 510 };

        let outputPar = JSON.parse(`{"result": { "00": 514, "11": 510 }}`);

        let histRend = new PreformattedRenderer(inputObj);

        expect(histRend).toEqual(outputPar);
    });
});
