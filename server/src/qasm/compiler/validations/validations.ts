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

import { SymbolTable, Symbol } from '../../../tools/symbolTable';
import { ErrorListener } from '../tools/errorListener';
import { ErrorMessages } from '../tools/errorMessages';
import { ErrorBuilder } from '../tools/errorBuilder';
import { Override } from 'antlr4ts/Decorators';
import { RegisterSymbol, QASMSymbols } from '../symbolTable';
import { ContentPosition } from '../types';

export class SemanticRulesValidator {
    constructor(private symbolTable: SymbolTable, private errorListener: ErrorListener) {}

    validate(rules: SemanticRule[]) {
        if (rules === undefined || rules === null) {
            return;
        }

        rules.forEach(rule => rule.applyWith(this.symbolTable, this.errorListener));
    }
}

export interface SemanticRule {
    applyWith(symbolTable: SymbolTable, errorListener: ErrorListener): void;
}

export class RegistersOfSameSizeRule implements SemanticRule {
    constructor(
        private quantumRegister: string,
        private classicalRegister: string,
        private position: ContentPosition
    ) {}

    @Override
    applyWith(symbolTable: SymbolTable, errorListener: ErrorListener) {
        let quantumRegisterSymbol = symbolTable.lookup(this.quantumRegister);
        if (!this.isValidSymbol(quantumRegisterSymbol)) {
            return;
        }
        let classicalRegisterSymbol = symbolTable.lookup(this.classicalRegister);
        if (!this.isValidSymbol(classicalRegisterSymbol)) {
            return;
        }

        let quantumRegisterSize = (quantumRegisterSymbol as RegisterSymbol).size;
        let classicalRegisterSize = (classicalRegisterSymbol as RegisterSymbol).size;
        if (classicalRegisterSize < quantumRegisterSize) {
            let message = ErrorMessages.classicalRegisterTooSmall(this.quantumRegister, this.classicalRegister);
            let error = ErrorBuilder.error(message, this.position);

            errorListener.addError(error);
        }
    }

    private isValidSymbol(symbol: Symbol) {
        if (symbol === null) {
            return false;
        }

        return symbol instanceof RegisterSymbol;
    }
}

export class ExistingSymbolValidationRule implements SemanticRule {
    constructor(private variableName: string, private position: ContentPosition) {}

    @Override
    applyWith(symbolTable: SymbolTable, errorListener: ErrorListener) {
        if (symbolTable.lookup(this.variableName) !== null) {
            return;
        }

        let message = ErrorMessages.notPreviouslyDefined(this.variableName);
        let error = ErrorBuilder.error(message, this.position);

        errorListener.addError(error);
    }
}

export class ClassicalRegisterTypeRule implements SemanticRule {
    constructor(private variableName: string, private position: ContentPosition) {}

    @Override
    applyWith(symbolTable: SymbolTable, errorListener: ErrorListener) {
        let symbol = symbolTable.lookup(this.variableName);
        if (this.mustIgnore(symbol)) {
            return;
        }

        let message = ErrorMessages.expectingClassicalRegister(this.variableName);
        let error = ErrorBuilder.error(message, this.position);
        errorListener.addError(error);
    }

    private mustIgnore(symbol: Symbol): boolean {
        if (symbol === null) {
            return true;
        }
        if (symbol.type.getName() === QASMSymbols.Creg) {
            return true;
        }

        return false;
    }
}

export class QuantumRegisterTypeRule implements SemanticRule {
    constructor(private variableName: string, private position: ContentPosition) {}

    @Override
    applyWith(symbolTable: SymbolTable, errorListener: ErrorListener) {
        let symbol = symbolTable.lookup(this.variableName);
        if (this.mustIgnore(symbol)) {
            return;
        }

        let message = ErrorMessages.expectingQuantumRegister(this.variableName);
        let error = ErrorBuilder.error(message, this.position);
        errorListener.addError(error);
    }

    private mustIgnore(symbol: Symbol): boolean {
        if (symbol === null) {
            return true;
        }
        if (symbol.type.getName() === QASMSymbols.Qreg) {
            return true;
        }

        return false;
    }
}

export class ClassicalRegisterComparationRule implements SemanticRule {
    constructor(private variableName: string, private comparison: number, private position: ContentPosition) {}

    @Override
    applyWith(symbolTable: SymbolTable, errorListener: ErrorListener) {
        let symbol = symbolTable.lookup(this.variableName);
        if (this.mustIgnore(symbol)) {
            return;
        }

        let registerSize = (symbol as RegisterSymbol).size;
        let maximumValue = Math.pow(2, registerSize) - 1;
        if (this.comparison > maximumValue) {
            let message = ErrorMessages.incompatibleComparationValue(this.variableName, maximumValue);
            let error = ErrorBuilder.error(message, this.position);
            errorListener.addError(error);
        }
    }

    private mustIgnore(symbol: Symbol): boolean {
        if (symbol === null) {
            return true;
        }
        if (symbol.type.getName() !== QASMSymbols.Creg) {
            return true;
        }

        return !(symbol instanceof RegisterSymbol);
    }
}

export class ValidRegisterReferenceRule implements SemanticRule {
    constructor(private variableName: string, private reference: number, private position: ContentPosition) {}

    @Override
    applyWith(symbolTable: SymbolTable, errorListener: ErrorListener) {
        let symbol = symbolTable.lookup(this.variableName);
        if (this.mustIgnore(symbol)) {
            return;
        }

        let registerSize = (symbol as RegisterSymbol).size;
        if (this.reference >= registerSize) {
            let message = ErrorMessages.indexOutOfBound(this.variableName, registerSize);
            let error = ErrorBuilder.error(message, this.position);
            errorListener.addError(error);
        }
    }

    private mustIgnore(symbol: Symbol): boolean {
        if (symbol === null) {
            return true;
        }

        return !(symbol instanceof RegisterSymbol);
    }
}

export class PreviousDefinitionValidation {
    constructor(private symbolTable: SymbolTable, private errorListener: ErrorListener) {}

    apply(variableName: string, position: ContentPosition) {
        if (this.symbolTable.lookup(variableName) === null) {
            return;
        }

        let message = ErrorMessages.previousDefinitionOf(variableName);
        let error = ErrorBuilder.warning(message, position);

        this.errorListener.addError(error);
    }
}
