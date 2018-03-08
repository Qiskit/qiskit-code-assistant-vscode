// Generated from src/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
import { RuleVersion } from 'antlr4ts/RuleVersion';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { QasmListener } from './QasmListener';
import { QasmVisitor } from './QasmVisitor';


export class QasmParser extends Parser {
	public static readonly Comment=1;
	public static readonly WhiteSpace=2;
	public static readonly Real=3;
	public static readonly Int=4;
	public static readonly IbmQasm=5;
	public static readonly Include=6;
	public static readonly Qelib=7;
	public static readonly Qreg=8;
	public static readonly Creg=9;
	public static readonly U=10;
	public static readonly Cx=11;
	public static readonly Measure=12;
	public static readonly Barrier=13;
	public static readonly Reset=14;
	public static readonly Opaque=15;
	public static readonly Assign=16;
	public static readonly Semi=17;
	public static readonly Comma=18;
	public static readonly LeftCurlyBrace=19;
	public static readonly RightCurlyBrace=20;
	public static readonly LeftBrace=21;
	public static readonly RightBrace=22;
	public static readonly LeftParen=23;
	public static readonly RightParen=24;
	public static readonly Pow=25;
	public static readonly Mult=26;
	public static readonly Div=27;
	public static readonly Sum=28;
	public static readonly Subs=29;
	public static readonly Pi=30;
	public static readonly Gate=31;
	public static readonly GateId=32;
	public static readonly Id=33;
	public static readonly RULE_startProgram = 0;
	public static readonly RULE_mainProgram = 1;
	public static readonly RULE_ibmDefinition = 2;
	public static readonly RULE_include = 3;
	public static readonly RULE_library = 4;
	public static readonly RULE_program = 5;
	public static readonly RULE_statement = 6;
	public static readonly RULE_declaration = 7;
	public static readonly RULE_qoperation = 8;
	public static readonly RULE_unitaryOperation = 9;
	public static readonly RULE_opaque = 10;
	public static readonly RULE_primaryList = 11;
	public static readonly RULE_primary = 12;
	public static readonly RULE_indexedId = 13;
	public static readonly RULE_qregDeclaration = 14;
	public static readonly RULE_cregDeclaration = 15;
	public static readonly RULE_gateDeclaration = 16;
	public static readonly RULE_gateScope = 17;
	public static readonly RULE_bitList = 18;
	public static readonly RULE_bit = 19;
	public static readonly RULE_gateBody = 20;
	public static readonly RULE_gateOpList = 21;
	public static readonly RULE_gateOp = 22;
	public static readonly RULE_gateIdList = 23;
	public static readonly RULE_gate = 24;
	public static readonly RULE_expList = 25;
	public static readonly RULE_expression = 26;
	public static readonly RULE_multiplicativeExpression = 27;
	public static readonly RULE_additiveExpression = 28;
	public static readonly RULE_prefixExpression = 29;
	public static readonly RULE_unary = 30;
	public static readonly RULE_idList = 31;
	public static readonly ruleNames: string[] = [
		"startProgram", "mainProgram", "ibmDefinition", "include", "library", 
		"program", "statement", "declaration", "qoperation", "unitaryOperation", 
		"opaque", "primaryList", "primary", "indexedId", "qregDeclaration", "cregDeclaration", 
		"gateDeclaration", "gateScope", "bitList", "bit", "gateBody", "gateOpList", 
		"gateOp", "gateIdList", "gate", "expList", "expression", "multiplicativeExpression", 
		"additiveExpression", "prefixExpression", "unary", "idList"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, undefined, undefined, undefined, undefined, undefined, "'include'", 
		"'QELIB.INC'", "'qreg'", "'creg'", "'U'", "'CX'", "'measure'", "'barrier'", 
		"'reset'", "'opaque'", "'->'", "';'", "','", "'{'", "'}'", "'['", "']'", 
		"'('", "')'", "'^'", "'*'", "'/'", "'+'", "'-'", "'pi'", "'gate'"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
		undefined, "Comment", "WhiteSpace", "Real", "Int", "IbmQasm", "Include", 
		"Qelib", "Qreg", "Creg", "U", "Cx", "Measure", "Barrier", "Reset", "Opaque", 
		"Assign", "Semi", "Comma", "LeftCurlyBrace", "RightCurlyBrace", "LeftBrace", 
		"RightBrace", "LeftParen", "RightParen", "Pow", "Mult", "Div", "Sum", 
		"Subs", "Pi", "Gate", "GateId", "Id"
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(QasmParser._LITERAL_NAMES, QasmParser._SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return QasmParser.VOCABULARY;
	}

	@Override
	public get grammarFileName(): string { return "Qasm.g4"; }

	@Override
	public get ruleNames(): string[] { return QasmParser.ruleNames; }

	@Override
	public get serializedATN(): string { return QasmParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(QasmParser._ATN, this);
	}
	@RuleVersion(0)
	public startProgram(): StartProgramContext {
		let _localctx: StartProgramContext = new StartProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, QasmParser.RULE_startProgram);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 64;
			this.mainProgram();
			this.state = 65;
			this.match(QasmParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public mainProgram(): MainProgramContext {
		let _localctx: MainProgramContext = new MainProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, QasmParser.RULE_mainProgram);
		try {
			this.state = 72;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,0,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 67;
				this.ibmDefinition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 68;
				this.ibmDefinition();
				this.state = 69;
				this.program(0);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 71;
				this.library(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public ibmDefinition(): IbmDefinitionContext {
		let _localctx: IbmDefinitionContext = new IbmDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, QasmParser.RULE_ibmDefinition);
		try {
			this.state = 81;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,1,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 74;
				this.match(QasmParser.IbmQasm);
				this.state = 75;
				this.match(QasmParser.Real);
				this.state = 76;
				this.match(QasmParser.Semi);
				this.state = 77;
				this.include();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 78;
				this.match(QasmParser.IbmQasm);
				this.state = 79;
				this.match(QasmParser.Real);
				this.state = 80;
				this.match(QasmParser.Semi);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public include(): IncludeContext {
		let _localctx: IncludeContext = new IncludeContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, QasmParser.RULE_include);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 83;
			this.match(QasmParser.Include);
			this.state = 84;
			this.match(QasmParser.Qelib);
			this.state = 85;
			this.match(QasmParser.Semi);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public library(): LibraryContext;
	public library(_p: number): LibraryContext;
	@RuleVersion(0)
	public library(_p?: number): LibraryContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: LibraryContext = new LibraryContext(this._ctx, _parentState);
		let _prevctx: LibraryContext = _localctx;
		let _startState: number = 8;
		this.enterRecursionRule(_localctx, 8, QasmParser.RULE_library, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 88;
			this.declaration();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 94;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,2,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new LibraryContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_library);
					this.state = 90;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 91;
					this.declaration();
					}
					} 
				}
				this.state = 96;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,2,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public program(): ProgramContext;
	public program(_p: number): ProgramContext;
	@RuleVersion(0)
	public program(_p?: number): ProgramContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ProgramContext = new ProgramContext(this._ctx, _parentState);
		let _prevctx: ProgramContext = _localctx;
		let _startState: number = 10;
		this.enterRecursionRule(_localctx, 10, QasmParser.RULE_program, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 98;
			this.statement();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 104;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,3,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ProgramContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_program);
					this.state = 100;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 101;
					this.statement();
					}
					} 
				}
				this.state = 106;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,3,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	@RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, QasmParser.RULE_statement);
		try {
			this.state = 109;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Qreg:
			case QasmParser.Creg:
			case QasmParser.Gate:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 107;
				this.declaration();
				}
				break;
			case QasmParser.U:
			case QasmParser.Cx:
			case QasmParser.Opaque:
			case QasmParser.Id:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 108;
				this.qoperation();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public declaration(): DeclarationContext {
		let _localctx: DeclarationContext = new DeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, QasmParser.RULE_declaration);
		try {
			this.state = 114;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Qreg:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 111;
				this.qregDeclaration();
				}
				break;
			case QasmParser.Creg:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 112;
				this.cregDeclaration();
				}
				break;
			case QasmParser.Gate:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 113;
				this.gateDeclaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public qoperation(): QoperationContext {
		let _localctx: QoperationContext = new QoperationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, QasmParser.RULE_qoperation);
		try {
			this.state = 122;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.U:
			case QasmParser.Cx:
			case QasmParser.Id:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 116;
				this.unitaryOperation();
				this.state = 117;
				this.match(QasmParser.Semi);
				}
				break;
			case QasmParser.Opaque:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 119;
				this.opaque();
				this.state = 120;
				this.match(QasmParser.Semi);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public unitaryOperation(): UnitaryOperationContext {
		let _localctx: UnitaryOperationContext = new UnitaryOperationContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, QasmParser.RULE_unitaryOperation);
		try {
			this.state = 147;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,7,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 124;
				this.match(QasmParser.U);
				this.state = 125;
				this.match(QasmParser.LeftParen);
				this.state = 126;
				this.expList(0);
				this.state = 127;
				this.match(QasmParser.RightParen);
				this.state = 128;
				this.primary();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 130;
				this.match(QasmParser.Cx);
				this.state = 131;
				this.primary();
				this.state = 132;
				this.match(QasmParser.Comma);
				this.state = 133;
				this.primary();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 135;
				this.match(QasmParser.Id);
				this.state = 136;
				this.primaryList(0);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 137;
				this.match(QasmParser.Id);
				this.state = 138;
				this.match(QasmParser.LeftParen);
				this.state = 139;
				this.match(QasmParser.RightParen);
				this.state = 140;
				this.primaryList(0);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 141;
				this.match(QasmParser.Id);
				this.state = 142;
				this.match(QasmParser.LeftParen);
				this.state = 143;
				this.expList(0);
				this.state = 144;
				this.match(QasmParser.RightParen);
				this.state = 145;
				this.primaryList(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public opaque(): OpaqueContext {
		let _localctx: OpaqueContext = new OpaqueContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, QasmParser.RULE_opaque);
		try {
			this.state = 169;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,8,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 149;
				this.match(QasmParser.Opaque);
				this.state = 150;
				this.match(QasmParser.Id);
				this.state = 151;
				this.gateScope();
				this.state = 152;
				this.bitList(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 154;
				this.match(QasmParser.Opaque);
				this.state = 155;
				this.match(QasmParser.Id);
				this.state = 156;
				this.gateScope();
				this.state = 157;
				this.match(QasmParser.LeftParen);
				this.state = 158;
				this.match(QasmParser.RightParen);
				this.state = 159;
				this.bitList(0);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 161;
				this.match(QasmParser.Opaque);
				this.state = 162;
				this.match(QasmParser.Id);
				this.state = 163;
				this.gateScope();
				this.state = 164;
				this.match(QasmParser.LeftParen);
				this.state = 165;
				this.gateIdList(0);
				this.state = 166;
				this.match(QasmParser.RightParen);
				this.state = 167;
				this.bitList(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public primaryList(): PrimaryListContext;
	public primaryList(_p: number): PrimaryListContext;
	@RuleVersion(0)
	public primaryList(_p?: number): PrimaryListContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: PrimaryListContext = new PrimaryListContext(this._ctx, _parentState);
		let _prevctx: PrimaryListContext = _localctx;
		let _startState: number = 22;
		this.enterRecursionRule(_localctx, 22, QasmParser.RULE_primaryList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 172;
			this.primary();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 179;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,9,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new PrimaryListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_primaryList);
					this.state = 174;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 175;
					this.match(QasmParser.Comma);
					this.state = 176;
					this.primary();
					}
					} 
				}
				this.state = 181;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,9,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	@RuleVersion(0)
	public primary(): PrimaryContext {
		let _localctx: PrimaryContext = new PrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, QasmParser.RULE_primary);
		try {
			this.state = 184;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,10,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 182;
				this.match(QasmParser.Id);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 183;
				this.indexedId();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public indexedId(): IndexedIdContext {
		let _localctx: IndexedIdContext = new IndexedIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, QasmParser.RULE_indexedId);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 186;
			this.match(QasmParser.Id);
			this.state = 187;
			this.match(QasmParser.LeftBrace);
			this.state = 188;
			this.match(QasmParser.Int);
			this.state = 189;
			this.match(QasmParser.RightBrace);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public qregDeclaration(): QregDeclarationContext {
		let _localctx: QregDeclarationContext = new QregDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, QasmParser.RULE_qregDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 191;
			this.match(QasmParser.Qreg);
			this.state = 192;
			this.match(QasmParser.Id);
			this.state = 193;
			this.match(QasmParser.LeftBrace);
			this.state = 194;
			this.match(QasmParser.Int);
			this.state = 195;
			this.match(QasmParser.RightBrace);
			this.state = 196;
			this.match(QasmParser.Semi);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public cregDeclaration(): CregDeclarationContext {
		let _localctx: CregDeclarationContext = new CregDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, QasmParser.RULE_cregDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 198;
			this.match(QasmParser.Creg);
			this.state = 199;
			this.match(QasmParser.Id);
			this.state = 200;
			this.match(QasmParser.LeftBrace);
			this.state = 201;
			this.match(QasmParser.Int);
			this.state = 202;
			this.match(QasmParser.RightBrace);
			this.state = 203;
			this.match(QasmParser.Semi);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public gateDeclaration(): GateDeclarationContext {
		let _localctx: GateDeclarationContext = new GateDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, QasmParser.RULE_gateDeclaration);
		try {
			this.state = 228;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,11,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 205;
				this.match(QasmParser.Gate);
				this.state = 206;
				this.match(QasmParser.GateId);
				this.state = 207;
				this.gateScope();
				this.state = 208;
				this.bitList(0);
				this.state = 209;
				this.gateBody();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 211;
				this.match(QasmParser.Gate);
				this.state = 212;
				this.match(QasmParser.GateId);
				this.state = 213;
				this.gateScope();
				this.state = 214;
				this.match(QasmParser.LeftParen);
				this.state = 215;
				this.match(QasmParser.RightParen);
				this.state = 216;
				this.bitList(0);
				this.state = 217;
				this.gateBody();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 219;
				this.match(QasmParser.Gate);
				this.state = 220;
				this.match(QasmParser.GateId);
				this.state = 221;
				this.gateScope();
				this.state = 222;
				this.match(QasmParser.LeftParen);
				this.state = 223;
				this.gateIdList(0);
				this.state = 224;
				this.match(QasmParser.RightParen);
				this.state = 225;
				this.bitList(0);
				this.state = 226;
				this.gateBody();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public gateScope(): GateScopeContext {
		let _localctx: GateScopeContext = new GateScopeContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, QasmParser.RULE_gateScope);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public bitList(): BitListContext;
	public bitList(_p: number): BitListContext;
	@RuleVersion(0)
	public bitList(_p?: number): BitListContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: BitListContext = new BitListContext(this._ctx, _parentState);
		let _prevctx: BitListContext = _localctx;
		let _startState: number = 36;
		this.enterRecursionRule(_localctx, 36, QasmParser.RULE_bitList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 233;
			this.bit();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 240;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,12,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new BitListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_bitList);
					this.state = 235;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 236;
					this.match(QasmParser.Comma);
					this.state = 237;
					this.bit();
					}
					} 
				}
				this.state = 242;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,12,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	@RuleVersion(0)
	public bit(): BitContext {
		let _localctx: BitContext = new BitContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, QasmParser.RULE_bit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 243;
			this.match(QasmParser.Id);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public gateBody(): GateBodyContext {
		let _localctx: GateBodyContext = new GateBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, QasmParser.RULE_gateBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 245;
			this.match(QasmParser.LeftCurlyBrace);
			this.state = 246;
			this.gateOpList(0);
			this.state = 247;
			this.match(QasmParser.RightCurlyBrace);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public gateOpList(): GateOpListContext;
	public gateOpList(_p: number): GateOpListContext;
	@RuleVersion(0)
	public gateOpList(_p?: number): GateOpListContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: GateOpListContext = new GateOpListContext(this._ctx, _parentState);
		let _prevctx: GateOpListContext = _localctx;
		let _startState: number = 42;
		this.enterRecursionRule(_localctx, 42, QasmParser.RULE_gateOpList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 251;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,13,this._ctx) ) {
			case 1:
				{
				}
				break;

			case 2:
				{
				this.state = 250;
				this.gateOp();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 257;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,14,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new GateOpListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_gateOpList);
					this.state = 253;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 254;
					this.gateOp();
					}
					} 
				}
				this.state = 259;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,14,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	@RuleVersion(0)
	public gateOp(): GateOpContext {
		let _localctx: GateOpContext = new GateOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, QasmParser.RULE_gateOp);
		try {
			this.state = 293;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,15,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 260;
				this.match(QasmParser.U);
				this.state = 261;
				this.match(QasmParser.LeftParen);
				this.state = 262;
				this.expList(0);
				this.state = 263;
				this.match(QasmParser.RightParen);
				this.state = 264;
				this.match(QasmParser.Id);
				this.state = 265;
				this.match(QasmParser.Semi);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 267;
				this.match(QasmParser.Cx);
				this.state = 268;
				this.match(QasmParser.Id);
				this.state = 269;
				this.match(QasmParser.Comma);
				this.state = 270;
				this.match(QasmParser.Id);
				this.state = 271;
				this.match(QasmParser.Semi);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 272;
				this.match(QasmParser.Id);
				this.state = 273;
				this.idList(0);
				this.state = 274;
				this.match(QasmParser.Semi);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 276;
				this.match(QasmParser.Id);
				this.state = 277;
				this.match(QasmParser.LeftParen);
				this.state = 278;
				this.match(QasmParser.RightParen);
				this.state = 279;
				this.idList(0);
				this.state = 280;
				this.match(QasmParser.Semi);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 282;
				this.match(QasmParser.Id);
				this.state = 283;
				this.match(QasmParser.LeftParen);
				this.state = 284;
				this.expList(0);
				this.state = 285;
				this.match(QasmParser.RightParen);
				this.state = 286;
				this.idList(0);
				this.state = 287;
				this.match(QasmParser.Semi);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 289;
				this.match(QasmParser.Barrier);
				this.state = 290;
				this.idList(0);
				this.state = 291;
				this.match(QasmParser.Semi);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public gateIdList(): GateIdListContext;
	public gateIdList(_p: number): GateIdListContext;
	@RuleVersion(0)
	public gateIdList(_p?: number): GateIdListContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: GateIdListContext = new GateIdListContext(this._ctx, _parentState);
		let _prevctx: GateIdListContext = _localctx;
		let _startState: number = 46;
		this.enterRecursionRule(_localctx, 46, QasmParser.RULE_gateIdList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 296;
			this.gate();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 303;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,16,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new GateIdListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_gateIdList);
					this.state = 298;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 299;
					this.match(QasmParser.Comma);
					this.state = 300;
					this.gate();
					}
					} 
				}
				this.state = 305;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,16,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	@RuleVersion(0)
	public gate(): GateContext {
		let _localctx: GateContext = new GateContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, QasmParser.RULE_gate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 306;
			this.match(QasmParser.Id);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expList(): ExpListContext;
	public expList(_p: number): ExpListContext;
	@RuleVersion(0)
	public expList(_p?: number): ExpListContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpListContext = new ExpListContext(this._ctx, _parentState);
		let _prevctx: ExpListContext = _localctx;
		let _startState: number = 50;
		this.enterRecursionRule(_localctx, 50, QasmParser.RULE_expList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 309;
			this.expression(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 316;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,17,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ExpListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_expList);
					this.state = 311;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 312;
					this.match(QasmParser.Comma);
					this.state = 313;
					this.expression(0);
					}
					} 
				}
				this.state = 318;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,17,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	@RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 52;
		this.enterRecursionRule(_localctx, 52, QasmParser.RULE_expression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 320;
			this.multiplicativeExpression(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 327;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,18,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ExpressionContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_expression);
					this.state = 322;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 323;
					this.match(QasmParser.Pow);
					this.state = 324;
					this.multiplicativeExpression(0);
					}
					} 
				}
				this.state = 329;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,18,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public multiplicativeExpression(): MultiplicativeExpressionContext;
	public multiplicativeExpression(_p: number): MultiplicativeExpressionContext;
	@RuleVersion(0)
	public multiplicativeExpression(_p?: number): MultiplicativeExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: MultiplicativeExpressionContext = new MultiplicativeExpressionContext(this._ctx, _parentState);
		let _prevctx: MultiplicativeExpressionContext = _localctx;
		let _startState: number = 54;
		this.enterRecursionRule(_localctx, 54, QasmParser.RULE_multiplicativeExpression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 331;
			this.additiveExpression(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 341;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,20,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					this.state = 339;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input,19,this._ctx) ) {
					case 1:
						{
						_localctx = new MultiplicativeExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_multiplicativeExpression);
						this.state = 333;
						if (!(this.precpred(this._ctx, 2))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						this.state = 334;
						this.match(QasmParser.Mult);
						this.state = 335;
						this.multiplicativeExpression(3);
						}
						break;

					case 2:
						{
						_localctx = new MultiplicativeExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_multiplicativeExpression);
						this.state = 336;
						if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
						this.state = 337;
						this.match(QasmParser.Div);
						this.state = 338;
						this.multiplicativeExpression(2);
						}
						break;
					}
					} 
				}
				this.state = 343;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,20,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public additiveExpression(): AdditiveExpressionContext;
	public additiveExpression(_p: number): AdditiveExpressionContext;
	@RuleVersion(0)
	public additiveExpression(_p?: number): AdditiveExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: AdditiveExpressionContext = new AdditiveExpressionContext(this._ctx, _parentState);
		let _prevctx: AdditiveExpressionContext = _localctx;
		let _startState: number = 56;
		this.enterRecursionRule(_localctx, 56, QasmParser.RULE_additiveExpression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 345;
			this.prefixExpression();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 355;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,22,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					this.state = 353;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input,21,this._ctx) ) {
					case 1:
						{
						_localctx = new AdditiveExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_additiveExpression);
						this.state = 347;
						if (!(this.precpred(this._ctx, 2))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						this.state = 348;
						this.match(QasmParser.Sum);
						this.state = 349;
						this.additiveExpression(3);
						}
						break;

					case 2:
						{
						_localctx = new AdditiveExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_additiveExpression);
						this.state = 350;
						if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
						this.state = 351;
						this.match(QasmParser.Subs);
						this.state = 352;
						this.additiveExpression(2);
						}
						break;
					}
					} 
				}
				this.state = 357;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,22,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	@RuleVersion(0)
	public prefixExpression(): PrefixExpressionContext {
		let _localctx: PrefixExpressionContext = new PrefixExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, QasmParser.RULE_prefixExpression);
		try {
			this.state = 363;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Real:
			case QasmParser.Int:
			case QasmParser.LeftParen:
			case QasmParser.Pi:
			case QasmParser.Id:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 358;
				this.unary();
				}
				break;
			case QasmParser.Sum:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 359;
				this.match(QasmParser.Sum);
				this.state = 360;
				this.prefixExpression();
				}
				break;
			case QasmParser.Subs:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 361;
				this.match(QasmParser.Subs);
				this.state = 362;
				this.prefixExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public unary(): UnaryContext {
		let _localctx: UnaryContext = new UnaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, QasmParser.RULE_unary);
		try {
			this.state = 378;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,24,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 365;
				this.match(QasmParser.Int);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 366;
				this.match(QasmParser.Real);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 367;
				this.match(QasmParser.Pi);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 368;
				this.match(QasmParser.Id);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 369;
				this.match(QasmParser.LeftParen);
				this.state = 370;
				this.expression(0);
				this.state = 371;
				this.match(QasmParser.RightParen);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 373;
				this.match(QasmParser.Id);
				this.state = 374;
				this.match(QasmParser.LeftParen);
				this.state = 375;
				this.expression(0);
				this.state = 376;
				this.match(QasmParser.RightParen);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public idList(): IdListContext;
	public idList(_p: number): IdListContext;
	@RuleVersion(0)
	public idList(_p?: number): IdListContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: IdListContext = new IdListContext(this._ctx, _parentState);
		let _prevctx: IdListContext = _localctx;
		let _startState: number = 62;
		this.enterRecursionRule(_localctx, 62, QasmParser.RULE_idList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 381;
			this.match(QasmParser.Id);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 388;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,25,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new IdListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_idList);
					this.state = 383;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 384;
					this.match(QasmParser.Comma);
					this.state = 385;
					this.match(QasmParser.Id);
					}
					} 
				}
				this.state = 390;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,25,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 4:
			return this.library_sempred(_localctx as LibraryContext, predIndex);

		case 5:
			return this.program_sempred(_localctx as ProgramContext, predIndex);

		case 11:
			return this.primaryList_sempred(_localctx as PrimaryListContext, predIndex);

		case 18:
			return this.bitList_sempred(_localctx as BitListContext, predIndex);

		case 21:
			return this.gateOpList_sempred(_localctx as GateOpListContext, predIndex);

		case 23:
			return this.gateIdList_sempred(_localctx as GateIdListContext, predIndex);

		case 25:
			return this.expList_sempred(_localctx as ExpListContext, predIndex);

		case 26:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);

		case 27:
			return this.multiplicativeExpression_sempred(_localctx as MultiplicativeExpressionContext, predIndex);

		case 28:
			return this.additiveExpression_sempred(_localctx as AdditiveExpressionContext, predIndex);

		case 31:
			return this.idList_sempred(_localctx as IdListContext, predIndex);
		}
		return true;
	}
	private library_sempred(_localctx: LibraryContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private program_sempred(_localctx: ProgramContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private primaryList_sempred(_localctx: PrimaryListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private bitList_sempred(_localctx: BitListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 3:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private gateOpList_sempred(_localctx: GateOpListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 4:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private gateIdList_sempred(_localctx: GateIdListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 5:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expList_sempred(_localctx: ExpListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 7:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private multiplicativeExpression_sempred(_localctx: MultiplicativeExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 8:
			return this.precpred(this._ctx, 2);

		case 9:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private additiveExpression_sempred(_localctx: AdditiveExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 10:
			return this.precpred(this._ctx, 2);

		case 11:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private idList_sempred(_localctx: IdListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 12:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03#\u018A\x04\x02"+
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07"+
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04"+
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04"+
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04"+
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04"+
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x03\x02\x03\x02"+
		"\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03K\n\x03\x03\x04"+
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04T\n\x04\x03\x05"+
		"\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x07\x06"+
		"_\n\x06\f\x06\x0E\x06b\v\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x07"+
		"\x07i\n\x07\f\x07\x0E\x07l\v\x07\x03\b\x03\b\x05\bp\n\b\x03\t\x03\t\x03"+
		"\t\x05\tu\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n}\n\n\x03\v\x03"+
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03"+
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x05\v\x96\n\v"+
		"\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03"+
		"\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\xAC\n\f\x03\r"+
		"\x03\r\x03\r\x03\r\x03\r\x03\r\x07\r\xB4\n\r\f\r\x0E\r\xB7\v\r\x03\x0E"+
		"\x03\x0E\x05\x0E\xBB\n\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03"+
		"\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03"+
		"\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03"+
		"\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03"+
		"\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03"+
		"\x12\x05\x12\xE7\n\x12\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14"+
		"\x03\x14\x03\x14\x07\x14\xF1\n\x14\f\x14\x0E\x14\xF4\v\x14\x03\x15\x03"+
		"\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17\x05\x17\xFE\n\x17"+
		"\x03\x17\x03\x17\x07\x17\u0102\n\x17\f\x17\x0E\x17\u0105\v\x17\x03\x18"+
		"\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18"+
		"\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18"+
		"\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18"+
		"\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x05\x18\u0128\n\x18\x03\x19\x03"+
		"\x19\x03\x19\x03\x19\x03\x19\x03\x19\x07\x19\u0130\n\x19\f\x19\x0E\x19"+
		"\u0133\v\x19\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03"+
		"\x1B\x07\x1B\u013D\n\x1B\f\x1B\x0E\x1B\u0140\v\x1B\x03\x1C\x03\x1C\x03"+
		"\x1C\x03\x1C\x03\x1C\x03\x1C\x07\x1C\u0148\n\x1C\f\x1C\x0E\x1C\u014B\v"+
		"\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03"+
		"\x1D\x07\x1D\u0156\n\x1D\f\x1D\x0E\x1D\u0159\v\x1D\x03\x1E\x03\x1E\x03"+
		"\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x07\x1E\u0164\n\x1E"+
		"\f\x1E\x0E\x1E\u0167\v\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05"+
		"\x1F\u016E\n\x1F\x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03"+
		" \x03 \x03 \x05 \u017D\n \x03!\x03!\x03!\x03!\x03!\x03!\x07!\u0185\n!"+
		"\f!\x0E!\u0188\v!\x03!\x02\x02\r\n\f\x18&,0468:@\"\x02\x02\x04\x02\x06"+
		"\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02"+
		"\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x02"+
		"2\x024\x026\x028\x02:\x02<\x02>\x02@\x02\x02\x02\u0193\x02B\x03\x02\x02"+
		"\x02\x04J\x03\x02\x02\x02\x06S\x03\x02\x02\x02\bU\x03\x02\x02\x02\nY\x03"+
		"\x02\x02\x02\fc\x03\x02\x02\x02\x0Eo\x03\x02\x02\x02\x10t\x03\x02\x02"+
		"\x02\x12|\x03\x02\x02\x02\x14\x95\x03\x02\x02\x02\x16\xAB\x03\x02\x02"+
		"\x02\x18\xAD\x03\x02\x02\x02\x1A\xBA\x03\x02\x02\x02\x1C\xBC\x03\x02\x02"+
		"\x02\x1E\xC1\x03\x02\x02\x02 \xC8\x03\x02\x02\x02\"\xE6\x03\x02\x02\x02"+
		"$\xE8\x03\x02\x02\x02&\xEA\x03\x02\x02\x02(\xF5\x03\x02\x02\x02*\xF7\x03"+
		"\x02\x02\x02,\xFD\x03\x02\x02\x02.\u0127\x03\x02\x02\x020\u0129\x03\x02"+
		"\x02\x022\u0134\x03\x02\x02\x024\u0136\x03\x02\x02\x026\u0141\x03\x02"+
		"\x02\x028\u014C\x03\x02\x02\x02:\u015A\x03\x02\x02\x02<\u016D\x03\x02"+
		"\x02\x02>\u017C\x03\x02\x02\x02@\u017E\x03\x02\x02\x02BC\x05\x04\x03\x02"+
		"CD\x07\x02\x02\x03D\x03\x03\x02\x02\x02EK\x05\x06\x04\x02FG\x05\x06\x04"+
		"\x02GH\x05\f\x07\x02HK\x03\x02\x02\x02IK\x05\n\x06\x02JE\x03\x02\x02\x02"+
		"JF\x03\x02\x02\x02JI\x03\x02\x02\x02K\x05\x03\x02\x02\x02LM\x07\x07\x02"+
		"\x02MN\x07\x05\x02\x02NO\x07\x13\x02\x02OT\x05\b\x05\x02PQ\x07\x07\x02"+
		"\x02QR\x07\x05\x02\x02RT\x07\x13\x02\x02SL\x03\x02\x02\x02SP\x03\x02\x02"+
		"\x02T\x07\x03\x02\x02\x02UV\x07\b\x02\x02VW\x07\t\x02\x02WX\x07\x13\x02"+
		"\x02X\t\x03\x02\x02\x02YZ\b\x06\x01\x02Z[\x05\x10\t\x02[`\x03\x02\x02"+
		"\x02\\]\f\x03\x02\x02]_\x05\x10\t\x02^\\\x03\x02\x02\x02_b\x03\x02\x02"+
		"\x02`^\x03\x02\x02\x02`a\x03\x02\x02\x02a\v\x03\x02\x02\x02b`\x03\x02"+
		"\x02\x02cd\b\x07\x01\x02de\x05\x0E\b\x02ej\x03\x02\x02\x02fg\f\x03\x02"+
		"\x02gi\x05\x0E\b\x02hf\x03\x02\x02\x02il\x03\x02\x02\x02jh\x03\x02\x02"+
		"\x02jk\x03\x02\x02\x02k\r\x03\x02\x02\x02lj\x03\x02\x02\x02mp\x05\x10"+
		"\t\x02np\x05\x12\n\x02om\x03\x02\x02\x02on\x03\x02\x02\x02p\x0F\x03\x02"+
		"\x02\x02qu\x05\x1E\x10\x02ru\x05 \x11\x02su\x05\"\x12\x02tq\x03\x02\x02"+
		"\x02tr\x03\x02\x02\x02ts\x03\x02\x02\x02u\x11\x03\x02\x02\x02vw\x05\x14"+
		"\v\x02wx\x07\x13\x02\x02x}\x03\x02\x02\x02yz\x05\x16\f\x02z{\x07\x13\x02"+
		"\x02{}\x03\x02\x02\x02|v\x03\x02\x02\x02|y\x03\x02\x02\x02}\x13\x03\x02"+
		"\x02\x02~\x7F\x07\f\x02\x02\x7F\x80\x07\x19\x02\x02\x80\x81\x054\x1B\x02"+
		"\x81\x82\x07\x1A\x02\x02\x82\x83\x05\x1A\x0E\x02\x83\x96\x03\x02\x02\x02"+
		"\x84\x85\x07\r\x02\x02\x85\x86\x05\x1A\x0E\x02\x86\x87\x07\x14\x02\x02"+
		"\x87\x88\x05\x1A\x0E\x02\x88\x96\x03\x02\x02\x02\x89\x8A\x07#\x02\x02"+
		"\x8A\x96\x05\x18\r\x02\x8B\x8C\x07#\x02\x02\x8C\x8D\x07\x19\x02\x02\x8D"+
		"\x8E\x07\x1A\x02\x02\x8E\x96\x05\x18\r\x02\x8F\x90\x07#\x02\x02\x90\x91"+
		"\x07\x19\x02\x02\x91\x92\x054\x1B\x02\x92\x93\x07\x1A\x02\x02\x93\x94"+
		"\x05\x18\r\x02\x94\x96\x03\x02\x02\x02\x95~\x03\x02\x02\x02\x95\x84\x03"+
		"\x02\x02\x02\x95\x89\x03\x02\x02\x02\x95\x8B\x03\x02\x02\x02\x95\x8F\x03"+
		"\x02\x02\x02\x96\x15\x03\x02\x02\x02\x97\x98\x07\x11\x02\x02\x98\x99\x07"+
		"#\x02\x02\x99\x9A\x05$\x13\x02\x9A\x9B\x05&\x14\x02\x9B\xAC\x03\x02\x02"+
		"\x02\x9C\x9D\x07\x11\x02\x02\x9D\x9E\x07#\x02\x02\x9E\x9F\x05$\x13\x02"+
		"\x9F\xA0\x07\x19\x02\x02\xA0\xA1\x07\x1A\x02\x02\xA1\xA2\x05&\x14\x02"+
		"\xA2\xAC\x03\x02\x02\x02\xA3\xA4\x07\x11\x02\x02\xA4\xA5\x07#\x02\x02"+
		"\xA5\xA6\x05$\x13\x02\xA6\xA7\x07\x19\x02\x02\xA7\xA8\x050\x19\x02\xA8"+
		"\xA9\x07\x1A\x02\x02\xA9\xAA\x05&\x14\x02\xAA\xAC\x03\x02\x02\x02\xAB"+
		"\x97\x03\x02\x02\x02\xAB\x9C\x03\x02\x02\x02\xAB\xA3\x03\x02\x02\x02\xAC"+
		"\x17\x03\x02\x02\x02\xAD\xAE\b\r\x01\x02\xAE\xAF\x05\x1A\x0E\x02\xAF\xB5"+
		"\x03\x02\x02\x02\xB0\xB1\f\x03\x02\x02\xB1\xB2\x07\x14\x02\x02\xB2\xB4"+
		"\x05\x1A\x0E\x02\xB3\xB0\x03\x02\x02\x02\xB4\xB7\x03\x02\x02\x02\xB5\xB3"+
		"\x03\x02\x02\x02\xB5\xB6\x03\x02\x02\x02\xB6\x19\x03\x02\x02\x02\xB7\xB5"+
		"\x03\x02\x02\x02\xB8\xBB\x07#\x02\x02\xB9\xBB\x05\x1C\x0F\x02\xBA\xB8"+
		"\x03\x02\x02\x02\xBA\xB9\x03\x02\x02\x02\xBB\x1B\x03\x02\x02\x02\xBC\xBD"+
		"\x07#\x02\x02\xBD\xBE\x07\x17\x02\x02\xBE\xBF\x07\x06\x02\x02\xBF\xC0"+
		"\x07\x18\x02\x02\xC0\x1D\x03\x02\x02\x02\xC1\xC2\x07\n\x02\x02\xC2\xC3"+
		"\x07#\x02\x02\xC3\xC4\x07\x17\x02\x02\xC4\xC5\x07\x06\x02\x02\xC5\xC6"+
		"\x07\x18\x02\x02\xC6\xC7\x07\x13\x02\x02\xC7\x1F\x03\x02\x02\x02\xC8\xC9"+
		"\x07\v\x02\x02\xC9\xCA\x07#\x02\x02\xCA\xCB\x07\x17\x02\x02\xCB\xCC\x07"+
		"\x06\x02\x02\xCC\xCD\x07\x18\x02\x02\xCD\xCE\x07\x13\x02\x02\xCE!\x03"+
		"\x02\x02\x02\xCF\xD0\x07!\x02\x02\xD0\xD1\x07\"\x02\x02\xD1\xD2\x05$\x13"+
		"\x02\xD2\xD3\x05&\x14\x02\xD3\xD4\x05*\x16\x02\xD4\xE7\x03\x02\x02\x02"+
		"\xD5\xD6\x07!\x02\x02\xD6\xD7\x07\"\x02\x02\xD7\xD8\x05$\x13\x02\xD8\xD9"+
		"\x07\x19\x02\x02\xD9\xDA\x07\x1A\x02\x02\xDA\xDB\x05&\x14\x02\xDB\xDC"+
		"\x05*\x16\x02\xDC\xE7\x03\x02\x02\x02\xDD\xDE\x07!\x02\x02\xDE\xDF\x07"+
		"\"\x02\x02\xDF\xE0\x05$\x13\x02\xE0\xE1\x07\x19\x02\x02\xE1\xE2\x050\x19"+
		"\x02\xE2\xE3\x07\x1A\x02\x02\xE3\xE4\x05&\x14\x02\xE4\xE5\x05*\x16\x02"+
		"\xE5\xE7\x03\x02\x02\x02\xE6\xCF\x03\x02\x02\x02\xE6\xD5\x03\x02\x02\x02"+
		"\xE6\xDD\x03\x02\x02\x02\xE7#\x03\x02\x02\x02\xE8\xE9\x03\x02\x02\x02"+
		"\xE9%\x03\x02\x02\x02\xEA\xEB\b\x14\x01\x02\xEB\xEC\x05(\x15\x02\xEC\xF2"+
		"\x03\x02\x02\x02\xED\xEE\f\x03\x02\x02\xEE\xEF\x07\x14\x02\x02\xEF\xF1"+
		"\x05(\x15\x02\xF0\xED\x03\x02\x02\x02\xF1\xF4\x03\x02\x02\x02\xF2\xF0"+
		"\x03\x02\x02\x02\xF2\xF3\x03\x02\x02\x02\xF3\'\x03\x02\x02\x02\xF4\xF2"+
		"\x03\x02\x02\x02\xF5\xF6\x07#\x02\x02\xF6)\x03\x02\x02\x02\xF7\xF8\x07"+
		"\x15\x02\x02\xF8\xF9\x05,\x17\x02\xF9\xFA\x07\x16\x02\x02\xFA+\x03\x02"+
		"\x02\x02\xFB\xFE\b\x17\x01\x02\xFC\xFE\x05.\x18\x02\xFD\xFB\x03\x02\x02"+
		"\x02\xFD\xFC\x03\x02\x02\x02\xFE\u0103\x03\x02\x02\x02\xFF\u0100\f\x03"+
		"\x02\x02\u0100\u0102\x05.\x18\x02\u0101\xFF\x03\x02\x02\x02\u0102\u0105"+
		"\x03\x02\x02\x02\u0103\u0101\x03\x02\x02\x02\u0103\u0104\x03\x02\x02\x02"+
		"\u0104-\x03\x02\x02\x02\u0105\u0103\x03\x02\x02\x02\u0106\u0107\x07\f"+
		"\x02\x02\u0107\u0108\x07\x19\x02\x02\u0108\u0109\x054\x1B\x02\u0109\u010A"+
		"\x07\x1A\x02\x02\u010A\u010B\x07#\x02\x02\u010B\u010C\x07\x13\x02\x02"+
		"\u010C\u0128\x03\x02\x02\x02\u010D\u010E\x07\r\x02\x02\u010E\u010F\x07"+
		"#\x02\x02\u010F\u0110\x07\x14\x02\x02\u0110\u0111\x07#\x02\x02\u0111\u0128"+
		"\x07\x13\x02\x02\u0112\u0113\x07#\x02\x02\u0113\u0114\x05@!\x02\u0114"+
		"\u0115\x07\x13\x02\x02\u0115\u0128\x03\x02\x02\x02\u0116\u0117\x07#\x02"+
		"\x02\u0117\u0118\x07\x19\x02\x02\u0118\u0119\x07\x1A\x02\x02\u0119\u011A"+
		"\x05@!\x02\u011A\u011B\x07\x13\x02\x02\u011B\u0128\x03\x02\x02\x02\u011C"+
		"\u011D\x07#\x02\x02\u011D\u011E\x07\x19\x02\x02\u011E\u011F\x054\x1B\x02"+
		"\u011F\u0120\x07\x1A\x02\x02\u0120\u0121\x05@!\x02\u0121\u0122\x07\x13"+
		"\x02\x02\u0122\u0128\x03\x02\x02\x02\u0123\u0124\x07\x0F\x02\x02\u0124"+
		"\u0125\x05@!\x02\u0125\u0126\x07\x13\x02\x02\u0126\u0128\x03\x02\x02\x02"+
		"\u0127\u0106\x03\x02\x02\x02\u0127\u010D\x03\x02\x02\x02\u0127\u0112\x03"+
		"\x02\x02\x02\u0127\u0116\x03\x02\x02\x02\u0127\u011C\x03\x02\x02\x02\u0127"+
		"\u0123\x03\x02\x02\x02\u0128/\x03\x02\x02\x02\u0129\u012A\b\x19\x01\x02"+
		"\u012A\u012B\x052\x1A\x02\u012B\u0131\x03\x02\x02\x02\u012C\u012D\f\x03"+
		"\x02\x02\u012D\u012E\x07\x14\x02\x02\u012E\u0130\x052\x1A\x02\u012F\u012C"+
		"\x03\x02\x02\x02\u0130\u0133\x03\x02\x02\x02\u0131\u012F\x03\x02\x02\x02"+
		"\u0131\u0132\x03\x02\x02\x02\u01321\x03\x02\x02\x02\u0133\u0131\x03\x02"+
		"\x02\x02\u0134\u0135\x07#\x02\x02\u01353\x03\x02\x02\x02\u0136\u0137\b"+
		"\x1B\x01\x02\u0137\u0138\x056\x1C\x02\u0138\u013E\x03\x02\x02\x02\u0139"+
		"\u013A\f\x03\x02\x02\u013A\u013B\x07\x14\x02\x02\u013B\u013D\x056\x1C"+
		"\x02\u013C\u0139\x03\x02\x02\x02\u013D\u0140\x03\x02\x02\x02\u013E\u013C"+
		"\x03\x02\x02\x02\u013E\u013F\x03\x02\x02\x02\u013F5\x03\x02\x02\x02\u0140"+
		"\u013E\x03\x02\x02\x02\u0141\u0142\b\x1C\x01\x02\u0142\u0143\x058\x1D"+
		"\x02\u0143\u0149\x03\x02\x02\x02\u0144\u0145\f\x03\x02\x02\u0145\u0146"+
		"\x07\x1B\x02\x02\u0146\u0148\x058\x1D\x02\u0147\u0144\x03\x02\x02\x02"+
		"\u0148\u014B\x03\x02\x02\x02\u0149\u0147\x03\x02\x02\x02\u0149\u014A\x03"+
		"\x02\x02\x02\u014A7\x03\x02\x02\x02\u014B\u0149\x03\x02\x02\x02\u014C"+
		"\u014D\b\x1D\x01\x02\u014D\u014E\x05:\x1E\x02\u014E\u0157\x03\x02\x02"+
		"\x02\u014F\u0150\f\x04\x02\x02\u0150\u0151\x07\x1C\x02\x02\u0151\u0156"+
		"\x058\x1D\x05\u0152\u0153\f\x03\x02\x02\u0153\u0154\x07\x1D\x02\x02\u0154"+
		"\u0156\x058\x1D\x04\u0155\u014F\x03\x02\x02\x02\u0155\u0152\x03\x02\x02"+
		"\x02\u0156\u0159\x03\x02\x02\x02\u0157\u0155\x03\x02\x02\x02\u0157\u0158"+
		"\x03\x02\x02\x02\u01589\x03\x02\x02\x02\u0159\u0157\x03\x02\x02\x02\u015A"+
		"\u015B\b\x1E\x01\x02\u015B\u015C\x05<\x1F\x02\u015C\u0165\x03\x02\x02"+
		"\x02\u015D\u015E\f\x04\x02\x02\u015E\u015F\x07\x1E\x02\x02\u015F\u0164"+
		"\x05:\x1E\x05\u0160\u0161\f\x03\x02\x02\u0161\u0162\x07\x1F\x02\x02\u0162"+
		"\u0164\x05:\x1E\x04\u0163\u015D\x03\x02\x02\x02\u0163\u0160\x03\x02\x02"+
		"\x02\u0164\u0167\x03\x02\x02\x02\u0165\u0163\x03\x02\x02\x02\u0165\u0166"+
		"\x03\x02\x02\x02\u0166;\x03\x02\x02\x02\u0167\u0165\x03\x02\x02\x02\u0168"+
		"\u016E\x05> \x02\u0169\u016A\x07\x1E\x02\x02\u016A\u016E\x05<\x1F\x02"+
		"\u016B\u016C\x07\x1F\x02\x02\u016C\u016E\x05<\x1F\x02\u016D\u0168\x03"+
		"\x02\x02\x02\u016D\u0169\x03\x02\x02\x02\u016D\u016B\x03\x02\x02\x02\u016E"+
		"=\x03\x02\x02\x02\u016F\u017D\x07\x06\x02\x02\u0170\u017D\x07\x05\x02"+
		"\x02\u0171\u017D\x07 \x02\x02\u0172\u017D\x07#\x02\x02\u0173\u0174\x07"+
		"\x19\x02\x02\u0174\u0175\x056\x1C\x02\u0175\u0176\x07\x1A\x02\x02\u0176"+
		"\u017D\x03\x02\x02\x02\u0177\u0178\x07#\x02\x02\u0178\u0179\x07\x19\x02"+
		"\x02\u0179\u017A\x056\x1C\x02\u017A\u017B\x07\x1A\x02\x02\u017B\u017D"+
		"\x03\x02\x02\x02\u017C\u016F\x03\x02\x02\x02\u017C\u0170\x03\x02\x02\x02"+
		"\u017C\u0171\x03\x02\x02\x02\u017C\u0172\x03\x02\x02\x02\u017C\u0173\x03"+
		"\x02\x02\x02\u017C\u0177\x03\x02\x02\x02\u017D?\x03\x02\x02\x02\u017E"+
		"\u017F\b!\x01\x02\u017F\u0180\x07#\x02\x02\u0180\u0186\x03\x02\x02\x02"+
		"\u0181\u0182\f\x03\x02\x02\u0182\u0183\x07\x14\x02\x02\u0183\u0185\x07"+
		"#\x02\x02\u0184\u0181\x03\x02\x02\x02\u0185\u0188\x03\x02\x02\x02\u0186"+
		"\u0184\x03\x02\x02\x02\u0186\u0187\x03\x02\x02\x02\u0187A\x03\x02\x02"+
		"\x02\u0188\u0186\x03\x02\x02\x02\x1CJS`jot|\x95\xAB\xB5\xBA\xE6\xF2\xFD"+
		"\u0103\u0127\u0131\u013E\u0149\u0155\u0157\u0163\u0165\u016D\u017C\u0186";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QasmParser.__ATN) {
			QasmParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(QasmParser._serializedATN));
		}

		return QasmParser.__ATN;
	}

}

export class StartProgramContext extends ParserRuleContext {
	public mainProgram(): MainProgramContext {
		return this.getRuleContext(0, MainProgramContext);
	}
	public EOF(): TerminalNode { return this.getToken(QasmParser.EOF, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_startProgram; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterStartProgram) listener.enterStartProgram(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitStartProgram) listener.exitStartProgram(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitStartProgram) return visitor.visitStartProgram(this);
		else return visitor.visitChildren(this);
	}
}


export class MainProgramContext extends ParserRuleContext {
	public ibmDefinition(): IbmDefinitionContext | undefined {
		return this.tryGetRuleContext(0, IbmDefinitionContext);
	}
	public program(): ProgramContext | undefined {
		return this.tryGetRuleContext(0, ProgramContext);
	}
	public library(): LibraryContext | undefined {
		return this.tryGetRuleContext(0, LibraryContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_mainProgram; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterMainProgram) listener.enterMainProgram(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitMainProgram) listener.exitMainProgram(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitMainProgram) return visitor.visitMainProgram(this);
		else return visitor.visitChildren(this);
	}
}


export class IbmDefinitionContext extends ParserRuleContext {
	public IbmQasm(): TerminalNode { return this.getToken(QasmParser.IbmQasm, 0); }
	public Real(): TerminalNode { return this.getToken(QasmParser.Real, 0); }
	public Semi(): TerminalNode { return this.getToken(QasmParser.Semi, 0); }
	public include(): IncludeContext | undefined {
		return this.tryGetRuleContext(0, IncludeContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_ibmDefinition; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterIbmDefinition) listener.enterIbmDefinition(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitIbmDefinition) listener.exitIbmDefinition(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitIbmDefinition) return visitor.visitIbmDefinition(this);
		else return visitor.visitChildren(this);
	}
}


export class IncludeContext extends ParserRuleContext {
	public Include(): TerminalNode { return this.getToken(QasmParser.Include, 0); }
	public Qelib(): TerminalNode { return this.getToken(QasmParser.Qelib, 0); }
	public Semi(): TerminalNode { return this.getToken(QasmParser.Semi, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_include; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterInclude) listener.enterInclude(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitInclude) listener.exitInclude(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitInclude) return visitor.visitInclude(this);
		else return visitor.visitChildren(this);
	}
}


export class LibraryContext extends ParserRuleContext {
	public declaration(): DeclarationContext {
		return this.getRuleContext(0, DeclarationContext);
	}
	public library(): LibraryContext | undefined {
		return this.tryGetRuleContext(0, LibraryContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_library; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterLibrary) listener.enterLibrary(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitLibrary) listener.exitLibrary(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitLibrary) return visitor.visitLibrary(this);
		else return visitor.visitChildren(this);
	}
}


export class ProgramContext extends ParserRuleContext {
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	public program(): ProgramContext | undefined {
		return this.tryGetRuleContext(0, ProgramContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_program; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterProgram) listener.enterProgram(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitProgram) listener.exitProgram(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitProgram) return visitor.visitProgram(this);
		else return visitor.visitChildren(this);
	}
}


export class StatementContext extends ParserRuleContext {
	public declaration(): DeclarationContext | undefined {
		return this.tryGetRuleContext(0, DeclarationContext);
	}
	public qoperation(): QoperationContext | undefined {
		return this.tryGetRuleContext(0, QoperationContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_statement; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterStatement) listener.enterStatement(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitStatement) listener.exitStatement(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitStatement) return visitor.visitStatement(this);
		else return visitor.visitChildren(this);
	}
}


export class DeclarationContext extends ParserRuleContext {
	public qregDeclaration(): QregDeclarationContext | undefined {
		return this.tryGetRuleContext(0, QregDeclarationContext);
	}
	public cregDeclaration(): CregDeclarationContext | undefined {
		return this.tryGetRuleContext(0, CregDeclarationContext);
	}
	public gateDeclaration(): GateDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GateDeclarationContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_declaration; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterDeclaration) listener.enterDeclaration(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitDeclaration) listener.exitDeclaration(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitDeclaration) return visitor.visitDeclaration(this);
		else return visitor.visitChildren(this);
	}
}


export class QoperationContext extends ParserRuleContext {
	public unitaryOperation(): UnitaryOperationContext | undefined {
		return this.tryGetRuleContext(0, UnitaryOperationContext);
	}
	public Semi(): TerminalNode { return this.getToken(QasmParser.Semi, 0); }
	public opaque(): OpaqueContext | undefined {
		return this.tryGetRuleContext(0, OpaqueContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_qoperation; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterQoperation) listener.enterQoperation(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitQoperation) listener.exitQoperation(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitQoperation) return visitor.visitQoperation(this);
		else return visitor.visitChildren(this);
	}
}


export class UnitaryOperationContext extends ParserRuleContext {
	public U(): TerminalNode | undefined { return this.tryGetToken(QasmParser.U, 0); }
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public expList(): ExpListContext | undefined {
		return this.tryGetRuleContext(0, ExpListContext);
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	public primary(): PrimaryContext[];
	public primary(i: number): PrimaryContext;
	public primary(i?: number): PrimaryContext | PrimaryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PrimaryContext);
		} else {
			return this.getRuleContext(i, PrimaryContext);
		}
	}
	public Cx(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Cx, 0); }
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Id, 0); }
	public primaryList(): PrimaryListContext | undefined {
		return this.tryGetRuleContext(0, PrimaryListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_unitaryOperation; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterUnitaryOperation) listener.enterUnitaryOperation(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitUnitaryOperation) listener.exitUnitaryOperation(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitUnitaryOperation) return visitor.visitUnitaryOperation(this);
		else return visitor.visitChildren(this);
	}
}


