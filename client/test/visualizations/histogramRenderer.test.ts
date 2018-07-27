/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { HistogramRenderer } from '../../src/visualizations/histogramRenderer';
jest.mock('fs');
jest.mock('nunjucks');
jest.mock('../../src/utils');

describe('HistogramRenderer', () => {
    it('get text render basic histogram', () => {
        // tslint:disable-next-line
        expect.assertions(1);
        let inputObj = { '00': 514, '11': 510 };

        let outputPar = JSON.parse(`{"result": { "00": 514, "11": 510 }}`);

        let histRend = new HistogramRenderer(inputObj);

        expect(histRend).toEqual(outputPar);
    });
});
