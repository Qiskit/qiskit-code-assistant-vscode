'use strict';

import { expect } from 'chai';
import { ParseErrorLevel, ParserError } from '../../src/qasm/model';

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

