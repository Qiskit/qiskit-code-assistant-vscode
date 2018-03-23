// Generated from QasmParser.g4 by ANTLR 4.6-SNAPSHOT


import { Register, SymbolsTable } from './utils';
import { QasmLexer } from './QasmLexer';
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'; 
import { SymbolTable, SymbolTableBuilder, VariableSymbol, RegisterSymbol, BuiltInTypeSymbol } from '../compiler/symbolTable';
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

import { QasmParserListener } from './QasmParserListener';
import { QasmParserVisitor } from './QasmParserVisitor';


export class QasmParser extends Parser {
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
	public static readonly RULE_gateDefinition = 9;
	public static readonly RULE_opaqueDefinition = 10;
	public static readonly RULE_gateDefinitionArguments = 11;
	public static readonly RULE_opaqueDefinitionArguments = 12;
	public static readonly RULE_paramsList = 13;
	public static readonly RULE_body = 14;
	public static readonly RULE_bodyExpression = 15;
	public static readonly RULE_paramsListBody = 16;
	public static readonly RULE_exp = 17;
	public static readonly RULE_unaryOp = 18;
	public static readonly RULE_measure = 19;
	public static readonly RULE_qubit = 20;
	public static readonly RULE_cbit = 21;
	public static readonly RULE_customArglist = 22;
	public static readonly RULE_paramsListNumber = 23;
	public static readonly RULE_qubitAndQregList = 24;
	public static readonly RULE_qbitOrQreg = 25;
	public static readonly RULE_cxGate = 26;
	public static readonly RULE_barrierGate = 27;
	public static readonly RULE_qubitList = 28;
	public static readonly RULE_resetGate = 29;
	public static readonly ruleNames: string[] = [
		"code", "headers", "includeLibrary", "sentences", "clean", "sentence", 
		"definition", "expression", "conditional", "gateDefinition", "opaqueDefinition", 
		"gateDefinitionArguments", "opaqueDefinitionArguments", "paramsList", 
		"body", "bodyExpression", "paramsListBody", "exp", "unaryOp", "measure", 
		"qubit", "cbit", "customArglist", "paramsListNumber", "qubitAndQregList", 
		"qbitOrQreg", "cxGate", "barrierGate", "qubitList", "resetGate"
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
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(QasmParser._LITERAL_NAMES, QasmParser._SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return QasmParser.VOCABULARY;
	}

	@Override
	public get grammarFileName(): string { return "QasmParser.g4"; }

	@Override
	public get ruleNames(): string[] { return QasmParser.ruleNames; }

	@Override
	public get serializedATN(): string { return QasmParser._serializedATN; }


	    
	private symbolTable = SymbolTableBuilder.build();

	private declareQreg(registerName: Token, size: Token): void {
	    let variableSymbol = this.symbolTable.lookup(registerName.text);
	    if (variableSymbol == null) {
	        let qregSymbol = this.symbolTable.lookup('Qreg') as BuiltInTypeSymbol;
	        let newSymbol = new RegisterSymbol(registerName.text, qregSymbol, +size.text);

	        this.symbolTable.define(newSymbol);
	    } else {
	        let message = `There is another declaration with name ${registerName.text}`;
	        this.notifyErrorListeners(message, registerName, null);
	    }
	}

	private declareCreg(registerName: Token, size: Token): void {
	    let variableSymbol = this.symbolTable.lookup(registerName.text);
	    if (variableSymbol == null) {
	        let cregSymbol = this.symbolTable.lookup('Creg') as BuiltInTypeSymbol;
	        let newSymbol = new RegisterSymbol(registerName.text, cregSymbol, +size.text);

	        this.symbolTable.define(newSymbol);
	    } else {
	        let message = `There is another declaration with name ${registerName.text}`;
	        this.notifyErrorListeners(message, registerName, null);
	    }
	}

	private declareGate(gateName: Token): void {
	    let variableSymbol = this.symbolTable.lookup(gateName.text);
	    if (variableSymbol == null) {
	        let gateSymbol = this.symbolTable.lookup('Gate') as BuiltInTypeSymbol;
	        let newSymbol = new VariableSymbol(gateName.text, gateSymbol);

	        this.symbolTable.define(newSymbol);
	    } else {
	        let message = `There is another declaration with name ${gateName.text}`;
	        this.notifyErrorListeners(message, gateName, null);
	    }
	}

	private declareOpaque(opaqueName: Token): void {
	    let variableSymbol = this.symbolTable.lookup(opaqueName.text);
	    if (variableSymbol == null) {
	        let opaqueSymbol = this.symbolTable.lookup('Opaque') as BuiltInTypeSymbol;
	        let newSymbol = new VariableSymbol(opaqueName.text, opaqueSymbol);

	        this.symbolTable.define(newSymbol);
	    } else {
	        let message = `There is another declaration with name ${opaqueName.text}`;
	        this.notifyErrorListeners(message, opaqueName, null);
	    }
	}

	private verifyQregUssage(id: Token, position?: Token) {
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

	private verifyCregUssage(id: Token, position?: Token) {
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

	    if (qregSymbol.size > cregSymbol.size) {
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

	private buildQasmParser(input: string): QasmParser {
	    let inputStream = new ANTLRInputStream(input);
	    let lexer = new QasmLexer(inputStream);
	    let tokenStream = new CommonTokenStream(lexer);
	    let parser = new QasmParser(tokenStream);

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
		this._interp = new ParserATNSimulator(QasmParser._ATN, this);
	}
	@RuleVersion(0)
	public code(): CodeContext {
		let _localctx: CodeContext = new CodeContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, QasmParser.RULE_code);
		try {
			this.state = 65;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.EOF:
			case QasmParser.Qreg:
			case QasmParser.Creg:
			case QasmParser.Cx:
			case QasmParser.Measure:
			case QasmParser.Barrier:
			case QasmParser.Reset:
			case QasmParser.Opaque:
			case QasmParser.If:
			case QasmParser.Gate:
			case QasmParser.Id:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 60;
				this.sentences();
				}
				break;
			case QasmParser.QasmDescriptor:
			case QasmParser.Include:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 61;
				this.headers();
				this.state = 62;
				this.sentences();
				}
				break;
			case QasmParser.Clean:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 64;
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
		this.enterRule(_localctx, 2, QasmParser.RULE_headers);
		try {
			this.state = 71;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,1,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 67;
				this.match(QasmParser.QasmDescriptor);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 68;
				this.match(QasmParser.QasmDescriptor);
				this.state = 69;
				this.includeLibrary();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 70;
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
		this.enterRule(_localctx, 4, QasmParser.RULE_includeLibrary);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 73;
			this.match(QasmParser.Include);
			this.state = 74;
			_localctx._Library = this.match(QasmParser.Library);
			this.state = 75;
			this.match(QasmParser.Semi);
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
		this.enterRule(_localctx, 6, QasmParser.RULE_sentences);
		try {
			this.state = 82;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,2,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 78;
				this.sentence();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 79;
				this.sentence();
				this.state = 80;
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
		this.enterRule(_localctx, 8, QasmParser.RULE_clean);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 84;
			this.match(QasmParser.Clean);
			this.state = 85;
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
	public sentence(): SentenceContext {
		let _localctx: SentenceContext = new SentenceContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, QasmParser.RULE_sentence);
		try {
			this.state = 93;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Qreg:
			case QasmParser.Creg:
			case QasmParser.Opaque:
			case QasmParser.Gate:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 87;
				this.definition();
				}
				break;
			case QasmParser.Cx:
			case QasmParser.Measure:
			case QasmParser.Barrier:
			case QasmParser.Reset:
			case QasmParser.Id:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 88;
				this.expression();
				}
				break;
			case QasmParser.If:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 89;
				this.conditional();
				this.state = 90;
				this.expression();
				}
				break;
			case QasmParser.EOF:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 92;
				this.match(QasmParser.EOF);
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
		this.enterRule(_localctx, 12, QasmParser.RULE_definition);
		try {
			this.state = 113;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Qreg:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 95;
				this.match(QasmParser.Qreg);
				this.state = 96;
				_localctx._Id = this.match(QasmParser.Id);
				this.state = 97;
				this.match(QasmParser.LeftBrace);
				this.state = 98;
				_localctx._size = this.match(QasmParser.Int);
				this.state = 99;
				this.match(QasmParser.RightBrace);
				this.state = 100;
				this.match(QasmParser.Semi);
				 this.declareQreg(_localctx._Id, _localctx._size); 
				}
				break;
			case QasmParser.Creg:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 102;
				this.match(QasmParser.Creg);
				this.state = 103;
				_localctx._Id = this.match(QasmParser.Id);
				this.state = 104;
				this.match(QasmParser.LeftBrace);
				this.state = 105;
				_localctx._size = this.match(QasmParser.Int);
				this.state = 106;
				this.match(QasmParser.RightBrace);
				this.state = 107;
				this.match(QasmParser.Semi);
				 this.declareCreg(_localctx._Id, _localctx._size); 
				}
				break;
			case QasmParser.Gate:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 109;
				this.gateDefinition();
				}
				break;
			case QasmParser.Opaque:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 110;
				this.opaqueDefinition();
				this.state = 111;
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
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, QasmParser.RULE_expression);
		try {
			this.state = 130;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Measure:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 115;
				this.measure();
				this.state = 116;
				this.match(QasmParser.Semi);
				}
				break;
			case QasmParser.Id:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 118;
				this.customArglist();
				this.state = 119;
				this.match(QasmParser.Semi);
				}
				break;
			case QasmParser.Cx:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 121;
				this.cxGate();
				this.state = 122;
				this.match(QasmParser.Semi);
				}
				break;
			case QasmParser.Barrier:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 124;
				this.barrierGate();
				this.state = 125;
				this.match(QasmParser.Semi);
				}
				break;
			case QasmParser.Reset:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 127;
				this.resetGate();
				this.state = 128;
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
	public conditional(): ConditionalContext {
		let _localctx: ConditionalContext = new ConditionalContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, QasmParser.RULE_conditional);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this.match(QasmParser.If);
			this.state = 133;
			this.match(QasmParser.LeftParen);
			this.state = 134;
			this.match(QasmParser.Id);
			this.state = 135;
			this.match(QasmParser.Equals);
			this.state = 136;
			this.match(QasmParser.Int);
			this.state = 137;
			this.match(QasmParser.RightParen);
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
		this.enterRule(_localctx, 18, QasmParser.RULE_gateDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 139;
			this.match(QasmParser.Gate);
			this.state = 140;
			_localctx._Id = this.match(QasmParser.Id);
			 
			        this.declareGate(_localctx._Id); 
			        this.symbolTable.push((_localctx._Id!=null?_localctx._Id.text:undefined));
			    
			this.state = 142;
			this.gateDefinitionArguments();

			        this.symbolTable.pop();
			    
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
		this.enterRule(_localctx, 20, QasmParser.RULE_opaqueDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 145;
			this.match(QasmParser.Opaque);
			this.state = 146;
			_localctx._Id = this.match(QasmParser.Id);
			this.state = 147;
			this.opaqueDefinitionArguments();
			 this.declareOpaque(_localctx._Id); 
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
		this.enterRule(_localctx, 22, QasmParser.RULE_gateDefinitionArguments);
		try {
			this.state = 187;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,6,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 150;
				this.paramsList();
				this.state = 151;
				this.match(QasmParser.LeftCurlyBrace);
				this.state = 152;
				this.body();
				this.state = 153;
				this.match(QasmParser.RightCurlyBrace);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 155;
				this.match(QasmParser.LeftParen);
				this.state = 156;
				this.paramsList();
				this.state = 157;
				this.match(QasmParser.RightParen);
				this.state = 158;
				this.paramsList();
				this.state = 159;
				this.match(QasmParser.LeftCurlyBrace);
				this.state = 160;
				this.body();
				this.state = 161;
				this.match(QasmParser.RightCurlyBrace);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 163;
				this.match(QasmParser.LeftParen);
				this.state = 164;
				this.paramsList();
				this.state = 165;
				this.match(QasmParser.RightParen);
				this.state = 166;
				this.paramsList();
				this.state = 167;
				this.match(QasmParser.LeftCurlyBrace);
				this.state = 168;
				this.match(QasmParser.RightCurlyBrace);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 170;
				this.match(QasmParser.LeftParen);
				this.state = 171;
				this.match(QasmParser.RightParen);
				this.state = 172;
				this.paramsList();
				this.state = 173;
				this.match(QasmParser.LeftCurlyBrace);
				this.state = 174;
				this.match(QasmParser.RightCurlyBrace);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 176;
				this.match(QasmParser.LeftParen);
				this.state = 177;
				this.match(QasmParser.RightParen);
				this.state = 178;
				this.paramsList();
				this.state = 179;
				this.match(QasmParser.LeftCurlyBrace);
				this.state = 180;
				this.body();
				this.state = 181;
				this.match(QasmParser.RightCurlyBrace);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 183;
				this.paramsList();
				this.state = 184;
				this.match(QasmParser.LeftCurlyBrace);
				this.state = 185;
				this.match(QasmParser.RightCurlyBrace);
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
		this.enterRule(_localctx, 24, QasmParser.RULE_opaqueDefinitionArguments);
		try {
			this.state = 195;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Id:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 189;
				this.paramsList();
				}
				break;
			case QasmParser.LeftParen:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 190;
				this.match(QasmParser.LeftParen);
				this.state = 191;
				this.paramsList();
				this.state = 192;
				this.match(QasmParser.RightParen);
				this.state = 193;
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
		this.enterRule(_localctx, 26, QasmParser.RULE_paramsList);
		try {
			this.state = 201;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,8,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 197;
				this.match(QasmParser.Id);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 198;
				this.match(QasmParser.Id);
				this.state = 199;
				this.match(QasmParser.Comma);
				this.state = 200;
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
		this.enterRule(_localctx, 28, QasmParser.RULE_body);
		try {
			this.state = 207;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,9,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 203;
				this.bodyExpression();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 204;
				this.bodyExpression();
				this.state = 205;
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
		this.enterRule(_localctx, 30, QasmParser.RULE_bodyExpression);
		try {
			this.state = 231;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,10,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 209;
				this.match(QasmParser.Cx);
				this.state = 210;
				this.paramsList();
				this.state = 211;
				this.match(QasmParser.Semi);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 213;
				this.match(QasmParser.U);
				this.state = 214;
				this.match(QasmParser.LeftParen);
				this.state = 215;
				this.paramsListBody(0);
				this.state = 216;
				this.match(QasmParser.RightParen);
				this.state = 217;
				this.paramsList();
				this.state = 218;
				this.match(QasmParser.Semi);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 220;
				this.match(QasmParser.Id);
				this.state = 221;
				this.paramsList();
				this.state = 222;
				this.match(QasmParser.Semi);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 224;
				this.match(QasmParser.Id);
				this.state = 225;
				this.match(QasmParser.LeftParen);
				this.state = 226;
				this.paramsListBody(0);
				this.state = 227;
				this.match(QasmParser.RightParen);
				this.state = 228;
				this.paramsList();
				this.state = 229;
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
		let _startState: number = 32;
		this.enterRecursionRule(_localctx, 32, QasmParser.RULE_paramsListBody, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 234;
			this.exp(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 241;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,11,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ParamsListBodyContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_paramsListBody);
					this.state = 236;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 237;
					this.match(QasmParser.Comma);
					this.state = 238;
					this.exp(0);
					}
					} 
				}
				this.state = 243;
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
		let _startState: number = 34;
		this.enterRecursionRule(_localctx, 34, QasmParser.RULE_exp, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 260;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QasmParser.Int:
				{
				this.state = 245;
				this.match(QasmParser.Int);
				}
				break;
			case QasmParser.Real:
				{
				this.state = 246;
				this.match(QasmParser.Real);
				}
				break;
			case QasmParser.Pi:
				{
				this.state = 247;
				this.match(QasmParser.Pi);
				}
				break;
			case QasmParser.Id:
				{
				this.state = 248;
				this.match(QasmParser.Id);
				}
				break;
			case QasmParser.Sin:
			case QasmParser.Cos:
			case QasmParser.Tan:
			case QasmParser.Exp:
			case QasmParser.Ln:
			case QasmParser.Sqrt:
				{
				this.state = 249;
				this.unaryOp();
				this.state = 250;
				this.match(QasmParser.LeftParen);
				this.state = 251;
				this.exp(0);
				this.state = 252;
				this.match(QasmParser.RightParen);
				}
				break;
			case QasmParser.Subs:
				{
				this.state = 254;
				this.match(QasmParser.Subs);
				this.state = 255;
				this.exp(7);
				}
				break;
			case QasmParser.LeftParen:
				{
				this.state = 256;
				this.match(QasmParser.LeftParen);
				this.state = 257;
				this.exp(0);
				this.state = 258;
				this.match(QasmParser.RightParen);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 279;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,14,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					this.state = 277;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input,13,this._ctx) ) {
					case 1:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
						this.state = 262;
						if (!(this.precpred(this._ctx, 5))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 5)");
						this.state = 263;
						this.match(QasmParser.Sum);
						this.state = 264;
						this.exp(6);
						}
						break;

					case 2:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
						this.state = 265;
						if (!(this.precpred(this._ctx, 4))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 4)");
						this.state = 266;
						this.match(QasmParser.Subs);
						this.state = 267;
						this.exp(5);
						}
						break;

					case 3:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
						this.state = 268;
						if (!(this.precpred(this._ctx, 3))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 3)");
						this.state = 269;
						this.match(QasmParser.Mult);
						this.state = 270;
						this.exp(4);
						}
						break;

					case 4:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
						this.state = 271;
						if (!(this.precpred(this._ctx, 2))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						this.state = 272;
						this.match(QasmParser.Div);
						this.state = 273;
						this.exp(3);
						}
						break;

					case 5:
						{
						_localctx = new ExpContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
						this.state = 274;
						if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
						this.state = 275;
						this.match(QasmParser.Pow);
						this.state = 276;
						this.exp(2);
						}
						break;
					}
					} 
				}
				this.state = 281;
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
		this.enterRule(_localctx, 36, QasmParser.RULE_unaryOp);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 282;
			_la = this._input.LA(1);
			if ( !((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << QasmParser.Sin) | (1 << QasmParser.Cos) | (1 << QasmParser.Tan) | (1 << QasmParser.Exp) | (1 << QasmParser.Ln) | (1 << QasmParser.Sqrt))) !== 0)) ) {
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
		this.enterRule(_localctx, 38, QasmParser.RULE_measure);
		try {
			this.state = 295;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,15,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 284;
				this.match(QasmParser.Measure);
				this.state = 285;
				this.qubit();
				this.state = 286;
				this.match(QasmParser.Assign);
				this.state = 287;
				this.cbit();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 289;
				this.match(QasmParser.Measure);
				this.state = 290;
				_localctx._q = this.match(QasmParser.Id);
				 this.verifyQregUssage(_localctx._q); 
				this.state = 292;
				this.match(QasmParser.Assign);
				this.state = 293;
				_localctx._c = this.match(QasmParser.Id);
				 
				        this.verifyCregUssage(_localctx._c); 
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
		this.enterRule(_localctx, 40, QasmParser.RULE_qubit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 297;
			_localctx._Id = this.match(QasmParser.Id);
			this.state = 298;
			this.match(QasmParser.LeftBrace);
			this.state = 299;
			_localctx._position = this.match(QasmParser.Int);
			this.state = 300;
			this.match(QasmParser.RightBrace);
			 this.verifyQregUssage(_localctx._Id, _localctx._position); 
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
		this.enterRule(_localctx, 42, QasmParser.RULE_cbit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 303;
			_localctx._Id = this.match(QasmParser.Id);
			this.state = 304;
			this.match(QasmParser.LeftBrace);
			this.state = 305;
			_localctx._position = this.match(QasmParser.Int);
			this.state = 306;
			this.match(QasmParser.RightBrace);
			 this.verifyCregUssage(_localctx._Id, _localctx._position); 
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
		this.enterRule(_localctx, 44, QasmParser.RULE_customArglist);
		try {
			this.state = 320;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,16,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 309;
				_localctx._Id = this.match(QasmParser.Id);
				this.state = 310;
				this.match(QasmParser.LeftParen);
				this.state = 311;
				this.paramsListNumber(0);
				this.state = 312;
				this.match(QasmParser.RightParen);
				this.state = 313;
				this.qubitAndQregList();
				 this.verifyGateInvocation(_localctx._Id); 
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 316;
				_localctx._Id = this.match(QasmParser.Id);
				this.state = 317;
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
		let _startState: number = 46;
		this.enterRecursionRule(_localctx, 46, QasmParser.RULE_paramsListNumber, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 323;
			this.exp(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 330;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,17,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ParamsListNumberContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_paramsListNumber);
					this.state = 325;
					if (!(this.precpred(this._ctx, 1))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
					this.state = 326;
					this.match(QasmParser.Comma);
					this.state = 327;
					this.exp(0);
					}
					} 
				}
				this.state = 332;
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
		this.enterRule(_localctx, 48, QasmParser.RULE_qubitAndQregList);
		try {
			this.state = 338;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,18,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 333;
				this.qbitOrQreg();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 334;
				this.qbitOrQreg();
				this.state = 335;
				this.match(QasmParser.Comma);
				this.state = 336;
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
		this.enterRule(_localctx, 50, QasmParser.RULE_qbitOrQreg);
		try {
			this.state = 345;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,19,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 340;
				this.match(QasmParser.Id);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 341;
				this.match(QasmParser.Id);
				this.state = 342;
				this.match(QasmParser.LeftBrace);
				this.state = 343;
				this.match(QasmParser.Int);
				this.state = 344;
				this.match(QasmParser.RightBrace);
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
		this.enterRule(_localctx, 52, QasmParser.RULE_cxGate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 347;
			this.match(QasmParser.Cx);
			this.state = 348;
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
		this.enterRule(_localctx, 54, QasmParser.RULE_barrierGate);
		try {
			this.state = 354;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,20,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 350;
				this.match(QasmParser.Barrier);
				this.state = 351;
				this.match(QasmParser.Id);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 352;
				this.match(QasmParser.Barrier);
				this.state = 353;
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
		this.enterRule(_localctx, 56, QasmParser.RULE_qubitList);
		try {
			this.state = 361;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,21,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 356;
				this.qubit();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 357;
				this.qubit();
				this.state = 358;
				this.match(QasmParser.Comma);
				this.state = 359;
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
		this.enterRule(_localctx, 58, QasmParser.RULE_resetGate);
		try {
			this.state = 367;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,22,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 363;
				this.match(QasmParser.Reset);
				this.state = 364;
				this.match(QasmParser.Id);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 365;
				this.match(QasmParser.Reset);
				this.state = 366;
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
		case 16:
			return this.paramsListBody_sempred(_localctx as ParamsListBodyContext, predIndex);

		case 17:
			return this.exp_sempred(_localctx as ExpContext, predIndex);

		case 23:
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
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03,\u0174\x04\x02"+
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07"+
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04"+
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04"+
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04"+
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04"+
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x03\x02\x03\x02\x03\x02\x03\x02"+
		"\x03\x02\x05\x02D\n\x02\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03J\n\x03"+
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05"+
		"\x05\x05U\n\x05\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07"+
		"\x03\x07\x03\x07\x05\x07`\n\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03"+
		"\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05"+
		"\bt\n\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03"+
		"\t\x03\t\x03\t\x03\t\x03\t\x05\t\x85\n\t\x03\n\x03\n\x03\n\x03\n\x03\n"+
		"\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03"+
		"\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03"+
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03"+
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03"+
		"\r\x03\r\x03\r\x05\r\xBE\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03"+
		"\x0E\x05\x0E\xC6\n\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xCC\n\x0F"+
		"\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\xD2\n\x10\x03\x11\x03\x11\x03"+
		"\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03"+
		"\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03"+
		"\x11\x03\x11\x05\x11\xEA\n\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12"+
		"\x03\x12\x07\x12\xF2\n\x12\f\x12\x0E\x12\xF5\v\x12\x03\x13\x03\x13\x03"+
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03"+
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\u0107\n\x13\x03\x13\x03\x13"+
		"\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13"+
		"\x03\x13\x03\x13\x03\x13\x03\x13\x07\x13\u0118\n\x13\f\x13\x0E\x13\u011B"+
		"\v\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15"+
		"\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x05\x15\u012A\n\x15\x03\x16\x03"+
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03"+
		"\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03"+
		"\x18\x03\x18\x03\x18\x03\x18\x05\x18\u0143\n\x18\x03\x19\x03\x19\x03\x19"+
		"\x03\x19\x03\x19\x03\x19\x07\x19\u014B\n\x19\f\x19\x0E\x19\u014E\v\x19"+
		"\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u0155\n\x1A\x03\x1B\x03"+
		"\x1B\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u015C\n\x1B\x03\x1C\x03\x1C\x03\x1C"+
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u0165\n\x1D\x03\x1E\x03\x1E\x03"+
		"\x1E\x03\x1E\x03\x1E\x05\x1E\u016C\n\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F"+
		"\x05\x1F\u0172\n\x1F\x03\x1F\x02\x02\x05\"$0 \x02\x02\x04\x02\x06\x02"+
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A"+
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x02"+
		"4\x026\x028\x02:\x02<\x02\x02\x03\x03\x02\x0F\x14\u0183\x02C\x03\x02\x02"+
		"\x02\x04I\x03\x02\x02\x02\x06K\x03\x02\x02\x02\bT\x03\x02\x02\x02\nV\x03"+
		"\x02\x02\x02\f_\x03\x02\x02\x02\x0Es\x03\x02\x02\x02\x10\x84\x03\x02\x02"+
		"\x02\x12\x86\x03\x02\x02\x02\x14\x8D\x03\x02\x02\x02\x16\x93\x03\x02\x02"+
		"\x02\x18\xBD\x03\x02\x02\x02\x1A\xC5\x03\x02\x02\x02\x1C\xCB\x03\x02\x02"+
		"\x02\x1E\xD1\x03\x02\x02\x02 \xE9\x03\x02\x02\x02\"\xEB\x03\x02\x02\x02"+
		"$\u0106\x03\x02\x02\x02&\u011C\x03\x02\x02\x02(\u0129\x03\x02\x02\x02"+
		"*\u012B\x03\x02\x02\x02,\u0131\x03\x02\x02\x02.\u0142\x03\x02\x02\x02"+
		"0\u0144\x03\x02\x02\x022\u0154\x03\x02\x02\x024\u015B\x03\x02\x02\x02"+
		"6\u015D\x03\x02\x02\x028\u0164\x03\x02\x02\x02:\u016B\x03\x02\x02\x02"+
		"<\u0171\x03\x02\x02\x02>D\x05\b\x05\x02?@\x05\x04\x03\x02@A\x05\b\x05"+
		"\x02AD\x03\x02\x02\x02BD\x05\n\x06\x02C>\x03\x02\x02\x02C?\x03\x02\x02"+
		"\x02CB\x03\x02\x02\x02D\x03\x03\x02\x02\x02EJ\x07\x07\x02\x02FG\x07\x07"+
		"\x02\x02GJ\x05\x06\x04\x02HJ\x05\x06\x04\x02IE\x03\x02\x02\x02IF\x03\x02"+
		"\x02\x02IH\x03\x02\x02\x02J\x05\x03\x02\x02\x02KL\x07\b\x02\x02LM\x07"+
		"+\x02\x02MN\x07\x1C\x02\x02NO\b\x04\x01\x02O\x07\x03\x02\x02\x02PU\x05"+
		"\f\x07\x02QR\x05\f\x07\x02RS\x05\b\x05\x02SU\x03\x02\x02\x02TP\x03\x02"+
		"\x02\x02TQ\x03\x02\x02\x02U\t\x03\x02\x02\x02VW\x07\f\x02\x02WX\x07\x02"+
		"\x02\x03X\v\x03\x02\x02\x02Y`\x05\x0E\b\x02Z`\x05\x10\t\x02[\\\x05\x12"+
		"\n\x02\\]\x05\x10\t\x02]`\x03\x02\x02\x02^`\x07\x02\x02\x03_Y\x03\x02"+
		"\x02\x02_Z\x03\x02\x02\x02_[\x03\x02\x02\x02_^\x03\x02\x02\x02`\r\x03"+
		"\x02\x02\x02ab\x07\n\x02\x02bc\x07,\x02\x02cd\x07 \x02\x02de\x07\x06\x02"+
		"\x02ef\x07!\x02\x02fg\x07\x1C\x02\x02gt\b\b\x01\x02hi\x07\v\x02\x02ij"+
		"\x07,\x02\x02jk\x07 \x02\x02kl\x07\x06\x02\x02lm\x07!\x02\x02mn\x07\x1C"+
		"\x02\x02nt\b\b\x01\x02ot\x05\x14\v\x02pq\x05\x16\f\x02qr\x07\x1C\x02\x02"+
		"rt\x03\x02\x02\x02sa\x03\x02\x02\x02sh\x03\x02\x02\x02so\x03\x02\x02\x02"+
		"sp\x03\x02\x02\x02t\x0F\x03\x02\x02\x02uv\x05(\x15\x02vw\x07\x1C\x02\x02"+
		"w\x85\x03\x02\x02\x02xy\x05.\x18\x02yz\x07\x1C\x02\x02z\x85\x03\x02\x02"+
		"\x02{|\x056\x1C\x02|}\x07\x1C\x02\x02}\x85\x03\x02\x02\x02~\x7F\x058\x1D"+
		"\x02\x7F\x80\x07\x1C\x02\x02\x80\x85\x03\x02\x02\x02\x81\x82\x05<\x1F"+
		"\x02\x82\x83\x07\x1C\x02\x02\x83\x85\x03\x02\x02\x02\x84u\x03\x02\x02"+
		"\x02\x84x\x03\x02\x02\x02\x84{\x03\x02\x02\x02\x84~\x03\x02\x02\x02\x84"+
		"\x81\x03\x02\x02\x02\x85\x11\x03\x02\x02\x02\x86\x87\x07\x19\x02\x02\x87"+
		"\x88\x07\"\x02\x02\x88\x89\x07,\x02\x02\x89\x8A\x07\x1A\x02\x02\x8A\x8B"+
		"\x07\x06\x02\x02\x8B\x8C\x07#\x02\x02\x8C\x13\x03\x02\x02\x02\x8D\x8E"+
		"\x07*\x02\x02\x8E\x8F\x07,\x02\x02\x8F\x90\b\v\x01\x02\x90\x91\x05\x18"+
		"\r\x02\x91\x92\b\v\x01\x02\x92\x15\x03\x02\x02\x02\x93\x94\x07\x18\x02"+
		"\x02\x94\x95\x07,\x02\x02\x95\x96\x05\x1A\x0E\x02\x96\x97\b\f\x01\x02"+
		"\x97\x17\x03\x02\x02\x02\x98\x99\x05\x1C\x0F\x02\x99\x9A\x07\x1E\x02\x02"+
		"\x9A\x9B\x05\x1E\x10\x02\x9B\x9C\x07\x1F\x02\x02\x9C\xBE\x03\x02\x02\x02"+
		"\x9D\x9E\x07\"\x02\x02\x9E\x9F\x05\x1C\x0F\x02\x9F\xA0\x07#\x02\x02\xA0"+
		"\xA1\x05\x1C\x0F\x02\xA1\xA2\x07\x1E\x02\x02\xA2\xA3\x05\x1E\x10\x02\xA3"+
		"\xA4\x07\x1F\x02\x02\xA4\xBE\x03\x02\x02\x02\xA5\xA6\x07\"\x02\x02\xA6"+
		"\xA7\x05\x1C\x0F\x02\xA7\xA8\x07#\x02\x02\xA8\xA9\x05\x1C\x0F\x02\xA9"+
		"\xAA\x07\x1E\x02\x02\xAA\xAB\x07\x1F\x02\x02\xAB\xBE\x03\x02\x02\x02\xAC"+
		"\xAD\x07\"\x02\x02\xAD\xAE\x07#\x02\x02\xAE\xAF\x05\x1C\x0F\x02\xAF\xB0"+
		"\x07\x1E\x02\x02\xB0\xB1\x07\x1F\x02\x02\xB1\xBE\x03\x02\x02\x02\xB2\xB3"+
		"\x07\"\x02\x02\xB3\xB4\x07#\x02\x02\xB4\xB5\x05\x1C\x0F\x02\xB5\xB6\x07"+
		"\x1E\x02\x02\xB6\xB7\x05\x1E\x10\x02\xB7\xB8\x07\x1F\x02\x02\xB8\xBE\x03"+
		"\x02\x02\x02\xB9\xBA\x05\x1C\x0F\x02\xBA\xBB\x07\x1E\x02\x02\xBB\xBC\x07"+
		"\x1F\x02\x02\xBC\xBE\x03\x02\x02\x02\xBD\x98\x03\x02\x02\x02\xBD\x9D\x03"+
		"\x02\x02\x02\xBD\xA5\x03\x02\x02\x02\xBD\xAC\x03\x02\x02\x02\xBD\xB2\x03"+
		"\x02\x02\x02\xBD\xB9\x03\x02\x02\x02\xBE\x19\x03\x02\x02\x02\xBF\xC6\x05"+
		"\x1C\x0F\x02\xC0\xC1\x07\"\x02\x02\xC1\xC2\x05\x1C\x0F\x02\xC2\xC3\x07"+
		"#\x02\x02\xC3\xC4\x05\x1C\x0F\x02\xC4\xC6\x03\x02\x02\x02\xC5\xBF\x03"+
		"\x02\x02\x02\xC5\xC0\x03\x02\x02\x02\xC6\x1B\x03\x02\x02\x02\xC7\xCC\x07"+
		",\x02\x02\xC8\xC9\x07,\x02\x02\xC9\xCA\x07\x1D\x02\x02\xCA\xCC\x05\x1C"+
		"\x0F\x02\xCB\xC7\x03\x02\x02\x02\xCB\xC8\x03\x02\x02\x02\xCC\x1D\x03\x02"+
		"\x02\x02\xCD\xD2\x05 \x11\x02\xCE\xCF\x05 \x11\x02\xCF\xD0\x05\x1E\x10"+
		"\x02\xD0\xD2\x03\x02\x02\x02\xD1\xCD\x03\x02\x02\x02\xD1\xCE\x03\x02\x02"+
		"\x02\xD2\x1F\x03\x02\x02\x02\xD3\xD4\x07\x0E\x02\x02\xD4\xD5\x05\x1C\x0F"+
		"\x02\xD5\xD6\x07\x1C\x02\x02\xD6\xEA\x03\x02\x02\x02\xD7\xD8\x07\r\x02"+
		"\x02\xD8\xD9\x07\"\x02\x02\xD9\xDA\x05\"\x12\x02\xDA\xDB\x07#\x02\x02"+
		"\xDB\xDC\x05\x1C\x0F\x02\xDC\xDD\x07\x1C\x02\x02\xDD\xEA\x03\x02\x02\x02"+
		"\xDE\xDF\x07,\x02\x02\xDF\xE0\x05\x1C\x0F\x02\xE0\xE1\x07\x1C\x02\x02"+
		"\xE1\xEA\x03\x02\x02\x02\xE2\xE3\x07,\x02\x02\xE3\xE4\x07\"\x02\x02\xE4"+
		"\xE5\x05\"\x12\x02\xE5\xE6\x07#\x02\x02\xE6\xE7\x05\x1C\x0F\x02\xE7\xE8"+
		"\x07\x1C\x02\x02\xE8\xEA\x03\x02\x02\x02\xE9\xD3\x03\x02\x02\x02\xE9\xD7"+
		"\x03\x02\x02\x02\xE9\xDE\x03\x02\x02\x02\xE9\xE2\x03\x02\x02\x02\xEA!"+
		"\x03\x02\x02\x02\xEB\xEC\b\x12\x01\x02\xEC\xED\x05$\x13\x02\xED\xF3\x03"+
		"\x02\x02\x02\xEE\xEF\f\x03\x02\x02\xEF\xF0\x07\x1D\x02\x02\xF0\xF2\x05"+
		"$\x13\x02\xF1\xEE\x03\x02\x02\x02\xF2\xF5\x03\x02\x02\x02\xF3\xF1\x03"+
		"\x02\x02\x02\xF3\xF4\x03\x02\x02\x02\xF4#\x03\x02\x02\x02\xF5\xF3\x03"+
		"\x02\x02\x02\xF6\xF7\b\x13\x01\x02\xF7\u0107\x07\x06\x02\x02\xF8\u0107"+
		"\x07\x05\x02\x02\xF9\u0107\x07)\x02\x02\xFA\u0107\x07,\x02\x02\xFB\xFC"+
		"\x05&\x14\x02\xFC\xFD\x07\"\x02\x02\xFD\xFE\x05$\x13\x02\xFE\xFF\x07#"+
		"\x02\x02\xFF\u0107\x03\x02\x02\x02\u0100\u0101\x07(\x02\x02\u0101\u0107"+
		"\x05$\x13\t\u0102\u0103\x07\"\x02\x02\u0103\u0104\x05$\x13\x02\u0104\u0105"+
		"\x07#\x02\x02\u0105\u0107\x03\x02\x02\x02\u0106\xF6\x03\x02\x02\x02\u0106"+
		"\xF8\x03\x02\x02\x02\u0106\xF9\x03\x02\x02\x02\u0106\xFA\x03\x02\x02\x02"+
		"\u0106\xFB\x03\x02\x02\x02\u0106\u0100\x03\x02\x02\x02\u0106\u0102\x03"+
		"\x02\x02\x02\u0107\u0119\x03\x02\x02\x02\u0108\u0109\f\x07\x02\x02\u0109"+
		"\u010A\x07\'\x02\x02\u010A\u0118\x05$\x13\b\u010B\u010C\f\x06\x02\x02"+
		"\u010C\u010D\x07(\x02\x02\u010D\u0118\x05$\x13\x07\u010E\u010F\f\x05\x02"+
		"\x02\u010F\u0110\x07%\x02\x02\u0110\u0118\x05$\x13\x06\u0111\u0112\f\x04"+
		"\x02\x02\u0112\u0113\x07&\x02\x02\u0113\u0118\x05$\x13\x05\u0114\u0115"+
		"\f\x03\x02\x02\u0115\u0116\x07$\x02\x02\u0116\u0118\x05$\x13\x04\u0117"+
		"\u0108\x03\x02\x02\x02\u0117\u010B\x03\x02\x02\x02\u0117\u010E\x03\x02"+
		"\x02\x02\u0117\u0111\x03\x02\x02\x02\u0117\u0114\x03\x02\x02\x02\u0118"+
		"\u011B\x03\x02\x02\x02\u0119\u0117\x03\x02\x02\x02\u0119\u011A\x03\x02"+
		"\x02\x02\u011A%\x03\x02\x02\x02\u011B\u0119\x03\x02\x02\x02\u011C\u011D"+
		"\t\x02\x02\x02\u011D\'\x03\x02\x02\x02\u011E\u011F\x07\x15\x02\x02\u011F"+
		"\u0120\x05*\x16\x02\u0120\u0121\x07\x1B\x02\x02\u0121\u0122\x05,\x17\x02"+
		"\u0122\u012A\x03\x02\x02\x02\u0123\u0124\x07\x15\x02\x02\u0124\u0125\x07"+
		",\x02\x02\u0125\u0126\b\x15\x01\x02\u0126\u0127\x07\x1B\x02\x02\u0127"+
		"\u0128\x07,\x02\x02\u0128\u012A\b\x15\x01\x02\u0129\u011E\x03\x02\x02"+
		"\x02\u0129\u0123\x03\x02\x02\x02\u012A)\x03\x02\x02\x02\u012B\u012C\x07"+
		",\x02\x02\u012C\u012D\x07 \x02\x02\u012D\u012E\x07\x06\x02\x02\u012E\u012F"+
		"\x07!\x02\x02\u012F\u0130\b\x16\x01\x02\u0130+\x03\x02\x02\x02\u0131\u0132"+
		"\x07,\x02\x02\u0132\u0133\x07 \x02\x02\u0133\u0134\x07\x06\x02\x02\u0134"+
		"\u0135\x07!\x02\x02\u0135\u0136\b\x17\x01\x02\u0136-\x03\x02\x02\x02\u0137"+
		"\u0138\x07,\x02\x02\u0138\u0139\x07\"\x02\x02\u0139\u013A\x050\x19\x02"+
		"\u013A\u013B\x07#\x02\x02\u013B\u013C\x052\x1A\x02\u013C\u013D\b\x18\x01"+
		"\x02\u013D\u0143\x03\x02\x02\x02\u013E\u013F\x07,\x02\x02\u013F\u0140"+
		"\x052\x1A\x02\u0140\u0141\b\x18\x01\x02\u0141\u0143\x03\x02\x02\x02\u0142"+
		"\u0137\x03\x02\x02\x02\u0142\u013E\x03\x02\x02\x02\u0143/\x03\x02\x02"+
		"\x02\u0144\u0145\b\x19\x01\x02\u0145\u0146\x05$\x13\x02\u0146\u014C\x03"+
		"\x02\x02\x02\u0147\u0148\f\x03\x02\x02\u0148\u0149\x07\x1D\x02\x02\u0149"+
		"\u014B\x05$\x13\x02\u014A\u0147\x03\x02\x02\x02\u014B\u014E\x03\x02\x02"+
		"\x02\u014C\u014A\x03\x02\x02\x02\u014C\u014D\x03\x02\x02\x02\u014D1\x03"+
		"\x02\x02\x02\u014E\u014C\x03\x02\x02\x02\u014F\u0155\x054\x1B\x02\u0150"+
		"\u0151\x054\x1B\x02\u0151\u0152\x07\x1D\x02\x02\u0152\u0153\x052\x1A\x02"+
		"\u0153\u0155\x03\x02\x02\x02\u0154\u014F\x03\x02\x02\x02\u0154\u0150\x03"+
		"\x02\x02\x02\u01553\x03\x02\x02\x02\u0156\u015C\x07,\x02\x02\u0157\u0158"+
		"\x07,\x02\x02\u0158\u0159\x07 \x02\x02\u0159\u015A\x07\x06\x02\x02\u015A"+
		"\u015C\x07!\x02\x02\u015B\u0156\x03\x02\x02\x02\u015B\u0157\x03\x02\x02"+
		"\x02\u015C5\x03\x02\x02\x02\u015D\u015E\x07\x0E\x02\x02\u015E\u015F\x05"+
		"2\x1A\x02\u015F7\x03\x02\x02\x02\u0160\u0161\x07\x16\x02\x02\u0161\u0165"+
		"\x07,\x02\x02\u0162\u0163\x07\x16\x02\x02\u0163\u0165\x05:\x1E\x02\u0164"+
		"\u0160\x03\x02\x02\x02\u0164\u0162\x03\x02\x02\x02\u01659\x03\x02\x02"+
		"\x02\u0166\u016C\x05*\x16\x02\u0167\u0168\x05*\x16\x02\u0168\u0169\x07"+
		"\x1D\x02\x02\u0169\u016A\x05:\x1E\x02\u016A\u016C\x03\x02\x02\x02\u016B"+
		"\u0166\x03\x02\x02\x02\u016B\u0167\x03\x02\x02\x02\u016C;\x03\x02\x02"+
		"\x02\u016D\u016E\x07\x17\x02\x02\u016E\u0172\x07,\x02\x02\u016F\u0170"+
		"\x07\x17\x02\x02\u0170\u0172\x05*\x16\x02\u0171\u016D\x03\x02\x02\x02"+
		"\u0171\u016F\x03\x02\x02\x02\u0172=\x03\x02\x02\x02\x19CIT_s\x84\xBD\xC5"+
		"\xCB\xD1\xE9\xF3\u0106\u0117\u0119\u0129\u0142\u014C\u0154\u015B\u0164"+
		"\u016B\u0171";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QasmParser.__ATN) {
			QasmParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(QasmParser._serializedATN));
		}

		return QasmParser.__ATN;
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
	@Override public get ruleIndex(): number { return QasmParser.RULE_code; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterCode) listener.enterCode(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitCode) listener.exitCode(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitCode) return visitor.visitCode(this);
		else return visitor.visitChildren(this);
	}
}


export class HeadersContext extends ParserRuleContext {
	public QasmDescriptor(): TerminalNode | undefined { return this.tryGetToken(QasmParser.QasmDescriptor, 0); }
	public includeLibrary(): IncludeLibraryContext | undefined {
		return this.tryGetRuleContext(0, IncludeLibraryContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_headers; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterHeaders) listener.enterHeaders(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitHeaders) listener.exitHeaders(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitHeaders) return visitor.visitHeaders(this);
		else return visitor.visitChildren(this);
	}
}


export class IncludeLibraryContext extends ParserRuleContext {
	public _Library: Token;
	public Include(): TerminalNode { return this.getToken(QasmParser.Include, 0); }
	public Library(): TerminalNode { return this.getToken(QasmParser.Library, 0); }
	public Semi(): TerminalNode { return this.getToken(QasmParser.Semi, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_includeLibrary; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterIncludeLibrary) listener.enterIncludeLibrary(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitIncludeLibrary) listener.exitIncludeLibrary(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
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
	@Override public get ruleIndex(): number { return QasmParser.RULE_sentences; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterSentences) listener.enterSentences(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitSentences) listener.exitSentences(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitSentences) return visitor.visitSentences(this);
		else return visitor.visitChildren(this);
	}
}


export class CleanContext extends ParserRuleContext {
	public Clean(): TerminalNode { return this.getToken(QasmParser.Clean, 0); }
	public EOF(): TerminalNode { return this.getToken(QasmParser.EOF, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_clean; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterClean) listener.enterClean(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitClean) listener.exitClean(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
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
	public EOF(): TerminalNode | undefined { return this.tryGetToken(QasmParser.EOF, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_sentence; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterSentence) listener.enterSentence(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitSentence) listener.exitSentence(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitSentence) return visitor.visitSentence(this);
		else return visitor.visitChildren(this);
	}
}


export class DefinitionContext extends ParserRuleContext {
	public _Id: Token;
	public _size: Token;
	public Qreg(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Qreg, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Id, 0); }
	public LeftBrace(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftBrace, 0); }
	public RightBrace(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightBrace, 0); }
	public Semi(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Semi, 0); }
	public Int(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Int, 0); }
	public Creg(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Creg, 0); }
	public gateDefinition(): GateDefinitionContext | undefined {
		return this.tryGetRuleContext(0, GateDefinitionContext);
	}
	public opaqueDefinition(): OpaqueDefinitionContext | undefined {
		return this.tryGetRuleContext(0, OpaqueDefinitionContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_definition; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterDefinition) listener.enterDefinition(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitDefinition) listener.exitDefinition(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitDefinition) return visitor.visitDefinition(this);
		else return visitor.visitChildren(this);
	}
}


export class ExpressionContext extends ParserRuleContext {
	public measure(): MeasureContext | undefined {
		return this.tryGetRuleContext(0, MeasureContext);
	}
	public Semi(): TerminalNode { return this.getToken(QasmParser.Semi, 0); }
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
	@Override public get ruleIndex(): number { return QasmParser.RULE_expression; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterExpression) listener.enterExpression(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitExpression) listener.exitExpression(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitExpression) return visitor.visitExpression(this);
		else return visitor.visitChildren(this);
	}
}


export class ConditionalContext extends ParserRuleContext {
	public If(): TerminalNode { return this.getToken(QasmParser.If, 0); }
	public LeftParen(): TerminalNode { return this.getToken(QasmParser.LeftParen, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public Equals(): TerminalNode { return this.getToken(QasmParser.Equals, 0); }
	public Int(): TerminalNode { return this.getToken(QasmParser.Int, 0); }
	public RightParen(): TerminalNode { return this.getToken(QasmParser.RightParen, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_conditional; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterConditional) listener.enterConditional(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitConditional) listener.exitConditional(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitConditional) return visitor.visitConditional(this);
		else return visitor.visitChildren(this);
	}
}


export class GateDefinitionContext extends ParserRuleContext {
	public _Id: Token;
	public Gate(): TerminalNode { return this.getToken(QasmParser.Gate, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public gateDefinitionArguments(): GateDefinitionArgumentsContext {
		return this.getRuleContext(0, GateDefinitionArgumentsContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_gateDefinition; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterGateDefinition) listener.enterGateDefinition(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitGateDefinition) listener.exitGateDefinition(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitGateDefinition) return visitor.visitGateDefinition(this);
		else return visitor.visitChildren(this);
	}
}


export class OpaqueDefinitionContext extends ParserRuleContext {
	public _Id: Token;
	public Opaque(): TerminalNode { return this.getToken(QasmParser.Opaque, 0); }
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public opaqueDefinitionArguments(): OpaqueDefinitionArgumentsContext {
		return this.getRuleContext(0, OpaqueDefinitionArgumentsContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_opaqueDefinition; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterOpaqueDefinition) listener.enterOpaqueDefinition(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitOpaqueDefinition) listener.exitOpaqueDefinition(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
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
	public LeftCurlyBrace(): TerminalNode { return this.getToken(QasmParser.LeftCurlyBrace, 0); }
	public body(): BodyContext | undefined {
		return this.tryGetRuleContext(0, BodyContext);
	}
	public RightCurlyBrace(): TerminalNode { return this.getToken(QasmParser.RightCurlyBrace, 0); }
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_gateDefinitionArguments; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterGateDefinitionArguments) listener.enterGateDefinitionArguments(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitGateDefinitionArguments) listener.exitGateDefinitionArguments(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
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
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_opaqueDefinitionArguments; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterOpaqueDefinitionArguments) listener.enterOpaqueDefinitionArguments(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitOpaqueDefinitionArguments) listener.exitOpaqueDefinitionArguments(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitOpaqueDefinitionArguments) return visitor.visitOpaqueDefinitionArguments(this);
		else return visitor.visitChildren(this);
	}
}


export class ParamsListContext extends ParserRuleContext {
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	public paramsList(): ParamsListContext | undefined {
		return this.tryGetRuleContext(0, ParamsListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_paramsList; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterParamsList) listener.enterParamsList(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitParamsList) listener.exitParamsList(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
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
	@Override public get ruleIndex(): number { return QasmParser.RULE_body; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterBody) listener.enterBody(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitBody) listener.exitBody(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitBody) return visitor.visitBody(this);
		else return visitor.visitChildren(this);
	}
}


export class BodyExpressionContext extends ParserRuleContext {
	public Cx(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Cx, 0); }
	public paramsList(): ParamsListContext {
		return this.getRuleContext(0, ParamsListContext);
	}
	public Semi(): TerminalNode { return this.getToken(QasmParser.Semi, 0); }
	public U(): TerminalNode | undefined { return this.tryGetToken(QasmParser.U, 0); }
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public paramsListBody(): ParamsListBodyContext | undefined {
		return this.tryGetRuleContext(0, ParamsListBodyContext);
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Id, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_bodyExpression; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterBodyExpression) listener.enterBodyExpression(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitBodyExpression) listener.exitBodyExpression(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
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
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_paramsListBody; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterParamsListBody) listener.enterParamsListBody(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitParamsListBody) listener.exitParamsListBody(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitParamsListBody) return visitor.visitParamsListBody(this);
		else return visitor.visitChildren(this);
	}
}


export class ExpContext extends ParserRuleContext {
	public Int(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Int, 0); }
	public Real(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Real, 0); }
	public Pi(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Pi, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Id, 0); }
	public unaryOp(): UnaryOpContext | undefined {
		return this.tryGetRuleContext(0, UnaryOpContext);
	}
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public exp(): ExpContext[];
	public exp(i: number): ExpContext;
	public exp(i?: number): ExpContext | ExpContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpContext);
		} else {
			return this.getRuleContext(i, ExpContext);
		}
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_exp; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterExp) listener.enterExp(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitExp) listener.exitExp(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitExp) return visitor.visitExp(this);
		else return visitor.visitChildren(this);
	}
}


