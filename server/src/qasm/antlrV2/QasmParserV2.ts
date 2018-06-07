// Generated from QasmParserV2.g4 by ANTLR 4.6-SNAPSHOT


import { Register, SymbolsTable } from './utils';
import { QasmLexerV2 } from './QasmLexerV2';
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'; 
import { SymbolTable, BuiltInTypeSymbol } from '../../tools/symbolTable'; 
import { SymbolTableBuilder, VariableSymbol, RegisterSymbol } from '../compiler/symbolTable';
import fs = require('fs');
import path = require('path');


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
	public static readonly RULE_identifier = 11;
	public static readonly RULE_dimension = 12;
	public static readonly RULE_gateDefinition = 13;
	public static readonly RULE_opaqueDefinition = 14;
	public static readonly RULE_gateDefinitionArguments = 15;
	public static readonly RULE_opaqueDefinitionArguments = 16;
	public static readonly RULE_paramsList = 17;
	public static readonly RULE_body = 18;
	public static readonly RULE_bodyExpression = 19;
	public static readonly RULE_paramsListBody = 20;
	public static readonly RULE_exp = 21;
	public static readonly RULE_unaryOp = 22;
	public static readonly RULE_measure = 23;
	public static readonly RULE_qubit = 24;
	public static readonly RULE_cbit = 25;
	public static readonly RULE_customArglist = 26;
	public static readonly RULE_paramsListNumber = 27;
	public static readonly RULE_qubitAndQregList = 28;
	public static readonly RULE_qbitOrQreg = 29;
	public static readonly RULE_cxGate = 30;
	public static readonly RULE_barrierGate = 31;
	public static readonly RULE_qubitList = 32;
	public static readonly RULE_resetGate = 33;
	public static readonly ruleNames: string[] = [
		"code", "headers", "includeLibrary", "sentences", "clean", "sentence", 
		"definition", "expression", "conditional", "qregDefinition", "cregDefinition", 
		"identifier", "dimension", "gateDefinition", "opaqueDefinition", "gateDefinitionArguments", 
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


	    
	private symbolTable = SymbolTableBuilder.build();

	private verifyQregReference(id: Token, position?: Token) {
	    let variableSymbol = this.symbolTable.lookup(id.text);
	    if (variableSymbol) {
	        let qregSymbol = this.symbolTable.lookup('Qreg') as BuiltInTypeSymbol;
	        if (variableSymbol.type != qregSymbol) {
	            let message = `Wrong type at ${id.text}, expecting a ${qregSymbol.getName()}`;
	            this.notifyErrorListeners(message, id, null);
	        }

	        if (position) {
	            let register = variableSymbol as RegisterSymbol;
	            let selectedPosition = +position.text;
	            if (selectedPosition >= register.size) {
	                let message = `Index out of bound at register ${id.text}`;
	                this.notifyErrorListeners(message, position, null);
	            }
	        }
	    } else {
	        let message = `Qubit ${id.text} is not previously defined`;
	        this.notifyErrorListeners(message, id, null);
	    }
	}

	private verifyCregReference(id: Token, position?: Token) {
	    let variableSymbol = this.symbolTable.lookup(id.text);
	    if (variableSymbol) {
	        let cregSymbol = this.symbolTable.lookup('Creg') as BuiltInTypeSymbol;
	        if (variableSymbol.type != cregSymbol) {
	            let message = `Wrong type at ${id.text}, expecting a ${cregSymbol.getName()}`;
	            this.notifyErrorListeners(message, id, null);
	        }

	        if (position) {
	            let register = variableSymbol as RegisterSymbol;
	            let selectedPosition = +position.text;
	            if (selectedPosition >= register.size) {
	                let message = `Index out of bound at register ${id.text}`;
	                this.notifyErrorListeners(message, position, null);
	            }
	        }
	    } else {
	        let message = `Cbit ${id.text} is not previously defined`;
	        this.notifyErrorListeners(message, id, null);
	    }
	}

	private verifyMeasureInvocation(quantumRegister: Token, classicRegister: Token): void {
	    let qregSymbol = this.symbolTable.lookup(quantumRegister.text) as RegisterSymbol;
	    let cregSymbol = this.symbolTable.lookup(classicRegister.text) as RegisterSymbol;

	    if (qregSymbol && cregSymbol && qregSymbol.size > cregSymbol.size) {
	        let message = `The quatum register ${quantumRegister.text} cannot be mapped to a smaller classic register ${classicRegister.text}`;
	        this.notifyErrorListeners(message, quantumRegister, null);
	    }
	}

	private verifyGateInvocation(id: Token): void {
	    let gateSymbol = this.symbolTable.lookup(id.text);

	    if (gateSymbol == null) {
	        let message = `The symbol ${id.text} is not previously defined`;
	        this.notifyErrorListeners(message, id, null);
	    }
	}

	declaredVariables(): string[] {
	    return this.symbolTable.definedSymbols();
	}
	 
	getSymbolTable(): SymbolTable {
	    return this.symbolTable;
	}

	private buildQasmParser(input: string): QasmParserV2 {
	    let inputStream = new ANTLRInputStream(input);
	    let lexer = new QasmLexerV2(inputStream);
	    let tokenStream = new CommonTokenStream(lexer);
	    let parser = new QasmParserV2(tokenStream);

	    return parser;
	}

	private processLibrary(libraryName: string) {
	    let libraryPath = path.join(__dirname, '..', 'libs', libraryName);
	    let text = fs.readFileSync(libraryPath, 'utf8');
	    let parser = this.buildQasmParser(text);

	    parser.code();

	    this.symbolTable = parser.getSymbolTable();
	}


	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(QasmParserV2._ATN, this);
	}
	@RuleVersion(0)
	public code(): CodeContext {
		let _localctx: CodeContext = new CodeContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, QasmParserV2.RULE_code);
		try {
			this.state = 73;
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
				this.state = 68;
				this.sentences();
				}
				break;
			case QasmParserV2.QasmDescriptor:
			case QasmParserV2.Include:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 69;
				this.headers();
				this.state = 70;
				this.sentences();
				}
				break;
			case QasmParserV2.Clean:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 72;
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
			this.state = 79;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,1,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 75;
				this.match(QasmParserV2.QasmDescriptor);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 76;
				this.match(QasmParserV2.QasmDescriptor);
				this.state = 77;
				this.includeLibrary();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 78;
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
			this.state = 81;
			this.match(QasmParserV2.Include);
			this.state = 82;
			_localctx._Library = this.match(QasmParserV2.Library);
			this.state = 83;
			this.match(QasmParserV2.Semi);
			 this.processLibrary((_localctx._Library!=null?_localctx._Library.text:undefined)); 
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
			this.state = 90;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,2,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 86;
				this.sentence();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 87;
				this.sentence();
				this.state = 88;
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
			this.state = 92;
			this.match(QasmParserV2.Clean);
			this.state = 93;
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
			this.state = 101;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Qreg:
			case QasmParserV2.Creg:
			case QasmParserV2.Opaque:
			case QasmParserV2.Gate:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 95;
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
				this.state = 96;
				this.expression();
				}
				break;
			case QasmParserV2.If:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 97;
				this.conditional();
				this.state = 98;
				this.expression();
				}
				break;
			case QasmParserV2.EOF:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 100;
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
			this.state = 109;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Qreg:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 103;
				this.qregDefinition();
				}
				break;
			case QasmParserV2.Creg:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 104;
				this.cregDefinition();
				}
				break;
			case QasmParserV2.Gate:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 105;
				this.gateDefinition();
				}
				break;
			case QasmParserV2.Opaque:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 106;
				this.opaqueDefinition();
				this.state = 107;
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
			this.state = 126;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Measure:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 111;
				this.measure();
				this.state = 112;
				this.match(QasmParserV2.Semi);
				}
				break;
			case QasmParserV2.Id:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 114;
				this.customArglist();
				this.state = 115;
				this.match(QasmParserV2.Semi);
				}
				break;
			case QasmParserV2.Cx:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 117;
				this.cxGate();
				this.state = 118;
				this.match(QasmParserV2.Semi);
				}
				break;
			case QasmParserV2.Barrier:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 120;
				this.barrierGate();
				this.state = 121;
				this.match(QasmParserV2.Semi);
				}
				break;
			case QasmParserV2.Reset:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 123;
				this.resetGate();
				this.state = 124;
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
			this.state = 128;
			this.match(QasmParserV2.If);
			this.state = 129;
			this.match(QasmParserV2.LeftParen);
			this.state = 130;
			_localctx._Id = this.match(QasmParserV2.Id);
			 this.verifyCregReference(_localctx._Id); 
			this.state = 132;
			this.match(QasmParserV2.Equals);
			this.state = 133;
			this.match(QasmParserV2.Int);
			this.state = 134;
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
			this.state = 136;
			this.match(QasmParserV2.Qreg);
			this.state = 137;
			this.identifier();
			this.state = 138;
			this.match(QasmParserV2.LeftBrace);
			this.state = 139;
			this.dimension();
			this.state = 140;
			this.match(QasmParserV2.RightBrace);
			this.state = 141;
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
			this.state = 143;
			this.match(QasmParserV2.Creg);
			this.state = 144;
			this.identifier();
			this.state = 145;
			this.match(QasmParserV2.LeftBrace);
			this.state = 146;
			this.dimension();
			this.state = 147;
			this.match(QasmParserV2.RightBrace);
			this.state = 148;
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
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, QasmParserV2.RULE_identifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 150;
			this.match(QasmParserV2.Id);
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
		this.enterRule(_localctx, 24, QasmParserV2.RULE_dimension);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 152;
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
		this.enterRule(_localctx, 26, QasmParserV2.RULE_gateDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 154;
			this.match(QasmParserV2.Gate);
			this.state = 155;
			this.match(QasmParserV2.Id);
			this.state = 156;
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
		this.enterRule(_localctx, 28, QasmParserV2.RULE_opaqueDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 158;
			this.match(QasmParserV2.Opaque);
			this.state = 159;
			this.match(QasmParserV2.Id);
			this.state = 160;
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
		this.enterRule(_localctx, 30, QasmParserV2.RULE_gateDefinitionArguments);
		try {
			this.state = 199;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,6,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 162;
				this.paramsList();
				this.state = 163;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 164;
				this.body();
				this.state = 165;
				this.match(QasmParserV2.RightCurlyBrace);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 167;
				this.match(QasmParserV2.LeftParen);
				this.state = 168;
				this.paramsList();
				this.state = 169;
				this.match(QasmParserV2.RightParen);
				this.state = 170;
				this.paramsList();
				this.state = 171;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 172;
				this.body();
				this.state = 173;
				this.match(QasmParserV2.RightCurlyBrace);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 175;
				this.match(QasmParserV2.LeftParen);
				this.state = 176;
				this.paramsList();
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

			case 4:
				this.enterOuterAlt(_localctx, 4);
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
				this.match(QasmParserV2.RightCurlyBrace);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 188;
				this.match(QasmParserV2.LeftParen);
				this.state = 189;
				this.match(QasmParserV2.RightParen);
				this.state = 190;
				this.paramsList();
				this.state = 191;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 192;
				this.body();
				this.state = 193;
				this.match(QasmParserV2.RightCurlyBrace);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 195;
				this.paramsList();
				this.state = 196;
				this.match(QasmParserV2.LeftCurlyBrace);
				this.state = 197;
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
		this.enterRule(_localctx, 32, QasmParserV2.RULE_opaqueDefinitionArguments);
		try {
			this.state = 207;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Id:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 201;
				this.paramsList();
				}
				break;
			case QasmParserV2.LeftParen:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 202;
				this.match(QasmParserV2.LeftParen);
				this.state = 203;
				this.paramsList();
				this.state = 204;
				this.match(QasmParserV2.RightParen);
				this.state = 205;
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
		this.enterRule(_localctx, 34, QasmParserV2.RULE_paramsList);
		try {
			this.state = 213;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,8,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 209;
				this.match(QasmParserV2.Id);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 210;
				this.match(QasmParserV2.Id);
				this.state = 211;
				this.match(QasmParserV2.Comma);
				this.state = 212;
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
		this.enterRule(_localctx, 36, QasmParserV2.RULE_body);
		try {
			this.state = 219;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,9,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 215;
				this.bodyExpression();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 216;
				this.bodyExpression();
				this.state = 217;
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
		this.enterRule(_localctx, 38, QasmParserV2.RULE_bodyExpression);
		try {
			this.state = 243;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,10,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 221;
				this.match(QasmParserV2.Cx);
				this.state = 222;
				this.paramsList();
				this.state = 223;
				this.match(QasmParserV2.Semi);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 225;
				this.match(QasmParserV2.U);
				this.state = 226;
				this.match(QasmParserV2.LeftParen);
				this.state = 227;
				this.paramsListBody(0);
				this.state = 228;
				this.match(QasmParserV2.RightParen);
				this.state = 229;
				this.paramsList();
				this.state = 230;
				this.match(QasmParserV2.Semi);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 232;
				this.match(QasmParserV2.Id);
				this.state = 233;
				this.paramsList();
				this.state = 234;
				this.match(QasmParserV2.Semi);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 236;
				this.match(QasmParserV2.Id);
				this.state = 237;
				this.match(QasmParserV2.LeftParen);
				this.state = 238;
				this.paramsListBody(0);
				this.state = 239;
				this.match(QasmParserV2.RightParen);
				this.state = 240;
				this.paramsList();
				this.state = 241;
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
		let _startState: number = 40;
		this.enterRecursionRule(_localctx, 40, QasmParserV2.RULE_paramsListBody, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 246;
			this.exp(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 253;
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
					this.state = 248;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 249;
					this.match(QasmParserV2.Comma);
					this.state = 250;
					this.exp(0);
					}
					} 
				}
				this.state = 255;
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
		let _startState: number = 42;
		this.enterRecursionRule(_localctx, 42, QasmParserV2.RULE_exp, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 272;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParserV2.Int:
				{
				this.state = 257;
				this.match(QasmParserV2.Int);
				}
				break;
			case QasmParserV2.Real:
				{
				this.state = 258;
				this.match(QasmParserV2.Real);
				}
				break;
			case QasmParserV2.Pi:
				{
				this.state = 259;
				this.match(QasmParserV2.Pi);
				}
				break;
			case QasmParserV2.Id:
				{
				this.state = 260;
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
				this.state = 261;
				this.unaryOp();
				this.state = 262;
				this.match(QasmParserV2.LeftParen);
				this.state = 263;
				this.exp(0);
				this.state = 264;
				this.match(QasmParserV2.RightParen);
				}
				break;
			case QasmParserV2.Subs:
				{
				this.state = 266;
				this.match(QasmParserV2.Subs);
				this.state = 267;
				this.exp(7);
				}
				break;
			case QasmParserV2.LeftParen:
				{
				this.state = 268;
				this.match(QasmParserV2.LeftParen);
				this.state = 269;
				this.exp(0);
				this.state = 270;
				this.match(QasmParserV2.RightParen);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 291;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,14,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					this.state = 289;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input,13,this._ctx) ) {
					case 1:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 274;
						if (!(this.precpred(this._ctx, 5))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 5)");
						this.state = 275;
						this.match(QasmParserV2.Sum);
						this.state = 276;
						this.exp(6);
						}
						break;

					case 2:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 277;
						if (!(this.precpred(this._ctx, 4))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 4)");
						this.state = 278;
						this.match(QasmParserV2.Subs);
						this.state = 279;
						this.exp(5);
						}
						break;

					case 3:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 280;
						if (!(this.precpred(this._ctx, 3))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 3)");
						this.state = 281;
						this.match(QasmParserV2.Mult);
						this.state = 282;
						this.exp(4);
						}
						break;

					case 4:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 283;
						if (!(this.precpred(this._ctx, 2))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						this.state = 284;
						this.match(QasmParserV2.Div);
						this.state = 285;
						this.exp(3);
						}
						break;

					case 5:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParserV2.RULE_exp);
						this.state = 286;
						if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
						this.state = 287;
						this.match(QasmParserV2.Pow);
						this.state = 288;
						this.exp(2);
						}
						break;
					}
					} 
				}
				this.state = 293;
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
		this.enterRule(_localctx, 44, QasmParserV2.RULE_unaryOp);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 294;
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
		this.enterRule(_localctx, 46, QasmParserV2.RULE_measure);
		try {
			this.state = 307;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,15,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 296;
				this.match(QasmParserV2.Measure);
				this.state = 297;
				this.qubit();
				this.state = 298;
				this.match(QasmParserV2.Assign);
				this.state = 299;
				this.cbit();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 301;
				this.match(QasmParserV2.Measure);
				this.state = 302;
				_localctx._q = this.match(QasmParserV2.Id);
				 this.verifyQregReference(_localctx._q); 
				this.state = 304;
				this.match(QasmParserV2.Assign);
				this.state = 305;
				_localctx._c = this.match(QasmParserV2.Id);
				 
				        this.verifyCregReference(_localctx._c); 
				        this.verifyMeasureInvocation(_localctx._q, _localctx._c);
				    
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
		this.enterRule(_localctx, 48, QasmParserV2.RULE_qubit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 309;
			_localctx._Id = this.match(QasmParserV2.Id);
			this.state = 310;
			this.match(QasmParserV2.LeftBrace);
			this.state = 311;
			_localctx._position = this.match(QasmParserV2.Int);
			this.state = 312;
			this.match(QasmParserV2.RightBrace);
			 this.verifyQregReference(_localctx._Id, _localctx._position); 
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
		this.enterRule(_localctx, 50, QasmParserV2.RULE_cbit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 315;
			_localctx._Id = this.match(QasmParserV2.Id);
			this.state = 316;
			this.match(QasmParserV2.LeftBrace);
			this.state = 317;
			_localctx._position = this.match(QasmParserV2.Int);
			this.state = 318;
			this.match(QasmParserV2.RightBrace);
			 this.verifyCregReference(_localctx._Id, _localctx._position); 
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
		this.enterRule(_localctx, 52, QasmParserV2.RULE_customArglist);
		try {
			this.state = 332;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,16,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 321;
				_localctx._Id = this.match(QasmParserV2.Id);
				this.state = 322;
				this.match(QasmParserV2.LeftParen);
				this.state = 323;
				this.paramsListNumber(0);
				this.state = 324;
				this.match(QasmParserV2.RightParen);
				this.state = 325;
				this.qubitAndQregList();
				 this.verifyGateInvocation(_localctx._Id); 
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 328;
				_localctx._Id = this.match(QasmParserV2.Id);
				this.state = 329;
				this.qubitAndQregList();
				 this.verifyGateInvocation(_localctx._Id); 
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
		let _startState: number = 54;
		this.enterRecursionRule(_localctx, 54, QasmParserV2.RULE_paramsListNumber, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 335;
			this.exp(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 342;
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
					this.state = 337;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 338;
					this.match(QasmParserV2.Comma);
					this.state = 339;
					this.exp(0);
					}
					} 
				}
				this.state = 344;
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
		this.enterRule(_localctx, 56, QasmParserV2.RULE_qubitAndQregList);
		try {
			this.state = 350;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,18,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 345;
				this.qbitOrQreg();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 346;
				this.qbitOrQreg();
				this.state = 347;
				this.match(QasmParserV2.Comma);
				this.state = 348;
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
		this.enterRule(_localctx, 58, QasmParserV2.RULE_qbitOrQreg);
		try {
			this.state = 359;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,19,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 352;
				_localctx._Id = this.match(QasmParserV2.Id);
				 this.verifyQregReference(_localctx._Id); 
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 354;
				_localctx._Id = this.match(QasmParserV2.Id);
				this.state = 355;
				this.match(QasmParserV2.LeftBrace);
				this.state = 356;
				_localctx._position = this.match(QasmParserV2.Int);
				this.state = 357;
				this.match(QasmParserV2.RightBrace);
				 this.verifyQregReference(_localctx._Id, _localctx._position); 
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
		this.enterRule(_localctx, 60, QasmParserV2.RULE_cxGate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 361;
			this.match(QasmParserV2.Cx);
			this.state = 362;
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
		this.enterRule(_localctx, 62, QasmParserV2.RULE_barrierGate);
		try {
			this.state = 369;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,20,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 364;
				this.match(QasmParserV2.Barrier);
				this.state = 365;
				_localctx._Id = this.match(QasmParserV2.Id);
				 this.verifyQregReference(_localctx._Id); 
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 367;
				this.match(QasmParserV2.Barrier);
				this.state = 368;
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
		this.enterRule(_localctx, 64, QasmParserV2.RULE_qubitList);
		try {
			this.state = 376;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,21,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 371;
				this.qubit();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 372;
				this.qubit();
				this.state = 373;
				this.match(QasmParserV2.Comma);
				this.state = 374;
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
		this.enterRule(_localctx, 66, QasmParserV2.RULE_resetGate);
		try {
			this.state = 383;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,22,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 378;
				this.match(QasmParserV2.Reset);
				this.state = 379;
				_localctx._Id = this.match(QasmParserV2.Id);
				 this.verifyQregReference(_localctx._Id); 
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 381;
				this.match(QasmParserV2.Reset);
				this.state = 382;
				this.qubit();
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

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 20:
			return this.paramsListBody_sempred(_localctx as ParamsListBodyContext, predIndex);

		case 21:
			return this.exp_sempred(_localctx as ExpContext, predIndex);

		case 27:
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
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03,\u0184\x04\x02"+
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07"+
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04"+
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04"+
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04"+
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04"+
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#"+
		"\t#\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02L\n\x02\x03\x03\x03"+
		"\x03\x03\x03\x03\x03\x05\x03R\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03"+
		"\x04\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05]\n\x05\x03\x06\x03\x06\x03"+
		"\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07h\n\x07\x03"+
		"\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\bp\n\b\x03\t\x03\t\x03\t\x03\t\x03"+
		"\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x05\t\x81"+
		"\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v"+
		"\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03"+
		"\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10"+
		"\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11"+
		"\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11"+
		"\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11"+
		"\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11"+
		"\x03\x11\x03\x11\x03\x11\x05\x11\xCA\n\x11\x03\x12\x03\x12\x03\x12\x03"+
		"\x12\x03\x12\x03\x12\x05\x12\xD2\n\x12\x03\x13\x03\x13\x03\x13\x03\x13"+
		"\x05\x13\xD8\n\x13\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\xDE\n\x14\x03"+
		"\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03"+
		"\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03"+
		"\x15\x03\x15\x03\x15\x03\x15\x05\x15\xF6\n\x15\x03\x16\x03\x16\x03\x16"+
		"\x03\x16\x03\x16\x03\x16\x07\x16\xFE\n\x16\f\x16\x0E\x16\u0101\v\x16\x03"+
		"\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03"+
		"\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x05\x17\u0113\n\x17"+
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17"+
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x07\x17\u0124\n\x17\f"+
		"\x17\x0E\x17\u0127\v\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03\x19"+
		"\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x05\x19\u0136"+
		"\n\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B"+
		"\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C"+
		"\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u014F\n\x1C\x03"+
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u0157\n\x1D\f\x1D"+
		"\x0E\x1D\u015A\v\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u0161"+
		"\n\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F"+
		"\u016A\n\x1F\x03 \x03 \x03 \x03!\x03!\x03!\x03!\x03!\x05!\u0174\n!\x03"+
		"\"\x03\"\x03\"\x03\"\x03\"\x05\"\u017B\n\"\x03#\x03#\x03#\x03#\x03#\x05"+
		"#\u0182\n#\x03#\x02\x02\x05*,8$\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f"+
		"\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E"+
		"\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02"+
		":\x02<\x02>\x02@\x02B\x02D\x02\x02\x03\x03\x02\x0F\x14\u018F\x02K\x03"+
		"\x02\x02\x02\x04Q\x03\x02\x02\x02\x06S\x03\x02\x02\x02\b\\\x03\x02\x02"+
		"\x02\n^\x03\x02\x02\x02\fg\x03\x02\x02\x02\x0Eo\x03\x02\x02\x02\x10\x80"+
		"\x03\x02\x02\x02\x12\x82\x03\x02\x02\x02\x14\x8A\x03\x02\x02\x02\x16\x91"+
		"\x03\x02\x02\x02\x18\x98\x03\x02\x02\x02\x1A\x9A\x03\x02\x02\x02\x1C\x9C"+
		"\x03\x02\x02\x02\x1E\xA0\x03\x02\x02\x02 \xC9\x03\x02\x02\x02\"\xD1\x03"+
		"\x02\x02\x02$\xD7\x03\x02\x02\x02&\xDD\x03\x02\x02\x02(\xF5\x03\x02\x02"+
		"\x02*\xF7\x03\x02\x02\x02,\u0112\x03\x02\x02\x02.\u0128\x03\x02\x02\x02"+
		"0\u0135\x03\x02\x02\x022\u0137\x03\x02\x02\x024\u013D\x03\x02\x02\x02"+
		"6\u014E\x03\x02\x02\x028\u0150\x03\x02\x02\x02:\u0160\x03\x02\x02\x02"+
		"<\u0169\x03\x02\x02\x02>\u016B\x03\x02\x02\x02@\u0173\x03\x02\x02\x02"+
		"B\u017A\x03\x02\x02\x02D\u0181\x03\x02\x02\x02FL\x05\b\x05\x02GH\x05\x04"+
		"\x03\x02HI\x05\b\x05\x02IL\x03\x02\x02\x02JL\x05\n\x06\x02KF\x03\x02\x02"+
		"\x02KG\x03\x02\x02\x02KJ\x03\x02\x02\x02L\x03\x03\x02\x02\x02MR\x07\x07"+
		"\x02\x02NO\x07\x07\x02\x02OR\x05\x06\x04\x02PR\x05\x06\x04\x02QM\x03\x02"+
		"\x02\x02QN\x03\x02\x02\x02QP\x03\x02\x02\x02R\x05\x03\x02\x02\x02ST\x07"+
		"\b\x02\x02TU\x07+\x02\x02UV\x07\x1C\x02\x02VW\b\x04\x01\x02W\x07\x03\x02"+
		"\x02\x02X]\x05\f\x07\x02YZ\x05\f\x07\x02Z[\x05\b\x05\x02[]\x03\x02\x02"+
		"\x02\\X\x03\x02\x02\x02\\Y\x03\x02\x02\x02]\t\x03\x02\x02\x02^_\x07\f"+
		"\x02\x02_`\x07\x02\x02\x03`\v\x03\x02\x02\x02ah\x05\x0E\b\x02bh\x05\x10"+
		"\t\x02cd\x05\x12\n\x02de\x05\x10\t\x02eh\x03\x02\x02\x02fh\x07\x02\x02"+
		"\x03ga\x03\x02\x02\x02gb\x03\x02\x02\x02gc\x03\x02\x02\x02gf\x03\x02\x02"+
		"\x02h\r\x03\x02\x02\x02ip\x05\x14\v\x02jp\x05\x16\f\x02kp\x05\x1C\x0F"+
		"\x02lm\x05\x1E\x10\x02mn\x07\x1C\x02\x02np\x03\x02\x02\x02oi\x03\x02\x02"+
		"\x02oj\x03\x02\x02\x02ok\x03\x02\x02\x02ol\x03\x02\x02\x02p\x0F\x03\x02"+
		"\x02\x02qr\x050\x19\x02rs\x07\x1C\x02\x02s\x81\x03\x02\x02\x02tu\x056"+
		"\x1C\x02uv\x07\x1C\x02\x02v\x81\x03\x02\x02\x02wx\x05> \x02xy\x07\x1C"+
		"\x02\x02y\x81\x03\x02\x02\x02z{\x05@!\x02{|\x07\x1C\x02\x02|\x81\x03\x02"+
		"\x02\x02}~\x05D#\x02~\x7F\x07\x1C\x02\x02\x7F\x81\x03\x02\x02\x02\x80"+
		"q\x03\x02\x02\x02\x80t\x03\x02\x02\x02\x80w\x03\x02\x02\x02\x80z\x03\x02"+
		"\x02\x02\x80}\x03\x02\x02\x02\x81\x11\x03\x02\x02\x02\x82\x83\x07\x19"+
		"\x02\x02\x83\x84\x07\"\x02\x02\x84\x85\x07,\x02\x02\x85\x86\b\n\x01\x02"+
		"\x86\x87\x07\x1A\x02\x02\x87\x88\x07\x06\x02\x02\x88\x89\x07#\x02\x02"+
		"\x89\x13\x03\x02\x02\x02\x8A\x8B\x07\n\x02\x02\x8B\x8C\x05\x18\r\x02\x8C"+
		"\x8D\x07 \x02\x02\x8D\x8E\x05\x1A\x0E\x02\x8E\x8F\x07!\x02\x02\x8F\x90"+
		"\x07\x1C\x02\x02\x90\x15\x03\x02\x02\x02\x91\x92\x07\v\x02\x02\x92\x93"+
		"\x05\x18\r\x02\x93\x94\x07 \x02\x02\x94\x95\x05\x1A\x0E\x02\x95\x96\x07"+
		"!\x02\x02\x96\x97\x07\x1C\x02\x02\x97\x17\x03\x02\x02\x02\x98\x99\x07"+
		",\x02\x02\x99\x19\x03\x02\x02\x02\x9A\x9B\x07\x06\x02\x02\x9B\x1B\x03"+
		"\x02\x02\x02\x9C\x9D\x07*\x02\x02\x9D\x9E\x07,\x02\x02\x9E\x9F\x05 \x11"+
		"\x02\x9F\x1D\x03\x02\x02\x02\xA0\xA1\x07\x18\x02\x02\xA1\xA2\x07,\x02"+
		"\x02\xA2\xA3\x05\"\x12\x02\xA3\x1F\x03\x02\x02\x02\xA4\xA5\x05$\x13\x02"+
		"\xA5\xA6\x07\x1E\x02\x02\xA6\xA7\x05&\x14\x02\xA7\xA8\x07\x1F\x02\x02"+
		"\xA8\xCA\x03\x02\x02\x02\xA9\xAA\x07\"\x02\x02\xAA\xAB\x05$\x13\x02\xAB"+
		"\xAC\x07#\x02\x02\xAC\xAD\x05$\x13\x02\xAD\xAE\x07\x1E\x02\x02\xAE\xAF"+
		"\x05&\x14\x02\xAF\xB0\x07\x1F\x02\x02\xB0\xCA\x03\x02\x02\x02\xB1\xB2"+
		"\x07\"\x02\x02\xB2\xB3\x05$\x13\x02\xB3\xB4\x07#\x02\x02\xB4\xB5\x05$"+
		"\x13\x02\xB5\xB6\x07\x1E\x02\x02\xB6\xB7\x07\x1F\x02\x02\xB7\xCA\x03\x02"+
		"\x02\x02\xB8\xB9\x07\"\x02\x02\xB9\xBA\x07#\x02\x02\xBA\xBB\x05$\x13\x02"+
		"\xBB\xBC\x07\x1E\x02\x02\xBC\xBD\x07\x1F\x02\x02\xBD\xCA\x03\x02\x02\x02"+
		"\xBE\xBF\x07\"\x02\x02\xBF\xC0\x07#\x02\x02\xC0\xC1\x05$\x13\x02\xC1\xC2"+
		"\x07\x1E\x02\x02\xC2\xC3\x05&\x14\x02\xC3\xC4\x07\x1F\x02\x02\xC4\xCA"+
		"\x03\x02\x02\x02\xC5\xC6\x05$\x13\x02\xC6\xC7\x07\x1E\x02\x02\xC7\xC8"+
		"\x07\x1F\x02\x02\xC8\xCA\x03\x02\x02\x02\xC9\xA4\x03\x02\x02\x02\xC9\xA9"+
		"\x03\x02\x02\x02\xC9\xB1\x03\x02\x02\x02\xC9\xB8\x03\x02\x02\x02\xC9\xBE"+
		"\x03\x02\x02\x02\xC9\xC5\x03\x02\x02\x02\xCA!\x03\x02\x02\x02\xCB\xD2"+
		"\x05$\x13\x02\xCC\xCD\x07\"\x02\x02\xCD\xCE\x05$\x13\x02\xCE\xCF\x07#"+
		"\x02\x02\xCF\xD0\x05$\x13\x02\xD0\xD2\x03\x02\x02\x02\xD1\xCB\x03\x02"+
		"\x02\x02\xD1\xCC\x03\x02\x02\x02\xD2#\x03\x02\x02\x02\xD3\xD8\x07,\x02"+
		"\x02\xD4\xD5\x07,\x02\x02\xD5\xD6\x07\x1D\x02\x02\xD6\xD8\x05$\x13\x02"+
		"\xD7\xD3\x03\x02\x02\x02\xD7\xD4\x03\x02\x02\x02\xD8%\x03\x02\x02\x02"+
		"\xD9\xDE\x05(\x15\x02\xDA\xDB\x05(\x15\x02\xDB\xDC\x05&\x14\x02\xDC\xDE"+
		"\x03\x02\x02\x02\xDD\xD9\x03\x02\x02\x02\xDD\xDA\x03\x02\x02\x02\xDE\'"+
		"\x03\x02\x02\x02\xDF\xE0\x07\x0E\x02\x02\xE0\xE1\x05$\x13\x02\xE1\xE2"+
		"\x07\x1C\x02\x02\xE2\xF6\x03\x02\x02\x02\xE3\xE4\x07\r\x02\x02\xE4\xE5"+
		"\x07\"\x02\x02\xE5\xE6\x05*\x16\x02\xE6\xE7\x07#\x02\x02\xE7\xE8\x05$"+
		"\x13\x02\xE8\xE9\x07\x1C\x02\x02\xE9\xF6\x03\x02\x02\x02\xEA\xEB\x07,"+
		"\x02\x02\xEB\xEC\x05$\x13\x02\xEC\xED\x07\x1C\x02\x02\xED\xF6\x03\x02"+
		"\x02\x02\xEE\xEF\x07,\x02\x02\xEF\xF0\x07\"\x02\x02\xF0\xF1\x05*\x16\x02"+
		"\xF1\xF2\x07#\x02\x02\xF2\xF3\x05$\x13\x02\xF3\xF4\x07\x1C\x02\x02\xF4"+
		"\xF6\x03\x02\x02\x02\xF5\xDF\x03\x02\x02\x02\xF5\xE3\x03\x02\x02\x02\xF5"+
		"\xEA\x03\x02\x02\x02\xF5\xEE\x03\x02\x02\x02\xF6)\x03\x02\x02\x02\xF7"+
		"\xF8\b\x16\x01\x02\xF8\xF9\x05,\x17\x02\xF9\xFF\x03\x02\x02\x02\xFA\xFB"+
		"\f\x03\x02\x02\xFB\xFC\x07\x1D\x02\x02\xFC\xFE\x05,\x17\x02\xFD\xFA\x03"+
		"\x02\x02\x02\xFE\u0101\x03\x02\x02\x02\xFF\xFD\x03\x02\x02\x02\xFF\u0100"+
		"\x03\x02\x02\x02\u0100+\x03\x02\x02\x02\u0101\xFF\x03\x02\x02\x02\u0102"+
		"\u0103\b\x17\x01\x02\u0103\u0113\x07\x06\x02\x02\u0104\u0113\x07\x05\x02"+
		"\x02\u0105\u0113\x07)\x02\x02\u0106\u0113\x07,\x02\x02\u0107\u0108\x05"+
		".\x18\x02\u0108\u0109\x07\"\x02\x02\u0109\u010A\x05,\x17\x02\u010A\u010B"+
		"\x07#\x02\x02\u010B\u0113\x03\x02\x02\x02\u010C\u010D\x07(\x02\x02\u010D"+
		"\u0113\x05,\x17\t\u010E\u010F\x07\"\x02\x02\u010F\u0110\x05,\x17\x02\u0110"+
		"\u0111\x07#\x02\x02\u0111\u0113\x03\x02\x02\x02\u0112\u0102\x03\x02\x02"+
		"\x02\u0112\u0104\x03\x02\x02\x02\u0112\u0105\x03\x02\x02\x02\u0112\u0106"+
		"\x03\x02\x02\x02\u0112\u0107\x03\x02\x02\x02\u0112\u010C\x03\x02\x02\x02"+
		"\u0112\u010E\x03\x02\x02\x02\u0113\u0125\x03\x02\x02\x02\u0114\u0115\f"+
		"\x07\x02\x02\u0115\u0116\x07\'\x02\x02\u0116\u0124\x05,\x17\b\u0117\u0118"+
		"\f\x06\x02\x02\u0118\u0119\x07(\x02\x02\u0119\u0124\x05,\x17\x07\u011A"+
		"\u011B\f\x05\x02\x02\u011B\u011C\x07%\x02\x02\u011C\u0124\x05,\x17\x06"+
		"\u011D\u011E\f\x04\x02\x02\u011E\u011F\x07&\x02\x02\u011F\u0124\x05,\x17"+
		"\x05\u0120\u0121\f\x03\x02\x02\u0121\u0122\x07$\x02\x02\u0122\u0124\x05"+
		",\x17\x04\u0123\u0114\x03\x02\x02\x02\u0123\u0117\x03\x02\x02\x02\u0123"+
		"\u011A\x03\x02\x02\x02\u0123\u011D\x03\x02\x02\x02\u0123\u0120\x03\x02"+
		"\x02\x02\u0124\u0127\x03\x02\x02\x02\u0125\u0123\x03\x02\x02\x02\u0125"+
		"\u0126\x03\x02\x02\x02\u0126-\x03\x02\x02\x02\u0127\u0125\x03\x02\x02"+
		"\x02\u0128\u0129\t\x02\x02\x02\u0129/\x03\x02\x02\x02\u012A\u012B\x07"+
		"\x15\x02\x02\u012B\u012C\x052\x1A\x02\u012C\u012D\x07\x1B\x02\x02\u012D"+
		"\u012E\x054\x1B\x02\u012E\u0136\x03\x02\x02\x02\u012F\u0130\x07\x15\x02"+
		"\x02\u0130\u0131\x07,\x02\x02\u0131\u0132\b\x19\x01\x02\u0132\u0133\x07"+
		"\x1B\x02\x02\u0133\u0134\x07,\x02\x02\u0134\u0136\b\x19\x01\x02\u0135"+
		"\u012A\x03\x02\x02\x02\u0135\u012F\x03\x02\x02\x02\u01361\x03\x02\x02"+
		"\x02\u0137\u0138\x07,\x02\x02\u0138\u0139\x07 \x02\x02\u0139\u013A\x07"+
		"\x06\x02\x02\u013A\u013B\x07!\x02\x02\u013B\u013C\b\x1A\x01\x02\u013C"+
		"3\x03\x02\x02\x02\u013D\u013E\x07,\x02\x02\u013E\u013F\x07 \x02\x02\u013F"+
		"\u0140\x07\x06\x02\x02\u0140\u0141\x07!\x02\x02\u0141\u0142\b\x1B\x01"+
		"\x02\u01425\x03\x02\x02\x02\u0143\u0144\x07,\x02\x02\u0144\u0145\x07\""+
		"\x02\x02\u0145\u0146\x058\x1D\x02\u0146\u0147\x07#\x02\x02\u0147\u0148"+
		"\x05:\x1E\x02\u0148\u0149\b\x1C\x01\x02\u0149\u014F\x03\x02\x02\x02\u014A"+
		"\u014B\x07,\x02\x02\u014B\u014C\x05:\x1E\x02\u014C\u014D\b\x1C\x01\x02"+
		"\u014D\u014F\x03\x02\x02\x02\u014E\u0143\x03\x02\x02\x02\u014E\u014A\x03"+
		"\x02\x02\x02\u014F7\x03\x02\x02\x02\u0150\u0151\b\x1D\x01\x02\u0151\u0152"+
		"\x05,\x17\x02\u0152\u0158\x03\x02\x02\x02\u0153\u0154\f\x03\x02\x02\u0154"+
		"\u0155\x07\x1D\x02\x02\u0155\u0157\x05,\x17\x02\u0156\u0153\x03\x02\x02"+
		"\x02\u0157\u015A\x03\x02\x02\x02\u0158\u0156\x03\x02\x02\x02\u0158\u0159"+
		"\x03\x02\x02\x02\u01599\x03\x02\x02\x02\u015A\u0158\x03\x02\x02\x02\u015B"+
		"\u0161\x05<\x1F\x02\u015C\u015D\x05<\x1F\x02\u015D\u015E\x07\x1D\x02\x02"+
		"\u015E\u015F\x05:\x1E\x02\u015F\u0161\x03\x02\x02\x02\u0160\u015B\x03"+
		"\x02\x02\x02\u0160\u015C\x03\x02\x02\x02\u0161;\x03\x02\x02\x02\u0162"+
		"\u0163\x07,\x02\x02\u0163\u016A\b\x1F\x01\x02\u0164\u0165\x07,\x02\x02"+
		"\u0165\u0166\x07 \x02\x02\u0166\u0167\x07\x06\x02\x02\u0167\u0168\x07"+
		"!\x02\x02\u0168\u016A\b\x1F\x01\x02\u0169\u0162\x03\x02\x02\x02\u0169"+
		"\u0164\x03\x02\x02\x02\u016A=\x03\x02\x02\x02\u016B\u016C\x07\x0E\x02"+
		"\x02\u016C\u016D\x05:\x1E\x02\u016D?\x03\x02\x02\x02\u016E\u016F\x07\x16"+
		"\x02\x02\u016F\u0170\x07,\x02\x02\u0170\u0174\b!\x01\x02\u0171\u0172\x07"+
		"\x16\x02\x02\u0172\u0174\x05B\"\x02\u0173\u016E\x03\x02\x02\x02\u0173"+
		"\u0171\x03\x02\x02\x02\u0174A\x03\x02\x02\x02\u0175\u017B\x052\x1A\x02"+
		"\u0176\u0177\x052\x1A\x02\u0177\u0178\x07\x1D\x02\x02\u0178\u0179\x05"+
		"B\"\x02\u0179\u017B\x03\x02\x02\x02\u017A\u0175\x03\x02\x02\x02\u017A"+
		"\u0176\x03\x02\x02\x02\u017BC\x03\x02\x02\x02\u017C\u017D\x07\x17\x02"+
		"\x02\u017D\u017E\x07,\x02\x02\u017E\u0182\b#\x01\x02\u017F\u0180\x07\x17"+
		"\x02\x02\u0180\u0182\x052\x1A\x02\u0181\u017C\x03\x02\x02\x02\u0181\u017F"+
		"\x03\x02\x02\x02\u0182E\x03\x02\x02\x02\x19KQ\\go\x80\xC9\xD1\xD7\xDD"+
		"\xF5\xFF\u0112\u0123\u0125\u0135\u014E\u0158\u0160\u0169\u0173\u017A\u0181";
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
	public _Library: Token;
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
	public _Id: Token;
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
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
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
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
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


export class IdentifierContext extends ParserRuleContext {
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParserV2.RULE_identifier; }
	@Override
	public enterRule(listener: QasmParserV2Listener): void {
		if (listener.enterIdentifier) listener.enterIdentifier(this);
	}
	@Override
	public exitRule(listener: QasmParserV2Listener): void {
		if (listener.exitIdentifier) listener.exitIdentifier(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserV2Visitor<Result>): Result {
		if (visitor.visitIdentifier) return visitor.visitIdentifier(this);
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
	public _q: Token;
	public _c: Token;
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
	public _Id: Token;
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
	public _Id: Token;
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
	public _Id: Token;
	public Id(): TerminalNode { return this.getToken(QasmParserV2.Id, 0); }
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.LeftParen, 0); }
	public paramsListNumber(): ParamsListNumberContext | undefined {
		return this.tryGetRuleContext(0, ParamsListNumberContext);
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.RightParen, 0); }
	public qubitAndQregList(): QubitAndQregListContext {
		return this.getRuleContext(0, QubitAndQregListContext);
	}
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
	public _Id: Token;
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
	public _Id: Token;
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
	public _Id: Token;
	public Reset(): TerminalNode { return this.getToken(QasmParserV2.Reset, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParserV2.Id, 0); }
	public qubit(): QubitContext | undefined {
		return this.tryGetRuleContext(0, QubitContext);
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


