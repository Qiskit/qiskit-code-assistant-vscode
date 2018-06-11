// Copyright 2018 IBM RESEARCH. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

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
