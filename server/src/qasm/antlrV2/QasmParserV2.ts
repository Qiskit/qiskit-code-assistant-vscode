// Generated from QasmParserV2.g4 by ANTLR 4.6-SNAPSHOT


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

import { QasmParserV2Listener } from './QasmParserV2Listener';
import { QasmParserV2Visitor } from './QasmParserV2Visitor';


export class QasmParserV2 extends Parser {
	public static readonly Comment=1;
	public static readonly WhiteSpace=2;
	public static readonly Real=3;
	public static readonly Int=4;
	public static readonly QasmDescriptor=5;
	public static readonly Include=6;
	public static readonly Qelib=7;
	public static readonly Qreg=8;
	public static readonly Creg=9;
	public static readonly Clean=10;
	public static readonly U=11;
	public static readonly Cx=12;
	public static readonly Sin=13;
	public static readonly Cos=14;
	public static readonly Tan=15;
	public static readonly Exp=16;
	public static readonly Ln=17;
	public static readonly Sqrt=18;
	public static readonly Measure=19;
	public static readonly Barrier=20;
	public static readonly Reset=21;
	public static readonly Opaque=22;
	public static readonly If=23;
	public static readonly Equals=24;
	public static readonly Assign=25;
	public static readonly Semi=26;
	public static readonly Comma=27;
	public static readonly LeftCurlyBrace=28;
	public static readonly RightCurlyBrace=29;
	public static readonly LeftBrace=30;
	public static readonly RightBrace=31;
	public static readonly LeftParen=32;
	public static readonly RightParen=33;
	public static readonly Pow=34;
	public static readonly Mult=35;
	public static readonly Div=36;
	public static readonly Sum=37;
	public static readonly Subs=38;
	public static readonly Pi=39;
	public static readonly Gate=40;
	public static readonly Library=41;
	public static readonly Id=42;
	public static readonly RULE_code = 0;
	public static readonly RULE_headers = 1;
	public static readonly RULE_includeLibrary = 2;
	public static readonly RULE_sentences = 3;
	public static readonly RULE_clean = 4;
	public static readonly RULE_sentence = 5;
	public static readonly RULE_definition = 6;
	public static readonly RULE_expression = 7;
	public static readonly RULE_conditional = 8;
	public static readonly RULE_qregDefinition = 9;
	public static readonly RULE_cregDefinition = 10;
	public static readonly RULE_dimension = 11;
	public static readonly RULE_gateDefinition = 12;
	public static readonly RULE_opaqueDefinition = 13;
	public static readonly RULE_gateDefinitionArguments = 14;
	public static readonly RULE_opaqueDefinitionArguments = 15;
	public static readonly RULE_paramsList = 16;
	public static readonly RULE_body = 17;
	public static readonly RULE_bodyExpression = 18;
	public static readonly RULE_paramsListBody = 19;
	public static readonly RULE_exp = 20;
	public static readonly RULE_unaryOp = 21;
	public static readonly RULE_measure = 22;
	public static readonly RULE_qubit = 23;
	public static readonly RULE_cbit = 24;
	public static readonly RULE_customArglist = 25;
	public static readonly RULE_paramsListNumber = 26;
	public static readonly RULE_qubitAndQregList = 27;
	public static readonly RULE_qbitOrQreg = 28;
	public static readonly RULE_cxGate = 29;
	public static readonly RULE_barrierGate = 30;
	public static readonly RULE_qubitList = 31;
	public static readonly RULE_resetGate = 32;
	public static readonly ruleNames: string[] = [
		"code", "headers", "includeLibrary", "sentences", "clean", "sentence", 
		"definition", "expression", "conditional", "qregDefinition", "cregDefinition", 
		"dimension", "gateDefinition", "opaqueDefinition", "gateDefinitionArguments", 
		"opaqueDefinitionArguments", "paramsList", "body", "bodyExpression", "paramsListBody", 
		"exp", "unaryOp", "measure", "qubit", "cbit", "customArglist", "paramsListNumber", 
		"qubitAndQregList", "qbitOrQreg", "cxGate", "barrierGate", "qubitList", 
		"resetGate"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, undefined, undefined, undefined, undefined, undefined, "'include'", 
		"'QELIB.INC'", "'qreg'", "'creg'", "'clean'", "'U'", "'CX'", "'sin'", 
		"'cos'", "'tan'", "'exp'", "'ln'", "'sqrt'", "'measure'", "'barrier'", 
		"'reset'", "'opaque'", "'if'", "'=='", "'->'", "';'", "','", "'{'", "'}'", 
		"'['", "']'", "'('", "')'", "'^'", "'*'", "'/'", "'+'", "'-'", "'pi'", 
		"'gate'"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
		undefined, "Comment", "WhiteSpace", "Real", "Int", "QasmDescriptor", "Include", 
		"Qelib", "Qreg", "Creg", "Clean", "U", "Cx", "Sin", "Cos", "Tan", "Exp", 
		"Ln", "Sqrt", "Measure", "Barrier", "Reset", "Opaque", "If", "Equals", 
		"Assign", "Semi", "Comma", "LeftCurlyBrace", "RightCurlyBrace", "LeftBrace", 
		"RightBrace", "LeftParen", "RightParen", "Pow", "Mult", "Div", "Sum", 
		"Subs", "Pi", "Gate", "Library", "Id"
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(QasmParserV2._LITERAL_NAMES, QasmParserV2._SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return QasmParserV2.VOCABULARY;
	}

	@Override
	public get grammarFileName(): string { return "QasmParserV2.g4"; }

	@Override
	public get ruleNames(): string[] { return QasmParserV2.ruleNames; }

	@Override
	public get serializedATN(): string { return QasmParserV2._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(QasmParserV2._ATN, this);
	}
	@RuleVersion(0)
	public code(): CodeContext {
		let _localctx: CodeContext = new CodeContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, QasmParserV2.RULE_code);
		try {
			this.state = 71;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.EOF:
			case QasmParserV2.Qreg:
			case QasmParserV2.Creg:
			case QasmParserV2.Cx:
			case QasmParserV2.Measure:
			case QasmParserV2.Barrier:
			case QasmParserV2.Reset:
			case QasmParserV2.Opaque:
			case QasmParserV2.If:
			case QasmParserV2.Gate:
			case QasmParserV2.Id:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 66;
				this.sentences();
				}
				break;
			case QasmParserV2.QasmDescriptor:
			case QasmParserV2.Include:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 67;
				this.headers();
				this.state = 68;
				this.sentences();
				}
				break;
			case QasmParserV2.Clean:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 70;
				this.clean();
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
	public headers(): HeadersContext {
		let _localctx: HeadersContext = new HeadersContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, QasmParserV2.RULE_headers);
		try {
			this.state = 77;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,1,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 73;
				this.match(QasmParserV2.QasmDescriptor);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 74;
				this.match(QasmParserV2.QasmDescriptor);
				this.state = 75;
				this.includeLibrary();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 76;
				this.includeLibrary();
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
	public includeLibrary(): IncludeLibraryContext {
		let _localctx: IncludeLibraryContext = new IncludeLibraryContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, QasmParserV2.RULE_includeLibrary);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 79;
			this.match(QasmParserV2.Include);
			this.state = 80;
			this.match(QasmParserV2.Library);
			this.state = 81;
			this.match(QasmParserV2.Semi);
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
	public sentences(): SentencesContext {
		let _localctx: SentencesContext = new SentencesContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, QasmParserV2.RULE_sentences);
		try {
			this.state = 87;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,2,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 83;
				this.sentence();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 84;
				this.sentence();
				this.state = 85;
				this.sentences();
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
	public clean(): CleanContext {
		let _localctx: CleanContext = new CleanContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, QasmParserV2.RULE_clean);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 89;
			this.match(QasmParserV2.Clean);
			this.state = 90;
			this.match(QasmParserV2.EOF);
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
	public sentence(): SentenceContext {
		let _localctx: SentenceContext = new SentenceContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, QasmParserV2.RULE_sentence);
		try {
			this.state = 98;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Qreg:
			case QasmParserV2.Creg:
			case QasmParserV2.Opaque:
			case QasmParserV2.Gate:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 92;
				this.definition();
				}
				break;
			case QasmParserV2.Cx:
			case QasmParserV2.Measure:
			case QasmParserV2.Barrier:
			case QasmParserV2.Reset:
			case QasmParserV2.Id:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 93;
				this.expression();
				}
				break;
			case QasmParserV2.If:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 94;
				this.conditional();
				this.state = 95;
				this.expression();
				}
				break;
			case QasmParserV2.EOF:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 97;
				this.match(QasmParserV2.EOF);
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
	public definition(): DefinitionContext {
		let _localctx: DefinitionContext = new DefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, QasmParserV2.RULE_definition);
		try {
			this.state = 106;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Qreg:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 100;
				this.qregDefinition();
				}
				break;
			case QasmParserV2.Creg:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 101;
				this.cregDefinition();
				}
				break;
			case QasmParserV2.Gate:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 102;
				this.gateDefinition();
				}
				break;
			case QasmParserV2.Opaque:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 103;
				this.opaqueDefinition();
				this.state = 104;
				this.match(QasmParserV2.Semi);
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
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, QasmParserV2.RULE_expression);
		try {
			this.state = 123;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Measure:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 108;
				this.measure();
				this.state = 109;
				this.match(QasmParserV2.Semi);
				}
				break;
			case QasmParserV2.Id:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 111;
				this.customArglist();
				this.state = 112;
				this.match(QasmParserV2.Semi);
				}
				break;
			case QasmParserV2.Cx:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 114;
				this.cxGate();
				this.state = 115;
				this.match(QasmParserV2.Semi);
				}
				break;
			case QasmParserV2.Barrier:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 117;
				this.barrierGate();
				this.state = 118;
				this.match(QasmParserV2.Semi);
				}
				break;
			case QasmParserV2.Reset:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 120;
				this.resetGate();
				this.state = 121;
				this.match(QasmParserV2.Semi);
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
	public conditional(): ConditionalContext {
		let _localctx: ConditionalContext = new ConditionalContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, QasmParserV2.RULE_conditional);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 125;
			this.match(QasmParserV2.If);
			this.state = 126;
			this.match(QasmParserV2.LeftParen);
			this.state = 127;
			this.match(QasmParserV2.Id);
			this.state = 128;
			this.match(QasmParserV2.Equals);
			this.state = 129;
			this.match(QasmParserV2.Int);
			this.state = 130;
			this.match(QasmParserV2.RightParen);
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
	public qregDefinition(): QregDefinitionContext {
		let _localctx: QregDefinitionContext = new QregDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, QasmParserV2.RULE_qregDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this.match(QasmParserV2.Qreg);
			this.state = 133;
			this.match(QasmParserV2.Id);
			this.state = 134;
			this.match(QasmParserV2.LeftBrace);
			this.state = 135;
			this.dimension();
			this.state = 136;
			this.match(QasmParserV2.RightBrace);
			this.state = 137;
			this.match(QasmParserV2.Semi);
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
	public cregDefinition(): CregDefinitionContext {
		let _localctx: CregDefinitionContext = new CregDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, QasmParserV2.RULE_cregDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 139;
			this.match(QasmParserV2.Creg);
			this.state = 140;
			this.match(QasmParserV2.Id);
			this.state = 141;
			this.match(QasmParserV2.LeftBrace);
			this.state = 142;
			this.dimension();
			this.state = 143;
			this.match(QasmParserV2.RightBrace);
			this.state = 144;
			this.match(QasmParserV2.Semi);
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
	public dimension(): DimensionContext {
		let _localctx: DimensionContext = new DimensionContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, QasmParserV2.RULE_dimension);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 146;
			this.match(QasmParserV2.Int);
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
	public gateDefinition(): GateDefinitionContext {
		let _localctx: GateDefinitionContext = new GateDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, QasmParserV2.RULE_gateDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 148;
			this.match(QasmParserV2.Gate);
			this.state = 149;
			this.match(QasmParserV2.Id);
			this.state = 150;
			this.gateDefinitionArguments();
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
	public opaqueDefinition(): OpaqueDefinitionContext {
		let _localctx: OpaqueDefinitionContext = new OpaqueDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, QasmParserV2.RULE_opaqueDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 152;
			this.match(QasmParserV2.Opaque);
			this.state = 153;
			this.match(QasmParserV2.Id);
			this.state = 154;
			this.opaqueDefinitionArguments();
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
	public gateDefinitionArguments(): GateDefinitionArgumentsContext {
		let _localctx: GateDefinitionArgumentsContext = new GateDefinitionArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, QasmParserV2.RULE_gateDefinitionArguments);
		try {
			this.state = 193;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,6,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 156;
				this.paramsList();
				this.state = 157;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 158;
				this.body();
				this.state = 159;
				this.match(QasmParserV2.RightCurlyBrace);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 161;
				this.match(QasmParserV2.LeftParen);
				this.state = 162;
				this.paramsList();
				this.state = 163;
				this.match(QasmParserV2.RightParen);
				this.state = 164;
				this.paramsList();
				this.state = 165;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 166;
				this.body();
				this.state = 167;
				this.match(QasmParserV2.RightCurlyBrace);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 169;
				this.match(QasmParserV2.LeftParen);
				this.state = 170;
				this.paramsList();
				this.state = 171;
				this.match(QasmParserV2.RightParen);
				this.state = 172;
				this.paramsList();
				this.state = 173;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 174;
				this.match(QasmParserV2.RightCurlyBrace);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 176;
				this.match(QasmParserV2.LeftParen);
				this.state = 177;
				this.match(QasmParserV2.RightParen);
				this.state = 178;
				this.paramsList();
				this.state = 179;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 180;
				this.match(QasmParserV2.RightCurlyBrace);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 182;
				this.match(QasmParserV2.LeftParen);
				this.state = 183;
				this.match(QasmParserV2.RightParen);
				this.state = 184;
				this.paramsList();
				this.state = 185;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 186;
				this.body();
				this.state = 187;
				this.match(QasmParserV2.RightCurlyBrace);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 189;
				this.paramsList();
				this.state = 190;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 191;
				this.match(QasmParserV2.RightCurlyBrace);
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
	public opaqueDefinitionArguments(): OpaqueDefinitionArgumentsContext {
		let _localctx: OpaqueDefinitionArgumentsContext = new OpaqueDefinitionArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, QasmParserV2.RULE_opaqueDefinitionArguments);
		try {
			this.state = 201;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Id:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 195;
				this.paramsList();
				}
				break;
			case QasmParserV2.LeftParen:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 196;
				this.match(QasmParserV2.LeftParen);
				this.state = 197;
				this.paramsList();
				this.state = 198;
				this.match(QasmParserV2.RightParen);
				this.state = 199;
				this.paramsList();
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
	public paramsList(): ParamsListContext {
		let _localctx: ParamsListContext = new ParamsListContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, QasmParserV2.RULE_paramsList);
		try {
			this.state = 207;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,8,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 203;
				this.match(QasmParserV2.Id);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 204;
				this.match(QasmParserV2.Id);
				this.state = 205;
				this.match(QasmParserV2.Comma);
				this.state = 206;
				this.paramsList();
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
	public body(): BodyContext {
		let _localctx: BodyContext = new BodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, QasmParserV2.RULE_body);
		try {
			this.state = 213;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,9,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 209;
				this.bodyExpression();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 210;
				this.bodyExpression();
				this.state = 211;
				this.body();
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
	public bodyExpression(): BodyExpressionContext {
		let _localctx: BodyExpressionContext = new BodyExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, QasmParserV2.RULE_bodyExpression);
		try {
			this.state = 237;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,10,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 215;
				this.match(QasmParserV2.Cx);
				this.state = 216;
				this.paramsList();
				this.state = 217;
				this.match(QasmParserV2.Semi);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 219;
				this.match(QasmParserV2.U);
				this.state = 220;
				this.match(QasmParserV2.LeftParen);
				this.state = 221;
				this.paramsListBody(0);
				this.state = 222;
				this.match(QasmParserV2.RightParen);
				this.state = 223;
				this.paramsList();
				this.state = 224;
				this.match(QasmParserV2.Semi);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 226;
				this.match(QasmParserV2.Id);
				this.state = 227;
				this.paramsList();
				this.state = 228;
				this.match(QasmParserV2.Semi);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 230;
				this.match(QasmParserV2.Id);
				this.state = 231;
				this.match(QasmParserV2.LeftParen);
				this.state = 232;
				this.paramsListBody(0);
				this.state = 233;
				this.match(QasmParserV2.RightParen);
				this.state = 234;
				this.paramsList();
				this.state = 235;
				this.match(QasmParserV2.Semi);
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

	public paramsListBody(): ParamsListBodyContext;
	public paramsListBody(_p: number): ParamsListBodyContext;
	@RuleVersion(0)
	public paramsListBody(_p?: number): ParamsListBodyContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ParamsListBodyContext = new ParamsListBodyContext(this._ctx, _parentState);
		let _prevctx: ParamsListBodyContext = _localctx;
		let _startState: number = 38;
		this.enterRecursionRule(_localctx, 38, QasmParserV2.RULE_paramsListBody, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 240;
			this.exp(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 247;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,11,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ParamsListBodyContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_paramsListBody);
					this.state = 242;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 243;
					this.match(QasmParserV2.Comma);
					this.state = 244;
					this.exp(0);
					}
					} 
				}
				this.state = 249;
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

	public exp(): ExpContext;
	public exp(_p: number): ExpContext;
	@RuleVersion(0)
	public exp(_p?: number): ExpContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpContext = new ExpContext(this._ctx, _parentState);
		let _prevctx: ExpContext = _localctx;
		let _startState: number = 40;
		this.enterRecursionRule(_localctx, 40, QasmParserV2.RULE_exp, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 266;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Int:
				{
				this.state = 251;
				this.match(QasmParserV2.Int);
				}
				break;
			case QasmParserV2.Real:
				{
				this.state = 252;
				this.match(QasmParserV2.Real);
				}
				break;
			case QasmParserV2.Pi:
				{
				this.state = 253;
				this.match(QasmParserV2.Pi);
				}
				break;
			case QasmParserV2.Id:
				{
				this.state = 254;
				this.match(QasmParserV2.Id);
				}
				break;
			case QasmParserV2.Sin:
			case QasmParserV2.Cos:
			case QasmParserV2.Tan:
			case QasmParserV2.Exp:
			case QasmParserV2.Ln:
			case QasmParserV2.Sqrt:
				{
				this.state = 255;
				this.unaryOp();
				this.state = 256;
				this.match(QasmParserV2.LeftParen);
				this.state = 257;
				this.exp(0);
				this.state = 258;
				this.match(QasmParserV2.RightParen);
				}
				break;
			case QasmParserV2.Subs:
				{
				this.state = 260;
				this.match(QasmParserV2.Subs);
				this.state = 261;
				this.exp(7);
				}
				break;
			case QasmParserV2.LeftParen:
				{
				this.state = 262;
				this.match(QasmParserV2.LeftParen);
				this.state = 263;
				this.exp(0);
				this.state = 264;
				this.match(QasmParserV2.RightParen);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 285;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,14,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					this.state = 283;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input,13,this._ctx) ) {
					case 1:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 268;
						if (!(this.precpred(this._ctx, 5))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 5)");
						this.state = 269;
						this.match(QasmParserV2.Sum);
						this.state = 270;
						this.exp(6);
						}
						break;

					case 2:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 271;
						if (!(this.precpred(this._ctx, 4))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 4)");
						this.state = 272;
						this.match(QasmParserV2.Subs);
						this.state = 273;
						this.exp(5);
						}
						break;

					case 3:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 274;
						if (!(this.precpred(this._ctx, 3))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 3)");
						this.state = 275;
						this.match(QasmParserV2.Mult);
						this.state = 276;
						this.exp(4);
						}
						break;

					case 4:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 277;
						if (!(this.precpred(this._ctx, 2))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						this.state = 278;
						this.match(QasmParserV2.Div);
						this.state = 279;
						this.exp(3);
						}
						break;

					case 5:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 280;
						if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
						this.state = 281;
						this.match(QasmParserV2.Pow);
						this.state = 282;
						this.exp(2);
						}
						break;
					}
					} 
				}
				this.state = 287;
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
	public unaryOp(): UnaryOpContext {
		let _localctx: UnaryOpContext = new UnaryOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, QasmParserV2.RULE_unaryOp);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 288;
			_la = this._input.LA(1);
			if ( !((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << QasmParserV2.Sin) | (1 << QasmParserV2.Cos) | (1 << QasmParserV2.Tan) | (1 << QasmParserV2.Exp) | (1 << QasmParserV2.Ln) | (1 << QasmParserV2.Sqrt))) !== 0)) ) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
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
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public measure(): MeasureContext {
		let _localctx: MeasureContext = new MeasureContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, QasmParserV2.RULE_measure);
		try {
			this.state = 299;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,15,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 290;
				this.match(QasmParserV2.Measure);
				this.state = 291;
				this.qubit();
				this.state = 292;
				this.match(QasmParserV2.Assign);
				this.state = 293;
				this.cbit();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 295;
				this.match(QasmParserV2.Measure);
				this.state = 296;
				_localctx._quantumRegister = this.match(QasmParserV2.Id);
				this.state = 297;
				this.match(QasmParserV2.Assign);
				this.state = 298;
				_localctx._classicalRegister = this.match(QasmParserV2.Id);
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
	public qubit(): QubitContext {
		let _localctx: QubitContext = new QubitContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, QasmParserV2.RULE_qubit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 301;
			this.match(QasmParserV2.Id);
			this.state = 302;
			this.match(QasmParserV2.LeftBrace);
			this.state = 303;
			_localctx._position = this.match(QasmParserV2.Int);
			this.state = 304;
			this.match(QasmParserV2.RightBrace);
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
	public cbit(): CbitContext {
		let _localctx: CbitContext = new CbitContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, QasmParserV2.RULE_cbit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 306;
			this.match(QasmParserV2.Id);
			this.state = 307;
			this.match(QasmParserV2.LeftBrace);
			this.state = 308;
			_localctx._position = this.match(QasmParserV2.Int);
			this.state = 309;
			this.match(QasmParserV2.RightBrace);
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
	public customArglist(): CustomArglistContext {
		let _localctx: CustomArglistContext = new CustomArglistContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, QasmParserV2.RULE_customArglist);
		try {
			this.state = 319;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,16,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 311;
				_localctx._gate = this.match(QasmParserV2.Id);
				this.state = 312;
				this.match(QasmParserV2.LeftParen);
				this.state = 313;
				this.paramsListNumber(0);
				this.state = 314;
				this.match(QasmParserV2.RightParen);
				this.state = 315;
				this.qubitAndQregList();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 317;
				_localctx._gate = this.match(QasmParserV2.Id);
				this.state = 318;
				this.qubitAndQregList();
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

	public paramsListNumber(): ParamsListNumberContext;
	public paramsListNumber(_p: number): ParamsListNumberContext;
	@RuleVersion(0)
	public paramsListNumber(_p?: number): ParamsListNumberContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ParamsListNumberContext = new ParamsListNumberContext(this._ctx, _parentState);
		let _prevctx: ParamsListNumberContext = _localctx;
		let _startState: number = 52;
		this.enterRecursionRule(_localctx, 52, QasmParserV2.RULE_paramsListNumber, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 322;
			this.exp(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 329;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,17,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ParamsListNumberContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_paramsListNumber);
					this.state = 324;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 325;
					this.match(QasmParserV2.Comma);
					this.state = 326;
					this.exp(0);
					}
					} 
				}
				this.state = 331;
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
	public qubitAndQregList(): QubitAndQregListContext {
		let _localctx: QubitAndQregListContext = new QubitAndQregListContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, QasmParserV2.RULE_qubitAndQregList);
		try {
			this.state = 337;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,18,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 332;
				this.qbitOrQreg();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 333;
				this.qbitOrQreg();
				this.state = 334;
				this.match(QasmParserV2.Comma);
				this.state = 335;
				this.qubitAndQregList();
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
	public qbitOrQreg(): QbitOrQregContext {
		let _localctx: QbitOrQregContext = new QbitOrQregContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, QasmParserV2.RULE_qbitOrQreg);
		try {
			this.state = 344;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,19,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 339;
				this.match(QasmParserV2.Id);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 340;
				this.match(QasmParserV2.Id);
				this.state = 341;
				this.match(QasmParserV2.LeftBrace);
				this.state = 342;
				_localctx._position = this.match(QasmParserV2.Int);
				this.state = 343;
				this.match(QasmParserV2.RightBrace);
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
	public cxGate(): CxGateContext {
		let _localctx: CxGateContext = new CxGateContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, QasmParserV2.RULE_cxGate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 346;
			this.match(QasmParserV2.Cx);
			this.state = 347;
			this.qubitAndQregList();
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
	public barrierGate(): BarrierGateContext {
		let _localctx: BarrierGateContext = new BarrierGateContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, QasmParserV2.RULE_barrierGate);
		try {
			this.state = 353;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,20,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 349;
				this.match(QasmParserV2.Barrier);
				this.state = 350;
				this.match(QasmParserV2.Id);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 351;
				this.match(QasmParserV2.Barrier);
				this.state = 352;
				this.qubitList();
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
	public qubitList(): QubitListContext {
		let _localctx: QubitListContext = new QubitListContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, QasmParserV2.RULE_qubitList);
		try {
			this.state = 360;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,21,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 355;
				this.qubit();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 356;
				this.qubit();
				this.state = 357;
				this.match(QasmParserV2.Comma);
				this.state = 358;
				this.qubitList();
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
	public resetGate(): ResetGateContext {
		let _localctx: ResetGateContext = new ResetGateContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, QasmParserV2.RULE_resetGate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 362;
			this.match(QasmParserV2.Reset);
			this.state = 363;
			this.qbitOrQreg();
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

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 19:
			return this.paramsListBody_sempred(_localctx as ParamsListBodyContext, predIndex);

		case 20:
			return this.exp_sempred(_localctx as ExpContext, predIndex);

		case 26:
			return this.paramsListNumber_sempred(_localctx as ParamsListNumberContext, predIndex);
		}
		return true;
	}
	private paramsListBody_sempred(_localctx: ParamsListBodyContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private exp_sempred(_localctx: ExpContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 5);

		case 2:
			return this.precpred(this._ctx, 4);

		case 3:
			return this.precpred(this._ctx, 3);

		case 4:
			return this.precpred(this._ctx, 2);

		case 5:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private paramsListNumber_sempred(_localctx: ParamsListNumberContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03,\u0170\x04\x02"+
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07"+
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04"+
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04"+
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04"+
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04"+
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x03\x02"+
		"\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02J\n\x02\x03\x03\x03\x03\x03\x03"+
		"\x03\x03\x05\x03P\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05"+
		"\x03\x05\x03\x05\x05\x05Z\n\x05\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07"+
		"\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07e\n\x07\x03\b\x03\b\x03\b\x03"+
		"\b\x03\b\x03\b\x05\bm\n\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03"+
		"\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x05\t~\n\t\x03\n\x03\n\x03"+
		"\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03"+
		"\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03"+
		"\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03"+
		"\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03"+
		"\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03"+
		"\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03"+
		"\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\xC4\n\x10"+
		"\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\xCC\n\x11\x03"+
		"\x12\x03\x12\x03\x12\x03\x12\x05\x12\xD2\n\x12\x03\x13\x03\x13\x03\x13"+
		"\x03\x13\x05\x13\xD8\n\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03"+
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03"+
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\xF0"+
		"\n\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x07\x15\xF8\n\x15"+
		"\f\x15\x0E\x15\xFB\v\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16"+
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16"+
		"\x03\x16\x05\x16\u010D\n\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03"+
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03"+
		"\x16\x07\x16\u011E\n\x16\f\x16\x0E\x16\u0121\v\x16\x03\x17\x03\x17\x03"+
		"\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x05"+
		"\x18\u012E\n\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x1A\x03\x1A"+
		"\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B"+
		"\x03\x1B\x03\x1B\x05\x1B\u0142\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03"+
		"\x1C\x03\x1C\x07\x1C\u014A\n\x1C\f\x1C\x0E\x1C\u014D\v\x1C\x03\x1D\x03"+
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u0154\n\x1D\x03\x1E\x03\x1E\x03\x1E"+
		"\x03\x1E\x03\x1E\x05\x1E\u015B\n\x1E\x03\x1F\x03\x1F\x03\x1F\x03 \x03"+
		" \x03 \x03 \x05 \u0164\n \x03!\x03!\x03!\x03!\x03!\x05!\u016B\n!\x03\""+
		"\x03\"\x03\"\x03\"\x02\x02\x05(*6#\x02\x02\x04\x02\x06\x02\b\x02\n\x02"+
		"\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02"+
		"\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x02"+
		"8\x02:\x02<\x02>\x02@\x02B\x02\x02\x03\x03\x02\x0F\x14\u017B\x02I\x03"+
		"\x02\x02\x02\x04O\x03\x02\x02\x02\x06Q\x03\x02\x02\x02\bY\x03\x02\x02"+
		"\x02\n[\x03\x02\x02\x02\fd\x03\x02\x02\x02\x0El\x03\x02\x02\x02\x10}\x03"+
		"\x02\x02\x02\x12\x7F\x03\x02\x02\x02\x14\x86\x03\x02\x02\x02\x16\x8D\x03"+
		"\x02\x02\x02\x18\x94\x03\x02\x02\x02\x1A\x96\x03\x02\x02\x02\x1C\x9A\x03"+
		"\x02\x02\x02\x1E\xC3\x03\x02\x02\x02 \xCB\x03\x02\x02\x02\"\xD1\x03\x02"+
		"\x02\x02$\xD7\x03\x02\x02\x02&\xEF\x03\x02\x02\x02(\xF1\x03\x02\x02\x02"+
		"*\u010C\x03\x02\x02\x02,\u0122\x03\x02\x02\x02.\u012D\x03\x02\x02\x02"+
		"0\u012F\x03\x02\x02\x022\u0134\x03\x02\x02\x024\u0141\x03\x02\x02\x02"+
		"6\u0143\x03\x02\x02\x028\u0153\x03\x02\x02\x02:\u015A\x03\x02\x02\x02"+
		"<\u015C\x03\x02\x02\x02>\u0163\x03\x02\x02\x02@\u016A\x03\x02\x02\x02"+
		"B\u016C\x03\x02\x02\x02DJ\x05\b\x05\x02EF\x05\x04\x03\x02FG\x05\b\x05"+
		"\x02GJ\x03\x02\x02\x02HJ\x05\n\x06\x02ID\x03\x02\x02\x02IE\x03\x02\x02"+
		"\x02IH\x03\x02\x02\x02J\x03\x03\x02\x02\x02KP\x07\x07\x02\x02LM\x07\x07"+
		"\x02\x02MP\x05\x06\x04\x02NP\x05\x06\x04\x02OK\x03\x02\x02\x02OL\x03\x02"+
		"\x02\x02ON\x03\x02\x02\x02P\x05\x03\x02\x02\x02QR\x07\b\x02\x02RS\x07"+
		"+\x02\x02ST\x07\x1C\x02\x02T\x07\x03\x02\x02\x02UZ\x05\f\x07\x02VW\x05"+
		"\f\x07\x02WX\x05\b\x05\x02XZ\x03\x02\x02\x02YU\x03\x02\x02\x02YV\x03\x02"+
		"\x02\x02Z\t\x03\x02\x02\x02[\\\x07\f\x02\x02\\]\x07\x02\x02\x03]\v\x03"+
		"\x02\x02\x02^e\x05\x0E\b\x02_e\x05\x10\t\x02`a\x05\x12\n\x02ab\x05\x10"+
		"\t\x02be\x03\x02\x02\x02ce\x07\x02\x02\x03d^\x03\x02\x02\x02d_\x03\x02"+
		"\x02\x02d`\x03\x02\x02\x02dc\x03\x02\x02\x02e\r\x03\x02\x02\x02fm\x05"+
		"\x14\v\x02gm\x05\x16\f\x02hm\x05\x1A\x0E\x02ij\x05\x1C\x0F\x02jk\x07\x1C"+
		"\x02\x02km\x03\x02\x02\x02lf\x03\x02\x02\x02lg\x03\x02\x02\x02lh\x03\x02"+
		"\x02\x02li\x03\x02\x02\x02m\x0F\x03\x02\x02\x02no\x05.\x18\x02op\x07\x1C"+
		"\x02\x02p~\x03\x02\x02\x02qr\x054\x1B\x02rs\x07\x1C\x02\x02s~\x03\x02"+
		"\x02\x02tu\x05<\x1F\x02uv\x07\x1C\x02\x02v~\x03\x02\x02\x02wx\x05> \x02"+
		"xy\x07\x1C\x02\x02y~\x03\x02\x02\x02z{\x05B\"\x02{|\x07\x1C\x02\x02|~"+
		"\x03\x02\x02\x02}n\x03\x02\x02\x02}q\x03\x02\x02\x02}t\x03\x02\x02\x02"+
		"}w\x03\x02\x02\x02}z\x03\x02\x02\x02~\x11\x03\x02\x02\x02\x7F\x80\x07"+
		"\x19\x02\x02\x80\x81\x07\"\x02\x02\x81\x82\x07,\x02\x02\x82\x83\x07\x1A"+
		"\x02\x02\x83\x84\x07\x06\x02\x02\x84\x85\x07#\x02\x02\x85\x13\x03\x02"+
		"\x02\x02\x86\x87\x07\n\x02\x02\x87\x88\x07,\x02\x02\x88\x89\x07 \x02\x02"+
		"\x89\x8A\x05\x18\r\x02\x8A\x8B\x07!\x02\x02\x8B\x8C\x07\x1C\x02\x02\x8C"+
		"\x15\x03\x02\x02\x02\x8D\x8E\x07\v\x02\x02\x8E\x8F\x07,\x02\x02\x8F\x90"+
		"\x07 \x02\x02\x90\x91\x05\x18\r\x02\x91\x92\x07!\x02\x02\x92\x93\x07\x1C"+
		"\x02\x02\x93\x17\x03\x02\x02\x02\x94\x95\x07\x06\x02\x02\x95\x19\x03\x02"+
		"\x02\x02\x96\x97\x07*\x02\x02\x97\x98\x07,\x02\x02\x98\x99\x05\x1E\x10"+
		"\x02\x99\x1B\x03\x02\x02\x02\x9A\x9B\x07\x18\x02\x02\x9B\x9C\x07,\x02"+
		"\x02\x9C\x9D\x05 \x11\x02\x9D\x1D\x03\x02\x02\x02\x9E\x9F\x05\"\x12\x02"+
		"\x9F\xA0\x07\x1E\x02\x02\xA0\xA1\x05$\x13\x02\xA1\xA2\x07\x1F\x02\x02"+
		"\xA2\xC4\x03\x02\x02\x02\xA3\xA4\x07\"\x02\x02\xA4\xA5\x05\"\x12\x02\xA5"+
		"\xA6\x07#\x02\x02\xA6\xA7\x05\"\x12\x02\xA7\xA8\x07\x1E\x02\x02\xA8\xA9"+
		"\x05$\x13\x02\xA9\xAA\x07\x1F\x02\x02\xAA\xC4\x03\x02\x02\x02\xAB\xAC"+
		"\x07\"\x02\x02\xAC\xAD\x05\"\x12\x02\xAD\xAE\x07#\x02\x02\xAE\xAF\x05"+
		"\"\x12\x02\xAF\xB0\x07\x1E\x02\x02\xB0\xB1\x07\x1F\x02\x02\xB1\xC4\x03"+
		"\x02\x02\x02\xB2\xB3\x07\"\x02\x02\xB3\xB4\x07#\x02\x02\xB4\xB5\x05\""+
		"\x12\x02\xB5\xB6\x07\x1E\x02\x02\xB6\xB7\x07\x1F\x02\x02\xB7\xC4\x03\x02"+
		"\x02\x02\xB8\xB9\x07\"\x02\x02\xB9\xBA\x07#\x02\x02\xBA\xBB\x05\"\x12"+
		"\x02\xBB\xBC\x07\x1E\x02\x02\xBC\xBD\x05$\x13\x02\xBD\xBE\x07\x1F\x02"+
		"\x02\xBE\xC4\x03\x02\x02\x02\xBF\xC0\x05\"\x12\x02\xC0\xC1\x07\x1E\x02"+
		"\x02\xC1\xC2\x07\x1F\x02\x02\xC2\xC4\x03\x02\x02\x02\xC3\x9E\x03\x02\x02"+
		"\x02\xC3\xA3\x03\x02\x02\x02\xC3\xAB\x03\x02\x02\x02\xC3\xB2\x03\x02\x02"+
		"\x02\xC3\xB8\x03\x02\x02\x02\xC3\xBF\x03\x02\x02\x02\xC4\x1F\x03\x02\x02"+
		"\x02\xC5\xCC\x05\"\x12\x02\xC6\xC7\x07\"\x02\x02\xC7\xC8\x05\"\x12\x02"+
		"\xC8\xC9\x07#\x02\x02\xC9\xCA\x05\"\x12\x02\xCA\xCC\x03\x02\x02\x02\xCB"+
		"\xC5\x03\x02\x02\x02\xCB\xC6\x03\x02\x02\x02\xCC!\x03\x02\x02\x02\xCD"+
		"\xD2\x07,\x02\x02\xCE\xCF\x07,\x02\x02\xCF\xD0\x07\x1D\x02\x02\xD0\xD2"+
		"\x05\"\x12\x02\xD1\xCD\x03\x02\x02\x02\xD1\xCE\x03\x02\x02\x02\xD2#\x03"+
		"\x02\x02\x02\xD3\xD8\x05&\x14\x02\xD4\xD5\x05&\x14\x02\xD5\xD6\x05$\x13"+
		"\x02\xD6\xD8\x03\x02\x02\x02\xD7\xD3\x03\x02\x02\x02\xD7\xD4\x03\x02\x02"+
		"\x02\xD8%\x03\x02\x02\x02\xD9\xDA\x07\x0E\x02\x02\xDA\xDB\x05\"\x12\x02"+
		"\xDB\xDC\x07\x1C\x02\x02\xDC\xF0\x03\x02\x02\x02\xDD\xDE\x07\r\x02\x02"+
		"\xDE\xDF\x07\"\x02\x02\xDF\xE0\x05(\x15\x02\xE0\xE1\x07#\x02\x02\xE1\xE2"+
		"\x05\"\x12\x02\xE2\xE3\x07\x1C\x02\x02\xE3\xF0\x03\x02\x02\x02\xE4\xE5"+
		"\x07,\x02\x02\xE5\xE6\x05\"\x12\x02\xE6\xE7\x07\x1C\x02\x02\xE7\xF0\x03"+
		"\x02\x02\x02\xE8\xE9\x07,\x02\x02\xE9\xEA\x07\"\x02\x02\xEA\xEB\x05(\x15"+
		"\x02\xEB\xEC\x07#\x02\x02\xEC\xED\x05\"\x12\x02\xED\xEE\x07\x1C\x02\x02"+
		"\xEE\xF0\x03\x02\x02\x02\xEF\xD9\x03\x02\x02\x02\xEF\xDD\x03\x02\x02\x02"+
		"\xEF\xE4\x03\x02\x02\x02\xEF\xE8\x03\x02\x02\x02\xF0\'\x03\x02\x02\x02"+
		"\xF1\xF2\b\x15\x01\x02\xF2\xF3\x05*\x16\x02\xF3\xF9\x03\x02\x02\x02\xF4"+
		"\xF5\f\x03\x02\x02\xF5\xF6\x07\x1D\x02\x02\xF6\xF8\x05*\x16\x02\xF7\xF4"+
		"\x03\x02\x02\x02\xF8\xFB\x03\x02\x02\x02\xF9\xF7\x03\x02\x02\x02\xF9\xFA"+
		"\x03\x02\x02\x02\xFA)\x03\x02\x02\x02\xFB\xF9\x03\x02\x02\x02\xFC\xFD"+
		"\b\x16\x01\x02\xFD\u010D\x07\x06\x02\x02\xFE\u010D\x07\x05\x02\x02\xFF"+
		"\u010D\x07)\x02\x02\u0100\u010D\x07,\x02\x02\u0101\u0102\x05,\x17\x02"+
		"\u0102\u0103\x07\"\x02\x02\u0103\u0104\x05*\x16\x02\u0104\u0105\x07#\x02"+
		"\x02\u0105\u010D\x03\x02\x02\x02\u0106\u0107\x07(\x02\x02\u0107\u010D"+
		"\x05*\x16\t\u0108\u0109\x07\"\x02\x02\u0109\u010A\x05*\x16\x02\u010A\u010B"+
		"\x07#\x02\x02\u010B\u010D\x03\x02\x02\x02\u010C\xFC\x03\x02\x02\x02\u010C"+
		"\xFE\x03\x02\x02\x02\u010C\xFF\x03\x02\x02\x02\u010C\u0100\x03\x02\x02"+
		"\x02\u010C\u0101\x03\x02\x02\x02\u010C\u0106\x03\x02\x02\x02\u010C\u0108"+
		"\x03\x02\x02\x02\u010D\u011F\x03\x02\x02\x02\u010E\u010F\f\x07\x02\x02"+
		"\u010F\u0110\x07\'\x02\x02\u0110\u011E\x05*\x16\b\u0111\u0112\f\x06\x02"+
		"\x02\u0112\u0113\x07(\x02\x02\u0113\u011E\x05*\x16\x07\u0114\u0115\f\x05"+
		"\x02\x02\u0115\u0116\x07%\x02\x02\u0116\u011E\x05*\x16\x06\u0117\u0118"+
		"\f\x04\x02\x02\u0118\u0119\x07&\x02\x02\u0119\u011E\x05*\x16\x05\u011A"+
		"\u011B\f\x03\x02\x02\u011B\u011C\x07$\x02\x02\u011C\u011E\x05*\x16\x04"+
		"\u011D\u010E\x03\x02\x02\x02\u011D\u0111\x03\x02\x02\x02\u011D\u0114\x03"+
		"\x02\x02\x02\u011D\u0117\x03\x02\x02\x02\u011D\u011A\x03\x02\x02\x02\u011E"+
		"\u0121\x03\x02\x02\x02\u011F\u011D\x03\x02\x02\x02\u011F\u0120\x03\x02"+
		"\x02\x02\u0120+\x03\x02\x02\x02\u0121\u011F\x03\x02\x02\x02\u0122\u0123"+
		"\t\x02\x02\x02\u0123-\x03\x02\x02\x02\u0124\u0125\x07\x15\x02\x02\u0125"+
		"\u0126\x050\x19\x02\u0126\u0127\x07\x1B\x02\x02\u0127\u0128\x052\x1A\x02"+
		"\u0128\u012E\x03\x02\x02\x02\u0129\u012A\x07\x15\x02\x02\u012A\u012B\x07"+
		",\x02\x02\u012B\u012C\x07\x1B\x02\x02\u012C\u012E\x07,\x02\x02\u012D\u0124"+
		"\x03\x02\x02\x02\u012D\u0129\x03\x02\x02\x02\u012E/\x03\x02\x02\x02\u012F"+
		"\u0130\x07,\x02\x02\u0130\u0131\x07 \x02\x02\u0131\u0132\x07\x06\x02\x02"+
		"\u0132\u0133\x07!\x02\x02\u01331\x03\x02\x02\x02\u0134\u0135\x07,\x02"+
		"\x02\u0135\u0136\x07 \x02\x02\u0136\u0137\x07\x06\x02\x02\u0137\u0138"+
		"\x07!\x02\x02\u01383\x03\x02\x02\x02\u0139\u013A\x07,\x02\x02\u013A\u013B"+
		"\x07\"\x02\x02\u013B\u013C\x056\x1C\x02\u013C\u013D\x07#\x02\x02\u013D"+
		"\u013E\x058\x1D\x02\u013E\u0142\x03\x02\x02\x02\u013F\u0140\x07,\x02\x02"+
		"\u0140\u0142\x058\x1D\x02\u0141\u0139\x03\x02\x02\x02\u0141\u013F\x03"+
		"\x02\x02\x02\u01425\x03\x02\x02\x02\u0143\u0144\b\x1C\x01\x02\u0144\u0145"+
		"\x05*\x16\x02\u0145\u014B\x03\x02\x02\x02\u0146\u0147\f\x03\x02\x02\u0147"+
		"\u0148\x07\x1D\x02\x02\u0148\u014A\x05*\x16\x02\u0149\u0146\x03\x02\x02"+
		"\x02\u014A\u014D\x03\x02\x02\x02\u014B\u0149\x03\x02\x02\x02\u014B\u014C"+
		"\x03\x02\x02\x02\u014C7\x03\x02\x02\x02\u014D\u014B\x03\x02\x02\x02\u014E"+
		"\u0154\x05:\x1E\x02\u014F\u0150\x05:\x1E\x02\u0150\u0151\x07\x1D\x02\x02"+
		"\u0151\u0152\x058\x1D\x02\u0152\u0154\x03\x02\x02\x02\u0153\u014E\x03"+
		"\x02\x02\x02\u0153\u014F\x03\x02\x02\x02\u01549\x03\x02\x02\x02\u0155"+
		"\u015B\x07,\x02\x02\u0156\u0157\x07,\x02\x02\u0157\u0158\x07 \x02\x02"+
		"\u0158\u0159\x07\x06\x02\x02\u0159\u015B\x07!\x02\x02\u015A\u0155\x03"+
		"\x02\x02\x02\u015A\u0156\x03\x02\x02\x02\u015B;\x03\x02\x02\x02\u015C"+
		"\u015D\x07\x0E\x02\x02\u015D\u015E\x058\x1D\x02\u015E=\x03\x02\x02\x02"+
		"\u015F\u0160\x07\x16\x02\x02\u0160\u0164\x07,\x02\x02\u0161\u0162\x07"+
		"\x16\x02\x02\u0162\u0164\x05@!\x02\u0163\u015F\x03\x02\x02\x02\u0163\u0161"+
		"\x03\x02\x02\x02\u0164?\x03\x02\x02\x02\u0165\u016B\x050\x19\x02\u0166"+
		"\u0167\x050\x19\x02\u0167\u0168\x07\x1D\x02\x02\u0168\u0169\x05@!\x02"+
		"\u0169\u016B\x03\x02\x02\x02\u016A\u0165\x03\x02\x02\x02\u016A\u0166\x03"+
		"\x02\x02\x02\u016BA\x03\x02\x02\x02\u016C\u016D\x07\x17\x02\x02\u016D"+
		"\u016E\x05:\x1E\x02\u016EC\x03\x02\x02\x02\x18IOYdl}\xC3\xCB\xD1\xD7\xEF"+
		"\xF9\u010C\u011D\u011F\u012D\u0141\u014B\u0153\u015A\u0163\u016A";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QasmParserV2.__ATN) {
			QasmParserV2.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(QasmParserV2._serializedATN));
		}

		return QasmParserV2.__ATN;
	}

}

export class CodeContext extends ParserRuleContext {
	public sentences(): SentencesContext | undefined {
		return this.tryGetRuleContext(0, SentencesContext);
	}
	public headers(): HeadersContext | undefined {
		return this.tryGetRuleContext(0, HeadersContext);
	}
	public clean(): CleanContext | undefined {
		return this.tryGetRuleContext(0, CleanContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_code; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterCode) listener.enterCode(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitCode) listener.exitCode(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitCode) return visitor.visitCode(this);
		else return visitor.visitChildren(this);
	}
}


export class HeadersContext extends ParserRuleContext {
	public QasmDescriptor(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.QasmDescriptor, 0); }
	public includeLibrary(): IncludeLibraryContext | undefined {
		return this.tryGetRuleContext(0, IncludeLibraryContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_headers; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterHeaders) listener.enterHeaders(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitHeaders) listener.exitHeaders(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitHeaders) return visitor.visitHeaders(this);
		else return visitor.visitChildren(this);
	}
}


export class IncludeLibraryContext extends ParserRuleContext {
	public Include(): TerminalNode { return this.getToken(QasmParserV2.Include, 0); }
	public Library(): TerminalNode { return this.getToken(QasmParserV2.Library, 0); }
	public Semi(): TerminalNode { return this.getToken(QasmParserV2.Semi, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_includeLibrary; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterIncludeLibrary) listener.enterIncludeLibrary(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitIncludeLibrary) listener.exitIncludeLibrary(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitIncludeLibrary) return visitor.visitIncludeLibrary(this);
		else return visitor.visitChildren(this);
	}
}


export class SentencesContext extends ParserRuleContext {
	public sentence(): SentenceContext {
		return this.getRuleContext(0, SentenceContext);
	}
	public sentences(): SentencesContext | undefined {
		return this.tryGetRuleContext(0, SentencesContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_sentences; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterSentences) listener.enterSentences(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitSentences) listener.exitSentences(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitSentences) return visitor.visitSentences(this);
		else return visitor.visitChildren(this);
	}
}


export class CleanContext extends ParserRuleContext {
	public Clean(): TerminalNode { return this.getToken(QasmParserV2.Clean, 0); }
	public EOF(): TerminalNode { return this.getToken(QasmParserV2.EOF, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_clean; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterClean) listener.enterClean(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitClean) listener.exitClean(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitClean) return visitor.visitClean(this);
		else return visitor.visitChildren(this);
	}
}


export class SentenceContext extends ParserRuleContext {
	public definition(): DefinitionContext | undefined {
		return this.tryGetRuleContext(0, DefinitionContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public conditional(): ConditionalContext | undefined {
		return this.tryGetRuleContext(0, ConditionalContext);
	}
	public EOF(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.EOF, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_sentence; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterSentence) listener.enterSentence(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitSentence) listener.exitSentence(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitSentence) return visitor.visitSentence(this);
		else return visitor.visitChildren(this);
	}
}


export class DefinitionContext extends ParserRuleContext {
	public qregDefinition(): QregDefinitionContext | undefined {
		return this.tryGetRuleContext(0, QregDefinitionContext);
	}
	public cregDefinition(): CregDefinitionContext | undefined {
		return this.tryGetRuleContext(0, CregDefinitionContext);
	}
	public gateDefinition(): GateDefinitionContext | undefined {
		return this.tryGetRuleContext(0, GateDefinitionContext);
	}
	public opaqueDefinition(): OpaqueDefinitionContext | undefined {
		return this.tryGetRuleContext(0, OpaqueDefinitionContext);
	}
	public Semi(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Semi, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_definition; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterDefinition) listener.enterDefinition(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitDefinition) listener.exitDefinition(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitDefinition) return visitor.visitDefinition(this);
		else return visitor.visitChildren(this);
	}
}


export class ExpressionContext extends ParserRuleContext {
	public measure(): MeasureContext | undefined {
		return this.tryGetRuleContext(0, MeasureContext);
	}
	public Semi(): TerminalNode { return this.getToken(QasmParserV2.Semi, 0); }
	public customArglist(): CustomArglistContext | undefined {
		return this.tryGetRuleContext(0, CustomArglistContext);
	}
	public cxGate(): CxGateContext | undefined {
		return this.tryGetRuleContext(0, CxGateContext);
	}
	public barrierGate(): BarrierGateContext | undefined {
		return this.tryGetRuleContext(0, BarrierGateContext);
	}
	public resetGate(): ResetGateContext | undefined {
		return this.tryGetRuleContext(0, ResetGateContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_expression; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterExpression) listener.enterExpression(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitExpression) listener.exitExpression(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitExpression) return visitor.visitExpression(this);
		else return visitor.visitChildren(this);
	}
}


export class ConditionalContext extends ParserRuleContext {
	public If(): TerminalNode { return this.getToken(QasmParserV2.If, 0); }
	public LeftParen(): TerminalNode { return this.getToken(QasmParserV2.LeftParen, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public Equals(): TerminalNode { return this.getToken(QasmParserV2.Equals, 0); }
	public Int(): TerminalNode { return this.getToken(QasmParserV2.Int, 0); }
	public RightParen(): TerminalNode { return this.getToken(QasmParserV2.RightParen, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_conditional; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterConditional) listener.enterConditional(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitConditional) listener.exitConditional(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitConditional) return visitor.visitConditional(this);
		else return visitor.visitChildren(this);
	}
}


export class QregDefinitionContext extends ParserRuleContext {
	public Qreg(): TerminalNode { return this.getToken(QasmParserV2.Qreg, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public LeftBrace(): TerminalNode { return this.getToken(QasmParserV2.LeftBrace, 0); }
	public dimension(): DimensionContext {
		return this.getRuleContext(0, DimensionContext);
	}
	public RightBrace(): TerminalNode { return this.getToken(QasmParserV2.RightBrace, 0); }
	public Semi(): TerminalNode { return this.getToken(QasmParserV2.Semi, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_qregDefinition; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterQregDefinition) listener.enterQregDefinition(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitQregDefinition) listener.exitQregDefinition(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitQregDefinition) return visitor.visitQregDefinition(this);
		else return visitor.visitChildren(this);
	}
}


export class CregDefinitionContext extends ParserRuleContext {
	public Creg(): TerminalNode { return this.getToken(QasmParserV2.Creg, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public LeftBrace(): TerminalNode { return this.getToken(QasmParserV2.LeftBrace, 0); }
	public dimension(): DimensionContext {
		return this.getRuleContext(0, DimensionContext);
	}
	public RightBrace(): TerminalNode { return this.getToken(QasmParserV2.RightBrace, 0); }
	public Semi(): TerminalNode { return this.getToken(QasmParserV2.Semi, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_cregDefinition; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterCregDefinition) listener.enterCregDefinition(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitCregDefinition) listener.exitCregDefinition(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitCregDefinition) return visitor.visitCregDefinition(this);
		else return visitor.visitChildren(this);
	}
}


export class DimensionContext extends ParserRuleContext {
	public Int(): TerminalNode { return this.getToken(QasmParserV2.Int, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_dimension; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterDimension) listener.enterDimension(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitDimension) listener.exitDimension(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitDimension) return visitor.visitDimension(this);
		else return visitor.visitChildren(this);
	}
}


export class GateDefinitionContext extends ParserRuleContext {
	public Gate(): TerminalNode { return this.getToken(QasmParserV2.Gate, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public gateDefinitionArguments(): GateDefinitionArgumentsContext {
		return this.getRuleContext(0, GateDefinitionArgumentsContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_gateDefinition; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterGateDefinition) listener.enterGateDefinition(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitGateDefinition) listener.exitGateDefinition(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitGateDefinition) return visitor.visitGateDefinition(this);
		else return visitor.visitChildren(this);
	}
}


export class OpaqueDefinitionContext extends ParserRuleContext {
	public Opaque(): TerminalNode { return this.getToken(QasmParserV2.Opaque, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public opaqueDefinitionArguments(): OpaqueDefinitionArgumentsContext {
		return this.getRuleContext(0, OpaqueDefinitionArgumentsContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_opaqueDefinition; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterOpaqueDefinition) listener.enterOpaqueDefinition(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitOpaqueDefinition) listener.exitOpaqueDefinition(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitOpaqueDefinition) return visitor.visitOpaqueDefinition(this);
		else return visitor.visitChildren(this);
	}
}


export class GateDefinitionArgumentsContext extends ParserRuleContext {
	public paramsList(): ParamsListContext[];
	public paramsList(i: number): ParamsListContext;
	public paramsList(i?: number): ParamsListContext | ParamsListContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamsListContext);
		} else {
			return this.getRuleContext(i, ParamsListContext);
		}
	}
	public LeftCurlyBrace(): TerminalNode { return this.getToken(QasmParserV2.LeftCurlyBrace, 0); }
	public body(): BodyContext | undefined {
		return this.tryGetRuleContext(0, BodyContext);
	}
	public RightCurlyBrace(): TerminalNode { return this.getToken(QasmParserV2.RightCurlyBrace, 0); }
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.LeftParen, 0); }
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.RightParen, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_gateDefinitionArguments; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterGateDefinitionArguments) listener.enterGateDefinitionArguments(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitGateDefinitionArguments) listener.exitGateDefinitionArguments(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitGateDefinitionArguments) return visitor.visitGateDefinitionArguments(this);
		else return visitor.visitChildren(this);
	}
}


export class OpaqueDefinitionArgumentsContext extends ParserRuleContext {
	public paramsList(): ParamsListContext[];
	public paramsList(i: number): ParamsListContext;
	public paramsList(i?: number): ParamsListContext | ParamsListContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamsListContext);
		} else {
			return this.getRuleContext(i, ParamsListContext);
		}
	}
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.LeftParen, 0); }
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.RightParen, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_opaqueDefinitionArguments; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterOpaqueDefinitionArguments) listener.enterOpaqueDefinitionArguments(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitOpaqueDefinitionArguments) listener.exitOpaqueDefinitionArguments(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitOpaqueDefinitionArguments) return visitor.visitOpaqueDefinitionArguments(this);
		else return visitor.visitChildren(this);
	}
}


