/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { RenderBuilder } from './visualizations/renderBuilder';

export namespace VizManager {
    export function createViz(codePath: string, result: object): string {
        let renderer = RenderBuilder.instanceFrom(codePath, result);
        return renderer.render();
    }
}
