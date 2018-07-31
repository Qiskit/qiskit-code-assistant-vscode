/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Code adapted from https://github.com/Unibeautify/vscode/pull/19/files#diff-3090e25fed17a6bd57433c6bbadc451a
 */

declare module 'jest' {
    /**
     * Execute Jest and return a promise with the results.
     *
     * @see https://github.com/facebook/jest/blob/master/packages/jest-cli/src/cli/index.js
     * @param jestConfig Jest configuration options.
     * @param projects Paths to projects to run tests on.
     */
    export function runCLI(
        jestConfig: object,
        projects: string[]
    ): Promise<{ globalConfig: object; results: ResultsObject }>;
    export interface ResultsObject {
        testResults: {
            failureMessage?: string;
        }[];
    }
}
declare module 'jest-environment-node' {
    export default class NodeEnvironment {
        public global: any;
        constructor(config: any);
        public setup(): Promise<void>;
        public teardown(): Promise<void>;
        public runScript(script: any): any;
    }
}
/* tslint:disable-next-line:no-namespace */
declare namespace NodeJS {
    interface Global {
        vscode: any;
    }
}
