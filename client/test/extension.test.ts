/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { activate } from "../src/extension";
import * as vscode from "vscode";

// Defines a Jest test suite to group tests of similar kind together
describe("Extension", () => {
  // Defines a Jest unit test
  test("Activate", () => {
    const context: vscode.ExtensionContext = {
      subscriptions: [],
    } as any;
    activate(context);

    expect(context.subscriptions.length).toBeGreaterThan(0);
  });
});