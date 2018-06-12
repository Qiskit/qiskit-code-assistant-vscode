/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { SymbolTable } from '../../tools/symbolTable';
import { ParserError } from '../../types';

export interface SymbolTableResult {
    symbolTable: SymbolTable;
    errors: ParserError[];
}

export interface ContentPosition {
    line: number;
    start: number;
    end: number;
}
