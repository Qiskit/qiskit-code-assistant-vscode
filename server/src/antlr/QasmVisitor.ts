// Generated from src/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { StartProgramContext } from './QasmParser';
import { MainProgramContext } from './QasmParser';
import { IbmDefinitionContext } from './QasmParser';
import { IncludeContext } from './QasmParser';
import { LibraryContext } from './QasmParser';
import { ProgramContext } from './QasmParser';
import { StatementContext } from './QasmParser';


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

	/**
	 * Visit a parse tree produced by `QasmParser.mainProgram`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMainProgram?: (ctx: MainProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.ibmDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIbmDefinition?: (ctx: IbmDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.include`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInclude?: (ctx: IncludeContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.library`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLibrary?: (ctx: LibraryContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
}

