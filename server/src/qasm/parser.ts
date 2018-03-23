'use strict';

import { ANTLRInputStream, CommonTokenStream, ANTLRErrorListener, CommonToken, Token, Recognizer, RecognitionException, ConsoleErrorListener, ParserRuleContext } from 'antlr4ts';
import { CodeCompletionCore } from 'antlr4-c3';
import { ParserResult, ParserError, ParseErrorLevel } from '../qasm/model';
import { QasmLexer } from './antlr/QasmLexer';
import { QasmParser, CodeContext } from './antlr/QasmParser';
import { Override } from 'antlr4ts/Decorators';

export class Parser {

    parse(input: string): ParserResult {
        let errorListener = new ErrorListener();
        let parser = this.buildQasmParser(input, errorListener);
    
        let tree = parser.code();

        
        this.printTree(parser.ruleNames, tree);
    
        return {
            ast: tree,
            errors: errorListener.errors
        };
    }

    private printTree(ruleNames: string[], root: ParserRuleContext): void {
        console.log(`START : ${ruleNames[root.ruleIndex]} > `);
        this.printChildren(ruleNames, root.children as ParserRuleContext[], 1);
    }

    private printChildren(ruleNames: string[], children: ParserRuleContext[], level: number): void {
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

    private buildQasmParser(input: string, errorListener: ErrorListener): QasmParser {
        let inputStream = new ANTLRInputStream(input);
        let lexer = new QasmLexer(inputStream);
        lexer.removeErrorListener(ConsoleErrorListener.INSTANCE);
    
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new QasmParser(tokenStream);
        parser.addErrorListener(errorListener);

        return parser;
    }

}

class ErrorListener implements ANTLRErrorListener<CommonToken> {

    errors: ParserError[] = [];

    @Override
    syntaxError<T extends Token>(
        _recognizer: Recognizer<T, any>,
        offendingSymbol: T | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        _e: RecognitionException | undefined): void {

        this.errors.push({
            line: line - 1,
            start: charPositionInLine,
            end: charPositionInLine + offendingSymbol.text.length,
            message: msg,
            level: ParseErrorLevel.ERROR
        });
    }

}