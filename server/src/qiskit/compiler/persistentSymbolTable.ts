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
import { QiskitSymbols, ArgumentSymbol, MethodSymbol, ClassSymbol } from './qiskitSymbolTable';
import { QiskitSDK, QiskitMethod, QiskitArgument } from '../libs/qiskitSDK';
import { SymbolTable } from './types';

const MAX_LINE = 35000;

export class PersistentSymbolTable implements SymbolTable {
    private currentScope: Scope;

    constructor(private rootScope: Scope) {
        this.currentScope = rootScope;
    }

    lookup(symbolName: string, line?: number): Symbol {
        return this.rootScope.lookup(symbolName, line);
    }

    define(symbol: Symbol, declarationLine: number): void {
        this.currentScope.define(symbol, declarationLine);
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
        return `{ ${this.symbol} from: ${this.startLine} to: ${this.endLine} }`;
    }
}

export namespace QiskitInitialScope {
    export function create(): Scope {
        let scope = new Scope(null, 'global');

        scope.define(new BuiltInTypeSymbol(QiskitSymbols.void), 0);
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.object), 0);
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.string), 0);
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.number), 0);
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.boolean), 0);
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.dictionary), 0);
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.qbitPol), 0);
        scope.define(new BuiltInTypeSymbol(QiskitSymbols.class), 0);

        loadQiskitSymbolsAt(scope);

        return scope;
    }

    function loadQiskitSymbolsAt(scope: Scope): void {
        QiskitSDK.classes().forEach(qclass => {
            let type = scope.lookup(QiskitSymbols.class);
            let args: ArgumentSymbol[] = getArgumentsSymbols(qclass.arguments, scope);
            let methods: MethodSymbol[] = getMethodsSymbols(qclass.methods, scope);
            let classSymbol = new ClassSymbol(qclass.name, type, args, methods);

            scope.define(classSymbol, 0);
        });
    }

    function getMethodsSymbols(qmethods: QiskitMethod[], scope: Scope): MethodSymbol[] {
        return qmethods.map(qmethod => {
            let type = scope.lookup(qmethod.type) || scope.lookup(QiskitSymbols.void);
            let requiredArguments = getArgumentsSymbols(qmethod.arguments, scope);

            return new MethodSymbol(qmethod.name, type, requiredArguments);
        });
    }

    function getArgumentsSymbols(qarguments: QiskitArgument[] | undefined, scope: Scope): ArgumentSymbol[] {
        if (qarguments === undefined) {
            return [];
        }

        return qarguments.map(qargument => {
            let type = scope.lookup(qargument.type) || scope.lookup(QiskitSymbols.void);

            return new ArgumentSymbol(qargument.name, type, qargument.optional);
        });
    }
}