export class UnaryOpContext extends ParserRuleContext {
	public Sin(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Sin, 0); }
	public Cos(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Cos, 0); }
	public Tan(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Tan, 0); }
	public Exp(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Exp, 0); }
	public Ln(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Ln, 0); }
	public Sqrt(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Sqrt, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_unaryOp; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterUnaryOp) listener.enterUnaryOp(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitUnaryOp) listener.exitUnaryOp(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitUnaryOp) return visitor.visitUnaryOp(this);
		else return visitor.visitChildren(this);
	}
}


export class MeasureContext extends ParserRuleContext {
	public _q: Token;
	public _c: Token;
	public Measure(): TerminalNode { return this.getToken(QasmParser.Measure, 0); }
	public qubit(): QubitContext | undefined {
		return this.tryGetRuleContext(0, QubitContext);
	}
	public Assign(): TerminalNode { return this.getToken(QasmParser.Assign, 0); }
	public cbit(): CbitContext | undefined {
		return this.tryGetRuleContext(0, CbitContext);
	}
	public Id(): TerminalNode[];
	public Id(i: number): TerminalNode;
	public Id(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QasmParser.Id);
		} else {
			return this.getToken(QasmParser.Id, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_measure; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterMeasure) listener.enterMeasure(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitMeasure) listener.exitMeasure(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitMeasure) return visitor.visitMeasure(this);
		else return visitor.visitChildren(this);
	}
}