export class ParamsListContext extends ParserRuleContext {
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Comma, 0); }
	public paramsList(): ParamsListContext | undefined {
		return this.tryGetRuleContext(0, ParamsListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_paramsList; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterParamsList) listener.enterParamsList(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitParamsList) listener.exitParamsList(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitParamsList) return visitor.visitParamsList(this);
		else return visitor.visitChildren(this);
	}
}


export class BodyContext extends ParserRuleContext {
	public bodyExpression(): BodyExpressionContext {
		return this.getRuleContext(0, BodyExpressionContext);
	}
	public body(): BodyContext | undefined {
		return this.tryGetRuleContext(0, BodyContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_body; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterBody) listener.enterBody(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitBody) listener.exitBody(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitBody) return visitor.visitBody(this);
		else return visitor.visitChildren(this);
	}
}


export class BodyExpressionContext extends ParserRuleContext {
	public Cx(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Cx, 0); }
	public paramsList(): ParamsListContext {
		return this.getRuleContext(0, ParamsListContext);
	}
	public Semi(): TerminalNode { return this.getToken(QasmParserV2.Semi, 0); }
	public U(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.U, 0); }
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.LeftParen, 0); }
	public paramsListBody(): ParamsListBodyContext | undefined {
		return this.tryGetRuleContext(0, ParamsListBodyContext);
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.RightParen, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Id, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_bodyExpression; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterBodyExpression) listener.enterBodyExpression(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitBodyExpression) listener.exitBodyExpression(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitBodyExpression) return visitor.visitBodyExpression(this);
		else return visitor.visitChildren(this);
	}
}


