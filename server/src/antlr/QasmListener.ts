// Generated from src/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { StartProgramContext } from './QasmParser';
import { MainProgramContext } from './QasmParser';
import { IbmDefinitionContext } from './QasmParser';
import { IncludeContext } from './QasmParser';
import { LibraryContext } from './QasmParser';
import { ProgramContext } from './QasmParser';
import { StatementContext } from './QasmParser';


/**
 * This interface defines a complete listener for a parse tree produced by
 * `QasmParser`.
 */
export interface QasmListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `QasmParser.startProgram`.
	 * @param ctx the parse tree
	 */
	enterStartProgram?: (ctx: StartProgramContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.startProgram`.
	 * @param ctx the parse tree
	 */
	exitStartProgram?: (ctx: StartProgramContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.mainProgram`.
	 * @param ctx the parse tree
	 */
	enterMainProgram?: (ctx: MainProgramContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.mainProgram`.
	 * @param ctx the parse tree
	 */
	exitMainProgram?: (ctx: MainProgramContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.ibmDefinition`.
	 * @param ctx the parse tree
	 */
	enterIbmDefinition?: (ctx: IbmDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.ibmDefinition`.
	 * @param ctx the parse tree
	 */
	exitIbmDefinition?: (ctx: IbmDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.include`.
	 * @param ctx the parse tree
	 */
	enterInclude?: (ctx: IncludeContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.include`.
	 * @param ctx the parse tree
	 */
	exitInclude?: (ctx: IncludeContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.library`.
	 * @param ctx the parse tree
	 */
	enterLibrary?: (ctx: LibraryContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.library`.
	 * @param ctx the parse tree
	 */
	exitLibrary?: (ctx: LibraryContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;
}

