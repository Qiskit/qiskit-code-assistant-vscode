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

import { expect } from 'chai';
import { Visitor, AssignmentExpression, Expression, VariableReference, VisitableItem } from '../src/qiskit/ast/types';

class MyVisitor implements Visitor {
    visitAssignmentExpression?(item: AssignmentExpression): void {
        item.right.accept(this);
        item.left.accept(this);
    }

    visitExpression?(item: Expression): void {
        item.terms.forEach(term => term.accept(this));
    }

    visitVariableReference?(item: VariableReference): void {
        console.log(`Matched a variable ${item.value}`);
    }
}

describe('A custom visitor', () => {
    let visitor: MyVisitor = new MyVisitor();

    describe('with a folded tree', () => {
        let assignment = theAssignment(theVariable('a'), theExpression([theVariable('b'), theVariable('c')]));

        it('should parse the tree', () => {
            visitor.visitAssignmentExpression(assignment);
        });
    });
});

function theAssignment(left: VisitableItem, right: VisitableItem): AssignmentExpression {
    let instance = new AssignmentExpression();
    instance.left = left;
    instance.right = right;

    return instance;
}

function theExpression(terms: VisitableItem[]): Expression {
    let instance = new Expression();
    instance.terms = terms;

    return instance;
}

function theVariable(value: string): VariableReference {
    let instance = new VariableReference();
    instance.value = value;

    return instance;
}
