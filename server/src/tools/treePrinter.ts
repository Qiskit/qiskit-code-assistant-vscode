/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import { ParserRuleContext } from 'antlr4ts';

export namespace TreePrinter {
    export function print(ruleNames: string[], root: ParserRuleContext): void {
        console.log(`START : ${ruleNames[root.ruleIndex]} > `);
        printChildren(ruleNames, root.children as ParserRuleContext[], 1);
    }

    function printChildren(ruleNames: string[], children: ParserRuleContext[], level: number): void {
        children.forEach(child => {
            let spaces = '';
            let spacePosition = 0;
            while (spacePosition < level) {
                spaces += '|  ';
                spacePosition++;
            }
            if (ruleNames[child.ruleIndex] === undefined) {
                console.log(`${spaces}${child.text}`);
            } else {
                console.log(`${spaces}${ruleNames[child.ruleIndex]} > `);
            }
            if (child.childCount > 0) {
                printChildren(ruleNames, child.children as ParserRuleContext[], ++level);
                level--;
            }
        });
    }
}
