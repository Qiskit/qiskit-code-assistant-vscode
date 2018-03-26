/*
  Copyright IBM Corp. 2018. All Rights Reserved.

  This code may only be used under the Apache 2.0 license found at
  http://www.apache.org/licenses/LICENSE-2.0.txt.

  Authors:
  - Yeray Darias <yeray.darias@ibm.com>
*/

'use strict';

import { ParserRuleContext } from "antlr4ts";

export class TreePrinter  {

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