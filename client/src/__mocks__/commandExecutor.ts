/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import * as Q from 'q';
import * as nodeChildProcess from 'child_process';

interface IExecOptions {
    cwd?: string;
    stdio?: any;
    env?: any;
    encoding?: string;
    timeout?: number;
    maxBuffer?: number;
    killSignal?: string;
}

export namespace CommandExecutor {
    export function exec(command: string, args: string[] = [], options: IExecOptions = {}): Q.Promise<string> {
        let outcome = Q.defer<string>();

        nodeChildProcess.exec(
            command + ' ' + args.join(' '),
            options,
            (error: Error, stdout: string, stderr: string) => {
                if (error) {
                    // Dirty trick, read below.
                    let errorString = stdout + stderr;
                    outcome.reject(errorString);
                } else {
                    // Dirty trick, some commands outputs successfully commands,
                    // like --version to stderr (WTF!). Python interpreter is an
                    // example, unfortunately.
                    let outputString = stdout + stderr;
                    outcome.resolve(outputString);
                }
            }
        );

        return outcome.promise;
    }
}