export class ParamsListBodyContext extends ParserRuleContext {
	public exp(): ExpContext {
		return this.getRuleContext(0, ExpContext);
	}
	public paramsListBody(): ParamsListBodyContext | undefined {
		return this.tryGetRuleContext(0, ParamsListBodyContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Comma, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_paramsListBody; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterParamsListBody) listener.enterParamsListBody(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitParamsListBody) listener.exitParamsListBody(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitParamsListBody) return visitor.visitParamsListBody(this);
		else return visitor.visitChildren(this);
	}
}


export class ExpContext extends ParserRuleContext {
	public Int(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Int, 0); }
	public Real(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Real, 0); }
	public Pi(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Pi, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Id, 0); }
	public unaryOp(): UnaryOpContext | undefined {
		return this.tryGetRuleContext(0, UnaryOpContext);
	}
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.LeftParen, 0); }
	public exp(): ExpContext[];
	public exp(i: number): ExpContext;
	public exp(i?: number): ExpContext | ExpContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpContext);
		} else {
			return this.getRuleContext(i, ExpContext);
		}
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.RightParen, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_exp; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterExp) listener.enterExp(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitExp) listener.exitExp(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitExp) return visitor.visitExp(this);
		else return visitor.visitChildren(this);
	}
}


export class UnaryOpContext extends ParserRuleContext {
	public Sin(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Sin, 0); }
	public Cos(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Cos, 0); }
	public Tan(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Tan, 0); }
	public Exp(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Exp, 0); }
	public Ln(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Ln, 0); }
	public Sqrt(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Sqrt, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_unaryOp; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterUnaryOp) listener.enterUnaryOp(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitUnaryOp) listener.exitUnaryOp(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitUnaryOp) return visitor.visitUnaryOp(this);
		else return visitor.visitChildren(this);
	}
}


