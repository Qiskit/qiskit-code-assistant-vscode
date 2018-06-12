/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

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

    methodsIn(names: string[]): SuggestionSymbol[] {
        return this.symbolsWithTypeIn(['method']).filter(symbol => names.includes(symbol.label));
    }

    allMethods(): SuggestionSymbol[] {
        return this.symbolsWithTypeIn(['method']);
    }

    private getSymbols(): SuggestionSymbol[] {
        const qiskitSymbols: QiskitSDK = require('../libs/qiskitSDK.json');
        let symbols: SuggestionSymbol[] = [];
        qiskitSymbols.classes.forEach(qclass => {
            symbols.push({
                label: qclass.name,
                detail: qclass.detail,
                documentation: qclass.documentation,
                type: 'class',
                parent: qclass.name
            });
            symbols.push(...this.getMethods(qclass));
        });

        return symbols;
    }

    private getMethods(qclass: QiskitClass): SuggestionSymbol[] {
        return qclass.methods.map(qmethod => {
            return {
                label: qmethod.name,
                detail: qmethod.detail,
                documentation: qmethod.documentation,
                type: 'method',
                parent: qclass.name
            };
        });
    }
}

interface QiskitSDK {
    classes: QiskitClass[];
}

interface QiskitClass {
    name: string;
    detail: string;
    documentation: string;
    methods: QiskitMethod[];
}

interface QiskitMethod {
    name: string;
    type: string;
    detail: string;
    documentation: string;
    arguments: QiskitArgument[];
}

interface QiskitArgument {
    name: string;
    type: string;
}
