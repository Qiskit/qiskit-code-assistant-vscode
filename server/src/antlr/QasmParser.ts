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
	public static readonly T__1=2;
	public static readonly Comment=3;
	public static readonly WhiteSpace=4;
	public static readonly Real=5;
	public static readonly Int=6;
	public static readonly IbmQasm=7;
	public static readonly Include=8;
	public static readonly Qelib=9;
	public static readonly Qreg=10;
	public static readonly Creg=11;
	public static readonly U=12;
	public static readonly Cx=13;
	public static readonly Measure=14;
	public static readonly Barrier=15;
	public static readonly Reset=16;
	public static readonly Opaque=17;
	public static readonly Assign=18;
	public static readonly Semi=19;
	public static readonly Comma=20;
	public static readonly LeftCurlyBrace=21;
	public static readonly RightCurlyBrace=22;
	public static readonly LeftBrace=23;
	public static readonly RightBrace=24;
	public static readonly LeftParen=25;
	public static readonly RightParen=26;
	public static readonly Gate=27;
	public static readonly GateId=28;
	public static readonly Id=29;
	public static readonly RULE_startProgram = 0;
	public static readonly RULE_mainProgram = 1;
	public static readonly RULE_ibmDefinition = 2;
	public static readonly RULE_include = 3;
	public static readonly RULE_library = 4;
	public static readonly RULE_program = 5;
	public static readonly RULE_statement = 6;
	public static readonly RULE_declaration = 7;
	public static readonly RULE_qoperation = 8;
	public static readonly RULE_qregDeclaration = 9;
	public static readonly RULE_cregDeclaration = 10;
	public static readonly RULE_gateDeclaration = 11;
	public static readonly RULE_gateScope = 12;
	public static readonly RULE_bitList = 13;
	public static readonly RULE_bit = 14;
	public static readonly RULE_gateBody = 15;
	public static readonly RULE_gateOpList = 16;
	public static readonly RULE_gateOp = 17;
	public static readonly RULE_gateIdList = 18;
	public static readonly RULE_gate = 19;
	public static readonly RULE_expList = 20;
	public static readonly RULE_expression = 21;
	public static readonly RULE_idList = 22;
	public static readonly ruleNames: string[] = [
		"startProgram", "mainProgram", "ibmDefinition", "include", "library", 
		"program", "statement", "declaration", "qoperation", "qregDeclaration", 
		"cregDeclaration", "gateDeclaration", "gateScope", "bitList", "bit", "gateBody", 
		"gateOpList", "gateOp", "gateIdList", "gate", "expList", "expression", 
		"idList"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, "'qoperation'", "'expression'", undefined, undefined, undefined, 
		undefined, undefined, "'include'", "'QELIB.INC'", "'qreg'", "'creg'", 
		"'U'", "'CX'", "'measure'", "'barrier'", "'reset'", "'opaque'", "'->'", 
		"';'", "','", "'{'", "'}'", "'['", "']'", "'('", "')'", "'gate'"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
		undefined, undefined, undefined, "Comment", "WhiteSpace", "Real", "Int", 
		"IbmQasm", "Include", "Qelib", "Qreg", "Creg", "U", "Cx", "Measure", "Barrier", 
		"Reset", "Opaque", "Assign", "Semi", "Comma", "LeftCurlyBrace", "RightCurlyBrace", 
		"LeftBrace", "RightBrace", "LeftParen", "RightParen", "Gate", "GateId", 
		"Id"
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
			this.state = 46;
			this.mainProgram();
			this.state = 47;
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
			this.state = 54;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,0,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 49;
				this.ibmDefinition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 50;
				this.ibmDefinition();
				this.state = 51;
				this.program(0);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 53;
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
			this.state = 63;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,1,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 56;
				this.match(QasmParser.IbmQasm);
				this.state = 57;
				this.match(QasmParser.Real);
				this.state = 58;
				this.match(QasmParser.Semi);
				this.state = 59;
				this.include();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 60;
				this.match(QasmParser.IbmQasm);
				this.state = 61;
				this.match(QasmParser.Real);
				this.state = 62;
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
			this.state = 65;
			this.match(QasmParser.Include);
			this.state = 66;
			this.match(QasmParser.Qelib);
			this.state = 67;
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
			this.state = 70;
			this.declaration();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 76;
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
					this.state = 72;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 73;
					this.declaration();
					}
					} 
				}
				this.state = 78;
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
			this.state = 80;
			this.statement();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 86;
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
					this.state = 82;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 83;
					this.statement();
					}
					} 
				}
				this.state = 88;
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
			this.state = 91;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Qreg:
			case QasmParser.Creg:
			case QasmParser.Gate:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 89;
				this.declaration();
				}
				break;
			case QasmParser.T__0:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 90;
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
			this.state = 96;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Qreg:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 93;
				this.qregDeclaration();
				}
				break;
			case QasmParser.Creg:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 94;
				this.cregDeclaration();
				}
				break;
			case QasmParser.Gate:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 95;
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
			this.state = 98;
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
		this.enterRule(_localctx, 18, QasmParser.RULE_qregDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 100;
			this.match(QasmParser.Qreg);
			this.state = 101;
			this.match(QasmParser.Id);
			this.state = 102;
			this.match(QasmParser.LeftBrace);
			this.state = 103;
			this.match(QasmParser.Int);
			this.state = 104;
			this.match(QasmParser.RightBrace);
			this.state = 105;
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
		this.enterRule(_localctx, 20, QasmParser.RULE_cregDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 107;
			this.match(QasmParser.Creg);
			this.state = 108;
			this.match(QasmParser.Id);
			this.state = 109;
			this.match(QasmParser.LeftBrace);
			this.state = 110;
			this.match(QasmParser.Int);
			this.state = 111;
			this.match(QasmParser.RightBrace);
			this.state = 112;
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
		this.enterRule(_localctx, 22, QasmParser.RULE_gateDeclaration);
		try {
			this.state = 137;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,6,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 114;
				this.match(QasmParser.Gate);
				this.state = 115;
				this.match(QasmParser.GateId);
				this.state = 116;
				this.gateScope();
				this.state = 117;
				this.bitList(0);
				this.state = 118;
				this.gateBody();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 120;
				this.match(QasmParser.Gate);
				this.state = 121;
				this.match(QasmParser.GateId);
				this.state = 122;
				this.gateScope();
				this.state = 123;
				this.match(QasmParser.LeftParen);
				this.state = 124;
				this.match(QasmParser.RightParen);
				this.state = 125;
				this.bitList(0);
				this.state = 126;
				this.gateBody();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 128;
				this.match(QasmParser.Gate);
				this.state = 129;
				this.match(QasmParser.GateId);
				this.state = 130;
				this.gateScope();
				this.state = 131;
				this.match(QasmParser.LeftParen);
				this.state = 132;
				this.gateIdList(0);
				this.state = 133;
				this.match(QasmParser.RightParen);
				this.state = 134;
				this.bitList(0);
				this.state = 135;
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
		this.enterRule(_localctx, 24, QasmParser.RULE_gateScope);
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
		let _startState: number = 26;
		this.enterRecursionRule(_localctx, 26, QasmParser.RULE_bitList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 142;
			this.bit();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 149;
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
					this.state = 144;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 145;
					this.match(QasmParser.Comma);
					this.state = 146;
					this.bit();
					}
					} 
				}
				this.state = 151;
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
		this.enterRule(_localctx, 28, QasmParser.RULE_bit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 152;
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
		this.enterRule(_localctx, 30, QasmParser.RULE_gateBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 154;
			this.match(QasmParser.LeftCurlyBrace);
			this.state = 155;
			this.gateOpList(0);
			this.state = 156;
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
		let _startState: number = 32;
		this.enterRecursionRule(_localctx, 32, QasmParser.RULE_gateOpList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 160;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,8,this._ctx) ) {
			case 1:
				{
				}
				break;

			case 2:
				{
				this.state = 159;
				this.gateOp();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 166;
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
					this.state = 162;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 163;
					this.gateOp();
					}
					} 
				}
				this.state = 168;
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
		this.enterRule(_localctx, 34, QasmParser.RULE_gateOp);
		try {
			this.state = 202;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,10,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 169;
				this.match(QasmParser.U);
				this.state = 170;
				this.match(QasmParser.LeftParen);
				this.state = 171;
				this.expList(0);
				this.state = 172;
				this.match(QasmParser.RightParen);
				this.state = 173;
				this.match(QasmParser.Id);
				this.state = 174;
				this.match(QasmParser.Semi);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 176;
				this.match(QasmParser.Cx);
				this.state = 177;
				this.match(QasmParser.Id);
				this.state = 178;
				this.match(QasmParser.Comma);
				this.state = 179;
				this.match(QasmParser.Id);
				this.state = 180;
				this.match(QasmParser.Semi);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 181;
				this.match(QasmParser.Id);
				this.state = 182;
				this.idList(0);
				this.state = 183;
				this.match(QasmParser.Semi);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 185;
				this.match(QasmParser.Id);
				this.state = 186;
				this.match(QasmParser.LeftParen);
				this.state = 187;
				this.match(QasmParser.RightParen);
				this.state = 188;
				this.idList(0);
				this.state = 189;
				this.match(QasmParser.Semi);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 191;
				this.match(QasmParser.Id);
				this.state = 192;
				this.match(QasmParser.LeftParen);
				this.state = 193;
				this.expList(0);
				this.state = 194;
				this.match(QasmParser.RightParen);
				this.state = 195;
				this.idList(0);
				this.state = 196;
				this.match(QasmParser.Semi);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 198;
				this.match(QasmParser.Barrier);
				this.state = 199;
				this.idList(0);
				this.state = 200;
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
		let _startState: number = 36;
		this.enterRecursionRule(_localctx, 36, QasmParser.RULE_gateIdList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 205;
			this.gate();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 212;
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
					this.state = 207;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 208;
					this.match(QasmParser.Comma);
					this.state = 209;
					this.gate();
					}
					} 
				}
				this.state = 214;
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
		this.enterRule(_localctx, 38, QasmParser.RULE_gate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 215;
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
		let _startState: number = 40;
		this.enterRecursionRule(_localctx, 40, QasmParser.RULE_expList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 218;
			this.expression();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 225;
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
					this.state = 220;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 221;
					this.match(QasmParser.Comma);
					this.state = 222;
					this.expression();
					}
					} 
				}
				this.state = 227;
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
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, QasmParser.RULE_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 228;
			this.match(QasmParser.T__1);
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
		let _startState: number = 44;
		this.enterRecursionRule(_localctx, 44, QasmParser.RULE_idList, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 231;
			this.match(QasmParser.Id);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 238;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,13,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new IdListContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_idList);
					this.state = 233;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 234;
					this.match(QasmParser.Comma);
					this.state = 235;
					this.match(QasmParser.Id);
					}
					} 
				}
				this.state = 240;
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

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 4:
			return this.library_sempred(_localctx as LibraryContext, predIndex);

		case 5:
			return this.program_sempred(_localctx as ProgramContext, predIndex);

		case 13:
			return this.bitList_sempred(_localctx as BitListContext, predIndex);

		case 16:
			return this.gateOpList_sempred(_localctx as GateOpListContext, predIndex);

		case 18:
			return this.gateIdList_sempred(_localctx as GateIdListContext, predIndex);

		case 20:
			return this.expList_sempred(_localctx as ExpListContext, predIndex);

		case 22:
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
	private idList_sempred(_localctx: IdListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03\x1F\xF4\x04\x02"+
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07"+
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04"+
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04"+
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04"+
		"\x18\t\x18\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03"+
		"\x03\x05\x039\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03"+
		"\x04\x05\x04B\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03"+
		"\x06\x03\x06\x03\x06\x07\x06M\n\x06\f\x06\x0E\x06P\v\x06\x03\x07\x03\x07"+
		"\x03\x07\x03\x07\x03\x07\x07\x07W\n\x07\f\x07\x0E\x07Z\v\x07\x03\b\x03"+
		"\b\x05\b^\n\b\x03\t\x03\t\x03\t\x05\tc\n\t\x03\n\x03\n\x03\v\x03\v\x03"+
		"\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03"+
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03"+
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\x8C"+
		"\n\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07"+
		"\x0F\x96\n\x0F\f\x0F\x0E\x0F\x99\v\x0F\x03\x10\x03\x10\x03\x11\x03\x11"+
		"\x03\x11\x03\x11\x03\x12\x03\x12\x05\x12\xA3\n\x12\x03\x12\x03\x12\x07"+
		"\x12\xA7\n\x12\f\x12\x0E\x12\xAA\v\x12\x03\x13\x03\x13\x03\x13\x03\x13"+
		"\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13"+
		"\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13"+
		"\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13"+
		"\x03\x13\x03\x13\x05\x13\xCD\n\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03"+
		"\x14\x03\x14\x07\x14\xD5\n\x14\f\x14\x0E\x14\xD8\v\x14\x03\x15\x03\x15"+
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x07\x16\xE2\n\x16\f\x16"+
		"\x0E\x16\xE5\v\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03"+
		"\x18\x03\x18\x07\x18\xEF\n\x18\f\x18\x0E\x18\xF2\v\x18\x03\x18\x02\x02"+
		"\t\n\f\x1C\"&*.\x19\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02"+
		"\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02"+
		"\"\x02$\x02&\x02(\x02*\x02,\x02.\x02\x02\x02\xF1\x020\x03\x02\x02\x02"+
		"\x048\x03\x02\x02\x02\x06A\x03\x02\x02\x02\bC\x03\x02\x02\x02\nG\x03\x02"+
		"\x02\x02\fQ\x03\x02\x02\x02\x0E]\x03\x02\x02\x02\x10b\x03\x02\x02\x02"+
		"\x12d\x03\x02\x02\x02\x14f\x03\x02\x02\x02\x16m\x03\x02\x02\x02\x18\x8B"+
		"\x03\x02\x02\x02\x1A\x8D\x03\x02\x02\x02\x1C\x8F\x03\x02\x02\x02\x1E\x9A"+
		"\x03\x02\x02\x02 \x9C\x03\x02\x02\x02\"\xA2\x03\x02\x02\x02$\xCC\x03\x02"+
		"\x02\x02&\xCE\x03\x02\x02\x02(\xD9\x03\x02\x02\x02*\xDB\x03\x02\x02\x02"+
		",\xE6\x03\x02\x02\x02.\xE8\x03\x02\x02\x0201\x05\x04\x03\x0212\x07\x02"+
		"\x02\x032\x03\x03\x02\x02\x0239\x05\x06\x04\x0245\x05\x06\x04\x0256\x05"+
		"\f\x07\x0269\x03\x02\x02\x0279\x05\n\x06\x0283\x03\x02\x02\x0284\x03\x02"+
		"\x02\x0287\x03\x02\x02\x029\x05\x03\x02\x02\x02:;\x07\t\x02\x02;<\x07"+
		"\x07\x02\x02<=\x07\x15\x02\x02=B\x05\b\x05\x02>?\x07\t\x02\x02?@\x07\x07"+
		"\x02\x02@B\x07\x15\x02\x02A:\x03\x02\x02\x02A>\x03\x02\x02\x02B\x07\x03"+
		"\x02\x02\x02CD\x07\n\x02\x02DE\x07\v\x02\x02EF\x07\x15\x02\x02F\t\x03"+
		"\x02\x02\x02GH\b\x06\x01\x02HI\x05\x10\t\x02IN\x03\x02\x02\x02JK\f\x03"+
		"\x02\x02KM\x05\x10\t\x02LJ\x03\x02\x02\x02MP\x03\x02\x02\x02NL\x03\x02"+
		"\x02\x02NO\x03\x02\x02\x02O\v\x03\x02\x02\x02PN\x03\x02\x02\x02QR\b\x07"+
		"\x01\x02RS\x05\x0E\b\x02SX\x03\x02\x02\x02TU\f\x03\x02\x02UW\x05\x0E\b"+
		"\x02VT\x03\x02\x02\x02WZ\x03\x02\x02\x02XV\x03\x02\x02\x02XY\x03\x02\x02"+
		"\x02Y\r\x03\x02\x02\x02ZX\x03\x02\x02\x02[^\x05\x10\t\x02\\^\x05\x12\n"+
		"\x02][\x03\x02\x02\x02]\\\x03\x02\x02\x02^\x0F\x03\x02\x02\x02_c\x05\x14"+
		"\v\x02`c\x05\x16\f\x02ac\x05\x18\r\x02b_\x03\x02\x02\x02b`\x03\x02\x02"+
		"\x02ba\x03\x02\x02\x02c\x11\x03\x02\x02\x02de\x07\x03\x02\x02e\x13\x03"+
		"\x02\x02\x02fg\x07\f\x02\x02gh\x07\x1F\x02\x02hi\x07\x19\x02\x02ij\x07"+
		"\b\x02\x02jk\x07\x1A\x02\x02kl\x07\x15\x02\x02l\x15\x03\x02\x02\x02mn"+
		"\x07\r\x02\x02no\x07\x1F\x02\x02op\x07\x19\x02\x02pq\x07\b\x02\x02qr\x07"+
		"\x1A\x02\x02rs\x07\x15\x02\x02s\x17\x03\x02\x02\x02tu\x07\x1D\x02\x02"+
		"uv\x07\x1E\x02\x02vw\x05\x1A\x0E\x02wx\x05\x1C\x0F\x02xy\x05 \x11\x02"+
		"y\x8C\x03\x02\x02\x02z{\x07\x1D\x02\x02{|\x07\x1E\x02\x02|}\x05\x1A\x0E"+
		"\x02}~\x07\x1B\x02\x02~\x7F\x07\x1C\x02\x02\x7F\x80\x05\x1C\x0F\x02\x80"+
		"\x81\x05 \x11\x02\x81\x8C\x03\x02\x02\x02\x82\x83\x07\x1D\x02\x02\x83"+
		"\x84\x07\x1E\x02\x02\x84\x85\x05\x1A\x0E\x02\x85\x86\x07\x1B\x02\x02\x86"+
		"\x87\x05&\x14\x02\x87\x88\x07\x1C\x02\x02\x88\x89\x05\x1C\x0F\x02\x89"+
		"\x8A\x05 \x11\x02\x8A\x8C\x03\x02\x02\x02\x8Bt\x03\x02\x02\x02\x8Bz\x03"+
		"\x02\x02\x02\x8B\x82\x03\x02\x02\x02\x8C\x19\x03\x02\x02\x02\x8D\x8E\x03"+
		"\x02\x02\x02\x8E\x1B\x03\x02\x02\x02\x8F\x90\b\x0F\x01\x02\x90\x91\x05"+
		"\x1E\x10\x02\x91\x97\x03\x02\x02\x02\x92\x93\f\x03\x02\x02\x93\x94\x07"+
		"\x16\x02\x02\x94\x96\x05\x1E\x10\x02\x95\x92\x03\x02\x02\x02\x96\x99\x03"+
		"\x02\x02\x02\x97\x95\x03\x02\x02\x02\x97\x98\x03\x02\x02\x02\x98\x1D\x03"+
		"\x02\x02\x02\x99\x97\x03\x02\x02\x02\x9A\x9B\x07\x1F\x02\x02\x9B\x1F\x03"+
		"\x02\x02\x02\x9C\x9D\x07\x17\x02\x02\x9D\x9E\x05\"\x12\x02\x9E\x9F\x07"+
		"\x18\x02\x02\x9F!\x03\x02\x02\x02\xA0\xA3\b\x12\x01\x02\xA1\xA3\x05$\x13"+
		"\x02\xA2\xA0\x03\x02\x02\x02\xA2\xA1\x03\x02\x02\x02\xA3\xA8\x03\x02\x02"+
		"\x02\xA4\xA5\f\x03\x02\x02\xA5\xA7\x05$\x13\x02\xA6\xA4\x03\x02\x02\x02"+
		"\xA7\xAA\x03\x02\x02\x02\xA8\xA6\x03\x02\x02\x02\xA8\xA9\x03\x02\x02\x02"+
		"\xA9#\x03\x02\x02\x02\xAA\xA8\x03\x02\x02\x02\xAB\xAC\x07\x0E\x02\x02"+
		"\xAC\xAD\x07\x1B\x02\x02\xAD\xAE\x05*\x16\x02\xAE\xAF\x07\x1C\x02\x02"+
		"\xAF\xB0\x07\x1F\x02\x02\xB0\xB1\x07\x15\x02\x02\xB1\xCD\x03\x02\x02\x02"+
		"\xB2\xB3\x07\x0F\x02\x02\xB3\xB4\x07\x1F\x02\x02\xB4\xB5\x07\x16\x02\x02"+
		"\xB5\xB6\x07\x1F\x02\x02\xB6\xCD\x07\x15\x02\x02\xB7\xB8\x07\x1F\x02\x02"+
		"\xB8\xB9\x05.\x18\x02\xB9\xBA\x07\x15\x02\x02\xBA\xCD\x03\x02\x02\x02"+
		"\xBB\xBC\x07\x1F\x02\x02\xBC\xBD\x07\x1B\x02\x02\xBD\xBE\x07\x1C\x02\x02"+
		"\xBE\xBF\x05.\x18\x02\xBF\xC0\x07\x15\x02\x02\xC0\xCD\x03\x02\x02\x02"+
		"\xC1\xC2\x07\x1F\x02\x02\xC2\xC3\x07\x1B\x02\x02\xC3\xC4\x05*\x16\x02"+
		"\xC4\xC5\x07\x1C\x02\x02\xC5\xC6\x05.\x18\x02\xC6\xC7\x07\x15\x02\x02"+
		"\xC7\xCD\x03\x02\x02\x02\xC8\xC9\x07\x11\x02\x02\xC9\xCA\x05.\x18\x02"+
		"\xCA\xCB\x07\x15\x02\x02\xCB\xCD\x03\x02\x02\x02\xCC\xAB\x03\x02\x02\x02"+
		"\xCC\xB2\x03\x02\x02\x02\xCC\xB7\x03\x02\x02\x02\xCC\xBB\x03\x02\x02\x02"+
		"\xCC\xC1\x03\x02\x02\x02\xCC\xC8\x03\x02\x02\x02\xCD%\x03\x02\x02\x02"+
		"\xCE\xCF\b\x14\x01\x02\xCF\xD0\x05(\x15\x02\xD0\xD6\x03\x02\x02\x02\xD1"+
		"\xD2\f\x03\x02\x02\xD2\xD3\x07\x16\x02\x02\xD3\xD5\x05(\x15\x02\xD4\xD1"+
		"\x03\x02\x02\x02\xD5\xD8\x03\x02\x02\x02\xD6\xD4\x03\x02\x02\x02\xD6\xD7"+
		"\x03\x02\x02\x02\xD7\'\x03\x02\x02\x02\xD8\xD6\x03\x02\x02\x02\xD9\xDA"+
		"\x07\x1F\x02\x02\xDA)\x03\x02\x02\x02\xDB\xDC\b\x16\x01\x02\xDC\xDD\x05"+
		",\x17\x02\xDD\xE3\x03\x02\x02\x02\xDE\xDF\f\x03\x02\x02\xDF\xE0\x07\x16"+
		"\x02\x02\xE0\xE2\x05,\x17\x02\xE1\xDE\x03\x02\x02\x02\xE2\xE5\x03\x02"+
		"\x02\x02\xE3\xE1\x03\x02\x02\x02\xE3\xE4\x03\x02\x02\x02\xE4+\x03\x02"+
		"\x02\x02\xE5\xE3\x03\x02\x02\x02\xE6\xE7\x07\x04\x02\x02\xE7-\x03\x02"+
		"\x02\x02\xE8\xE9\b\x18\x01\x02\xE9\xEA\x07\x1F\x02\x02\xEA\xF0\x03\x02"+
		"\x02\x02\xEB\xEC\f\x03\x02\x02\xEC\xED\x07\x16\x02\x02\xED\xEF\x07\x1F"+
		"\x02\x02\xEE\xEB\x03\x02\x02\x02\xEF\xF2\x03\x02\x02\x02\xF0\xEE\x03\x02"+
		"\x02\x02\xF0\xF1\x03\x02\x02\x02\xF1/\x03\x02\x02\x02\xF2\xF0\x03\x02"+
		"\x02\x02\x108ANX]b\x8B\x97\xA2\xA8\xCC\xD6\xE3\xF0";
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