export class MeasureContext extends ParserRuleContext {
	public _quantumRegister: Token;
	public _classicalRegister: Token;
	public Measure(): TerminalNode { return this.getToken(QasmParserV2.Measure, 0); }
	public qubit(): QubitContext | undefined {
		return this.tryGetRuleContext(0, QubitContext);
	}
	public Assign(): TerminalNode { return this.getToken(QasmParserV2.Assign, 0); }
	public cbit(): CbitContext | undefined {
		return this.tryGetRuleContext(0, CbitContext);
	}
	public Id(): TerminalNode[];
	public Id(i: number): TerminalNode;
	public Id(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QasmParserV2.Id);
		} else {
			return this.getToken(QasmParserV2.Id, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_measure; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterMeasure) listener.enterMeasure(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitMeasure) listener.exitMeasure(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitMeasure) return visitor.visitMeasure(this);
		else return visitor.visitChildren(this);
	}
}


export class QubitContext extends ParserRuleContext {
	public _position: Token;
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public LeftBrace(): TerminalNode { return this.getToken(QasmParserV2.LeftBrace, 0); }
	public RightBrace(): TerminalNode { return this.getToken(QasmParserV2.RightBrace, 0); }
	public Int(): TerminalNode { return this.getToken(QasmParserV2.Int, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_qubit; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterQubit) listener.enterQubit(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitQubit) listener.exitQubit(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitQubit) return visitor.visitQubit(this);
		else return visitor.visitChildren(this);
	}
}


