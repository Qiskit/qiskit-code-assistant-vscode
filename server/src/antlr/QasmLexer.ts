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
	public static readonly COMMENT=1;
	public static readonly WS=2;
	public static readonly REAL=3;
	public static readonly IBMQASM=4;
	public static readonly END_LINE=5;
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE"
	];

	public static readonly ruleNames: string[] = [
		"COMMENT", "WS", "REAL", "IBMQASM", "END_LINE"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, undefined, undefined, undefined, undefined, "';'"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
		undefined, "COMMENT", "WS", "REAL", "IBMQASM", "END_LINE"
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
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x02\x07<\b\x01\x04"+
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x03"+
		"\x02\x03\x02\x03\x02\x03\x02\x07\x02\x12\n\x02\f\x02\x0E\x02\x15\v\x02"+
		"\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x04\x06\x04\x1E\n"+
		"\x04\r\x04\x0E\x04\x1F\x03\x04\x03\x04\x06\x04$\n\x04\r\x04\x0E\x04%\x05"+
		"\x04(\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03"+
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x059"+
		"\n\x05\x03\x06\x03\x06\x02\x02\x02\x07\x03\x02\x03\x05\x02\x04\x07\x02"+
		"\x05\t\x02\x06\v\x02\x07\x03\x02\x05\x04\x02\f\f\x0F\x0F\x05\x02\v\f\x0F"+
		"\x0F\"\"\x03\x022;@\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02"+
		"\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x03\r"+
		"\x03\x02\x02\x02\x05\x18\x03\x02\x02\x02\x07\x1D\x03\x02\x02\x02\t8\x03"+
		"\x02\x02\x02\v:\x03\x02\x02\x02\r\x0E\x071\x02\x02\x0E\x0F\x071\x02\x02"+
		"\x0F\x13\x03\x02\x02\x02\x10\x12\n\x02\x02\x02\x11\x10\x03\x02\x02\x02"+
		"\x12\x15\x03\x02\x02\x02\x13\x11\x03\x02\x02\x02\x13\x14\x03\x02\x02\x02"+
		"\x14\x16\x03\x02\x02\x02\x15\x13\x03\x02\x02\x02\x16\x17\b\x02\x02\x02"+
		"\x17\x04\x03\x02\x02\x02\x18\x19\t\x03\x02\x02\x19\x1A\x03\x02\x02\x02"+
		"\x1A\x1B\b\x03\x02\x02\x1B\x06\x03\x02\x02\x02\x1C\x1E\t\x04\x02\x02\x1D"+
		"\x1C\x03\x02\x02\x02\x1E\x1F\x03\x02\x02\x02\x1F\x1D\x03\x02\x02\x02\x1F"+
		" \x03\x02\x02\x02 \'\x03\x02\x02\x02!#\x070\x02\x02\"$\t\x04\x02\x02#"+
		"\"\x03\x02\x02\x02$%\x03\x02\x02\x02%#\x03\x02\x02\x02%&\x03\x02\x02\x02"+
		"&(\x03\x02\x02\x02\'!\x03\x02\x02\x02\'(\x03\x02\x02\x02(\b\x03\x02\x02"+
		"\x02)*\x07Q\x02\x02*+\x07R\x02\x02+,\x07G\x02\x02,-\x07P\x02\x02-.\x07"+
		"S\x02\x02./\x07C\x02\x02/0\x07U\x02\x0209\x07O\x02\x0212\x07K\x02\x02"+
		"23\x07D\x02\x0234\x07O\x02\x0245\x07S\x02\x0256\x07C\x02\x0267\x07U\x02"+
		"\x0279\x07O\x02\x028)\x03\x02\x02\x0281\x03\x02\x02\x029\n\x03\x02\x02"+
		"\x02:;\x07=\x02\x02;\f\x03\x02\x02\x02\b\x02\x13\x1F%\'8\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QasmLexer.__ATN) {
			QasmLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(QasmLexer._serializedATN));
		}

		return QasmLexer.__ATN;
	}

}