export class OpaqueContext extends ParserRuleContext {
	public Opaque(): TerminalNode { return this.getToken(QasmParser.Opaque, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public gateScope(): GateScopeContext {
		return this.getRuleContext(0, GateScopeContext);
	}
	public bitList(): BitListContext {
		return this.getRuleContext(0, BitListContext);
	}
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	public gateIdList(): GateIdListContext | undefined {
		return this.tryGetRuleContext(0, GateIdListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_opaque; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterOpaque) listener.enterOpaque(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitOpaque) listener.exitOpaque(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitOpaque) return visitor.visitOpaque(this);
		else return visitor.visitChildren(this);
	}
}


export class PrimaryListContext extends ParserRuleContext {
	public primary(): PrimaryContext {
		return this.getRuleContext(0, PrimaryContext);
	}
	public primaryList(): PrimaryListContext | undefined {
		return this.tryGetRuleContext(0, PrimaryListContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_primaryList; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterPrimaryList) listener.enterPrimaryList(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitPrimaryList) listener.exitPrimaryList(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitPrimaryList) return visitor.visitPrimaryList(this);
		else return visitor.visitChildren(this);
	}
}


export class PrimaryContext extends ParserRuleContext {
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Id, 0); }
	public indexedId(): IndexedIdContext | undefined {
		return this.tryGetRuleContext(0, IndexedIdContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_primary; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterPrimary) listener.enterPrimary(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitPrimary) listener.exitPrimary(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitPrimary) return visitor.visitPrimary(this);
		else return visitor.visitChildren(this);
	}
}


