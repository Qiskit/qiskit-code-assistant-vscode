// Generated from src/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { CharStream } from 'antlr4ts/CharStream';
import { Lexer } from 'antlr4ts/Lexer';
import { LexerATNSimulator } from 'antlr4ts/atn/LexerATNSimulator';
import { NotNull } from 'antlr4ts/Decorators';
import { Override } from 'antlr4ts/Decorators';
import { RuleContext } from 'antlr4ts/RuleContext';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';


export class QasmLexer extends Lexer {
	public static readonly T__0=1;
	public static readonly T__1=2;
	public static readonly T__2=3;
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE"
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, "'OPENQASM'", "'2.0'", "';'"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(QasmLexer._LITERAL_NAMES, QasmLexer._SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return QasmLexer.VOCABULARY;
	}


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(QasmLexer._ATN, this);
	}

	@Override
	public get grammarFileName(): string { return "Qasm.g4"; }

	@Override
	public get ruleNames(): string[] { return QasmLexer.ruleNames; }

	@Override
	public get serializedATN(): string { return QasmLexer._serializedATN; }

	@Override
	public get modeNames(): string[] { return QasmLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x02\x05\x18\b\x01"+
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x03\x02\x03\x02\x03\x02\x03"+
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03"+
		"\x03\x03\x04\x03\x04\x02\x02\x02\x05\x03\x02\x03\x05\x02\x04\x07\x02\x05"+
		"\x03\x02\x02\x17\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07"+
		"\x03\x02\x02\x02\x03\t\x03\x02\x02\x02\x05\x12\x03\x02\x02\x02\x07\x16"+
		"\x03\x02\x02\x02\t\n\x07Q\x02\x02\n\v\x07R\x02\x02\v\f\x07G\x02\x02\f"+
		"\r\x07P\x02\x02\r\x0E\x07S\x02\x02\x0E\x0F\x07C\x02\x02\x0F\x10\x07U\x02"+
		"\x02\x10\x11\x07O\x02\x02\x11\x04\x03\x02\x02\x02\x12\x13\x074\x02\x02"+
		"\x13\x14\x070\x02\x02\x14\x15\x072\x02\x02\x15\x06\x03\x02\x02\x02\x16"+
		"\x17\x07=\x02\x02\x17\b\x03\x02\x02\x02\x03\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QasmLexer.__ATN) {
			QasmLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(QasmLexer._serializedATN));
		}

		return QasmLexer.__ATN;
	}

}

