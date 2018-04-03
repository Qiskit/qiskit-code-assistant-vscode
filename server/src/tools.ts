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

import { ParserRuleContext } from "antlr4ts";

export class TreePrinter {

    public static print(ruleNames: string[], root: ParserRuleContext): void {
        console.log(`START : ${ruleNames[root.ruleIndex]} > `);
        this.printChildren(ruleNames, root.children as ParserRuleContext[], 1);
    }

    private static printChildren(ruleNames: string[], children: ParserRuleContext[], level: number): void {
        children.forEach((child) => {
            let spaces = '';
            let spacePosition = 0;
            while (spacePosition < level) {
                spaces += '|  ';
                spacePosition++;
            }
            if (ruleNames[child.ruleIndex] == undefined) {
                console.log(`${spaces}${child.text}`);
            } else {
                console.log(`${spaces}${ruleNames[child.ruleIndex]} > `);
            }
            if (child.childCount > 0) {
                this.printChildren(ruleNames, child.children as ParserRuleContext[], ++level);
                level--;
            }
        });
    }

}