/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

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

