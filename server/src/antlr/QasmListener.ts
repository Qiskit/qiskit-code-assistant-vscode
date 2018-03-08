// Generated from src/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

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
import { OpaqueContext } from './QasmParser';
import { MeasureContext } from './QasmParser';
import { BarrierContext } from './QasmParser';
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

	/**
	 * Enter a parse tree produced by `QasmParser.declaration`.
	 * @param ctx the parse tree
	 */
	enterDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.declaration`.
	 * @param ctx the parse tree
	 */
	exitDeclaration?: (ctx: DeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.qoperation`.
	 * @param ctx the parse tree
	 */
	enterQoperation?: (ctx: QoperationContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.qoperation`.
	 * @param ctx the parse tree
	 */
	exitQoperation?: (ctx: QoperationContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.unitaryOperation`.
	 * @param ctx the parse tree
	 */
	enterUnitaryOperation?: (ctx: UnitaryOperationContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.unitaryOperation`.
	 * @param ctx the parse tree
	 */
	exitUnitaryOperation?: (ctx: UnitaryOperationContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.opaque`.
	 * @param ctx the parse tree
	 */
	enterOpaque?: (ctx: OpaqueContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.opaque`.
	 * @param ctx the parse tree
	 */
	exitOpaque?: (ctx: OpaqueContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.measure`.
	 * @param ctx the parse tree
	 */
	enterMeasure?: (ctx: MeasureContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.measure`.
	 * @param ctx the parse tree
	 */
	exitMeasure?: (ctx: MeasureContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.barrier`.
	 * @param ctx the parse tree
	 */
	enterBarrier?: (ctx: BarrierContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.barrier`.
	 * @param ctx the parse tree
	 */
	exitBarrier?: (ctx: BarrierContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.primaryList`.
	 * @param ctx the parse tree
	 */
	enterPrimaryList?: (ctx: PrimaryListContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.primaryList`.
	 * @param ctx the parse tree
	 */
	exitPrimaryList?: (ctx: PrimaryListContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.indexedId`.
	 * @param ctx the parse tree
	 */
	enterIndexedId?: (ctx: IndexedIdContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.indexedId`.
	 * @param ctx the parse tree
	 */
	exitIndexedId?: (ctx: IndexedIdContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.qregDeclaration`.
	 * @param ctx the parse tree
	 */
	enterQregDeclaration?: (ctx: QregDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.qregDeclaration`.
	 * @param ctx the parse tree
	 */
	exitQregDeclaration?: (ctx: QregDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.cregDeclaration`.
	 * @param ctx the parse tree
	 */
	enterCregDeclaration?: (ctx: CregDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.cregDeclaration`.
	 * @param ctx the parse tree
	 */
	exitCregDeclaration?: (ctx: CregDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.gateDeclaration`.
	 * @param ctx the parse tree
	 */
	enterGateDeclaration?: (ctx: GateDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.gateDeclaration`.
	 * @param ctx the parse tree
	 */
	exitGateDeclaration?: (ctx: GateDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.gateScope`.
	 * @param ctx the parse tree
	 */
	enterGateScope?: (ctx: GateScopeContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.gateScope`.
	 * @param ctx the parse tree
	 */
	exitGateScope?: (ctx: GateScopeContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.bitList`.
	 * @param ctx the parse tree
	 */
	enterBitList?: (ctx: BitListContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.bitList`.
	 * @param ctx the parse tree
	 */
	exitBitList?: (ctx: BitListContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.bit`.
	 * @param ctx the parse tree
	 */
	enterBit?: (ctx: BitContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.bit`.
	 * @param ctx the parse tree
	 */
	exitBit?: (ctx: BitContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.gateBody`.
	 * @param ctx the parse tree
	 */
	enterGateBody?: (ctx: GateBodyContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.gateBody`.
	 * @param ctx the parse tree
	 */
	exitGateBody?: (ctx: GateBodyContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.gateOpList`.
	 * @param ctx the parse tree
	 */
	enterGateOpList?: (ctx: GateOpListContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.gateOpList`.
	 * @param ctx the parse tree
	 */
	exitGateOpList?: (ctx: GateOpListContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.gateOp`.
	 * @param ctx the parse tree
	 */
	enterGateOp?: (ctx: GateOpContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.gateOp`.
	 * @param ctx the parse tree
	 */
	exitGateOp?: (ctx: GateOpContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.gateIdList`.
	 * @param ctx the parse tree
	 */
	enterGateIdList?: (ctx: GateIdListContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.gateIdList`.
	 * @param ctx the parse tree
	 */
	exitGateIdList?: (ctx: GateIdListContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.gate`.
	 * @param ctx the parse tree
	 */
	enterGate?: (ctx: GateContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.gate`.
	 * @param ctx the parse tree
	 */
	exitGate?: (ctx: GateContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.expList`.
	 * @param ctx the parse tree
	 */
	enterExpList?: (ctx: ExpListContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.expList`.
	 * @param ctx the parse tree
	 */
	exitExpList?: (ctx: ExpListContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.multiplicativeExpression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.multiplicativeExpression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.additiveExpression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.additiveExpression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.prefixExpression`.
	 * @param ctx the parse tree
	 */
	enterPrefixExpression?: (ctx: PrefixExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.prefixExpression`.
	 * @param ctx the parse tree
	 */
	exitPrefixExpression?: (ctx: PrefixExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.unary`.
	 * @param ctx the parse tree
	 */
	enterUnary?: (ctx: UnaryContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.unary`.
	 * @param ctx the parse tree
	 */
	exitUnary?: (ctx: UnaryContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParser.idList`.
	 * @param ctx the parse tree
	 */
	enterIdList?: (ctx: IdListContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParser.idList`.
	 * @param ctx the parse tree
	 */
	exitIdList?: (ctx: IdListContext) => void;
}

