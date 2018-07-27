/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { CommonToken } from "antlr4ts";

export class Token {

    static build(type: number, text: string, start: number, stop: number) {
        let token = new CommonToken(type, text);
        token.startIndex = start;
        token.stopIndex = stop;
        token.line = 1;
    
        return token;
    }

}
