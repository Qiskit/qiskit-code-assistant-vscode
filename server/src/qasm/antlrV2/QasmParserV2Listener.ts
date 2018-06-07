// Generated from QasmParserV2.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

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
 * This interface defines a complete listener for a parse tree produced by
 * `QasmParserV2`.
 */
export interface QasmParserV2Listener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `QasmParserV2.code`.
	 * @param ctx the parse tree
	 */
	enterCode?: (ctx: CodeContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.code`.
	 * @param ctx the parse tree
	 */
	exitCode?: (ctx: CodeContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.headers`.
	 * @param ctx the parse tree
	 */
	enterHeaders?: (ctx: HeadersContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.headers`.
	 * @param ctx the parse tree
	 */
	exitHeaders?: (ctx: HeadersContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.includeLibrary`.
	 * @param ctx the parse tree
	 */
	enterIncludeLibrary?: (ctx: IncludeLibraryContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.includeLibrary`.
	 * @param ctx the parse tree
	 */
	exitIncludeLibrary?: (ctx: IncludeLibraryContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.sentences`.
	 * @param ctx the parse tree
	 */
	enterSentences?: (ctx: SentencesContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.sentences`.
	 * @param ctx the parse tree
	 */
	exitSentences?: (ctx: SentencesContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.clean`.
	 * @param ctx the parse tree
	 */
	enterClean?: (ctx: CleanContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.clean`.
	 * @param ctx the parse tree
	 */
	exitClean?: (ctx: CleanContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.sentence`.
	 * @param ctx the parse tree
	 */
	enterSentence?: (ctx: SentenceContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.sentence`.
	 * @param ctx the parse tree
	 */
	exitSentence?: (ctx: SentenceContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.definition`.
	 * @param ctx the parse tree
	 */
	enterDefinition?: (ctx: DefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.definition`.
	 * @param ctx the parse tree
	 */
	exitDefinition?: (ctx: DefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.conditional`.
	 * @param ctx the parse tree
	 */
	enterConditional?: (ctx: ConditionalContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.conditional`.
	 * @param ctx the parse tree
	 */
	exitConditional?: (ctx: ConditionalContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.qregDefinition`.
	 * @param ctx the parse tree
	 */
	enterQregDefinition?: (ctx: QregDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.qregDefinition`.
	 * @param ctx the parse tree
	 */
	exitQregDefinition?: (ctx: QregDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.cregDefinition`.
	 * @param ctx the parse tree
	 */
	enterCregDefinition?: (ctx: CregDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.cregDefinition`.
	 * @param ctx the parse tree
	 */
	exitCregDefinition?: (ctx: CregDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.dimension`.
	 * @param ctx the parse tree
	 */
	enterDimension?: (ctx: DimensionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.dimension`.
	 * @param ctx the parse tree
	 */
	exitDimension?: (ctx: DimensionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.gateDefinition`.
	 * @param ctx the parse tree
	 */
	enterGateDefinition?: (ctx: GateDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.gateDefinition`.
	 * @param ctx the parse tree
	 */
	exitGateDefinition?: (ctx: GateDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.opaqueDefinition`.
	 * @param ctx the parse tree
	 */
	enterOpaqueDefinition?: (ctx: OpaqueDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.opaqueDefinition`.
	 * @param ctx the parse tree
	 */
	exitOpaqueDefinition?: (ctx: OpaqueDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.gateDefinitionArguments`.
	 * @param ctx the parse tree
	 */
	enterGateDefinitionArguments?: (ctx: GateDefinitionArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.gateDefinitionArguments`.
	 * @param ctx the parse tree
	 */
	exitGateDefinitionArguments?: (ctx: GateDefinitionArgumentsContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.opaqueDefinitionArguments`.
	 * @param ctx the parse tree
	 */
	enterOpaqueDefinitionArguments?: (ctx: OpaqueDefinitionArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.opaqueDefinitionArguments`.
	 * @param ctx the parse tree
	 */
	exitOpaqueDefinitionArguments?: (ctx: OpaqueDefinitionArgumentsContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.paramsList`.
	 * @param ctx the parse tree
	 */
	enterParamsList?: (ctx: ParamsListContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.paramsList`.
	 * @param ctx the parse tree
	 */
	exitParamsList?: (ctx: ParamsListContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.body`.
	 * @param ctx the parse tree
	 */
	enterBody?: (ctx: BodyContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.body`.
	 * @param ctx the parse tree
	 */
	exitBody?: (ctx: BodyContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.bodyExpression`.
	 * @param ctx the parse tree
	 */
	enterBodyExpression?: (ctx: BodyExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.bodyExpression`.
	 * @param ctx the parse tree
	 */
	exitBodyExpression?: (ctx: BodyExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.paramsListBody`.
	 * @param ctx the parse tree
	 */
	enterParamsListBody?: (ctx: ParamsListBodyContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.paramsListBody`.
	 * @param ctx the parse tree
	 */
	exitParamsListBody?: (ctx: ParamsListBodyContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.exp`.
	 * @param ctx the parse tree
	 */
	enterExp?: (ctx: ExpContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.exp`.
	 * @param ctx the parse tree
	 */
	exitExp?: (ctx: ExpContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.unaryOp`.
	 * @param ctx the parse tree
	 */
	enterUnaryOp?: (ctx: UnaryOpContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.unaryOp`.
	 * @param ctx the parse tree
	 */
	exitUnaryOp?: (ctx: UnaryOpContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.measure`.
	 * @param ctx the parse tree
	 */
	enterMeasure?: (ctx: MeasureContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.measure`.
	 * @param ctx the parse tree
	 */
	exitMeasure?: (ctx: MeasureContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.qubit`.
	 * @param ctx the parse tree
	 */
	enterQubit?: (ctx: QubitContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.qubit`.
	 * @param ctx the parse tree
	 */
	exitQubit?: (ctx: QubitContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.cbit`.
	 * @param ctx the parse tree
	 */
	enterCbit?: (ctx: CbitContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.cbit`.
	 * @param ctx the parse tree
	 */
	exitCbit?: (ctx: CbitContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.customArglist`.
	 * @param ctx the parse tree
	 */
	enterCustomArglist?: (ctx: CustomArglistContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.customArglist`.
	 * @param ctx the parse tree
	 */
	exitCustomArglist?: (ctx: CustomArglistContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.paramsListNumber`.
	 * @param ctx the parse tree
	 */
	enterParamsListNumber?: (ctx: ParamsListNumberContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.paramsListNumber`.
	 * @param ctx the parse tree
	 */
	exitParamsListNumber?: (ctx: ParamsListNumberContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.qubitAndQregList`.
	 * @param ctx the parse tree
	 */
	enterQubitAndQregList?: (ctx: QubitAndQregListContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.qubitAndQregList`.
	 * @param ctx the parse tree
	 */
	exitQubitAndQregList?: (ctx: QubitAndQregListContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.qbitOrQreg`.
	 * @param ctx the parse tree
	 */
	enterQbitOrQreg?: (ctx: QbitOrQregContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.qbitOrQreg`.
	 * @param ctx the parse tree
	 */
	exitQbitOrQreg?: (ctx: QbitOrQregContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.cxGate`.
	 * @param ctx the parse tree
	 */
	enterCxGate?: (ctx: CxGateContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.cxGate`.
	 * @param ctx the parse tree
	 */
	exitCxGate?: (ctx: CxGateContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.barrierGate`.
	 * @param ctx the parse tree
	 */
	enterBarrierGate?: (ctx: BarrierGateContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.barrierGate`.
	 * @param ctx the parse tree
	 */
	exitBarrierGate?: (ctx: BarrierGateContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.qubitList`.
	 * @param ctx the parse tree
	 */
	enterQubitList?: (ctx: QubitListContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.qubitList`.
	 * @param ctx the parse tree
	 */
	exitQubitList?: (ctx: QubitListContext) => void;

	/**
	 * Enter a parse tree produced by `QasmParserV2.resetGate`.
	 * @param ctx the parse tree
	 */
	enterResetGate?: (ctx: ResetGateContext) => void;
	/**
	 * Exit a parse tree produced by `QasmParserV2.resetGate`.
	 * @param ctx the parse tree
	 */
	exitResetGate?: (ctx: ResetGateContext) => void;
}

