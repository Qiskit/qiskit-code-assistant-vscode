/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Exposes the Visual Studio Code extension API to the Jest testing environment.
 *
 * Tests would otherwise not have access because they are sandboxed.
 *
 * @see jest-vscode-framework-setup.ts
 */
import NodeEnvironment from 'jest-environment-node';
import * as vscode from 'vscode';
class VsCodeEnvironment extends NodeEnvironment {
    constructor(config: any) {
        super(config);
    }
    public async setup() {
        await super.setup();
        this.global.vscode = vscode;
    }
    public async teardown() {
        this.global.vscode = {};
        await super.teardown();
    }
}
module.exports = VsCodeEnvironment;
