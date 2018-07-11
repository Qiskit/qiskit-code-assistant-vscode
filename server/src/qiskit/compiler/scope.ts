/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { VariableDefinition } from './variableDefinition';
import { Symbol, BuiltInTypeSymbol } from '../../tools/symbolTable';

const MAX_LINE = 65536;

export class Scope {
    dictionary: Map<string, VariableDefinition[]> = new Map();
    childs: Scope[] = [];

    public endLine = MAX_LINE;

    constructor(public parentScope: Scope, public name: string, public startLine = 1) {}

    lookup(symbolName: string, line = MAX_LINE): Symbol {
        if (!this.dictionary.has(symbolName)) {
            let inRangeScope = this.childs.find(scope => scope.inScopeAt(line));
            if (inRangeScope) {
                return inRangeScope.lookup(symbolName, line);
            }

            return null;
        }

        let result = this.dictionary.get(symbolName).find(variableDefinition => {
            return variableDefinition.nameEquals(symbolName) && variableDefinition.inScope(line);
        });
        if (result) {
            return result.symbol;
        }

        return null;
    }

    define(symbol: Symbol, declarationLine: number) {
        if (this.dictionary.has(symbol.name)) {
            let lastDefinition = this.dictionary.get(symbol.name).pop();
            lastDefinition.endLine = declarationLine;

            this.dictionary.get(symbol.name).push(lastDefinition);

            let variableDefinition = new VariableDefinition(symbol, declarationLine + 1, MAX_LINE);
            this.dictionary.get(symbol.name).push(variableDefinition);
        } else {
            let variableDefinition = new VariableDefinition(symbol, declarationLine + 1, MAX_LINE);
            this.dictionary.set(symbol.name, [variableDefinition]);
        }
    }

    closeScopeAt(line: number): void {
        this.dictionary.forEach(variables => variables.forEach(variable => (variable.endLine = line)));
        this.endLine = line;
    }

    inScopeAt(line: number): boolean {
        return line >= this.startLine && line <= this.endLine;
    }

    definedSymbols(): Symbol[] {
        let symbols: Symbol[] = [];
        if (this.parentScope) {
            symbols.push(...this.parentScope.definedSymbols());
        }

        let noBuiltInSymbols = Array.from(this.dictionary.values())
            .map(variableDefinition => variableDefinition[variableDefinition.length - 1].symbol)
            .filter(symbol => !(symbol instanceof BuiltInTypeSymbol));

        symbols.push(...noBuiltInSymbols);

        return symbols;
    }

    print(level = 1): void {
        let tabs = `${this.tabsGenerator(level - 1)}`;
        console.log(`${tabs}Scope "${this.name}" from ${this.startLine} to ${this.endLine} => `);

        this.printEntries(level);

        this.childs.forEach(child => child.print(level + 1));
    }

    private printEntries(level: number) {
        this.dictionary.forEach(entry => {
            console.log(`${this.tabsGenerator(level)}${entry.toString()}`);
        });
    }

    private tabsGenerator(amount: number): string {
        let tabs = '';

        for (let i = 0; i < amount; i++) {
            tabs += '\t';
        }

        return tabs;
    }
}
