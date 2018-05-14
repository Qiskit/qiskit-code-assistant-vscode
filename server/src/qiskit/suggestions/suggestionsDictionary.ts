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

import { SuggestionSymbol } from '../../types';

export class SuggestionsDictionary {
    allSymbols(): SuggestionSymbol[] {
        return this.getSymbols();
    }

    symbolsWithTypeIn(types: string[]): SuggestionSymbol[] {
        let isContainedInTypes = (symbol: SuggestionSymbol) => types.indexOf(symbol.type) > -1;

        return this.getSymbols().filter(isContainedInTypes);
    }

    private getSymbols(): SuggestionSymbol[] {
        const qiskitSymbols: QiskitSDK = require('../libs/qiskitSDK.json');
        let symbols: SuggestionSymbol[] = [];
        qiskitSymbols.classes.forEach(qclass => {
            symbols.push({
                label: qclass.name,
                detail: qclass.info,
                documentation: qclass.detail,
                type: 'class'
            });
            symbols.push(...this.getMethods(qclass.methods));
        });

        return symbols;
    }

    private getMethods(methods: QiskitMethod[]): SuggestionSymbol[] {
        return methods.map(qmethod => {
            return {
                label: qmethod.name,
                detail: qmethod.info,
                documentation: qmethod.detail,
                type: 'method'
            };
        });
    }
}

interface QiskitSDK {
    classes: QiskitClass[];
}

interface QiskitClass {
    name: string;
    info: string;
    detail: string;
    methods: QiskitMethod[];
}

interface QiskitMethod {
    name: string;
    type: string;
    info: string;
    detail: string;
    arguments: QiskitArgument[];
}

interface QiskitArgument {
    name: string;
    type: string;
}
