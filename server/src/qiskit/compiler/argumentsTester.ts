import { MethodCall, Method } from "./assignmentsStack";
import { SymbolTable } from "../../tools/symbolTable";
import { ClassSymbol } from "./qiskitSymbolTable";

'use strict';

export class ArgumentsTester {

    constructor(private symbolTable: SymbolTable) {}

    check(call: MethodCall): ArgumentError[] {
        let calledSymbol = this.symbolTable.lookup(call.getVariable());
        if (calledSymbol.type instanceof ClassSymbol) {
            return this.traverseMethodsCheckingCalls(call, calledSymbol.type);
        }
        return [];
    }

    private traverseMethodsCheckingCalls(call: MethodCall, classSymbol: ClassSymbol): ArgumentError[] {
        let errors: ArgumentError[] = [];

        call.getTrailingMethods().forEach((method) => {
            errors.push(... this.checkNumberOfArguments(method, classSymbol));
            errors.push(... this.checkEachMethodType(method, classSymbol));
        });

        return errors;
    }

    private checkEachMethodType(method: Method, classSymbol: ClassSymbol): ArgumentError[] {
        let errors: ArgumentError[] = [];

        method.arguments.forEach((argument, index) => {
            let searchedMethod = classSymbol.methods.find((m) => m.getName() === method.name);
            if (searchedMethod) {
                let requiredArgument = searchedMethod.getArguments()[index];
                if (!requiredArgument.isSameType(argument)) {
                    let expectedType = requiredArgument.type.getName();
                    let receivedType = typeof argument;

                    errors.push(ArgumentErrorBuilder.wrongArgumentsType(expectedType, receivedType));
                }
            }
        });

        return errors;
    }

    private checkNumberOfArguments(method: Method, classSymbol: ClassSymbol): ArgumentError[] {
        let searchedMethod = classSymbol.methods.find((m) => m.getName() === method.name);
        if (typeof searchedMethod === 'undefined') {
            return [];
        }

        if (method.arguments.length !== searchedMethod.arguments.length) {
            let expectedArguments = searchedMethod.arguments.length
            let receivedArguments = method.arguments.length;

            return [ArgumentErrorBuilder.wrongArgumentsNumber(expectedArguments, receivedArguments)];
        }

        return [];
    }

}

class ArgumentError {

    constructor(public message: string) {}

    toString(): string {
        return this.message;
    }

}

export class ArgumentErrorBuilder {

    static wrongArgumentsNumber(expected: number, received: number): ArgumentError {
        return new ArgumentError(`Expecting ${expected} arguments, but received ${received}`);
    }

    static wrongArgumentsType(expected: string, received: string): ArgumentError {
        return new ArgumentError(`Expecting argument type ${expected}, but received ${received}`);
    }

}