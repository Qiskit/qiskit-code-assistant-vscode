/**
* This code is part of Qiskit.
*
* (C) Copyright IBM 2025.
*
* This code is licensed under the Apache License, Version 2.0. You may
* obtain a copy of this license in the LICENSE.txt file in the root directory
* of this source tree or at http:*www.apache.org/licenses/LICENSE-2.0.
*
* Any modifications or derivative works of this code must retain this
* copyright notice, and modified files need to carry a notice indicating
* that they have been altered from the originals.
*/

import * as vscode from "vscode";


function handler(): void {
  // Hide previous completions before triggering a new completion
  vscode.commands.executeCommand("editor.action.inlineSuggest.hide");

  vscode.commands.executeCommand("editor.action.inlineSuggest.trigger");
}

const command: CommandModule = {
  identifier: "qiskit-vscode.handle-get-completion",
  handler,
};

export default command;
