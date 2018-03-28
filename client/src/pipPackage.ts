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

import * as vscode from 'vscode';
import * as Q from "q";
import {Version} from "./version";
import {IPackageInfo, IPackage} from "./interfaces";
import {PipWrapper} from "./pipWrapper";
import {PyPiWrapper} from "./pypiWrapper";

export class PipPackage implements IPackage {
    //TODO: Get Info form local installation
    public Info: IPackageInfo = {
        Name: "",
        Version: Version.fromString("-1.-1.-1"),
        Summary: "",
        Location: "",
        Dependencies: "",
        getPackageInfo: ()=>{},
    };

    private pip : PipWrapper = new PipWrapper();
    private pypi: PyPiWrapper = new PyPiWrapper();
    
    constructor(name: string){
        this.Info.Name = name;
    }

    public check(): Q.Promise<void> {
        return this.pip.getPackageInfo(this.Info.Name)
        .then((installedPkgInfo: IPackageInfo) => {
            this.Info = installedPkgInfo;
            // Let's check for new versions
            return this.pypi.getPackageInfo(this.Info.Name);
        }).then((pkgInfo: IPackageInfo) => {
            if(pkgInfo.Version.isGreater(this.Info.Version)){
                // TODO: Show a user dialog and asks for permission to update
                return vscode.window.showInputBox({
                    ignoreFocusOut: true,
                    prompt: `There's a new QISKit release: ${pkgInfo.Version.toString()}. Do you want to upgrade?`,
                    value: 'Yes',
                });
            }

            return null;
        // There's a new version...
        }).then((selection: string|undefined) => {
            if(selection == 'Yes'){
                return this.pip.update('qiskit').then((stdout) => {
                    console.log(stdout);
                    vscode.window.showInformationMessage('QISKit updated!!');
                    return Q.resolve();
                }).catch((error) => {
                    console.log(error);
                    vscode.window.showInformationMessage(`ERROR: Couldn't upgrade QISKit. ${error}`);
                    return Q.reject(error);
                });
            }
            return Q.resolve();
        });
    }

    public update(): Q.Promise<string> {
        return Q.resolve();
    }
}