export class CbitContext extends ParserRuleContext {
	public _position: Token;
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public LeftBrace(): TerminalNode { return this.getToken(QasmParserV2.LeftBrace, 0); }
	public RightBrace(): TerminalNode { return this.getToken(QasmParserV2.RightBrace, 0); }
	public Int(): TerminalNode { return this.getToken(QasmParserV2.Int, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_cbit; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterCbit) listener.enterCbit(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitCbit) listener.exitCbit(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitCbit) return visitor.visitCbit(this);
		else return visitor.visitChildren(this);
	}
}


export class CustomArglistContext extends ParserRuleContext {
	public _gate: Token;
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.LeftParen, 0); }
	public paramsListNumber(): ParamsListNumberContext | undefined {
		return this.tryGetRuleContext(0, ParamsListNumberContext);
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.RightParen, 0); }
	public qubitAndQregList(): QubitAndQregListContext {
		return this.getRuleContext(0, QubitAndQregListContext);
	}
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_customArglist; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterCustomArglist) listener.enterCustomArglist(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitCustomArglist) listener.exitCustomArglist(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitCustomArglist) return visitor.visitCustomArglist(this);
		else return visitor.visitChildren(this);
	}
}


export class ParamsListNumberContext extends ParserRuleContext {
	public exp(): ExpContext {
		return this.getRuleContext(0, ExpContext);
	}
	public paramsListNumber(): ParamsListNumberContext | undefined {
		return this.tryGetRuleContext(0, ParamsListNumberContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Comma, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_paramsListNumber; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterParamsListNumber) listener.enterParamsListNumber(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitParamsListNumber) listener.exitParamsListNumber(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitParamsListNumber) return visitor.visitParamsListNumber(this);
		else return visitor.visitChildren(this);
	}
}


