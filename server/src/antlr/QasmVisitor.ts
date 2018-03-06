// Generated from src/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { StartProgramContext } from './QasmParser';


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `QasmParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface QasmVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `QasmParser.startProgram`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartProgram?: (ctx: StartProgramContext) => Result;
}

