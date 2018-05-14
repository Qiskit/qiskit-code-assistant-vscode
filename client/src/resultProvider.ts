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

import { TextDocumentContentProvider, EventEmitter, Uri, Event } from "vscode";
import * as fs from "fs";
import * as path from "path";

export class ResultProvider implements TextDocumentContentProvider {
    public content: string;
    private static HTML_TEMPLATE_COUNTS = path.join(__dirname,'../../resources/html-templates/temp-plot-shots.html'); 

    private _onDidChange = new EventEmitter<Uri>();

    public provideTextDocumentContent(): string {
        let templatePath = ResultProvider.HTML_TEMPLATE_COUNTS;

        if (process.platform === "win32") {
            templatePath = ResultProvider.HTML_TEMPLATE_COUNTS.replace(/\\/g, "/");
        }

        try{
            console.log("execResult.result",this.content);
            console.log(typeof this.content);

            this.content = this.content.replace(/'/g,"\"");
            try{
                let execResult = JSON.parse(String(this.content));
                return this.createHistogram(execResult.result[0].data.counts, templatePath);
            } catch(err){
                try{
                    let execResult = JSON.parse(String(this.content));
                    return this.createHistogram(execResult, templatePath);
                } catch (err){
                    return `<pre>${this.content}</pre>`;
                }
            }      
        } catch (err){
            console.log(err);
            return `<pre>${this.content}</pre>`;
        }
    }

    public createHistogram(countsArray:object|string, templatePath:string): string{
        let xArray = [];
        let yArray = [];

        const countsArrayOrd = {};
        Object.keys(countsArray).sort().forEach(function(key) {
            countsArrayOrd[key] = countsArray[key];
            });

        for(let element in countsArrayOrd) {
            xArray.push(element);
            yArray.push(countsArray[element]);
        }

        let html = undefined;                
        html = fs.readFileSync(templatePath,{ encoding: 'utf8' });  
        if (html !== undefined){
            let str2Replace = '"x": ["000", "001", "010", "011", "100", "101", "110", "111"], "y": [117, 136, 119, 119, 149, 142, 129, 113]';
            let replacement = `"x": ["${xArray}"], "y": [${yArray}]`;
            
            console.log("replacement",replacement);
            
            html = html.replace(str2Replace, replacement);

            return html;
        } else {
            return `<pre>${countsArray}</pre>`;
        }
    }

    get onDidChange(): Event<Uri> {
        return this._onDidChange.event;
    }

    public update(uri: Uri) {
        this._onDidChange.fire(uri);
    }

} 