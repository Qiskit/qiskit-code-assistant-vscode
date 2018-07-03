/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { RenderStrategy } from './types';

export class PreformattedRenderer implements RenderStrategy {
    constructor(private result: object) {}

    render(): string {
        return `<pre>${this.result}</pre>`;
    }
}
