import { CommonToken } from "antlr4ts";

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

export class Token {

    static build(type: number, text: string, start: number, stop: number) {
        let token = new CommonToken(type, text);
        token.startIndex = start;
        token.stopIndex = stop;
        token.line = 1;
    
        return token;
    }

}
