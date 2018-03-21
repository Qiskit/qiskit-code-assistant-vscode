/*
  Copyright IBM Corp. 2018. All Rights Reserved.

  This code may only be used under the Apache 2.0 license found at
  http://www.apache.org/licenses/LICENSE-2.0.txt.

  Authors:
  - Yeray Darias <yeray.darias@ibm.com>
*/

'use strict';

// Symbol table implementation guided by Terence Parr book, Language implementation patterns

export class SymbolTableBuilder {
    
    public static build(): SymbolTable {
        let globalScope = new GlobalScope();
        let symbolTable = new SymbolTable(globalScope);
        symbolTable.define(new BuiltInTypeSymbol('CREG'));

        return symbolTable;
    }

}

export class SymbolTable {

    currentScope: Scope;

    constructor(scope: Scope) {
        this.currentScope = scope;
    }

    lookup(name: string): Symbol {
        return this.currentScope.lookup(name);
    }

    define(symbol: Symbol): void {
        this.currentScope.define(symbol);
    }
    
}

class Symbol {

    name: string;

    type: Type;

    constructor(name: string, type: Type) {
        this.name = name;
        this.type = type;
    }

}

class BuiltInTypeSymbol extends Symbol implements Type {

    constructor(name: string) {
        super(name, null);
    }

    getName(): string {
        return this.name;
    }

}

class VariableSymbol extends Symbol {
    
    constructor(name: string, type: Type) {
        super(name, type);
    }

}

interface Type {

    getName():string;

}

class GlobalScope implements Scope {

    dictionary: Map<string, Symbol> = new Map();

    getScopeName(): string {
        return 'global';
    }

    getEnclosingScope(): Scope {
        return null;
    }

    define(symbol: Symbol): void {
        this.dictionary.set(symbol.name, symbol);
    }

    lookup(name: string): Symbol {
        return this.dictionary.get(name);
    }

}

interface Scope {

    getScopeName(): string;

    getEnclosingScope(): Scope;

    define(symbol: Symbol): void;

    lookup(name: string): Symbol;

}