export class QubitAndQregListContext extends ParserRuleContext {
	public qbitOrQreg(): QbitOrQregContext {
		return this.getRuleContext(0, QbitOrQregContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Comma, 0); }
	public qubitAndQregList(): QubitAndQregListContext | undefined {
		return this.tryGetRuleContext(0, QubitAndQregListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_qubitAndQregList; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterQubitAndQregList) listener.enterQubitAndQregList(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitQubitAndQregList) listener.exitQubitAndQregList(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitQubitAndQregList) return visitor.visitQubitAndQregList(this);
		else return visitor.visitChildren(this);
	}
}


export class QbitOrQregContext extends ParserRuleContext {
	public _position: Token;
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public LeftBrace(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.LeftBrace, 0); }
	public RightBrace(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.RightBrace, 0); }
	public Int(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Int, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_qbitOrQreg; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterQbitOrQreg) listener.enterQbitOrQreg(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitQbitOrQreg) listener.exitQbitOrQreg(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitQbitOrQreg) return visitor.visitQbitOrQreg(this);
		else return visitor.visitChildren(this);
	}
}


export class CxGateContext extends ParserRuleContext {
	public Cx(): TerminalNode { return this.getToken(QasmParserV2.Cx, 0); }
	public qubitAndQregList(): QubitAndQregListContext {
		return this.getRuleContext(0, QubitAndQregListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_cxGate; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterCxGate) listener.enterCxGate(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitCxGate) listener.exitCxGate(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitCxGate) return visitor.visitCxGate(this);
		else return visitor.visitChildren(this);
	}
}


