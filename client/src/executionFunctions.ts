// Copyright 2018 IBM RESEARCH. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

'use strict';

import * as vscode from 'vscode';
import * as Q from "q";
import { CommandExecutor } from "./commandExecutor";

export function runCodeOnQISKit(): Q.Promise<string> {
    return Q.Promise((resolve, reject) => {
        const codeFile = vscode.window.activeTextEditor.document;
        codeFile.save();
        // console.log(codeFile);
        // return Q.resolve(codeFile);
        (new CommandExecutor).exec("python", [codeFile.fileName.toString()])
            .then((stdout) => {
                // console.log(stdout);
                // vscode.window.showInformationMessage("Execution result:",stdout);
                return resolve(stdout);
            }).catch(err => {
                console.log(err);
                vscode.window.showErrorMessage(err);
                return reject(err);
            });
    });
}

export function discoverQiskitLocalBackends(): Q.Promise<void>{
    //print("Local backends: ", qiskit.backends.discover_local_backends());
    console.log("Not implemented!");
    return Q.resolve("Not implemented!");
}
