/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as fs from 'fs';
import { RenderStrategy } from './types';
import { Util } from '../utils';

export class DeviceStatusRenderer implements RenderStrategy {
    constructor(private result: object) {}

    render(): string {
        let templatePath = Util.getOSDependentPath('../../resources/html-templates/temp-devices-status.html');

        let resultString = this.result.toString().replace(/'/g, '"');
        let execResult = JSON.parse(String(resultString));

        if (execResult[0].hasOwnProperty('status')) {
            return this.createDeviceStatus(execResult, templatePath);
        } else {
            return `${this.result}`;
        }
    }

    createDeviceStatus(devicesArray: Array<object>, templatePath: string): string {
        let html = undefined;
        html = fs.readFileSync(templatePath, { encoding: 'utf8' });
        if (html !== undefined) {
            devicesArray.forEach(element => {
                let str2Replace = `<small class="">[${
                    element['status']['name']
                }]</small></span><div class="pull-right"><ibm-q-tag ng-class="{'label-danger': $ctrl.backendStatus[backend.name].tag.color === 'danger','label-success': $ctrl.backendStatus[backend.name].tag.color === 'success','label-info': $ctrl.backendStatus[backend.name].tag.color === 'info'}"ng-show="$ctrl.backendStatus[backend.name].tag" class="label-success">Active: Calibrating</ibm-q-tag>`;
                let str2ReplaceSimulator = `<small class="">[${
                    element['status']['name']
                }]</small></span><div class="pull-right"><ibm-q-tag class="label-success">ACTIVE</ibm-q-tag>`;

                let statusTag = 'label-success';
                let statusMessage = 'Active';
                if (element['status']['available'] === false) {
                    statusTag = 'label-danger';
                    statusMessage = 'Maintenance';
                }

                let replacement = `<small class="">[${
                    element['status']['name']
                }]</small></span><div class="pull-right"><ibm-q-tag ng-class="{'label-danger': $ctrl.backendStatus[backend.name].tag.color === 'danger','label-success': $ctrl.backendStatus[backend.name].tag.color === 'success', 'label-info': $ctrl.backendStatus[backend.name].tag.color === 'info'}" ng-show="$ctrl.backendStatus[backend.name].tag" class="${statusTag}">${statusMessage}</ibm-q-tag>`;
                let replacementSimulator = `<small class="">[${
                    element['status']['name']
                }]</small></span><div class="pull-right"><ibm-q-tag class="${statusTag}">${statusMessage}</ibm-q-tag>`;

                let str2ReplacePendingJobs = `<div class="pull-right"><ibm-q-tag class="label-info">Jobs pending [${
                    element['status']['name']
                }]: 0</ibm-q-tag></div>`;
                let replacementPendingJobs = `<div class="pull-right"><ibm-q-tag class="label-info">Jobs pending: ${
                    element['status']['pending_jobs']
                }</ibm-q-tag></div>`;

                html = html.replace(str2Replace, replacement);
                html = html.replace(str2ReplaceSimulator, replacementSimulator);
                html = html.replace(str2ReplacePendingJobs, replacementPendingJobs);
            });
            return html;
        } else {
            return `<pre>${devicesArray}</pre>`;
        }
    }
}
