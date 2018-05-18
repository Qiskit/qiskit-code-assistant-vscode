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

export class Expression {
    terms: Term[] = [];

    static empty(): Expression {
        return new Expression();
    }

    static withTerms(terms: Term[]): Expression {
        let entity = new Expression();
        entity.terms = terms;

        return entity;
    }

    isSimpleOfType(type: TermType): boolean {
        if (this.terms.length !== 1) {
            return false;
        }

        return this.terms[0].type === type;
    }

    toString(): string {
        return `Expression(${this.terms.join(', ')})`;
    }
}

export class Term {
    value: any;
    type: TermType;

    static empty(): Term {
        return this._builder('');
    }

    static asString(value: string): Term {
        return this._builder(value, TermType.string);
    }

    static asVariable(value: string): Term {
        return this._builder(value, TermType.variable);
    }

    static asNumber(value: string): Term {
        return this._builder(value, TermType.number);
    }

    static asArguments(value: Expression[]): Term {
        return this._builder(value, TermType.arguments);
    }

    static asArrayReference(value: ArrayReference): Term {
        return this._builder(value, TermType.arrayReference);
    }

    static asArrayDimension(value: Expression[]): Term {
        return this._builder(value, TermType.arrayDimension);
    }

    static asExpression(value: Expression): Term {
        return this._builder(value, TermType.expression);
    }

    private static _builder(value: any, type?: TermType): Term {
        let entity = new Term();
        entity.value = value;
        entity.type = type || TermType.empty;

        return entity;
    }

    toString(): string {
        return `Term(${this.value} | ${this.type})`;
    }
}

export class ArrayReference {
    variable: string;
    position: string;
    positionType: TermType;

    toString(): string {
        return `ArrayReference(${this.variable}[${this.position}] | ${this.positionType})`;
    }
}

export enum TermType {
    empty = 'EMPTY',
    number = 'NUMBER',
    string = 'STRING',
    variable = 'VARIABLE',
    arguments = 'ARGUMENTS',
    arrayDimension = 'ARRAY_DIMENSION',
    arrayReference = 'ARRAY_REFERENCE',
    expression = 'EXPRESSION'
}