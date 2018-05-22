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

export class ResultProvider implements TextDocumentContentProvider {
    public content: string;
    
    private _onDidChange = new EventEmitter<Uri>();

    public displayContent(content: string, uri: Uri){
        this.content = content;
        this.update(uri);
    }

    public provideTextDocumentContent(): string {
        return this.content;
    }

    get onDidChange(): Event<Uri> {
        return this._onDidChange.event;
    }

    public update(uri: Uri) {
        this._onDidChange.fire(uri);
    }

} 