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

import { expect } from 'chai';
import { ParseErrorLevel, ParserError } from '../../src/types';

export class Expect {

    public static oneErrorLike(error: Error): OneErrorLike {
        return new OneErrorLike(error);
    }

}

class OneErrorLike {

    expectedError: Error;

    constructor(expectedError: Error) {
        this.expectedError = expectedError;
    }

    public at(errors: ParserError[]): void {
        expect(errors).to.be.an('array')
            .with.length(1);
        expect(errors[0]).to.deep.equal({
            message: this.expectedError.message,
            line: this.expectedError.line || 0,
            start: this.expectedError.start,
            end: this.expectedError.end,
            level: ParseErrorLevel.ERROR
        });
    }

}

interface Error {

    message: string;

    start: number;

    end: number;

    line?: number;

}

