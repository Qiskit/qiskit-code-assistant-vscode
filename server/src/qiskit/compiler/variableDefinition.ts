/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { Symbol } from '../../tools/symbolTable';

export class VariableDefinition {
    constructor(public symbol: Symbol, public startLine: number, public endLine: number) {}

    nameEquals(name: string): boolean {
        return this.symbol.name === name;
    }

    inScope(line: number): boolean {
        return line >= this.startLine && line <= this.endLine;
    }

    toString() {
        return `{ ${this.symbol} from: ${this.startLine} to: ${this.endLine} }`;
    }
}
