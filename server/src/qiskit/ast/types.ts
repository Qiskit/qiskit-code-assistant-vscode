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

export interface Visitor<T> {
    visitStatement?(item: Statement): T;
    visitAssignment?(item: Assignment): T;
    visitExpression?(item: Expression): T;
    visitVariableReference?(item: VariableReference): T;
    visitMethodReference?(item: MethodReference): T;
    visitArrayReference?(item: ArrayReference): T;
    visitInteger?(item: Integer): T;
    visitFloat?(item: Float): T;
    visitText?(item: Text): T;

    defaultValue(): T;
}

export abstract class VisitableItem {
    line: number;
    start: number;
    end: number;

    abstract accept<T>(visitor: Visitor<T>): T;
}

export class Statement extends VisitableItem {
    expression: VisitableItem;

    constructor(expression: VisitableItem) {
        super();

        this.expression = expression;
    }

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        }
        return visitor.defaultValue();
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

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitAssignment) {
            return visitor.visitAssignment(this);
        }
        return visitor.defaultValue();
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

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        }
        return visitor.defaultValue();
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

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitVariableReference) {
            return visitor.visitVariableReference(this);
        }
        return visitor.defaultValue();
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

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitMethodReference) {
            return visitor.visitMethodReference(this);
        }
        return visitor.defaultValue();
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

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitArrayReference) {
            return visitor.visitArrayReference(this);
        }
        return visitor.defaultValue();
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

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitInteger) {
            return visitor.visitInteger(this);
        }
        return visitor.defaultValue();
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

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitFloat) {
            return visitor.visitFloat(this);
        }
        return visitor.defaultValue();
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

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitText) {
            return visitor.visitText(this);
        }
        return visitor.defaultValue();
    }

    toString(): string {
        return `${this.value}`;
    }
}
