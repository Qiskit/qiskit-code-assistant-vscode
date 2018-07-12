/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

export interface Visitor<T> {
    visitCodeBlock?(item: CodeBlock): T;
    visitStatement?(item: Statement): T;
    visitAssignment?(item: Assignment): T;
    visitExpression?(item: Expression): T;
    visitVariableReference?(item: VariableReference): T;
    visitMethodReference?(item: MethodReference): T;
    visitArrayReference?(item: ArrayReference): T;
    visitInteger?(item: Integer): T;
    visitFloat?(item: Float): T;
    visitText?(item: Text): T;
    visitBoolean?(item: QiskitBoolean): T;
    visitDictionary?(item: Dictionary): T;

    defaultValue(): T;
}

export interface Position {
    line: number;
    column: number;
}

export abstract class VisitableItem {
    start: Position;
    end: Position;

    abstract accept<T>(visitor: Visitor<T>): T;
}

export abstract class Block extends VisitableItem {
    childs: Block[] = [];

    constructor(childs?: Block[]) {
        super();

        if (childs) {
            this.childs = childs;
        }
    }
}

export class CodeBlock extends Block {
    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitCodeBlock) {
            return visitor.visitCodeBlock(this);
        }
        return visitor.defaultValue();
    }

    toString(): string {
        return `CodeBlock(${this.childs.join(', ')})`;
    }
}

export class Statement extends Block {
    expression: VisitableItem;

    constructor(expression: VisitableItem) {
        super();

        this.expression = expression;
        if (expression) {
            this.start = expression.start;
            this.end = expression.end;
        }
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
        this.start = left.start;
        if (right) {
            this.end = right.end;
        } else {
            this.end = left.end;
        }
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

        let term = terms.filter(term => term !== null).find(term => term.start !== null && term.end !== null);
        if (term) {
            this.start = term.start;
            this.end = term.end;
        }
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

    constructor(value: string, start: Position, end: Position) {
        super();

        this.value = value;
        this.start = start;
        this.end = end;
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

    constructor(name: string, args: VisitableItem[], start: Position, end: Position) {
        super();

        this.name = name;
        this.args = args;
        this.start = start;
        this.end = end;
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

    constructor(variable: string, index: number, start: Position, end: Position) {
        super();

        this.variable = variable;
        this.index = index;
        this.start = start;
        this.end = end;
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

    constructor(value: number, start: Position, end: Position) {
        super();

        this.value = value;
        this.start = start;
        this.end = end;
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

    constructor(value: number, start: Position, end: Position) {
        super();

        this.value = value;
        this.start = start;
        this.end = end;
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

    constructor(value: string, start: Position, end: Position) {
        super();

        this.value = value;
        this.start = start;
        this.end = end;
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

export class QiskitBoolean extends VisitableItem {
    value: boolean;

    constructor(value: boolean, start: Position, end: Position) {
        super();

        this.value = value;
        this.start = start;
        this.end = end;
    }

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitText) {
            return visitor.visitBoolean(this);
        }
        return visitor.defaultValue();
    }

    toString(): string {
        return `${this.value}`;
    }
}

export class Dictionary extends VisitableItem {
    value = '';

    constructor(start: Position, end: Position) {
        super();

        this.start = start;
        this.end = end;
    }

    accept<T>(visitor: Visitor<T>): T {
        if (visitor.visitText) {
            return visitor.visitDictionary(this);
        }
        return visitor.defaultValue();
    }

    toString(): string {
        return `Dictionary()`;
    }
}
