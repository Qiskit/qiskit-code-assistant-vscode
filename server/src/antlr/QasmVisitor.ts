// Generated from src/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { StartProgramContext } from './QasmParser';
import { MainProgramContext } from './QasmParser';
import { IbmDefinitionContext } from './QasmParser';
import { IncludeContext } from './QasmParser';
import { LibraryContext } from './QasmParser';
import { ProgramContext } from './QasmParser';
import { StatementContext } from './QasmParser';
import { DeclarationContext } from './QasmParser';
import { QoperationContext } from './QasmParser';
import { UnitaryOperationContext } from './QasmParser';
import { PrimaryListContext } from './QasmParser';
import { PrimaryContext } from './QasmParser';
import { IndexedIdContext } from './QasmParser';
import { QregDeclarationContext } from './QasmParser';
import { CregDeclarationContext } from './QasmParser';
import { GateDeclarationContext } from './QasmParser';
import { GateScopeContext } from './QasmParser';
import { BitListContext } from './QasmParser';
import { BitContext } from './QasmParser';
import { GateBodyContext } from './QasmParser';
import { GateOpListContext } from './QasmParser';
import { GateOpContext } from './QasmParser';
import { GateIdListContext } from './QasmParser';
import { GateContext } from './QasmParser';
import { ExpListContext } from './QasmParser';
import { ExpressionContext } from './QasmParser';
import { MultiplicativeExpressionContext } from './QasmParser';
import { AdditiveExpressionContext } from './QasmParser';
import { PrefixExpressionContext } from './QasmParser';
import { UnaryContext } from './QasmParser';
import { IdListContext } from './QasmParser';


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

	/**
	 * Visit a parse tree produced by `QasmParser.declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclaration?: (ctx: DeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.qoperation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQoperation?: (ctx: QoperationContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.unitaryOperation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitaryOperation?: (ctx: UnitaryOperationContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.primaryList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryList?: (ctx: PrimaryListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.indexedId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexedId?: (ctx: IndexedIdContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.qregDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQregDeclaration?: (ctx: QregDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.cregDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCregDeclaration?: (ctx: CregDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.gateDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateDeclaration?: (ctx: GateDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.gateScope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateScope?: (ctx: GateScopeContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.bitList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitList?: (ctx: BitListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.bit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBit?: (ctx: BitContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.gateBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateBody?: (ctx: GateBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.gateOpList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateOpList?: (ctx: GateOpListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.gateOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateOp?: (ctx: GateOpContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.gateIdList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGateIdList?: (ctx: GateIdListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.gate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGate?: (ctx: GateContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.expList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpList?: (ctx: ExpListContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.multiplicativeExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.additiveExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpression?: (ctx: AdditiveExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.prefixExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrefixExpression?: (ctx: PrefixExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.unary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary?: (ctx: UnaryContext) => Result;

	/**
	 * Visit a parse tree produced by `QasmParser.idList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdList?: (ctx: IdListContext) => Result;
}

