/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { CommandExecutor } from '../src/commandExecutor';
jest.mock('../src/commandExecutor');

describe('activation utils', () => {
    it('execute a python file', () => {
        let scriptPath = '/src/file';
        let options = [];
        return CommandExecutor.execPythonFile(scriptPath, options).then(codeResult => {
            expect(codeResult).toEqual(`Python file executed! ${scriptPath}  ${options}`);
        });
    });
    it('execute a openQASM active editor', () => {
        let scriptPath = '/src/file';
        return CommandExecutor.execQasmActiveEditor(scriptPath).then(codeResult => {
            expect(codeResult).toEqual(`OpenQASM executed! ${scriptPath}`);
        });
    });
    it('execute the python active editor', () => {
        return CommandExecutor.execPythonActiveEditor().then(codeResult => {
            expect(codeResult).toEqual(`Python active editor executed!`);
        });
    });
});
