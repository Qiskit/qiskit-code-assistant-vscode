/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { CommandExecutor } from '../commandExecutor';
import * as Q from 'q';

export type ParserFunction = (out: string) => string;

export interface CommandExecutor {
    exec(command: string, args: string[], parser: ParserFunction): Q.Promise<string>;
}

const PIP_COMMAND = 'pip';

export class ChildProcessCommandExecutor implements CommandExecutor {
    public exec(command: string, args: string[], parser: ParserFunction): Q.Promise<string> {
        return CommandExecutor.exec(PIP_COMMAND, [command].concat(args))
            .then(stdout => {
                return Q.resolve(parser(stdout));
            })
            .catch(err => {
                return Q.reject(err);
            });
    }
}