export class IndexedIdContext extends ParserRuleContext {
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public LeftBrace(): TerminalNode { return this.getToken(QasmParser.LeftBrace, 0); }
	public Int(): TerminalNode { return this.getToken(QasmParser.Int, 0); }
	public RightBrace(): TerminalNode { return this.getToken(QasmParser.RightBrace, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_indexedId; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterIndexedId) listener.enterIndexedId(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitIndexedId) listener.exitIndexedId(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitIndexedId) return visitor.visitIndexedId(this);
		else return visitor.visitChildren(this);
	}
}


export class QregDeclarationContext extends ParserRuleContext {
	public Qreg(): TerminalNode { return this.getToken(QasmParser.Qreg, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public LeftBrace(): TerminalNode { return this.getToken(QasmParser.LeftBrace, 0); }
	public Int(): TerminalNode { return this.getToken(QasmParser.Int, 0); }
	public RightBrace(): TerminalNode { return this.getToken(QasmParser.RightBrace, 0); }
	public Semi(): TerminalNode { return this.getToken(QasmParser.Semi, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_qregDeclaration; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterQregDeclaration) listener.enterQregDeclaration(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitQregDeclaration) listener.exitQregDeclaration(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitQregDeclaration) return visitor.visitQregDeclaration(this);
		else return visitor.visitChildren(this);
	}
}


export class CregDeclarationContext extends ParserRuleContext {
	public Creg(): TerminalNode { return this.getToken(QasmParser.Creg, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public LeftBrace(): TerminalNode { return this.getToken(QasmParser.LeftBrace, 0); }
	public Int(): TerminalNode { return this.getToken(QasmParser.Int, 0); }
	public RightBrace(): TerminalNode { return this.getToken(QasmParser.RightBrace, 0); }
	public Semi(): TerminalNode { return this.getToken(QasmParser.Semi, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_cregDeclaration; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterCregDeclaration) listener.enterCregDeclaration(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitCregDeclaration) listener.exitCregDeclaration(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitCregDeclaration) return visitor.visitCregDeclaration(this);
		else return visitor.visitChildren(this);
	}
}


export class GateDeclarationContext extends ParserRuleContext {
	public Gate(): TerminalNode { return this.getToken(QasmParser.Gate, 0); }
	public GateId(): TerminalNode { return this.getToken(QasmParser.GateId, 0); }
	public gateScope(): GateScopeContext {
		return this.getRuleContext(0, GateScopeContext);
	}
	public bitList(): BitListContext {
		return this.getRuleContext(0, BitListContext);
	}
	public gateBody(): GateBodyContext {
		return this.getRuleContext(0, GateBodyContext);
	}
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	public gateIdList(): GateIdListContext | undefined {
		return this.tryGetRuleContext(0, GateIdListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_gateDeclaration; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterGateDeclaration) listener.enterGateDeclaration(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitGateDeclaration) listener.exitGateDeclaration(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitGateDeclaration) return visitor.visitGateDeclaration(this);
		else return visitor.visitChildren(this);
	}
}


export class GateScopeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_gateScope; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterGateScope) listener.enterGateScope(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitGateScope) listener.exitGateScope(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitGateScope) return visitor.visitGateScope(this);
		else return visitor.visitChildren(this);
	}
}


export class BitListContext extends ParserRuleContext {
	public bit(): BitContext {
		return this.getRuleContext(0, BitContext);
	}
	public bitList(): BitListContext | undefined {
		return this.tryGetRuleContext(0, BitListContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_bitList; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterBitList) listener.enterBitList(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitBitList) listener.exitBitList(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitBitList) return visitor.visitBitList(this);
		else return visitor.visitChildren(this);
	}
}


export class BitContext extends ParserRuleContext {
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_bit; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterBit) listener.enterBit(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitBit) listener.exitBit(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitBit) return visitor.visitBit(this);
		else return visitor.visitChildren(this);
	}
}


