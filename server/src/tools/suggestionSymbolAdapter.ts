/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { SuggestionSymbol } from '../types';
import { CompletionItemKind } from 'vscode-languageserver/lib/main';

export namespace SuggestionSymbolAdapter {
    export function toCompletionItem() {
        return (symbol: SuggestionSymbol, index: number) => {
            return {
                label: symbol.label,
                kind: CompletionItemKind.Text,
                data: index,
                detail: symbol.detail,
                documentation: symbol.documentation
            };
        };
    }

    export function toSymbolVariable() {
        return (input: string): SuggestionSymbol => {
            return {
                label: input,
                detail: 'Declared variable',
                documentation: 'This is a previously declared variable',
                type: 'Variable',
                parent: input
            };
        };
    }
}
