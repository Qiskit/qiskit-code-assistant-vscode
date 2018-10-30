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
        let sResult = this.escapeHTML(String(this.result));
        if (String(this.result) === sResult) {
            return `<pre>${this.result}</pre>`;
        } else {
            return `<pre>${sResult}</pre>`;
        }
    }

    escapeHTML(result: string): string {
        return result
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;');
    }
}