export class GateBodyContext extends ParserRuleContext {
	public LeftCurlyBrace(): TerminalNode { return this.getToken(QasmParser.LeftCurlyBrace, 0); }
	public gateOpList(): GateOpListContext {
		return this.getRuleContext(0, GateOpListContext);
	}
	public RightCurlyBrace(): TerminalNode { return this.getToken(QasmParser.RightCurlyBrace, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_gateBody; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterGateBody) listener.enterGateBody(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitGateBody) listener.exitGateBody(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitGateBody) return visitor.visitGateBody(this);
		else return visitor.visitChildren(this);
	}
}


export class GateOpListContext extends ParserRuleContext {
	public gateOp(): GateOpContext | undefined {
		return this.tryGetRuleContext(0, GateOpContext);
	}
	public gateOpList(): GateOpListContext | undefined {
		return this.tryGetRuleContext(0, GateOpListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_gateOpList; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterGateOpList) listener.enterGateOpList(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitGateOpList) listener.exitGateOpList(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitGateOpList) return visitor.visitGateOpList(this);
		else return visitor.visitChildren(this);
	}
}


export class GateOpContext extends ParserRuleContext {
	public U(): TerminalNode | undefined { return this.tryGetToken(QasmParser.U, 0); }
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public expList(): ExpListContext | undefined {
		return this.tryGetRuleContext(0, ExpListContext);
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	public Id(): TerminalNode[];
	public Id(i: number): TerminalNode;
	public Id(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QasmParser.Id);
		} else {
			return this.getToken(QasmParser.Id, i);
		}
	}
	public Semi(): TerminalNode { return this.getToken(QasmParser.Semi, 0); }
	public Cx(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Cx, 0); }
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	public idList(): IdListContext | undefined {
		return this.tryGetRuleContext(0, IdListContext);
	}
	public Barrier(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Barrier, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_gateOp; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterGateOp) listener.enterGateOp(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitGateOp) listener.exitGateOp(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitGateOp) return visitor.visitGateOp(this);
		else return visitor.visitChildren(this);
	}
}