export class QubitContext extends ParserRuleContext {
	public _Id: Token;
	public _position: Token;
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public LeftBrace(): TerminalNode { return this.getToken(QasmParser.LeftBrace, 0); }
	public RightBrace(): TerminalNode { return this.getToken(QasmParser.RightBrace, 0); }
	public Int(): TerminalNode { return this.getToken(QasmParser.Int, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_qubit; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterQubit) listener.enterQubit(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitQubit) listener.exitQubit(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitQubit) return visitor.visitQubit(this);
		else return visitor.visitChildren(this);
	}
}


export class CbitContext extends ParserRuleContext {
	public _Id: Token;
	public _position: Token;
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public LeftBrace(): TerminalNode { return this.getToken(QasmParser.LeftBrace, 0); }
	public RightBrace(): TerminalNode { return this.getToken(QasmParser.RightBrace, 0); }
	public Int(): TerminalNode { return this.getToken(QasmParser.Int, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_cbit; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterCbit) listener.enterCbit(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitCbit) listener.exitCbit(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitCbit) return visitor.visitCbit(this);
		else return visitor.visitChildren(this);
	}
}


export class CustomArglistContext extends ParserRuleContext {
	public _Id: Token;
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public LeftParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftParen, 0); }
	public paramsListNumber(): ParamsListNumberContext | undefined {
		return this.tryGetRuleContext(0, ParamsListNumberContext);
	}
	public RightParen(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightParen, 0); }
	public qubitAndQregList(): QubitAndQregListContext {
		return this.getRuleContext(0, QubitAndQregListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_customArglist; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterCustomArglist) listener.enterCustomArglist(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitCustomArglist) listener.exitCustomArglist(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
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
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_paramsListNumber; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterParamsListNumber) listener.enterParamsListNumber(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitParamsListNumber) listener.exitParamsListNumber(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitParamsListNumber) return visitor.visitParamsListNumber(this);
		else return visitor.visitChildren(this);
	}
}


