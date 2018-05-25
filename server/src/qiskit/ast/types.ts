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

export interface Visitor {
    visitAssignmentExpression?(item: AssignmentExpression): void;
    visitExpression?(item: Expression): void;
    visitVariableReference?(item: VariableReference): void;
}

export abstract class VisitableItem {
    line: number;
    start: number;
    end: number;

    abstract accept(visitor: Visitor): void;
}

export class AssignmentExpression extends VisitableItem {
    left: VisitableItem;
    right: VisitableItem;

    accept(visitor: Visitor): void {
        if (visitor.visitAssignmentExpression) {
            return visitor.visitAssignmentExpression(this);
        }
    }
}

export class Expression extends VisitableItem {
    terms: VisitableItem[] = [];

    accept(visitor: Visitor): void {
        if (visitor.visitAssignmentExpression) {
            return visitor.visitExpression(this);
        }
    }
}

export class VariableReference extends VisitableItem {
    value: string;

    accept(visitor: Visitor): void {
        if (visitor.visitAssignmentExpression) {
            return visitor.visitVariableReference(this);
        }
    }
}
