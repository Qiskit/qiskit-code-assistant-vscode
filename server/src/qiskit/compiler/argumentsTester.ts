import { MethodCall } from "./assignmentsStack";
import { SymbolTable } from "../../tools/symbolTable";
import { ClassSymbol } from "./qiskitSymbolTable";

'use strict';

export class ArgumentsTester {

    constructor(private symbolTable: SymbolTable) {}

    check(call: MethodCall): ArgumentError[] {

        console.log(`Checking arguments for call ${call}`);

        let calledSymbol = this.symbolTable.lookup(call.getVariable());

        console.log(`Found symbol ${calledSymbol}`);

        if (calledSymbol.type instanceof ClassSymbol) {

            console.log(`${calledSymbol.type} is a ClassSymbol`);

            let errors: ArgumentError[] = [];
            let classSymbol = calledSymbol.type as ClassSymbol;

            call.getTrailingMethods().forEach((method) => {
                if (method.hasArguments()) {
                    method.getArguments().forEach((argument, index) => {
                        let searchedMethod = classSymbol.methods.find((m) => m.getName() === method.getName());
                        if (searchedMethod) {
                            try {
                                let requiredArgument = searchedMethod.getArguments()[index];
                                if (requiredArgument.type === this.symbolTable.lookup('string')) {
                                    if (!(argument instanceof String)) {
                                        errors.push(new ArgumentError(`Expecting argument of type string, but received ${typeof argument}`));
                                    }
                                }
                                if (requiredArgument.type === this.symbolTable.lookup('int')) {
                                    if (!(argument instanceof Number)) {
                                        errors.push(new ArgumentError(`Expecting argument of type int, but received ${typeof argument}`));
                                    }
                                }
                            } catch(err) {
                                errors.push(new ArgumentError('Wrong number of arguments'));
                            }
                        }
                    });
                }
            });

            return errors;
        }

        console.log(`No class symbol find`);

        return [];
    }

}

class ArgumentError {

    constructor(public message: string) {}

}


/*
assignment.getTrailingMethods().forEach((method) => {
    let classType = currentSymbol.type as ClassSymbol;
    let compatibleMethod = classType.getMethods().find((m) => m.getName() === method.getName());
    if (compatibleMethod) {
      currentSymbol = this.symbolTable.lookup(compatibleMethod.type.getName());
    } else {
      let message = `Method ${method.getName()} not available at current scope`
      this.notifyErrorListeners(message, start, null);
    }
  });
  */