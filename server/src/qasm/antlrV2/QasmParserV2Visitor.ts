// Generated from QasmParserV2.g4 by ANTLR 4.6-SNAPSHOT


import { Register, SymbolsTable } from './utils';
import { QasmLexerV2 } from './QasmLexerV2';
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'; 
import { SymbolTable, BuiltInTypeSymbol } from '../../tools/symbolTable'; 
import { SymbolTableBuilder, VariableSymbol, RegisterSymbol } from '../compiler/symbolTable';
import fs = require('fs');
import path = require('path');


import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { CodeContext } from './QasmParserV2';
import { HeadersContext } from './QasmParserV2';
import { IncludeLibraryContext } from './QasmParserV2';
import { SentencesContext } from './QasmParserV2';
import { CleanContext } from './QasmParserV2';
import { SentenceContext } from './QasmParserV2';
import { DefinitionContext } from './QasmParserV2';
import { ExpressionContext } from './QasmParserV2';
import { ConditionalContext } from './QasmParserV2';
import { QregDefinitionContext } from './QasmParserV2';
import { CregDefinitionContext } from './QasmParserV2';
import { DimensionContext } from './QasmParserV2';
import { GateDefinitionContext } from './QasmParserV2';
import { OpaqueDefinitionContext } from './QasmParserV2';
import { GateDefinitionArgumentsContext } from './QasmParserV2';
import { OpaqueDefinitionArgumentsContext } from './QasmParserV2';
import { ParamsListContext } from './QasmParserV2';
import { BodyContext } from './QasmParserV2';
import { BodyExpressionContext } from './QasmParserV2';
import { ParamsListBodyContext } from './QasmParserV2';
import { ExpContext } from './QasmParserV2';
import { UnaryOpContext } from './QasmParserV2';
import { MeasureContext } from './QasmParserV2';
import { QubitContext } from './QasmParserV2';
import { CbitContext } from './QasmParserV2';
import { CustomArglistContext } from './QasmParserV2';
import { ParamsListNumberContext } from './QasmParserV2';
import { QubitAndQregListContext } from './QasmParserV2';
import { QbitOrQregContext } from './QasmParserV2';
import { CxGateContext } from './QasmParserV2';
import { BarrierGateContext } from './QasmParserV2';
import { QubitListContext } from './QasmParserV2';
import { ResetGateContext } from './QasmParserV2';


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `QasmParserV2`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface QasmParserV2Visitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `QasmParserV2.code`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCode?: (ctx: CodeContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.headers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHeaders?: (ctx: HeadersContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.includeLibrary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludeLibrary?: (ctx: IncludeLibraryContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.sentences`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSentences?: (ctx: SentencesContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.clean`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClean?: (ctx: CleanContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.sentence`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSentence?: (ctx: SentenceContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefinition?: (ctx: DefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.conditional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional?: (ctx: ConditionalContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.qregDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQregDefinition?: (ctx: QregDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.cregDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCregDefinition?: (ctx: CregDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.dimension`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDimension?: (ctx: DimensionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.gateDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateDefinition?: (ctx: GateDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.opaqueDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpaqueDefinition?: (ctx: OpaqueDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.gateDefinitionArguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateDefinitionArguments?: (ctx: GateDefinitionArgumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.opaqueDefinitionArguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpaqueDefinitionArguments?: (ctx: OpaqueDefinitionArgumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.paramsList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsList?: (ctx: ParamsListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBody?: (ctx: BodyContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.bodyExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBodyExpression?: (ctx: BodyExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.paramsListBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsListBody?: (ctx: ParamsListBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.exp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExp?: (ctx: ExpContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.unaryOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryOp?: (ctx: UnaryOpContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.measure`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMeasure?: (ctx: MeasureContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.qubit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQubit?: (ctx: QubitContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.cbit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCbit?: (ctx: CbitContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.customArglist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCustomArglist?: (ctx: CustomArglistContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.paramsListNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsListNumber?: (ctx: ParamsListNumberContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.qubitAndQregList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQubitAndQregList?: (ctx: QubitAndQregListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.qbitOrQreg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQbitOrQreg?: (ctx: QbitOrQregContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.cxGate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCxGate?: (ctx: CxGateContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.barrierGate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBarrierGate?: (ctx: BarrierGateContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.qubitList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQubitList?: (ctx: QubitListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParserV2.resetGate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResetGate?: (ctx: ResetGateContext) => Result;
}

