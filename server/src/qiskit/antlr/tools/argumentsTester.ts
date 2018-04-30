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

import { MethodCall, Method, Argument } from "./methodCall";
import { SymbolTable, Symbol, BuiltInTypeSymbol } from "../../../tools/symbolTable";
import { ClassSymbol, ArgumentSymbol } from "../../compiler/qiskitSymbolTable";
import { Token, Parser } from "antlr4ts";

export class ArgumentsTester {

    constructor(private symbolTable: SymbolTable, private errorHandler: ArgumentsErrorHandler) {}

    check(call: MethodCall): void {
        let calledSymbol = this.symbolTable.lookup(call.variable.text);
        if (calledSymbol === null) {
            return;
        }

        if (calledSymbol.type instanceof ClassSymbol) {
            return this.traverseMethodsCheckingCalls(call, calledSymbol.type);
        }
    }

    private traverseMethodsCheckingCalls(call: MethodCall, classSymbol: ClassSymbol): void {
        call.trailingMethods.forEach((method) => {
            this.checkNumberOfArguments(method, classSymbol);
            this.checkEachMethodType(method, classSymbol);
        });
    }

    private checkEachMethodType(method: Method, classSymbol: ClassSymbol): void {
        method.arguments.forEach((argument, index) => {
            let searchedMethod = classSymbol.methods.find((m) => m.getName() === method.methodName.text);
            if (searchedMethod) {
                let requiredArgument = searchedMethod.getArguments()[index];
                this.checkArgumentType(requiredArgument, argument);
            }
        });
    }

    private checkArgumentType(requiredArgument: ArgumentSymbol, argument: Argument) {
        if (typeof requiredArgument === 'undefined') {
            return;
        }

        if (requiredArgument.type instanceof ClassSymbol) {
            this.checkClassType(requiredArgument, argument);
        } else {
            this.checkPrimitiveType(requiredArgument, argument);
        }
    }

    private checkClassType(requiredArgument: ArgumentSymbol, argument: Argument) {
        if (argument.type instanceof BuiltInTypeSymbol) {
            // TODO createWrongArgumentTypeError method
            let expectedType = requiredArgument.type.getName();
            let receivedType = argument.type.getName();
            this.errorHandler.wrongArgumentType(argument.token, expectedType, receivedType);

            return;
        }

        let argumentClassType = argument.type as Symbol;
        if (requiredArgument.type.getName() !== argumentClassType.type.getName()) {
            let expectedType = requiredArgument.type.getName();
            let receivedType = argumentClassType.type.getName();
            this.errorHandler.wrongArgumentType(argument.token, expectedType, receivedType);
        }
    }

    private checkPrimitiveType(requiredArgument: ArgumentSymbol, argument: Argument) {
        if (requiredArgument.type.getName() !== argument.type.getName()) {
            let expectedType = requiredArgument.type.getName();
            let receivedType = argument.type.getName();
            this.errorHandler.wrongArgumentType(argument.token, expectedType, receivedType);
        }
    }

    private checkNumberOfArguments(method: Method, classSymbol: ClassSymbol): void {
        let searchedMethod = classSymbol.methods.find((m) => m.getName() === method.methodName.text);
        if (typeof searchedMethod === 'undefined') {
            return;
        }

        if (method.arguments.length !== searchedMethod.arguments.length) {
            let expectedArguments = searchedMethod.arguments.length;
            let receivedArguments = method.arguments.length;

            this.errorHandler.wrongArgumentsNumber(method.methodName, expectedArguments, receivedArguments);
        }
    }

}

export abstract class ArgumentsErrorHandler {

    abstract handleError(offendingToken: Token, message: string): void;

    wrongArgumentType(offendingToken: Token, expected: string, received: string): void {
        let message = `Expecting argument type ${expected}, but received ${received}`;
        this.handleError(offendingToken, message);
    }

    wrongArgumentsNumber(offendingToken: Token, expected: number, received: number): void {
        let message = `Expecting ${expected} arguments, but received ${received}`;
        this.handleError(offendingToken, message);
    }

}

export class ParserArgumentsErrorHandler extends ArgumentsErrorHandler {

    constructor(private parser: Parser) {
        super();
    }

    handleError(offendingToken: Token, message: string): void {
        this.parser.notifyErrorListeners(message, offendingToken, null);
    }

}
