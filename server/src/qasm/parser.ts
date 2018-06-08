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

import { ANTLRErrorListener, CommonToken, Token, Recognizer, RecognitionException } from 'antlr4ts';
import { Parser, ParserResult, ParserError, ParseErrorLevel } from '../types';
import { Override } from 'antlr4ts/Decorators';
import { SymbolTableGenerator } from './ast/symbolTableGenerator';
import { SemanticAnalyzer } from './ast/semanticAnalyzer';
import { QASMSyntacticParser } from './qasmSyntacticParser';

export class QASMParser implements Parser {
    parse(input: string): ParserResult {
        let errorListener = new ErrorListener();

        let tree = QASMSyntacticParser.parseWithErrorListener(input, errorListener);
        let symbolTable = SymbolTableGenerator.symbolTableFor(tree, errorListener);
        let semanticErrors = SemanticAnalyzer.analyze(tree, symbolTable);

        return {
            ast: tree,
            errors: [...errorListener.errors, ...semanticErrors]
        };
    }
}

export class ErrorListener implements ANTLRErrorListener<CommonToken> {
    errors: ParserError[] = [];

    addError(error: ParserError) {
        this.errors.push(error);
    }

    @Override
    syntaxError<T extends Token>(
        _recognizer: Recognizer<T, any>,
        offendingSymbol: T | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        _e: RecognitionException | undefined
    ): void {
        // _e contains the first token of the rule that failed

        if (offendingSymbol.text === ')') {
            this.errors.push({
                line: line - 1,
                start: charPositionInLine,
                end: charPositionInLine + offendingSymbol.text.length,
                message: 'Expecting arguments before symbol )',
                level: ParseErrorLevel.ERROR
            });
        } else {
            this.errors.push({
                line: line - 1,
                start: charPositionInLine,
                end: charPositionInLine + offendingSymbol.text.length,
                message: msg,
                level: ParseErrorLevel.ERROR
            });
        }
    }
}
