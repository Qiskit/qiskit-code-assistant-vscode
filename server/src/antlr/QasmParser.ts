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
	public static readonly T__0=1;
	public static readonly Comment=2;
	public static readonly WhiteSpace=3;
	public static readonly Real=4;
	public static readonly Int=5;
	public static readonly IbmQasm=6;
	public static readonly Include=7;
	public static readonly Qelib=8;
	public static readonly Qreg=9;
	public static readonly Creg=10;
	public static readonly U=11;
	public static readonly Cx=12;
	public static readonly Measure=13;
	public static readonly Barrier=14;
	public static readonly Reset=15;
	public static readonly Opaque=16;
	public static readonly Assign=17;
	public static readonly Semi=18;
	public static readonly Comma=19;
	public static readonly LeftCurlyBrace=20;
	public static readonly RightCurlyBrace=21;
	public static readonly LeftBrace=22;
	public static readonly RightBrace=23;
	public static readonly LeftParen=24;
	public static readonly RightParen=25;
	public static readonly Pow=26;
	public static readonly Mult=27;
	public static readonly Div=28;
	public static readonly Sum=29;
	public static readonly Subs=30;
	public static readonly Pi=31;
	public static readonly Gate=32;
	public static readonly GateId=33;
	public static readonly Id=34;
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
	public static readonly RULE_qregDeclaration = 10;
	public static readonly RULE_cregDeclaration = 11;
	public static readonly RULE_gateDeclaration = 12;
	public static readonly RULE_gateScope = 13;
	public static readonly RULE_bitList = 14;
	public static readonly RULE_bit = 15;
	public static readonly RULE_gateBody = 16;
	public static readonly RULE_gateOpList = 17;
	public static readonly RULE_gateOp = 18;
	public static readonly RULE_gateIdList = 19;
	public static readonly RULE_gate = 20;
	public static readonly RULE_expList = 21;
	public static readonly RULE_expression = 22;
	public static readonly RULE_multiplicativeExpression = 23;
	public static readonly RULE_additiveExpression = 24;
	public static readonly RULE_prefixExpression = 25;
	public static readonly RULE_unary = 26;
	public static readonly RULE_idList = 27;
	public static readonly ruleNames: string[] = [
		"startProgram", "mainProgram", "ibmDefinition", "include", "library", 
		"program", "statement", "declaration", "qoperation", "unitaryOperation", 
		"qregDeclaration", "cregDeclaration", "gateDeclaration", "gateScope", 
		"bitList", "bit", "gateBody", "gateOpList", "gateOp", "gateIdList", "gate", 
		"expList", "expression", "multiplicativeExpression", "additiveExpression", 
		"prefixExpression", "unary", "idList"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, "'unitary'", undefined, undefined, undefined, undefined, undefined, 
		"'include'", "'QELIB.INC'", "'qreg'", "'creg'", "'U'", "'CX'", "'measure'", 
		"'barrier'", "'reset'", "'opaque'", "'->'", "';'", "','", "'{'", "'}'", 
		"'['", "']'", "'('", "')'", "'^'", "'*'", "'/'", "'+'", "'-'", "'pi'", 
		"'gate'"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
		undefined, undefined, "Comment", "WhiteSpace", "Real", "Int", "IbmQasm", 
		"Include", "Qelib", "Qreg", "Creg", "U", "Cx", "Measure", "Barrier", "Reset", 
		"Opaque", "Assign", "Semi", "Comma", "LeftCurlyBrace", "RightCurlyBrace", 
		"LeftBrace", "RightBrace", "LeftParen", "RightParen", "Pow", "Mult", "Div", 
		"Sum", "Subs", "Pi", "Gate", "GateId", "Id"
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
			this.state = 56;
			this.mainProgram();
			this.state = 57;
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
			this.state = 64;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,0,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 59;
				this.ibmDefinition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 60;
				this.ibmDefinition();
				this.state = 61;
				this.program(0);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 63;
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
			this.state = 73;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,1,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 66;
				this.match(QasmParser.IbmQasm);
				this.state = 67;
				this.match(QasmParser.Real);
				this.state = 68;
				this.match(QasmParser.Semi);
				this.state = 69;
				this.include();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 70;
				this.match(QasmParser.IbmQasm);
				this.state = 71;
				this.match(QasmParser.Real);
				this.state = 72;
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
			this.state = 75;
			this.match(QasmParser.Include);
			this.state = 76;
			this.match(QasmParser.Qelib);
			this.state = 77;
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
			this.state = 80;
			this.declaration();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 86;
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
					this.state = 82;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 83;
					this.declaration();
					}
					} 
				}
				this.state = 88;
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
			this.state = 90;
			this.statement();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 96;
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
					this.state = 92;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 93;
					this.statement();
					}
					} 
				}
				this.state = 98;
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
			this.state = 101;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Qreg:
			case QasmParser.Creg:
			case QasmParser.Gate:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 99;
				this.declaration();
				}
				break;
			case QasmParser.T__0:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 100;
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
			this.state = 106;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Qreg:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 103;
				this.qregDeclaration();
				}
				break;
			case QasmParser.Creg:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 104;
				this.cregDeclaration();
				}
				break;
			case QasmParser.Gate:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 105;
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
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 108;
			this.unitaryOperation();
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
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 110;
			this.match(QasmParser.T__0);
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
		this.enterRule(_localctx, 20, QasmParser.RULE_qregDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 112;
			this.match(QasmParser.Qreg);
			this.state = 113;
			this.match(QasmParser.Id);
			this.state = 114;
			this.match(QasmParser.LeftBrace);
			this.state = 115;
			this.match(QasmParser.Int);
			this.state = 116;
			this.match(QasmParser.RightBrace);
			this.state = 117;
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
		this.enterRule(_localctx, 22, QasmParser.RULE_cregDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 119;
			this.match(QasmParser.Creg);
			this.state = 120;
			this.match(QasmParser.Id);
			this.state = 121;
			this.match(QasmParser.LeftBrace);
			this.state = 122;
			this.match(QasmParser.Int);
			this.state = 123;
			this.match(QasmParser.RightBrace);
			this.state = 124;
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
		this.enterRule(_localctx, 24, QasmParser.RULE_gateDeclaration);
		try {
			this.state = 149;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,6,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 126;
				this.match(QasmParser.Gate);
				this.state = 127;
				this.match(QasmParser.GateId);
				this.state = 128;
				this.gateScope();
				this.state = 129;
				this.bitList(0);
				this.state = 130;
				this.gateBody();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 132;
				this.match(QasmParser.Gate);
				this.state = 133;
				this.match(QasmParser.GateId);
				this.state = 134;
				this.gateScope();
				this.state = 135;
				this.match(QasmParser.LeftParen);
				this.state = 136;
				this.match(QasmParser.RightParen);
				this.state = 137;
				this.bitList(0);
				this.state = 138;
				this.gateBody();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 140;
				this.match(QasmParser.Gate);
				this.state = 141;
				this.match(QasmParser.GateId);
				this.state = 142;
				this.gateScope();
				this.state = 143;
				this.match(QasmParser.LeftParen);
				this.state = 144;
				this.gateIdList(0);
				this.state = 145;
				this.match(QasmParser.RightParen);
				this.state = 146;
				this.bitList(0);
				this.state = 147;
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
		this.enterRule(_localctx, 26, QasmParser.RULE_gateScope);
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
		let _startState: number = 28;
		this.enterRecursionRule(_localctx, 28, QasmParser.RULE_bitList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 154;
			this.bit();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 161;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,7,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new BitListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_bitList);
					this.state = 156;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 157;
					this.match(QasmParser.Comma);
					this.state = 158;
					this.bit();
					}
					} 
				}
				this.state = 163;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,7,this._ctx);
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
		this.enterRule(_localctx, 30, QasmParser.RULE_bit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 164;
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
		this.enterRule(_localctx, 32, QasmParser.RULE_gateBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 166;
			this.match(QasmParser.LeftCurlyBrace);
			this.state = 167;
			this.gateOpList(0);
			this.state = 168;
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
		let _startState: number = 34;
		this.enterRecursionRule(_localctx, 34, QasmParser.RULE_gateOpList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 172;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,8,this._ctx) ) {
			case 1:
				{
				}
				break;

			case 2:
				{
				this.state = 171;
				this.gateOp();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 178;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,9,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new GateOpListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_gateOpList);
					this.state = 174;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 175;
					this.gateOp();
					}
					} 
				}
				this.state = 180;
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
	public gateOp(): GateOpContext {
		let _localctx: GateOpContext = new GateOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, QasmParser.RULE_gateOp);
		try {
			this.state = 214;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,10,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 181;
				this.match(QasmParser.U);
				this.state = 182;
				this.match(QasmParser.LeftParen);
				this.state = 183;
				this.expList(0);
				this.state = 184;
				this.match(QasmParser.RightParen);
				this.state = 185;
				this.match(QasmParser.Id);
				this.state = 186;
				this.match(QasmParser.Semi);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 188;
				this.match(QasmParser.Cx);
				this.state = 189;
				this.match(QasmParser.Id);
				this.state = 190;
				this.match(QasmParser.Comma);
				this.state = 191;
				this.match(QasmParser.Id);
				this.state = 192;
				this.match(QasmParser.Semi);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 193;
				this.match(QasmParser.Id);
				this.state = 194;
				this.idList(0);
				this.state = 195;
				this.match(QasmParser.Semi);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 197;
				this.match(QasmParser.Id);
				this.state = 198;
				this.match(QasmParser.LeftParen);
				this.state = 199;
				this.match(QasmParser.RightParen);
				this.state = 200;
				this.idList(0);
				this.state = 201;
				this.match(QasmParser.Semi);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 203;
				this.match(QasmParser.Id);
				this.state = 204;
				this.match(QasmParser.LeftParen);
				this.state = 205;
				this.expList(0);
				this.state = 206;
				this.match(QasmParser.RightParen);
				this.state = 207;
				this.idList(0);
				this.state = 208;
				this.match(QasmParser.Semi);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 210;
				this.match(QasmParser.Barrier);
				this.state = 211;
				this.idList(0);
				this.state = 212;
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
		let _startState: number = 38;
		this.enterRecursionRule(_localctx, 38, QasmParser.RULE_gateIdList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 217;
			this.gate();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 224;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,11,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new GateIdListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_gateIdList);
					this.state = 219;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 220;
					this.match(QasmParser.Comma);
					this.state = 221;
					this.gate();
					}
					} 
				}
				this.state = 226;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,11,this._ctx);
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
		this.enterRule(_localctx, 40, QasmParser.RULE_gate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 227;
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
		let _startState: number = 42;
		this.enterRecursionRule(_localctx, 42, QasmParser.RULE_expList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 230;
			this.expression(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 237;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,12,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ExpListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_expList);
					this.state = 232;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 233;
					this.match(QasmParser.Comma);
					this.state = 234;
					this.expression(0);
					}
					} 
				}
				this.state = 239;
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
		let _startState: number = 44;
		this.enterRecursionRule(_localctx, 44, QasmParser.RULE_expression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 241;
			this.multiplicativeExpression(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 248;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,13,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ExpressionContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_expression);
					this.state = 243;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 244;
					this.match(QasmParser.Pow);
					this.state = 245;
					this.multiplicativeExpression(0);
					}
					} 
				}
				this.state = 250;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,13,this._ctx);
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
		let _startState: number = 46;
		this.enterRecursionRule(_localctx, 46, QasmParser.RULE_multiplicativeExpression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 252;
			this.additiveExpression(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 262;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,15,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					this.state = 260;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input,14,this._ctx) ) {
					case 1:
						{
						_localctx = new MultiplicativeExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_multiplicativeExpression);
						this.state = 254;
						if (!(this.precpred(this._ctx, 2))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						this.state = 255;
						this.match(QasmParser.Mult);
						this.state = 256;
						this.multiplicativeExpression(3);
						}
						break;

					case 2:
						{
						_localctx = new MultiplicativeExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_multiplicativeExpression);
						this.state = 257;
						if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
						this.state = 258;
						this.match(QasmParser.Div);
						this.state = 259;
						this.multiplicativeExpression(2);
						}
						break;
					}
					} 
				}
				this.state = 264;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,15,this._ctx);
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
		let _startState: number = 48;
		this.enterRecursionRule(_localctx, 48, QasmParser.RULE_additiveExpression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 266;
			this.prefixExpression();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 276;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,17,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					this.state = 274;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input,16,this._ctx) ) {
					case 1:
						{
						_localctx = new AdditiveExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_additiveExpression);
						this.state = 268;
						if (!(this.precpred(this._ctx, 2))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						this.state = 269;
						this.match(QasmParser.Sum);
						this.state = 270;
						this.additiveExpression(3);
						}
						break;

					case 2:
						{
						_localctx = new AdditiveExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_additiveExpression);
						this.state = 271;
						if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
						this.state = 272;
						this.match(QasmParser.Subs);
						this.state = 273;
						this.additiveExpression(2);
						}
						break;
					}
					} 
				}
				this.state = 278;
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
	@RuleVersion(0)
	public prefixExpression(): PrefixExpressionContext {
		let _localctx: PrefixExpressionContext = new PrefixExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, QasmParser.RULE_prefixExpression);
		try {
			this.state = 284;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Real:
			case QasmParser.Int:
			case QasmParser.LeftParen:
			case QasmParser.Pi:
			case QasmParser.Id:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 279;
				this.unary();
				}
				break;
			case QasmParser.Sum:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 280;
				this.match(QasmParser.Sum);
				this.state = 281;
				this.prefixExpression();
				}
				break;
			case QasmParser.Subs:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 282;
				this.match(QasmParser.Subs);
				this.state = 283;
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
		this.enterRule(_localctx, 52, QasmParser.RULE_unary);
		try {
			this.state = 299;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,19,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 286;
				this.match(QasmParser.Int);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 287;
				this.match(QasmParser.Real);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 288;
				this.match(QasmParser.Pi);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 289;
				this.match(QasmParser.Id);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 290;
				this.match(QasmParser.LeftParen);
				this.state = 291;
				this.expression(0);
				this.state = 292;
				this.match(QasmParser.RightParen);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 294;
				this.match(QasmParser.Id);
				this.state = 295;
				this.match(QasmParser.LeftParen);
				this.state = 296;
				this.expression(0);
				this.state = 297;
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
		let _startState: number = 54;
		this.enterRecursionRule(_localctx, 54, QasmParser.RULE_idList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 302;
			this.match(QasmParser.Id);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 309;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,20,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new IdListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_idList);
					this.state = 304;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 305;
					this.match(QasmParser.Comma);
					this.state = 306;
					this.match(QasmParser.Id);
					}
					} 
				}
				this.state = 311;
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

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 4:
			return this.library_sempred(_localctx as LibraryContext, predIndex);

		case 5:
			return this.program_sempred(_localctx as ProgramContext, predIndex);

		case 14:
			return this.bitList_sempred(_localctx as BitListContext, predIndex);

		case 17:
			return this.gateOpList_sempred(_localctx as GateOpListContext, predIndex);

		case 19:
			return this.gateIdList_sempred(_localctx as GateIdListContext, predIndex);

		case 21:
			return this.expList_sempred(_localctx as ExpListContext, predIndex);

		case 22:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);

		case 23:
			return this.multiplicativeExpression_sempred(_localctx as MultiplicativeExpressionContext, predIndex);

		case 24:
			return this.additiveExpression_sempred(_localctx as AdditiveExpressionContext, predIndex);

		case 27:
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
	private bitList_sempred(_localctx: BitListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private gateOpList_sempred(_localctx: GateOpListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 3:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private gateIdList_sempred(_localctx: GateIdListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 4:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expList_sempred(_localctx: ExpListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 5:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private multiplicativeExpression_sempred(_localctx: MultiplicativeExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 7:
			return this.precpred(this._ctx, 2);

		case 8:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private additiveExpression_sempred(_localctx: AdditiveExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 9:
			return this.precpred(this._ctx, 2);

		case 10:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private idList_sempred(_localctx: IdListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 11:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03$\u013B\x04\x02"+
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07"+
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04"+
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04"+
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04"+
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04"+
		"\x1D\t\x1D\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03"+
		"\x03\x05\x03C\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03"+
		"\x04\x05\x04L\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03"+
		"\x06\x03\x06\x03\x06\x07\x06W\n\x06\f\x06\x0E\x06Z\v\x06\x03\x07\x03\x07"+
		"\x03\x07\x03\x07\x03\x07\x07\x07a\n\x07\f\x07\x0E\x07d\v\x07\x03\b\x03"+
		"\b\x05\bh\n\b\x03\t\x03\t\x03\t\x05\tm\n\t\x03\n\x03\n\x03\v\x03\v\x03"+
		"\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03"+
		"\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E"+
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E"+
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\x98\n\x0E\x03"+
		"\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x07\x10\xA2"+
		"\n\x10\f\x10\x0E\x10\xA5\v\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12"+
		"\x03\x12\x03\x13\x03\x13\x05\x13\xAF\n\x13\x03\x13\x03\x13\x07\x13\xB3"+
		"\n\x13\f\x13\x0E\x13\xB6\v\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14"+
		"\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14"+
		"\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14"+
		"\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14"+
		"\x03\x14\x05\x14\xD9\n\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03"+
		"\x15\x07\x15\xE1\n\x15\f\x15\x0E\x15\xE4\v\x15\x03\x16\x03\x16\x03\x17"+
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x07\x17\xEE\n\x17\f\x17\x0E\x17"+
		"\xF1\v\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x07\x18\xF9"+
		"\n\x18\f\x18\x0E\x18\xFC\v\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19"+
		"\x03\x19\x03\x19\x03\x19\x03\x19\x07\x19\u0107\n\x19\f\x19\x0E\x19\u010A"+
		"\v\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A"+
		"\x03\x1A\x07\x1A\u0115\n\x1A\f\x1A\x0E\x1A\u0118\v\x1A\x03\x1B\x03\x1B"+
		"\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u011F\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03"+
		"\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03"+
		"\x1C\x05\x1C\u012E\n\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D"+
		"\x07\x1D\u0136\n\x1D\f\x1D\x0E\x1D\u0139\v\x1D\x03\x1D\x02\x02\f\n\f\x1E"+
		"$(,.028\x1E\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02"+
		"\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02"+
		"&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02\x02\x02\u013F\x02:"+
		"\x03\x02\x02\x02\x04B\x03\x02\x02\x02\x06K\x03\x02\x02\x02\bM\x03\x02"+
		"\x02\x02\nQ\x03\x02\x02\x02\f[\x03\x02\x02\x02\x0Eg\x03\x02\x02\x02\x10"+
		"l\x03\x02\x02\x02\x12n\x03\x02\x02\x02\x14p\x03\x02\x02\x02\x16r\x03\x02"+
		"\x02\x02\x18y\x03\x02\x02\x02\x1A\x97\x03\x02\x02\x02\x1C\x99\x03\x02"+
		"\x02\x02\x1E\x9B\x03\x02\x02\x02 \xA6\x03\x02\x02\x02\"\xA8\x03\x02\x02"+
		"\x02$\xAE\x03\x02\x02\x02&\xD8\x03\x02\x02\x02(\xDA\x03\x02\x02\x02*\xE5"+
		"\x03\x02\x02\x02,\xE7\x03\x02\x02\x02.\xF2\x03\x02\x02\x020\xFD\x03\x02"+
		"\x02\x022\u010B\x03\x02\x02\x024\u011E\x03\x02\x02\x026\u012D\x03\x02"+
		"\x02\x028\u012F\x03\x02\x02\x02:;\x05\x04\x03\x02;<\x07\x02\x02\x03<\x03"+
		"\x03\x02\x02\x02=C\x05\x06\x04\x02>?\x05\x06\x04\x02?@\x05\f\x07\x02@"+
		"C\x03\x02\x02\x02AC\x05\n\x06\x02B=\x03\x02\x02\x02B>\x03\x02\x02\x02"+
		"BA\x03\x02\x02\x02C\x05\x03\x02\x02\x02DE\x07\b\x02\x02EF\x07\x06\x02"+
		"\x02FG\x07\x14\x02\x02GL\x05\b\x05\x02HI\x07\b\x02\x02IJ\x07\x06\x02\x02"+
		"JL\x07\x14\x02\x02KD\x03\x02\x02\x02KH\x03\x02\x02\x02L\x07\x03\x02\x02"+
		"\x02MN\x07\t\x02\x02NO\x07\n\x02\x02OP\x07\x14\x02\x02P\t\x03\x02\x02"+
		"\x02QR\b\x06\x01\x02RS\x05\x10\t\x02SX\x03\x02\x02\x02TU\f\x03\x02\x02"+
		"UW\x05\x10\t\x02VT\x03\x02\x02\x02WZ\x03\x02\x02\x02XV\x03\x02\x02\x02"+
		"XY\x03\x02\x02\x02Y\v\x03\x02\x02\x02ZX\x03\x02\x02\x02[\\\b\x07\x01\x02"+
		"\\]\x05\x0E\b\x02]b\x03\x02\x02\x02^_\f\x03\x02\x02_a\x05\x0E\b\x02`^"+
		"\x03\x02\x02\x02ad\x03\x02\x02\x02b`\x03\x02\x02\x02bc\x03\x02\x02\x02"+
		"c\r\x03\x02\x02\x02db\x03\x02\x02\x02eh\x05\x10\t\x02fh\x05\x12\n\x02"+
		"ge\x03\x02\x02\x02gf\x03\x02\x02\x02h\x0F\x03\x02\x02\x02im\x05\x16\f"+
		"\x02jm\x05\x18\r\x02km\x05\x1A\x0E\x02li\x03\x02\x02\x02lj\x03\x02\x02"+
		"\x02lk\x03\x02\x02\x02m\x11\x03\x02\x02\x02no\x05\x14\v\x02o\x13\x03\x02"+
		"\x02\x02pq\x07\x03\x02\x02q\x15\x03\x02\x02\x02rs\x07\v\x02\x02st\x07"+
		"$\x02\x02tu\x07\x18\x02\x02uv\x07\x07\x02\x02vw\x07\x19\x02\x02wx\x07"+
		"\x14\x02\x02x\x17\x03\x02\x02\x02yz\x07\f\x02\x02z{\x07$\x02\x02{|\x07"+
		"\x18\x02\x02|}\x07\x07\x02\x02}~\x07\x19\x02\x02~\x7F\x07\x14\x02\x02"+
		"\x7F\x19\x03\x02\x02\x02\x80\x81\x07\"\x02\x02\x81\x82\x07#\x02\x02\x82"+
		"\x83\x05\x1C\x0F\x02\x83\x84\x05\x1E\x10\x02\x84\x85\x05\"\x12\x02\x85"+
		"\x98\x03\x02\x02\x02\x86\x87\x07\"\x02\x02\x87\x88\x07#\x02\x02\x88\x89"+
		"\x05\x1C\x0F\x02\x89\x8A\x07\x1A\x02\x02\x8A\x8B\x07\x1B\x02\x02\x8B\x8C"+
		"\x05\x1E\x10\x02\x8C\x8D\x05\"\x12\x02\x8D\x98\x03\x02\x02\x02\x8E\x8F"+
		"\x07\"\x02\x02\x8F\x90\x07#\x02\x02\x90\x91\x05\x1C\x0F\x02\x91\x92\x07"+
		"\x1A\x02\x02\x92\x93\x05(\x15\x02\x93\x94\x07\x1B\x02\x02\x94\x95\x05"+
		"\x1E\x10\x02\x95\x96\x05\"\x12\x02\x96\x98\x03\x02\x02\x02\x97\x80\x03"+
		"\x02\x02\x02\x97\x86\x03\x02\x02\x02\x97\x8E\x03\x02\x02\x02\x98\x1B\x03"+
		"\x02\x02\x02\x99\x9A\x03\x02\x02\x02\x9A\x1D\x03\x02\x02\x02\x9B\x9C\b"+
		"\x10\x01\x02\x9C\x9D\x05 \x11\x02\x9D\xA3\x03\x02\x02\x02\x9E\x9F\f\x03"+
		"\x02\x02\x9F\xA0\x07\x15\x02\x02\xA0\xA2\x05 \x11\x02\xA1\x9E\x03\x02"+
		"\x02\x02\xA2\xA5\x03\x02\x02\x02\xA3\xA1\x03\x02\x02\x02\xA3\xA4\x03\x02"+
		"\x02\x02\xA4\x1F\x03\x02\x02\x02\xA5\xA3\x03\x02\x02\x02\xA6\xA7\x07$"+
		"\x02\x02\xA7!\x03\x02\x02\x02\xA8\xA9\x07\x16\x02\x02\xA9\xAA\x05$\x13"+
		"\x02\xAA\xAB\x07\x17\x02\x02\xAB#\x03\x02\x02\x02\xAC\xAF\b\x13\x01\x02"+
		"\xAD\xAF\x05&\x14\x02\xAE\xAC\x03\x02\x02\x02\xAE\xAD\x03\x02\x02\x02"+
		"\xAF\xB4\x03\x02\x02\x02\xB0\xB1\f\x03\x02\x02\xB1\xB3\x05&\x14\x02\xB2"+
		"\xB0\x03\x02\x02\x02\xB3\xB6\x03\x02\x02\x02\xB4\xB2\x03\x02\x02\x02\xB4"+
		"\xB5\x03\x02\x02\x02\xB5%\x03\x02\x02\x02\xB6\xB4\x03\x02\x02\x02\xB7"+
		"\xB8\x07\r\x02\x02\xB8\xB9\x07\x1A\x02\x02\xB9\xBA\x05,\x17\x02\xBA\xBB"+
		"\x07\x1B\x02\x02\xBB\xBC\x07$\x02\x02\xBC\xBD\x07\x14\x02\x02\xBD\xD9"+
		"\x03\x02\x02\x02\xBE\xBF\x07\x0E\x02\x02\xBF\xC0\x07$\x02\x02\xC0\xC1"+
		"\x07\x15\x02\x02\xC1\xC2\x07$\x02\x02\xC2\xD9\x07\x14\x02\x02\xC3\xC4"+
		"\x07$\x02\x02\xC4\xC5\x058\x1D\x02\xC5\xC6\x07\x14\x02\x02\xC6\xD9\x03"+
		"\x02\x02\x02\xC7\xC8\x07$\x02\x02\xC8\xC9\x07\x1A\x02\x02\xC9\xCA\x07"+
		"\x1B\x02\x02\xCA\xCB\x058\x1D\x02\xCB\xCC\x07\x14\x02\x02\xCC\xD9\x03"+
		"\x02\x02\x02\xCD\xCE\x07$\x02\x02\xCE\xCF\x07\x1A\x02\x02\xCF\xD0\x05"+
		",\x17\x02\xD0\xD1\x07\x1B\x02\x02\xD1\xD2\x058\x1D\x02\xD2\xD3\x07\x14"+
		"\x02\x02\xD3\xD9\x03\x02\x02\x02\xD4\xD5\x07\x10\x02\x02\xD5\xD6\x058"+
		"\x1D\x02\xD6\xD7\x07\x14\x02\x02\xD7\xD9\x03\x02\x02\x02\xD8\xB7\x03\x02"+
		"\x02\x02\xD8\xBE\x03\x02\x02\x02\xD8\xC3\x03\x02\x02\x02\xD8\xC7\x03\x02"+
		"\x02\x02\xD8\xCD\x03\x02\x02\x02\xD8\xD4\x03\x02\x02\x02\xD9\'\x03\x02"+
		"\x02\x02\xDA\xDB\b\x15\x01\x02\xDB\xDC\x05*\x16\x02\xDC\xE2\x03\x02\x02"+
		"\x02\xDD\xDE\f\x03\x02\x02\xDE\xDF\x07\x15\x02\x02\xDF\xE1\x05*\x16\x02"+
		"\xE0\xDD\x03\x02\x02\x02\xE1\xE4\x03\x02\x02\x02\xE2\xE0\x03\x02\x02\x02"+
		"\xE2\xE3\x03\x02\x02\x02\xE3)\x03\x02\x02\x02\xE4\xE2\x03\x02\x02\x02"+
		"\xE5\xE6\x07$\x02\x02\xE6+\x03\x02\x02\x02\xE7\xE8\b\x17\x01\x02\xE8\xE9"+
		"\x05.\x18\x02\xE9\xEF\x03\x02\x02\x02\xEA\xEB\f\x03\x02\x02\xEB\xEC\x07"+
		"\x15\x02\x02\xEC\xEE\x05.\x18\x02\xED\xEA\x03\x02\x02\x02\xEE\xF1\x03"+
		"\x02\x02\x02\xEF\xED\x03\x02\x02\x02\xEF\xF0\x03\x02\x02\x02\xF0-\x03"+
		"\x02\x02\x02\xF1\xEF\x03\x02\x02\x02\xF2\xF3\b\x18\x01\x02\xF3\xF4\x05"+
		"0\x19\x02\xF4\xFA\x03\x02\x02\x02\xF5\xF6\f\x03\x02\x02\xF6\xF7\x07\x1C"+
		"\x02\x02\xF7\xF9\x050\x19\x02\xF8\xF5\x03\x02\x02\x02\xF9\xFC\x03\x02"+
		"\x02\x02\xFA\xF8\x03\x02\x02\x02\xFA\xFB\x03\x02\x02\x02\xFB/\x03\x02"+
		"\x02\x02\xFC\xFA\x03\x02\x02\x02\xFD\xFE\b\x19\x01\x02\xFE\xFF\x052\x1A"+
		"\x02\xFF\u0108\x03\x02\x02\x02\u0100\u0101\f\x04\x02\x02\u0101\u0102\x07"+
		"\x1D\x02\x02\u0102\u0107\x050\x19\x05\u0103\u0104\f\x03\x02\x02\u0104"+
		"\u0105\x07\x1E\x02\x02\u0105\u0107\x050\x19\x04\u0106\u0100\x03\x02\x02"+
		"\x02\u0106\u0103\x03\x02\x02\x02\u0107\u010A\x03\x02\x02\x02\u0108\u0106"+
		"\x03\x02\x02\x02\u0108\u0109\x03\x02\x02\x02\u01091\x03\x02\x02\x02\u010A"+
		"\u0108\x03\x02\x02\x02\u010B\u010C\b\x1A\x01\x02\u010C\u010D\x054\x1B"+
		"\x02\u010D\u0116\x03\x02\x02\x02\u010E\u010F\f\x04\x02\x02\u010F\u0110"+
		"\x07\x1F\x02\x02\u0110\u0115\x052\x1A\x05\u0111\u0112\f\x03\x02\x02\u0112"+
		"\u0113\x07 \x02\x02\u0113\u0115\x052\x1A\x04\u0114\u010E\x03\x02\x02\x02"+
		"\u0114\u0111\x03\x02\x02\x02\u0115\u0118\x03\x02\x02\x02\u0116\u0114\x03"+
		"\x02\x02\x02\u0116\u0117\x03\x02\x02\x02\u01173\x03\x02\x02\x02\u0118"+
		"\u0116\x03\x02\x02\x02\u0119\u011F\x056\x1C\x02\u011A\u011B\x07\x1F\x02"+
		"\x02\u011B\u011F\x054\x1B\x02\u011C\u011D\x07 \x02\x02\u011D\u011F\x05"+
		"4\x1B\x02\u011E\u0119\x03\x02\x02\x02\u011E\u011A\x03\x02\x02\x02\u011E"+
		"\u011C\x03\x02\x02\x02\u011F5\x03\x02\x02\x02\u0120\u012E\x07\x07\x02"+
		"\x02\u0121\u012E\x07\x06\x02\x02\u0122\u012E\x07!\x02\x02\u0123\u012E"+
		"\x07$\x02\x02\u0124\u0125\x07\x1A\x02\x02\u0125\u0126\x05.\x18\x02\u0126"+
		"\u0127\x07\x1B\x02\x02\u0127\u012E\x03\x02\x02\x02\u0128\u0129\x07$\x02"+
		"\x02\u0129\u012A\x07\x1A\x02\x02\u012A\u012B\x05.\x18\x02\u012B\u012C"+
		"\x07\x1B\x02\x02\u012C\u012E\x03\x02\x02\x02\u012D\u0120\x03\x02\x02\x02"+
		"\u012D\u0121\x03\x02\x02\x02\u012D\u0122\x03\x02\x02\x02\u012D\u0123\x03"+
		"\x02\x02\x02\u012D\u0124\x03\x02\x02\x02\u012D\u0128\x03\x02\x02\x02\u012E"+
		"7\x03\x02\x02\x02\u012F\u0130\b\x1D\x01\x02\u0130\u0131\x07$\x02\x02\u0131"+
		"\u0137\x03\x02\x02\x02\u0132\u0133\f\x03\x02\x02\u0133\u0134\x07\x15\x02"+
		"\x02\u0134\u0136\x07$\x02\x02\u0135\u0132\x03\x02\x02\x02\u0136\u0139"+
		"\x03\x02\x02\x02\u0137\u0135\x03\x02\x02\x02\u0137\u0138\x03\x02\x02\x02"+
		"\u01389\x03\x02\x02\x02\u0139\u0137\x03\x02\x02\x02\x17BKXbgl\x97\xA3"+
		"\xAE\xB4\xD8\xE2\xEF\xFA\u0106\u0108\u0114\u0116\u011E\u012D\u0137";
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
	public unitaryOperation(): UnitaryOperationContext {
		return this.getRuleContext(0, UnitaryOperationContext);
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


