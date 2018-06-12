/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { TerminalNode } from 'antlr4ts/tree';
import { ContentPosition } from '../types';
import { Token } from 'antlr4ts';

export namespace PositionAdapter {
    export function fromTerminalNode(node: TerminalNode): ContentPosition {
        return {
            line: node.symbol.line - 1,
            start: node.symbol.charPositionInLine,
            end: node.symbol.charPositionInLine + node.text.length
        };
    }

    export function fromToken(token: Token): ContentPosition {
        return {
            line: token.line - 1,
            start: token.charPositionInLine,
            end: token.charPositionInLine + token.text.length
        };
    }
}