export class BarrierGateContext extends ParserRuleContext {
	public Barrier(): TerminalNode { return this.getToken(QasmParserV2.Barrier, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Id, 0); }
	public qubitList(): QubitListContext | undefined {
		return this.tryGetRuleContext(0, QubitListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_barrierGate; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterBarrierGate) listener.enterBarrierGate(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitBarrierGate) listener.exitBarrierGate(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitBarrierGate) return visitor.visitBarrierGate(this);
		else return visitor.visitChildren(this);
	}
}


export class QubitListContext extends ParserRuleContext {
	public qubit(): QubitContext {
		return this.getRuleContext(0, QubitContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Comma, 0); }
	public qubitList(): QubitListContext | undefined {
		return this.tryGetRuleContext(0, QubitListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_qubitList; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterQubitList) listener.enterQubitList(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitQubitList) listener.exitQubitList(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitQubitList) return visitor.visitQubitList(this);
		else return visitor.visitChildren(this);
	}
}


export class ResetGateContext extends ParserRuleContext {
	public Reset(): TerminalNode { return this.getToken(QasmParserV2.Reset, 0); }
	public qbitOrQreg(): QbitOrQregContext {
		return this.getRuleContext(0, QbitOrQregContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_resetGate; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterResetGate) listener.enterResetGate(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitResetGate) listener.exitResetGate(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitResetGate) return visitor.visitResetGate(this);
		else return visitor.visitChildren(this);
	}
}


