/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { ParserError, ParseErrorLevel } from '../../../types';
import { ContentPosition } from '../types';

export namespace ErrorBuilder {
    export function error(message: string, position: ContentPosition): ParserError {
        return {
            line: position.line,
            start: position.start,
            end: position.end,
            message: message,
            level: ParseErrorLevel.ERROR
        };
    }

    export function warning(message: string, position: ContentPosition): ParserError {
        return {
            line: position.line,
            start: position.start,
            end: position.end,
            message: message,
            level: ParseErrorLevel.WARNING
        };
    }
}
