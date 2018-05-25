// Generated from Python3.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { ProgramContext } from './Python3Parser';
import { DecoratorContext } from './Python3Parser';
import { DecoratorsContext } from './Python3Parser';
import { DecoratedContext } from './Python3Parser';
import { FuncdefContext } from './Python3Parser';
import { ParametersContext } from './Python3Parser';
import { TypedargslistContext } from './Python3Parser';
import { TfpdefContext } from './Python3Parser';
import { VarargslistContext } from './Python3Parser';
import { VfpdefContext } from './Python3Parser';
import { StmtContext } from './Python3Parser';
import { Simple_stmtContext } from './Python3Parser';
import { Small_stmtContext } from './Python3Parser';
import { Expr_stmtContext } from './Python3Parser';
import { Testlist_star_exprContext } from './Python3Parser';
import { AugassignContext } from './Python3Parser';
import { Del_stmtContext } from './Python3Parser';
import { Pass_stmtContext } from './Python3Parser';
import { Flow_stmtContext } from './Python3Parser';
import { Break_stmtContext } from './Python3Parser';
import { Continue_stmtContext } from './Python3Parser';
import { Return_stmtContext } from './Python3Parser';
import { Yield_stmtContext } from './Python3Parser';
import { Raise_stmtContext } from './Python3Parser';
import { Import_stmtContext } from './Python3Parser';
import { Import_nameContext } from './Python3Parser';
import { Import_fromContext } from './Python3Parser';
import { Import_as_nameContext } from './Python3Parser';
import { Dotted_as_nameContext } from './Python3Parser';
import { Import_as_namesContext } from './Python3Parser';
import { Dotted_as_namesContext } from './Python3Parser';
import { Dotted_nameContext } from './Python3Parser';
import { Global_stmtContext } from './Python3Parser';
import { Nonlocal_stmtContext } from './Python3Parser';
import { Assert_stmtContext } from './Python3Parser';
import { Compound_stmtContext } from './Python3Parser';
import { If_stmtContext } from './Python3Parser';
import { While_stmtContext } from './Python3Parser';
import { For_stmtContext } from './Python3Parser';
import { Try_stmtContext } from './Python3Parser';
import { With_stmtContext } from './Python3Parser';
import { With_itemContext } from './Python3Parser';
import { Except_clauseContext } from './Python3Parser';
import { SuiteContext } from './Python3Parser';
import { TestContext } from './Python3Parser';
import { Test_nocondContext } from './Python3Parser';
import { LambdefContext } from './Python3Parser';
import { Lambdef_nocondContext } from './Python3Parser';
import { Or_testContext } from './Python3Parser';
import { And_testContext } from './Python3Parser';
import { Not_testContext } from './Python3Parser';
import { ComparisonContext } from './Python3Parser';
import { Comp_opContext } from './Python3Parser';
import { Star_exprContext } from './Python3Parser';
import { ExprContext } from './Python3Parser';
import { Xor_exprContext } from './Python3Parser';
import { And_exprContext } from './Python3Parser';
import { Shift_exprContext } from './Python3Parser';
import { Arith_exprContext } from './Python3Parser';
import { TermContext } from './Python3Parser';
import { FactorContext } from './Python3Parser';
import { PowerContext } from './Python3Parser';
import { AtomContext } from './Python3Parser';
import { Testlist_compContext } from './Python3Parser';
import { TrailerContext } from './Python3Parser';
import { SubscriptlistContext } from './Python3Parser';
import { SubscriptContext } from './Python3Parser';
import { SliceopContext } from './Python3Parser';
import { ExprlistContext } from './Python3Parser';
import { TestlistContext } from './Python3Parser';
import { DictorsetmakerContext } from './Python3Parser';
import { ClassdefContext } from './Python3Parser';
import { ArglistContext } from './Python3Parser';
import { ArgumentContext } from './Python3Parser';
import { Comp_iterContext } from './Python3Parser';
import { Comp_forContext } from './Python3Parser';
import { Comp_ifContext } from './Python3Parser';
import { Yield_exprContext } from './Python3Parser';
import { Yield_argContext } from './Python3Parser';
import { StrContext } from './Python3Parser';
import { NumberContext } from './Python3Parser';
import { IntegerContext } from './Python3Parser';


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `Python3Parser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface Python3Visitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `Python3Parser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.decorator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecorator?: (ctx: DecoratorContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.decorators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecorators?: (ctx: DecoratorsContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.decorated`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecorated?: (ctx: DecoratedContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.funcdef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncdef?: (ctx: FuncdefContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.parameters`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameters?: (ctx: ParametersContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.typedargslist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypedargslist?: (ctx: TypedargslistContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.tfpdef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTfpdef?: (ctx: TfpdefContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.varargslist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarargslist?: (ctx: VarargslistContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.vfpdef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVfpdef?: (ctx: VfpdefContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt?: (ctx: StmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.simple_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_stmt?: (ctx: Simple_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.small_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSmall_stmt?: (ctx: Small_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.expr_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr_stmt?: (ctx: Expr_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.testlist_star_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestlist_star_expr?: (ctx: Testlist_star_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.augassign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAugassign?: (ctx: AugassignContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.del_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDel_stmt?: (ctx: Del_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.pass_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_stmt?: (ctx: Pass_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.flow_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFlow_stmt?: (ctx: Flow_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.break_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreak_stmt?: (ctx: Break_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.continue_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinue_stmt?: (ctx: Continue_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.return_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturn_stmt?: (ctx: Return_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.yield_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitYield_stmt?: (ctx: Yield_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.raise_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRaise_stmt?: (ctx: Raise_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.import_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_stmt?: (ctx: Import_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.import_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_name?: (ctx: Import_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.import_from`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_from?: (ctx: Import_fromContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.import_as_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_as_name?: (ctx: Import_as_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.dotted_as_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDotted_as_name?: (ctx: Dotted_as_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.import_as_names`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_as_names?: (ctx: Import_as_namesContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.dotted_as_names`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDotted_as_names?: (ctx: Dotted_as_namesContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.dotted_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDotted_name?: (ctx: Dotted_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.global_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobal_stmt?: (ctx: Global_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.nonlocal_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonlocal_stmt?: (ctx: Nonlocal_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.assert_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssert_stmt?: (ctx: Assert_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.compound_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompound_stmt?: (ctx: Compound_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.if_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_stmt?: (ctx: If_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.while_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhile_stmt?: (ctx: While_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.for_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_stmt?: (ctx: For_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.try_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTry_stmt?: (ctx: Try_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.with_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWith_stmt?: (ctx: With_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.with_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWith_item?: (ctx: With_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.except_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExcept_clause?: (ctx: Except_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.suite`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuite?: (ctx: SuiteContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.test`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTest?: (ctx: TestContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.test_nocond`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTest_nocond?: (ctx: Test_nocondContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.lambdef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLambdef?: (ctx: LambdefContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.lambdef_nocond`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLambdef_nocond?: (ctx: Lambdef_nocondContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.or_test`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOr_test?: (ctx: Or_testContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.and_test`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnd_test?: (ctx: And_testContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.not_test`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNot_test?: (ctx: Not_testContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.comparison`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparison?: (ctx: ComparisonContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.comp_op`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComp_op?: (ctx: Comp_opContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.star_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStar_expr?: (ctx: Star_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.xor_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitXor_expr?: (ctx: Xor_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.and_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnd_expr?: (ctx: And_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.shift_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShift_expr?: (ctx: Shift_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.arith_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArith_expr?: (ctx: Arith_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerm?: (ctx: TermContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.factor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFactor?: (ctx: FactorContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.power`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPower?: (ctx: PowerContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtom?: (ctx: AtomContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.testlist_comp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestlist_comp?: (ctx: Testlist_compContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.trailer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrailer?: (ctx: TrailerContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.subscriptlist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubscriptlist?: (ctx: SubscriptlistContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.subscript`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubscript?: (ctx: SubscriptContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.sliceop`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSliceop?: (ctx: SliceopContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.exprlist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprlist?: (ctx: ExprlistContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.testlist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestlist?: (ctx: TestlistContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.dictorsetmaker`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictorsetmaker?: (ctx: DictorsetmakerContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.classdef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassdef?: (ctx: ClassdefContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.arglist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArglist?: (ctx: ArglistContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.argument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgument?: (ctx: ArgumentContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.comp_iter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComp_iter?: (ctx: Comp_iterContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.comp_for`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComp_for?: (ctx: Comp_forContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.comp_if`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComp_if?: (ctx: Comp_ifContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.yield_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitYield_expr?: (ctx: Yield_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.yield_arg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitYield_arg?: (ctx: Yield_argContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.str`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStr?: (ctx: StrContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by `Python3Parser.integer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteger?: (ctx: IntegerContext) => Result;
}

