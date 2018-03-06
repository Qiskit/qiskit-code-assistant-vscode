// Generated from src/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { StartProgramContext } from './QasmParser';


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
}

