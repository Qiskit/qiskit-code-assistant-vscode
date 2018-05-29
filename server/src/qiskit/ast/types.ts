import { Position } from '../analyzers/types';

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

export interface Visitor {
    visitStatement?(item: Statement): void;
    visitAssignment?(item: Assignment): void;
    visitExpression?(item: Expression): void;
    visitVariableReference?(item: VariableReference): void;
    visitMethodReference?(item: MethodReference): void;
    visitArrayReference?(item: ArrayReference): void;
    visitInteger?(item: Integer): void;
    visitFloat?(item: Float): void;
    visitText?(item: Text): void;
}

export abstract class VisitableItem {
    line: number;
    start: number;
    end: number;

    abstract accept(visitor: Visitor): void;
}

export class Statement extends VisitableItem {
    expression: VisitableItem;

    constructor(expression: VisitableItem) {
        super();

        this.expression = expression;
    }

    accept(visitor: Visitor): void {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        }
    }

    toString(): string {
        return `Statement(${this.expression})`;
    }
}

export class Assignment extends VisitableItem {
    left: VisitableItem;
    right: VisitableItem;

    constructor(left: VisitableItem, right: VisitableItem) {
        super();

        this.left = left;
        this.right = right;
    }

    accept(visitor: Visitor): void {
        if (visitor.visitAssignment) {
            return visitor.visitAssignment(this);
        }
    }

    toString(): string {
        return `=(${this.left}, ${this.right})`;
    }
}

export class Expression extends VisitableItem {
    terms: VisitableItem[] = [];

    constructor(terms: VisitableItem[]) {
        super();

        this.terms = terms;
    }

    accept(visitor: Visitor): void {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        }
    }

    toString(): string {
        return `Expression(${this.terms.join(', ')})`;
    }
}

export class VariableReference extends VisitableItem {
    value: string;

    constructor(value: string, position: Position) {
        super();

        this.value = value;
        this.line = position.line;
        this.start = position.start;
        this.end = position.end;
    }

    accept(visitor: Visitor): void {
        if (visitor.visitVariableReference) {
            return visitor.visitVariableReference(this);
        }
    }

    toString(): string {
        return `Variable(${this.value})`;
    }
}

export class MethodReference extends VisitableItem {
    name: string;
    args: VisitableItem[] = [];

    constructor(name: string, args: VisitableItem[], position: Position) {
        super();

        this.name = name;
        this.args = args;
        this.line = position.line;
        this.start = position.start;
        this.end = position.end;
    }

    accept(visitor: Visitor): void {
        if (visitor.visitMethodReference) {
            return visitor.visitMethodReference(this);
        }
    }

    toString(): string {
        return `Method(${this.name}(${this.args.join(', ')}))`;
    }
}

export class ArrayReference extends VisitableItem {
    variable: string;
    index: number;

    constructor(variable: string, index: number, position: Position) {
        super();

        this.variable = variable;
        this.index = index;
        this.line = position.line;
        this.start = position.start;
        this.end = position.end;
    }

    accept(visitor: Visitor): void {
        if (visitor.visitArrayReference) {
            return visitor.visitArrayReference(this);
        }
    }

    toString(): string {
        return `${this.variable}[${this.index}]`;
    }
}

export class Integer extends VisitableItem {
    value: number;

    constructor(value: number, position: Position) {
        super();

        this.value = value;
        this.line = position.line;
        this.start = position.start;
        this.end = position.end;
    }

    accept(visitor: Visitor): void {
        if (visitor.visitInteger) {
            return visitor.visitInteger(this);
        }
    }

    toString(): string {
        return `${this.value}i`;
    }
}

export class Float extends VisitableItem {
    value: number;

    constructor(value: number, position: Position) {
        super();

        this.value = value;
        this.line = position.line;
        this.start = position.start;
        this.end = position.end;
    }

    accept(visitor: Visitor): void {
        if (visitor.visitFloat) {
            return visitor.visitFloat(this);
        }
    }

    toString(): string {
        return `${this.value}f`;
    }
}

export class Text extends VisitableItem {
    value: string;

    constructor(value: string, position: Position) {
        super();

        this.value = value;
        this.line = position.line;
        this.start = position.start;
        this.end = position.end;
    }

    accept(visitor: Visitor): void {
        if (visitor.visitText) {
            return visitor.visitText(this);
        }
    }

    toString(): string {
        return `${this.value}`;
    }
}