export class GateIdListContext extends ParserRuleContext {
	public gate(): GateContext {
		return this.getRuleContext(0, GateContext);
	}
	public gateIdList(): GateIdListContext | undefined {
		return this.tryGetRuleContext(0, GateIdListContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_gateIdList; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterGateIdList) listener.enterGateIdList(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitGateIdList) listener.exitGateIdList(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitGateIdList) return visitor.visitGateIdList(this);
		else return visitor.visitChildren(this);
	}
}


export class GateContext extends ParserRuleContext {
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_gate; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterGate) listener.enterGate(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitGate) listener.exitGate(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitGate) return visitor.visitGate(this);
		else return visitor.visitChildren(this);
	}
}


export class ExpListContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public expList(): ExpListContext | undefined {
		return this.tryGetRuleContext(0, ExpListContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_expList; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterExpList) listener.enterExpList(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitExpList) listener.exitExpList(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitExpList) return visitor.visitExpList(this);
		else return visitor.visitChildren(this);
	}
}


export class ExpressionContext extends ParserRuleContext {
	public multiplicativeExpression(): MultiplicativeExpressionContext {
		return this.getRuleContext(0, MultiplicativeExpressionContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public Pow(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Pow, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_expression; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterExpression) listener.enterExpression(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitExpression) listener.exitExpression(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitExpression) return visitor.visitExpression(this);
		else return visitor.visitChildren(this);
	}
}


export class MultiplicativeExpressionContext extends ParserRuleContext {
	public additiveExpression(): AdditiveExpressionContext | undefined {
		return this.tryGetRuleContext(0, AdditiveExpressionContext);
	}
	public multiplicativeExpression(): MultiplicativeExpressionContext[];
	public multiplicativeExpression(i: number): MultiplicativeExpressionContext;
	public multiplicativeExpression(i?: number): MultiplicativeExpressionContext | MultiplicativeExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MultiplicativeExpressionContext);
		} else {
			return this.getRuleContext(i, MultiplicativeExpressionContext);
		}
	}
	public Mult(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Mult, 0); }
	public Div(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Div, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_multiplicativeExpression; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterMultiplicativeExpression) listener.enterMultiplicativeExpression(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitMultiplicativeExpression) listener.exitMultiplicativeExpression(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) return visitor.visitMultiplicativeExpression(this);
		else return visitor.visitChildren(this);
	}
}


