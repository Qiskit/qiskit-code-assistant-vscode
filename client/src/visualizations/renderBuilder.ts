/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import * as fs from 'fs';
import * as vscode from 'vscode';
import { RenderStrategy } from './types';
import { PreformattedRenderer } from './preformattedRenderer';
import { HistogramRenderer } from './histogramRenderer';

export namespace RenderBuilder {
    export function instanceFrom(codePath: string, result: object): RenderStrategy {
        let config = vscode.workspace.getConfiguration('ibm-q-studio');
        let visualizationsFlag = config.get('config.visualizationsFlag');

        if (visualizationsFlag === false) {
            return new PreformattedRenderer(result);
        } else {
            return detectProperViz(codePath, result);
        }
    }

    function detectProperViz(codePath: string, result: object): RenderStrategy {
        let codeFile = undefined;

        codeFile = fs.readFileSync(codePath, { encoding: 'utf8' });
        if (codeFile !== undefined) {
            codeFile = codeFile.split('\n');
            codeFile = codeFile.filter(Boolean);

            let codeFileArray: Array<string> = [];

            for (let key in codeFile) {
                codeFileArray.push(codeFile[key]);
            }

            let codeFileArrayRev = codeFileArray.reverse();

            for (let i = 0; i < codeFileArrayRev.length; i++) {
                if (
                    new RegExp(/^\/\/.*/g).test(codeFileArrayRev[i]) === true ||
                    new RegExp(/^#.*/g).test(codeFileArrayRev[i]) === true
                ) {
                    //Comment to end the file, go to the next line
                } else if (new RegExp(/^ *print\(.*\.get_counts\(.*\)\)/g).test(codeFileArrayRev[i]) === true) {
                    // If the result is printed using the get_counts, the proper viz to show is the histogram
                    return new HistogramRenderer(result);
                } else if (new RegExp(/^ *print\(.*\._result.*\)\)/g).test(codeFileArrayRev[i]) === true) {
                    // If the result is printed using the _result (probably using QASM), the proper viz to show is the histogram
                    return new HistogramRenderer(result);
                } else {
                    // If we don't find the proper viz method, continue seeking for that.
                    // If the array ends without a proper result, we will render it as text.
                }
            }
            return new PreformattedRenderer(result);
        } else {
            return new PreformattedRenderer(result);
        }
    }
}
