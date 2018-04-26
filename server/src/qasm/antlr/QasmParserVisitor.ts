// Generated from QasmParser.g4 by ANTLR 4.6-SNAPSHOT


import { Register, SymbolsTable } from './utils';
import { QasmLexer } from './QasmLexer';
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'; 
import { SymbolTable, BuiltInTypeSymbol } from '../../tools/symbolTable'; 
import { SymbolTableBuilder, VariableSymbol, RegisterSymbol } from '../compiler/symbolTable';
import fs = require('fs');
import path = require('path');


import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { CodeContext } from './QasmParser';
import { HeadersContext } from './QasmParser';
import { IncludeLibraryContext } from './QasmParser';
import { SentencesContext } from './QasmParser';
import { CleanContext } from './QasmParser';
import { SentenceContext } from './QasmParser';
import { DefinitionContext } from './QasmParser';
import { ExpressionContext } from './QasmParser';
import { ConditionalContext } from './QasmParser';
import { GateDefinitionContext } from './QasmParser';
import { OpaqueDefinitionContext } from './QasmParser';
import { GateDefinitionArgumentsContext } from './QasmParser';
import { OpaqueDefinitionArgumentsContext } from './QasmParser';
import { ParamsListContext } from './QasmParser';
import { BodyContext } from './QasmParser';
import { BodyExpressionContext } from './QasmParser';
import { ParamsListBodyContext } from './QasmParser';
import { ExpContext } from './QasmParser';
import { UnaryOpContext } from './QasmParser';
import { MeasureContext } from './QasmParser';
import { QubitContext } from './QasmParser';
import { CbitContext } from './QasmParser';
import { CustomArglistContext } from './QasmParser';
import { ParamsListNumberContext } from './QasmParser';
import { QubitAndQregListContext } from './QasmParser';
import { QbitOrQregContext } from './QasmParser';
import { CxGateContext } from './QasmParser';
import { BarrierGateContext } from './QasmParser';
import { QubitListContext } from './QasmParser';
import { ResetGateContext } from './QasmParser';


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `QasmParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface QasmParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `QasmParser.code`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCode?: (ctx: CodeContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.headers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHeaders?: (ctx: HeadersContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.includeLibrary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludeLibrary?: (ctx: IncludeLibraryContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.sentences`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSentences?: (ctx: SentencesContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.clean`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClean?: (ctx: CleanContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.sentence`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSentence?: (ctx: SentenceContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefinition?: (ctx: DefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.conditional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional?: (ctx: ConditionalContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.gateDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateDefinition?: (ctx: GateDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.opaqueDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpaqueDefinition?: (ctx: OpaqueDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.gateDefinitionArguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateDefinitionArguments?: (ctx: GateDefinitionArgumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.opaqueDefinitionArguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpaqueDefinitionArguments?: (ctx: OpaqueDefinitionArgumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.paramsList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsList?: (ctx: ParamsListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBody?: (ctx: BodyContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.bodyExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBodyExpression?: (ctx: BodyExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.paramsListBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsListBody?: (ctx: ParamsListBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.exp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExp?: (ctx: ExpContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.unaryOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryOp?: (ctx: UnaryOpContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.measure`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMeasure?: (ctx: MeasureContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.qubit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQubit?: (ctx: QubitContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.cbit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCbit?: (ctx: CbitContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.customArglist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCustomArglist?: (ctx: CustomArglistContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.paramsListNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsListNumber?: (ctx: ParamsListNumberContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.qubitAndQregList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQubitAndQregList?: (ctx: QubitAndQregListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.qbitOrQreg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQbitOrQreg?: (ctx: QbitOrQregContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.cxGate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCxGate?: (ctx: CxGateContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.barrierGate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBarrierGate?: (ctx: BarrierGateContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.qubitList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQubitList?: (ctx: QubitListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.resetGate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResetGate?: (ctx: ResetGateContext) => Result;
}