export class AdditiveExpressionContext extends ParserRuleContext {
	public prefixExpression(): PrefixExpressionContext | undefined {
		return this.tryGetRuleContext(0, PrefixExpressionContext);
	}
	public additiveExpression(): AdditiveExpressionContext[];
	public additiveExpression(i: number): AdditiveExpressionContext;
	public additiveExpression(i?: number): AdditiveExpressionContext | AdditiveExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AdditiveExpressionContext);
		} else {
			return this.getRuleContext(i, AdditiveExpressionContext);
		}
	}
	public Sum(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Sum, 0); }
	public Subs(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Subs, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_additiveExpression; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterAdditiveExpression) listener.enterAdditiveExpression(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitAdditiveExpression) listener.exitAdditiveExpression(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitAdditiveExpression) return visitor.visitAdditiveExpression(this);
		else return visitor.visitChildren(this);
	}
}


export class PrefixExpressionContext extends ParserRuleContext {
	public unary(): UnaryContext | undefined {
		return this.tryGetRuleContext(0, UnaryContext);
	}
	public Sum(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Sum, 0); }
	public prefixExpression(): PrefixExpressionContext | undefined {
		return this.tryGetRuleContext(0, PrefixExpressionContext);
	}
	public Subs(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Subs, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_prefixExpression; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterPrefixExpression) listener.enterPrefixExpression(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitPrefixExpression) listener.exitPrefixExpression(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitPrefixExpression) return visitor.visitPrefixExpression(this);
		else return visitor.visitChildren(this);
	}
}


export class UnaryContext extends ParserRuleContext {
	public Int(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Int, 0); }
	public Real(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Real, 0); }
	public Pi(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Pi, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Id, 0); }
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_unary; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterUnary) listener.enterUnary(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitUnary) listener.exitUnary(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitUnary) return visitor.visitUnary(this);
		else return visitor.visitChildren(this);
	}
}


export class IdListContext extends ParserRuleContext {
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public idList(): IdListContext | undefined {
		return this.tryGetRuleContext(0, IdListContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_idList; }
	@Override
	public enterRule(listener: QasmListener): void {
		if (listener.enterIdList) listener.enterIdList(this);
	}
	@Override
	public exitRule(listener: QasmListener): void {
		if (listener.exitIdList) listener.exitIdList(this);
	}
	@Override
	public accept<Result>(visitor: QasmVisitor<Result>): Result {
		if (visitor.visitIdList) return visitor.visitIdList(this);
		else return visitor.visitChildren(this);
	}
}


