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

// Symbol table implementation guided by Terence Parr book, Language implementation patterns

export class SymbolTable {

    currentScope: Scope;

    constructor(scope: Scope) {
        this.currentScope = scope;
    }

    lookup(name: string): Symbol {
        let symbol = this.currentScope.lookup(name);
        if (symbol) {
            return symbol;
        }

        return null;
    }

    define(symbol: Symbol): void {
        this.currentScope.define(symbol);
    }

    push(scopeName: string): void {
        this.currentScope = new LocalScope(scopeName, this.currentScope);
    }

    pop(): Scope {
        let oldScope = this.currentScope;
        this.currentScope = this.currentScope.getEnclosingScope();

        return oldScope;
    }
    
    definedSymbols(): string[] {
        return this.currentScope.definedSymbols().map((symbol) => symbol.name);
    }

    print() {
        console.log('Printing symbol table >>>>>>>>');
        this.currentScope.print();
        console.log('<<<<<<<<<<<<<<<<');
    }

}

export class Symbol implements Type {

    name: string;

    type: Type;

    constructor(name: string, type: Type) {
        this.name = name;
        this.type = type;
    }

    getName(): string {
        return this.name;
    }

}

export class BuiltInTypeSymbol extends Symbol implements Type {

    constructor(name: string) {
        super(name, null);
    }

    getName(): string {
        return this.name;
    }

    toString(): string {
        return `{ name: ${this.getName()} }`;
    }

}

export interface Type {

    getName():string;

}

abstract class Scope {

    dictionary: Map<string, Symbol> = new Map();

    abstract getScopeName(): string;

    abstract getEnclosingScope(): Scope;
    
    define(symbol: Symbol): void {
        this.dictionary.set(symbol.name, symbol);
    }

    lookup(name: string): Symbol {
        let symbol = this.dictionary.get(name);
        
        if (symbol) {
            return symbol;
        }
        
        if (this.getEnclosingScope()) {
            return this.getEnclosingScope().lookup(name);
        }

        return null;
    }

    definedSymbols(): Symbol[] {
        let symbols: Symbol[] = [];
        if (this.getEnclosingScope()) {
            symbols.push(...this.getEnclosingScope().definedSymbols());
        }

        let noBuiltInSymbols = Array.from(this.dictionary.values())
            .filter((symbol) => !(symbol instanceof BuiltInTypeSymbol));
        symbols.push(...noBuiltInSymbols);

        return symbols;
    }

    print(): void {
        console.log(`${this.getScopeName()} => `);
        this.printEntries();
        
        if (this.getEnclosingScope()) {
            this.getEnclosingScope().print();
        }
    }

    private printEntries() {
        this.dictionary.forEach((entry) => {
            console.log(`\t${entry.toString()}`);
        });
    }

}

export class GlobalScope extends Scope {

    getScopeName(): string {
        return 'global';
    }

    getEnclosingScope(): Scope {
        return null;
    }

}

export class LocalScope extends Scope {

    name: string;

    enclosingScope: Scope;

    constructor(name: string, enclosingScope: Scope) {
        super();
        
        this.name = name;
        this.enclosingScope = enclosingScope;
    }

    getScopeName(): string {
        return this.name;
    }

    getEnclosingScope(): Scope {
        return this.enclosingScope;
    }

}


