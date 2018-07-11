/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { BuiltInTypeSymbol, Symbol } from '../../tools/symbolTable';
import { QiskitSymbols } from './qiskitSymbolTable';
import { start } from 'repl';

const MAX_LINE = 35000;

export class PersistentSymbolTable {
    private currentScope: Scope;

    constructor(private rootScope: Scope) {
        this.currentScope = rootScope;
    }

    lookup(symbolName: string, line?: number): Symbol {
        return this.rootScope.lookup(symbolName, line);
    }

    define(symbol: Symbol, line: number): void {
        this.currentScope.define(symbol, line);
    }

    push(scopeName: string, line: number): void {
        let localScope = new Scope(this.currentScope, scopeName, line);
        this.currentScope.childs.push(localScope);

        this.currentScope = localScope;
    }

    pop(line: number): void {
        this.currentScope.closeScopeAt(line);
        this.currentScope = this.currentScope.parentScope;
    }

    print() {
        console.log('Printing symbol table >>>>>>>>');
        this.rootScope.print();
        console.log('<<<<<<<<<<<<<<<<');
    }
}

class Scope {
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

    define(symbol: Symbol, startLine = 1, endLine = MAX_LINE) {
        if (this.dictionary.has(symbol.name)) {
            let lastDefinition = this.dictionary.get(symbol.name).pop();
            lastDefinition.endLine = startLine - 1;

            this.dictionary.get(symbol.name).push(lastDefinition);

            let variableDefinition = new VariableDefinition(symbol, startLine, endLine);
            this.dictionary.get(symbol.name).push(variableDefinition);
        } else {
            let variableDefinition = new VariableDefinition(symbol, startLine, endLine);
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

class VariableDefinition {
    constructor(public symbol: Symbol, public startLine: number, public endLine: number) {}

    nameEquals(name: string): boolean {
        return this.symbol.name === name;
    }

    inScope(line: number): boolean {
        return line >= this.startLine && line <= this.endLine;
    }

    toString() {
        return `{ ${this.symbol} from: ${this.startLine} to: ${this.endLine}] }`;
    }
}

export namespace QiskitInitialScope {
    export function create(): Scope {
        let scope = new Scope(null, 'global');

        scope.define(new BuiltInTypeSymbol(QiskitSymbols.void));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.object));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.string));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.number));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.boolean));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.dictionary));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.qbitPol));
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.class));

        return scope;
    }
}
