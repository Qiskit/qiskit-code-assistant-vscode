/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { SuggestionSymbol } from '../../types';
import { Symbol } from '../../tools/symbolTable';
import { SymbolTable } from '../compiler/types';

export class VariablesDictionary {
    constructor(private symbolTable: SymbolTable) {}

    currentVariables(): SuggestionSymbol[] {
        let asSuggestionSymbol = (input: Symbol): SuggestionSymbol => {
            return {
                label: input.getName(),
                detail: 'Declared variable',
                documentation: 'This is a previously declared variable',
                type: 'Variable',
                parent: input.getName()
            };
        };

        return this.symbolTable
            .currentSymbols()
            .filter(symbol => 'class' !== symbol.type.getName())
            .map(asSuggestionSymbol);
    }
}
