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

/**
 * Takes the Visual Studio Code extension API which was exposed on the sandbox's
 * global object and uses it to create a virtual mock. This replaces vscode
 * module imports with the vscode extension instance from the test runner's
 * environment.
 *
 * @see jest-vscode-environment.ts
 */
jest.mock('vscode', () => global.vscode, { virtual: true });
