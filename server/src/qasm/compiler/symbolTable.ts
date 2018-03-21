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
        symbolTable.define(new BuiltInTypeSymbol('QREG'));
        symbolTable.define(new BuiltInTypeSymbol('INT'));
        symbolTable.define(new BuiltInTypeSymbol('REAL'));
        symbolTable.define(new BuiltInTypeSymbol('GATE'));

        return symbolTable;
    }

}

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

        throw new Error('Not defined symbol');
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

export class VariableSymbol extends Symbol {
    
    constructor(name: string, type: Type) {
        super(name, type);
    }

}

export class GateSymbol extends Symbol {

    constructor(name: string, type: Type) {
        super(name, type);
    }

}

interface Type {

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
        let symbol = this.dictionary.get(name)
        
        if (symbol) {
            return symbol;
        }
        
        if (this.getEnclosingScope()) {
            return this.getEnclosingScope().lookup(name);
        }

        return null;
    }


}

class GlobalScope extends Scope {

    getScopeName(): string {
        return 'global';
    }

    getEnclosingScope(): Scope {
        return null;
    }

}

class LocalScope extends Scope {

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
