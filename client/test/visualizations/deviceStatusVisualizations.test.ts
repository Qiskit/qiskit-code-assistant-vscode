/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { DeviceStatusVisualization } from '../../src/visualizations/deviceStatusVisualization';
jest.mock('fs');
//jest.mock('../../src/utils');
jest.mock('vscode');

describe('DeviceStatusVisualization', () => {
    it('render devices string', () => {
        // tslint:disable-next-line
        expect.assertions(1);
        let deviceObj = `[{
            "name": "IBM Q QASM Simulator",
            "status": {
                "available": true,
                "name": "ibmq_qasm_simulator",
                "pending_jobs": 0
                }
            }
        ]`;
        expect(DeviceStatusVisualization.render(JSON.parse(deviceObj))).toBe(`<pre>${JSON.parse(deviceObj)}</pre>`);
    });

    it('render devices object', () => {
        // tslint:disable-next-line
        expect.assertions(1);
        let deviceObj = [
            {
                name: 'IBM Q QASM Simulator',
                status: {
                    available: true,
                    name: 'ibmq_qasm_simulator',
                    pending_jobs: 0
                }
            }
        ];
        expect(DeviceStatusVisualization.render(deviceObj)).toBe(`<pre>${deviceObj}</pre>`);
    });

    it('render backends', () => {
        // tslint:disable-next-line
        expect.assertions(1);
        let deviceObj = ['ibmq_qasm_simulator', 'ibmqx2', 'ibmqx4', 'ibmqx5'];
        expect(DeviceStatusVisualization.render(deviceObj)).toBe(`<pre>${deviceObj}</pre>`);
    });
});