export class QubitAndQregListContext extends ParserRuleContext {
	public qbitOrQreg(): QbitOrQregContext {
		return this.getRuleContext(0, QbitOrQregContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	public qubitAndQregList(): QubitAndQregListContext | undefined {
		return this.tryGetRuleContext(0, QubitAndQregListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_qubitAndQregList; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterQubitAndQregList) listener.enterQubitAndQregList(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitQubitAndQregList) listener.exitQubitAndQregList(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitQubitAndQregList) return visitor.visitQubitAndQregList(this);
		else return visitor.visitChildren(this);
	}
}


export class QbitOrQregContext extends ParserRuleContext {
	public Id(): TerminalNode { return this.getToken(QasmParser.Id, 0); }
	public LeftBrace(): TerminalNode | undefined { return this.tryGetToken(QasmParser.LeftBrace, 0); }
	public Int(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Int, 0); }
	public RightBrace(): TerminalNode | undefined { return this.tryGetToken(QasmParser.RightBrace, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_qbitOrQreg; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterQbitOrQreg) listener.enterQbitOrQreg(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitQbitOrQreg) listener.exitQbitOrQreg(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitQbitOrQreg) return visitor.visitQbitOrQreg(this);
		else return visitor.visitChildren(this);
	}
}


export class CxGateContext extends ParserRuleContext {
	public Cx(): TerminalNode { return this.getToken(QasmParser.Cx, 0); }
	public qubitAndQregList(): QubitAndQregListContext {
		return this.getRuleContext(0, QubitAndQregListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_cxGate; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterCxGate) listener.enterCxGate(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitCxGate) listener.exitCxGate(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitCxGate) return visitor.visitCxGate(this);
		else return visitor.visitChildren(this);
	}
}


export class BarrierGateContext extends ParserRuleContext {
	public Barrier(): TerminalNode { return this.getToken(QasmParser.Barrier, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Id, 0); }
	public qubitList(): QubitListContext | undefined {
		return this.tryGetRuleContext(0, QubitListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_barrierGate; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterBarrierGate) listener.enterBarrierGate(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitBarrierGate) listener.exitBarrierGate(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitBarrierGate) return visitor.visitBarrierGate(this);
		else return visitor.visitChildren(this);
	}
}


export class QubitListContext extends ParserRuleContext {
	public qubit(): QubitContext {
		return this.getRuleContext(0, QubitContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Comma, 0); }
	public qubitList(): QubitListContext | undefined {
		return this.tryGetRuleContext(0, QubitListContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_qubitList; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterQubitList) listener.enterQubitList(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitQubitList) listener.exitQubitList(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitQubitList) return visitor.visitQubitList(this);
		else return visitor.visitChildren(this);
	}
}


export class ResetGateContext extends ParserRuleContext {
	public Reset(): TerminalNode { return this.getToken(QasmParser.Reset, 0); }
	public Id(): TerminalNode | undefined { return this.tryGetToken(QasmParser.Id, 0); }
	public qubit(): QubitContext | undefined {
		return this.tryGetRuleContext(0, QubitContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return QasmParser.RULE_resetGate; }
	@Override
	public enterRule(listener: QasmParserListener): void {
		if (listener.enterResetGate) listener.enterResetGate(this);
	}
	@Override
	public exitRule(listener: QasmParserListener): void {
		if (listener.exitResetGate) listener.exitResetGate(this);
	}
	@Override
	public accept<Result>(visitor: QasmParserVisitor<Result>): Result {
		if (visitor.visitResetGate) return visitor.visitResetGate(this);
		else return visitor.visitChildren(this);
	}
}


