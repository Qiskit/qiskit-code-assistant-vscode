/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { Scope } from './scope';
import { QiskitSymbols, ArgumentSymbol, MethodSymbol, ClassSymbol } from './qiskitSymbolTable';
import { BuiltInTypeSymbol } from '../../tools/symbolTable';
import { QiskitSDK, QiskitMethod, QiskitArgument } from '../libs/qiskitSDK';
import { SymbolTable } from './types';
import { PersistentSymbolTable } from './persistentSymbolTable';

export namespace QiskitSymbolTableBuilder {
    export function create(): SymbolTable {
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

        return new PersistentSymbolTable(scope);
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
