import { MethodCall, Method } from "./assignmentsStack";
import { SymbolTable } from "../../tools/symbolTable";
import { ClassSymbol } from "./qiskitSymbolTable";

'use strict';

export class ArgumentsTester {

    constructor(private symbolTable: SymbolTable) {}

    check(call: MethodCall): ArgumentError[] {

        let calledSymbol = this.symbolTable.lookup(call.getVariable());

        if (calledSymbol.type instanceof ClassSymbol) {

            let errors: ArgumentError[] = [];
            let classSymbol = calledSymbol.type as ClassSymbol;

            call.getTrailingMethods().forEach((method) => {
                errors.push(... this.checkNumberOfArguments(method, classSymbol));

                if (method.hasArguments()) {
                    method.getArguments().forEach((argument, index) => {
                        let searchedMethod = classSymbol.methods.find((m) => m.getName() === method.getName());
                        if (searchedMethod) {
                            let requiredArgument = searchedMethod.getArguments()[index];
                            if (!requiredArgument.isSameType(argument)) {
                                let errorMessage = `Expecting argument of type ${requiredArgument.type.getName()}, but received ${typeof argument}`;
                                errors.push(new ArgumentError(errorMessage));
                            }
                        }
                    });
                }
            });

            console.log(`Errors detected > ${errors}`);

            return errors;
        }

        return [];
    }

    private checkNumberOfArguments(method: Method, classSymbol: ClassSymbol): ArgumentError[] {
        let searchedMethod = classSymbol.methods.find((m) => m.getName() === method.getName());
        if (method.arguments.length !== searchedMethod.arguments.length) {
            return [ArgumentErrorBuilder.wrongArgumentsNumber(searchedMethod.arguments.length, method.arguments.length)];
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

}