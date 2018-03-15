"use strict";
// Generated from src/qasm/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
class SymbolsTable {
    constructor() {
        this.qregs = [];
        this.cregs = [];
    }
}
const ATN_1 = require("antlr4ts/atn/ATN");
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const FailedPredicateException_1 = require("antlr4ts/FailedPredicateException");
const Decorators_1 = require("antlr4ts/Decorators");
const NoViableAltException_1 = require("antlr4ts/NoViableAltException");
const Decorators_2 = require("antlr4ts/Decorators");
const Parser_1 = require("antlr4ts/Parser");
const ParserRuleContext_1 = require("antlr4ts/ParserRuleContext");
const ParserATNSimulator_1 = require("antlr4ts/atn/ParserATNSimulator");
const RecognitionException_1 = require("antlr4ts/RecognitionException");
const RuleVersion_1 = require("antlr4ts/RuleVersion");
const Token_1 = require("antlr4ts/Token");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = require("antlr4ts/misc/Utils");
class QasmParser extends Parser_1.Parser {
    constructor(input) {
        super(input);
        this.symbolsTable = new SymbolsTable();
        this._interp = new ParserATNSimulator_1.ParserATNSimulator(QasmParser._ATN, this);
    }
    get vocabulary() {
        return QasmParser.VOCABULARY;
    }
    get grammarFileName() { return "Qasm.g4"; }
    get ruleNames() { return QasmParser.ruleNames; }
    get serializedATN() { return QasmParser._serializedATN; }
    declareCreg(input) {
        this.symbolsTable.cregs.push(input.text);
    }
    declareQreg(input) {
        this.symbolsTable.qregs.push(input.text);
    }
    declaredVariables() {
        let result = [];
        result.push(...this.symbolsTable.qregs);
        result.push(...this.symbolsTable.cregs);
        return result;
    }
    code() {
        let _localctx = new CodeContext(this._ctx, this.state);
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
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    headers() {
        let _localctx = new HeadersContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, QasmParser.RULE_headers);
        try {
            this.state = 71;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 1, this._ctx)) {
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
                        this.match(QasmParser.Include);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 70;
                        this.match(QasmParser.Include);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    sentences() {
        let _localctx = new SentencesContext(this._ctx, this.state);
        this.enterRule(_localctx, 4, QasmParser.RULE_sentences);
        try {
            this.state = 77;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 2, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 73;
                        this.sentence();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 74;
                        this.sentence();
                        this.state = 75;
                        this.sentences();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    clean() {
        let _localctx = new CleanContext(this._ctx, this.state);
        this.enterRule(_localctx, 6, QasmParser.RULE_clean);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 79;
                this.match(QasmParser.Clean);
                this.state = 80;
                this.match(QasmParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    sentence() {
        let _localctx = new SentenceContext(this._ctx, this.state);
        this.enterRule(_localctx, 8, QasmParser.RULE_sentence);
        try {
            this.state = 88;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Qreg:
                case QasmParser.Creg:
                case QasmParser.Opaque:
                case QasmParser.Gate:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 82;
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
                        this.state = 83;
                        this.expression();
                    }
                    break;
                case QasmParser.If:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 84;
                        this.conditional();
                        this.state = 85;
                        this.expression();
                    }
                    break;
                case QasmParser.EOF:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 87;
                        this.match(QasmParser.EOF);
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    definition() {
        let _localctx = new DefinitionContext(this._ctx, this.state);
        this.enterRule(_localctx, 10, QasmParser.RULE_definition);
        try {
            this.state = 106;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Qreg:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 90;
                        this.match(QasmParser.Qreg);
                        this.state = 91;
                        _localctx._Id = this.match(QasmParser.Id);
                        this.declareQreg(_localctx._Id);
                        this.state = 93;
                        this.qLine();
                        this.state = 94;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Creg:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 96;
                        this.match(QasmParser.Creg);
                        this.state = 97;
                        _localctx._Id = this.match(QasmParser.Id);
                        this.declareCreg(_localctx._Id);
                        this.state = 99;
                        this.qLine();
                        this.state = 100;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Gate:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 102;
                        this.gateDefinition();
                    }
                    break;
                case QasmParser.Opaque:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 103;
                        this.opaqueDefinition();
                        this.state = 104;
                        this.match(QasmParser.Semi);
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    expression() {
        let _localctx = new ExpressionContext(this._ctx, this.state);
        this.enterRule(_localctx, 12, QasmParser.RULE_expression);
        try {
            this.state = 123;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Measure:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 108;
                        this.measure();
                        this.state = 109;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Id:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 111;
                        this.customArglist();
                        this.state = 112;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Cx:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 114;
                        this.cxGate();
                        this.state = 115;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Barrier:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 117;
                        this.barrierGate();
                        this.state = 118;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Reset:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 120;
                        this.resetGate();
                        this.state = 121;
                        this.match(QasmParser.Semi);
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    conditional() {
        let _localctx = new ConditionalContext(this._ctx, this.state);
        this.enterRule(_localctx, 14, QasmParser.RULE_conditional);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 125;
                this.match(QasmParser.If);
                this.state = 126;
                this.match(QasmParser.LeftParen);
                this.state = 127;
                this.match(QasmParser.Id);
                this.state = 128;
                this.match(QasmParser.Equals);
                this.state = 129;
                this.match(QasmParser.Int);
                this.state = 130;
                this.match(QasmParser.RightParen);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    qLine() {
        let _localctx = new QLineContext(this._ctx, this.state);
        this.enterRule(_localctx, 16, QasmParser.RULE_qLine);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 132;
                this.match(QasmParser.LeftBrace);
                this.state = 133;
                this.match(QasmParser.Int);
                this.state = 134;
                this.match(QasmParser.RightBrace);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    gateDefinition() {
        let _localctx = new GateDefinitionContext(this._ctx, this.state);
        this.enterRule(_localctx, 18, QasmParser.RULE_gateDefinition);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 136;
                this.match(QasmParser.Gate);
                this.state = 137;
                this.match(QasmParser.Id);
                this.state = 138;
                this.gateDefinitionArguments();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    opaqueDefinition() {
        let _localctx = new OpaqueDefinitionContext(this._ctx, this.state);
        this.enterRule(_localctx, 20, QasmParser.RULE_opaqueDefinition);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 140;
                this.match(QasmParser.Opaque);
                this.state = 141;
                this.match(QasmParser.Id);
                this.state = 142;
                this.opaqueDefinitionArguments();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    gateDefinitionArguments() {
        let _localctx = new GateDefinitionArgumentsContext(this._ctx, this.state);
        this.enterRule(_localctx, 22, QasmParser.RULE_gateDefinitionArguments);
        try {
            this.state = 181;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 6, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 144;
                        this.paramsList();
                        this.state = 145;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 146;
                        this.body();
                        this.state = 147;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 149;
                        this.match(QasmParser.LeftParen);
                        this.state = 150;
                        this.paramsList();
                        this.state = 151;
                        this.match(QasmParser.RightParen);
                        this.state = 152;
                        this.paramsList();
                        this.state = 153;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 154;
                        this.body();
                        this.state = 155;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 157;
                        this.match(QasmParser.LeftParen);
                        this.state = 158;
                        this.paramsList();
                        this.state = 159;
                        this.match(QasmParser.RightParen);
                        this.state = 160;
                        this.paramsList();
                        this.state = 161;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 162;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 164;
                        this.match(QasmParser.LeftParen);
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
                case 5:
                    this.enterOuterAlt(_localctx, 5);
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
                        this.body();
                        this.state = 175;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
                case 6:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 177;
                        this.paramsList();
                        this.state = 178;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 179;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    opaqueDefinitionArguments() {
        let _localctx = new OpaqueDefinitionArgumentsContext(this._ctx, this.state);
        this.enterRule(_localctx, 24, QasmParser.RULE_opaqueDefinitionArguments);
        try {
            this.state = 189;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Id:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 183;
                        this.paramsList();
                    }
                    break;
                case QasmParser.LeftParen:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 184;
                        this.match(QasmParser.LeftParen);
                        this.state = 185;
                        this.paramsList();
                        this.state = 186;
                        this.match(QasmParser.RightParen);
                        this.state = 187;
                        this.paramsList();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    paramsList() {
        let _localctx = new ParamsListContext(this._ctx, this.state);
        this.enterRule(_localctx, 26, QasmParser.RULE_paramsList);
        try {
            this.state = 195;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 8, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 191;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 192;
                        this.match(QasmParser.Id);
                        this.state = 193;
                        this.match(QasmParser.Comma);
                        this.state = 194;
                        this.paramsList();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    body() {
        let _localctx = new BodyContext(this._ctx, this.state);
        this.enterRule(_localctx, 28, QasmParser.RULE_body);
        try {
            this.state = 201;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 197;
                        this.bodyExpression();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 198;
                        this.bodyExpression();
                        this.state = 199;
                        this.body();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    bodyExpression() {
        let _localctx = new BodyExpressionContext(this._ctx, this.state);
        this.enterRule(_localctx, 30, QasmParser.RULE_bodyExpression);
        try {
            this.state = 225;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 10, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 203;
                        this.match(QasmParser.Cx);
                        this.state = 204;
                        this.paramsList();
                        this.state = 205;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 207;
                        this.match(QasmParser.U);
                        this.state = 208;
                        this.match(QasmParser.LeftParen);
                        this.state = 209;
                        this.paramsListBody(0);
                        this.state = 210;
                        this.match(QasmParser.RightParen);
                        this.state = 211;
                        this.paramsList();
                        this.state = 212;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 214;
                        this.match(QasmParser.Id);
                        this.state = 215;
                        this.paramsList();
                        this.state = 216;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 218;
                        this.match(QasmParser.Id);
                        this.state = 219;
                        this.match(QasmParser.LeftParen);
                        this.state = 220;
                        this.paramsListBody(0);
                        this.state = 221;
                        this.match(QasmParser.RightParen);
                        this.state = 222;
                        this.paramsList();
                        this.state = 223;
                        this.match(QasmParser.Semi);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    paramsListBody(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new ParamsListBodyContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 32;
        this.enterRecursionRule(_localctx, 32, QasmParser.RULE_paramsListBody, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 228;
                    this.exp(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 235;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new ParamsListBodyContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_paramsListBody);
                                this.state = 230;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 231;
                                this.match(QasmParser.Comma);
                                this.state = 232;
                                this.exp(0);
                            }
                        }
                    }
                    this.state = 237;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return _localctx;
    }
    exp(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new ExpContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 34;
        this.enterRecursionRule(_localctx, 34, QasmParser.RULE_exp, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 254;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case QasmParser.Int:
                        {
                            this.state = 239;
                            this.match(QasmParser.Int);
                        }
                        break;
                    case QasmParser.Real:
                        {
                            this.state = 240;
                            this.match(QasmParser.Real);
                        }
                        break;
                    case QasmParser.Pi:
                        {
                            this.state = 241;
                            this.match(QasmParser.Pi);
                        }
                        break;
                    case QasmParser.Id:
                        {
                            this.state = 242;
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
                            this.state = 243;
                            this.unaryOp();
                            this.state = 244;
                            this.match(QasmParser.LeftParen);
                            this.state = 245;
                            this.exp(0);
                            this.state = 246;
                            this.match(QasmParser.RightParen);
                        }
                        break;
                    case QasmParser.Subs:
                        {
                            this.state = 248;
                            this.match(QasmParser.Subs);
                            this.state = 249;
                            this.exp(7);
                        }
                        break;
                    case QasmParser.LeftParen:
                        {
                            this.state = 250;
                            this.match(QasmParser.LeftParen);
                            this.state = 251;
                            this.exp(0);
                            this.state = 252;
                            this.match(QasmParser.RightParen);
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 273;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            this.state = 271;
                            this._errHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this._input, 13, this._ctx)) {
                                case 1:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 256;
                                        if (!(this.precpred(this._ctx, 5)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                                        this.state = 257;
                                        this.match(QasmParser.Sum);
                                        this.state = 258;
                                        this.exp(6);
                                    }
                                    break;
                                case 2:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 259;
                                        if (!(this.precpred(this._ctx, 4)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                                        this.state = 260;
                                        this.match(QasmParser.Subs);
                                        this.state = 261;
                                        this.exp(5);
                                    }
                                    break;
                                case 3:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 262;
                                        if (!(this.precpred(this._ctx, 3)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                                        this.state = 263;
                                        this.match(QasmParser.Mult);
                                        this.state = 264;
                                        this.exp(4);
                                    }
                                    break;
                                case 4:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 265;
                                        if (!(this.precpred(this._ctx, 2)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                                        this.state = 266;
                                        this.match(QasmParser.Div);
                                        this.state = 267;
                                        this.exp(3);
                                    }
                                    break;
                                case 5:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 268;
                                        if (!(this.precpred(this._ctx, 1)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                        this.state = 269;
                                        this.match(QasmParser.Pow);
                                        this.state = 270;
                                        this.exp(2);
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 275;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return _localctx;
    }
    unaryOp() {
        let _localctx = new UnaryOpContext(this._ctx, this.state);
        this.enterRule(_localctx, 36, QasmParser.RULE_unaryOp);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 276;
                _la = this._input.LA(1);
                if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << QasmParser.Sin) | (1 << QasmParser.Cos) | (1 << QasmParser.Tan) | (1 << QasmParser.Exp) | (1 << QasmParser.Ln) | (1 << QasmParser.Sqrt))) !== 0))) {
                    this._errHandler.recoverInline(this);
                }
                else {
                    if (this._input.LA(1) === Token_1.Token.EOF) {
                        this.matchedEOF = true;
                    }
                    this._errHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    measure() {
        let _localctx = new MeasureContext(this._ctx, this.state);
        this.enterRule(_localctx, 38, QasmParser.RULE_measure);
        try {
            this.state = 287;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 15, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 278;
                        this.match(QasmParser.Measure);
                        this.state = 279;
                        this.qubit();
                        this.state = 280;
                        this.match(QasmParser.Assign);
                        this.state = 281;
                        this.cbit();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 283;
                        this.match(QasmParser.Measure);
                        this.state = 284;
                        this.match(QasmParser.Id);
                        this.state = 285;
                        this.match(QasmParser.Assign);
                        this.state = 286;
                        this.match(QasmParser.Id);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    qubit() {
        let _localctx = new QubitContext(this._ctx, this.state);
        this.enterRule(_localctx, 40, QasmParser.RULE_qubit);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 289;
                this.match(QasmParser.Id);
                this.state = 290;
                this.qLine();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    cbit() {
        let _localctx = new CbitContext(this._ctx, this.state);
        this.enterRule(_localctx, 42, QasmParser.RULE_cbit);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 292;
                this.match(QasmParser.Id);
                this.state = 293;
                this.qLine();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    customArglist() {
        let _localctx = new CustomArglistContext(this._ctx, this.state);
        this.enterRule(_localctx, 44, QasmParser.RULE_customArglist);
        try {
            this.state = 303;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 16, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 295;
                        this.match(QasmParser.Id);
                        this.state = 296;
                        this.match(QasmParser.LeftParen);
                        this.state = 297;
                        this.paramsListNumber(0);
                        this.state = 298;
                        this.match(QasmParser.RightParen);
                        this.state = 299;
                        this.qubitAndQregList();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 301;
                        this.match(QasmParser.Id);
                        this.state = 302;
                        this.qubitAndQregList();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    paramsListNumber(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new ParamsListNumberContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 46;
        this.enterRecursionRule(_localctx, 46, QasmParser.RULE_paramsListNumber, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 306;
                    this.exp(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 313;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 17, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new ParamsListNumberContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_paramsListNumber);
                                this.state = 308;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 309;
                                this.match(QasmParser.Comma);
                                this.state = 310;
                                this.exp(0);
                            }
                        }
                    }
                    this.state = 315;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 17, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return _localctx;
    }
    qubitAndQregList() {
        let _localctx = new QubitAndQregListContext(this._ctx, this.state);
        this.enterRule(_localctx, 48, QasmParser.RULE_qubitAndQregList);
        try {
            this.state = 321;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 18, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 316;
                        this.qbitOrQreg();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 317;
                        this.qbitOrQreg();
                        this.state = 318;
                        this.match(QasmParser.Comma);
                        this.state = 319;
                        this.qubitAndQregList();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    qbitOrQreg() {
        let _localctx = new QbitOrQregContext(this._ctx, this.state);
        this.enterRule(_localctx, 50, QasmParser.RULE_qbitOrQreg);
        try {
            this.state = 326;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 19, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 323;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 324;
                        this.match(QasmParser.Id);
                        this.state = 325;
                        this.qLine();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    cxGate() {
        let _localctx = new CxGateContext(this._ctx, this.state);
        this.enterRule(_localctx, 52, QasmParser.RULE_cxGate);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 328;
                this.match(QasmParser.Cx);
                this.state = 329;
                this.qubitAndQregList();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    barrierGate() {
        let _localctx = new BarrierGateContext(this._ctx, this.state);
        this.enterRule(_localctx, 54, QasmParser.RULE_barrierGate);
        try {
            this.state = 335;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 20, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 331;
                        this.match(QasmParser.Barrier);
                        this.state = 332;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 333;
                        this.match(QasmParser.Barrier);
                        this.state = 334;
                        this.qubitList();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    qubitList() {
        let _localctx = new QubitListContext(this._ctx, this.state);
        this.enterRule(_localctx, 56, QasmParser.RULE_qubitList);
        try {
            this.state = 342;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 21, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 337;
                        this.qubit();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 338;
                        this.qubit();
                        this.state = 339;
                        this.match(QasmParser.Comma);
                        this.state = 340;
                        this.qubitList();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    resetGate() {
        let _localctx = new ResetGateContext(this._ctx, this.state);
        this.enterRule(_localctx, 58, QasmParser.RULE_resetGate);
        try {
            this.state = 348;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 22, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 344;
                        this.match(QasmParser.Reset);
                        this.state = 345;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 346;
                        this.match(QasmParser.Reset);
                        this.state = 347;
                        this.qubit();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    sempred(_localctx, ruleIndex, predIndex) {
        switch (ruleIndex) {
            case 16:
                return this.paramsListBody_sempred(_localctx, predIndex);
            case 17:
                return this.exp_sempred(_localctx, predIndex);
            case 23:
                return this.paramsListNumber_sempred(_localctx, predIndex);
        }
        return true;
    }
    paramsListBody_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 0:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    exp_sempred(_localctx, predIndex) {
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
    paramsListNumber_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 6:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    static get _ATN() {
        if (!QasmParser.__ATN) {
            QasmParser.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(QasmParser._serializedATN));
        }
        return QasmParser.__ATN;
    }
}
QasmParser.Comment = 1;
QasmParser.WhiteSpace = 2;
QasmParser.Real = 3;
QasmParser.Int = 4;
QasmParser.QasmDescriptor = 5;
QasmParser.Include = 6;
QasmParser.Qelib = 7;
QasmParser.Qreg = 8;
QasmParser.Creg = 9;
QasmParser.Clean = 10;
QasmParser.U = 11;
QasmParser.Cx = 12;
QasmParser.Sin = 13;
QasmParser.Cos = 14;
QasmParser.Tan = 15;
QasmParser.Exp = 16;
QasmParser.Ln = 17;
QasmParser.Sqrt = 18;
QasmParser.Measure = 19;
QasmParser.Barrier = 20;
QasmParser.Reset = 21;
QasmParser.Opaque = 22;
QasmParser.If = 23;
QasmParser.Equals = 24;
QasmParser.Assign = 25;
QasmParser.Semi = 26;
QasmParser.Comma = 27;
QasmParser.LeftCurlyBrace = 28;
QasmParser.RightCurlyBrace = 29;
QasmParser.LeftBrace = 30;
QasmParser.RightBrace = 31;
QasmParser.LeftParen = 32;
QasmParser.RightParen = 33;
QasmParser.Pow = 34;
QasmParser.Mult = 35;
QasmParser.Div = 36;
QasmParser.Sum = 37;
QasmParser.Subs = 38;
QasmParser.Pi = 39;
QasmParser.Gate = 40;
QasmParser.Id = 41;
QasmParser.RULE_code = 0;
QasmParser.RULE_headers = 1;
QasmParser.RULE_sentences = 2;
QasmParser.RULE_clean = 3;
QasmParser.RULE_sentence = 4;
QasmParser.RULE_definition = 5;
QasmParser.RULE_expression = 6;
QasmParser.RULE_conditional = 7;
QasmParser.RULE_qLine = 8;
QasmParser.RULE_gateDefinition = 9;
QasmParser.RULE_opaqueDefinition = 10;
QasmParser.RULE_gateDefinitionArguments = 11;
QasmParser.RULE_opaqueDefinitionArguments = 12;
QasmParser.RULE_paramsList = 13;
QasmParser.RULE_body = 14;
QasmParser.RULE_bodyExpression = 15;
QasmParser.RULE_paramsListBody = 16;
QasmParser.RULE_exp = 17;
QasmParser.RULE_unaryOp = 18;
QasmParser.RULE_measure = 19;
QasmParser.RULE_qubit = 20;
QasmParser.RULE_cbit = 21;
QasmParser.RULE_customArglist = 22;
QasmParser.RULE_paramsListNumber = 23;
QasmParser.RULE_qubitAndQregList = 24;
QasmParser.RULE_qbitOrQreg = 25;
QasmParser.RULE_cxGate = 26;
QasmParser.RULE_barrierGate = 27;
QasmParser.RULE_qubitList = 28;
QasmParser.RULE_resetGate = 29;
QasmParser.ruleNames = [
    "code", "headers", "sentences", "clean", "sentence", "definition", "expression",
    "conditional", "qLine", "gateDefinition", "opaqueDefinition", "gateDefinitionArguments",
    "opaqueDefinitionArguments", "paramsList", "body", "bodyExpression", "paramsListBody",
    "exp", "unaryOp", "measure", "qubit", "cbit", "customArglist", "paramsListNumber",
    "qubitAndQregList", "qbitOrQreg", "cxGate", "barrierGate", "qubitList",
    "resetGate"
];
QasmParser._LITERAL_NAMES = [
    undefined, undefined, undefined, undefined, undefined, undefined, "'include \"quelib1.inc\";'",
    "'QELIB.INC'", "'qreg'", "'creg'", "'clean'", "'U'", "'CX'", "'sin'",
    "'cos'", "'tan'", "'exp'", "'ln'", "'sqrt'", "'measure'", "'barrier'",
    "'reset'", "'opaque'", "'if'", "'=='", "'->'", "';'", "','", "'{'", "'}'",
    "'['", "']'", "'('", "')'", "'^'", "'*'", "'/'", "'+'", "'-'", "'pi'",
    "'gate'"
];
QasmParser._SYMBOLIC_NAMES = [
    undefined, "Comment", "WhiteSpace", "Real", "Int", "QasmDescriptor", "Include",
    "Qelib", "Qreg", "Creg", "Clean", "U", "Cx", "Sin", "Cos", "Tan", "Exp",
    "Ln", "Sqrt", "Measure", "Barrier", "Reset", "Opaque", "If", "Equals",
    "Assign", "Semi", "Comma", "LeftCurlyBrace", "RightCurlyBrace", "LeftBrace",
    "RightBrace", "LeftParen", "RightParen", "Pow", "Mult", "Div", "Sum",
    "Subs", "Pi", "Gate", "Id"
];
QasmParser.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(QasmParser._LITERAL_NAMES, QasmParser._SYMBOLIC_NAMES, []);
QasmParser._serializedATN = "\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03+\u0161\x04\x02" +
    "\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
    "\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
    "\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
    "\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
    "\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
    "\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x03\x02\x03\x02\x03\x02\x03\x02" +
    "\x03\x02\x05\x02D\n\x02\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03J\n\x03" +
    "\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04P\n\x04\x03\x05\x03\x05\x03\x05" +
    "\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06[\n\x06\x03\x07" +
    "\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07" +
    "\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07m\n\x07\x03\b" +
    "\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
    "\b\x03\b\x03\b\x05\b~\n\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03" +
    "\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03" +
    "\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
    "\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
    "\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
    "\r\x05\r\xB8\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E" +
    "\xC0\n\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xC6\n\x0F\x03\x10\x03" +
    "\x10\x03\x10\x03\x10\x05\x10\xCC\n\x10\x03\x11\x03\x11\x03\x11\x03\x11" +
    "\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
    "\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
    "\x05\x11\xE4\n\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x07" +
    "\x12\xEC\n\x12\f\x12\x0E\x12\xEF\v\x12\x03\x13\x03\x13\x03\x13\x03\x13" +
    "\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13" +
    "\x03\x13\x03\x13\x03\x13\x05\x13\u0101\n\x13\x03\x13\x03\x13\x03\x13\x03" +
    "\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
    "\x13\x03\x13\x03\x13\x07\x13\u0112\n\x13\f\x13\x0E\x13\u0115\v\x13\x03" +
    "\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03" +
    "\x15\x03\x15\x05\x15\u0122\n\x15\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17" +
    "\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18" +
    "\x05\x18\u0132\n\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x07" +
    "\x19\u013A\n\x19\f\x19\x0E\x19\u013D\v\x19\x03\x1A\x03\x1A\x03\x1A\x03" +
    "\x1A\x03\x1A\x05\x1A\u0144\n\x1A\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u0149" +
    "\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D" +
    "\u0152\n\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u0159\n\x1E" +
    "\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u015F\n\x1F\x03\x1F\x02\x02\x05" +
    "\"$0 \x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02" +
    "\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02" +
    "(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02\x02\x03\x03\x02" +
    "\x0F\x14\u0170\x02C\x03\x02\x02\x02\x04I\x03\x02\x02\x02\x06O\x03\x02" +
    "\x02\x02\bQ\x03\x02\x02\x02\nZ\x03\x02\x02\x02\fl\x03\x02\x02\x02\x0E" +
    "}\x03\x02\x02\x02\x10\x7F\x03\x02\x02\x02\x12\x86\x03\x02\x02\x02\x14" +
    "\x8A\x03\x02\x02\x02\x16\x8E\x03\x02\x02\x02\x18\xB7\x03\x02\x02\x02\x1A" +
    "\xBF\x03\x02\x02\x02\x1C\xC5\x03\x02\x02\x02\x1E\xCB\x03\x02\x02\x02 " +
    "\xE3\x03\x02\x02\x02\"\xE5\x03\x02\x02\x02$\u0100\x03\x02\x02\x02&\u0116" +
    "\x03\x02\x02\x02(\u0121\x03\x02\x02\x02*\u0123\x03\x02\x02\x02,\u0126" +
    "\x03\x02\x02\x02.\u0131\x03\x02\x02\x020\u0133\x03\x02\x02\x022\u0143" +
    "\x03\x02\x02\x024\u0148\x03\x02\x02\x026\u014A\x03\x02\x02\x028\u0151" +
    "\x03\x02\x02\x02:\u0158\x03\x02\x02\x02<\u015E\x03\x02\x02\x02>D\x05\x06" +
    "\x04\x02?@\x05\x04\x03\x02@A\x05\x06\x04\x02AD\x03\x02\x02\x02BD\x05\b" +
    "\x05\x02C>\x03\x02\x02\x02C?\x03\x02\x02\x02CB\x03\x02\x02\x02D\x03\x03" +
    "\x02\x02\x02EJ\x07\x07\x02\x02FG\x07\x07\x02\x02GJ\x07\b\x02\x02HJ\x07" +
    "\b\x02\x02IE\x03\x02\x02\x02IF\x03\x02\x02\x02IH\x03\x02\x02\x02J\x05" +
    "\x03\x02\x02\x02KP\x05\n\x06\x02LM\x05\n\x06\x02MN\x05\x06\x04\x02NP\x03" +
    "\x02\x02\x02OK\x03\x02\x02\x02OL\x03\x02\x02\x02P\x07\x03\x02\x02\x02" +
    "QR\x07\f\x02\x02RS\x07\x02\x02\x03S\t\x03\x02\x02\x02T[\x05\f\x07\x02" +
    "U[\x05\x0E\b\x02VW\x05\x10\t\x02WX\x05\x0E\b\x02X[\x03\x02\x02\x02Y[\x07" +
    "\x02\x02\x03ZT\x03\x02\x02\x02ZU\x03\x02\x02\x02ZV\x03\x02\x02\x02ZY\x03" +
    "\x02\x02\x02[\v\x03\x02\x02\x02\\]\x07\n\x02\x02]^\x07+\x02\x02^_\b\x07" +
    "\x01\x02_`\x05\x12\n\x02`a\x07\x1C\x02\x02am\x03\x02\x02\x02bc\x07\v\x02" +
    "\x02cd\x07+\x02\x02de\b\x07\x01\x02ef\x05\x12\n\x02fg\x07\x1C\x02\x02" +
    "gm\x03\x02\x02\x02hm\x05\x14\v\x02ij\x05\x16\f\x02jk\x07\x1C\x02\x02k" +
    "m\x03\x02\x02\x02l\\\x03\x02\x02\x02lb\x03\x02\x02\x02lh\x03\x02\x02\x02" +
    "li\x03\x02\x02\x02m\r\x03\x02\x02\x02no\x05(\x15\x02op\x07\x1C\x02\x02" +
    "p~\x03\x02\x02\x02qr\x05.\x18\x02rs\x07\x1C\x02\x02s~\x03\x02\x02\x02" +
    "tu\x056\x1C\x02uv\x07\x1C\x02\x02v~\x03\x02\x02\x02wx\x058\x1D\x02xy\x07" +
    "\x1C\x02\x02y~\x03\x02\x02\x02z{\x05<\x1F\x02{|\x07\x1C\x02\x02|~\x03" +
    "\x02\x02\x02}n\x03\x02\x02\x02}q\x03\x02\x02\x02}t\x03\x02\x02\x02}w\x03" +
    "\x02\x02\x02}z\x03\x02\x02\x02~\x0F\x03\x02\x02\x02\x7F\x80\x07\x19\x02" +
    "\x02\x80\x81\x07\"\x02\x02\x81\x82\x07+\x02\x02\x82\x83\x07\x1A\x02\x02" +
    "\x83\x84\x07\x06\x02\x02\x84\x85\x07#\x02\x02\x85\x11\x03\x02\x02\x02" +
    "\x86\x87\x07 \x02\x02\x87\x88\x07\x06\x02\x02\x88\x89\x07!\x02\x02\x89" +
    "\x13\x03\x02\x02\x02\x8A\x8B\x07*\x02\x02\x8B\x8C\x07+\x02\x02\x8C\x8D" +
    "\x05\x18\r\x02\x8D\x15\x03\x02\x02\x02\x8E\x8F\x07\x18\x02\x02\x8F\x90" +
    "\x07+\x02\x02\x90\x91\x05\x1A\x0E\x02\x91\x17\x03\x02\x02\x02\x92\x93" +
    "\x05\x1C\x0F\x02\x93\x94\x07\x1E\x02\x02\x94\x95\x05\x1E\x10\x02\x95\x96" +
    "\x07\x1F\x02\x02\x96\xB8\x03\x02\x02\x02\x97\x98\x07\"\x02\x02\x98\x99" +
    "\x05\x1C\x0F\x02\x99\x9A\x07#\x02\x02\x9A\x9B\x05\x1C\x0F\x02\x9B\x9C" +
    "\x07\x1E\x02\x02\x9C\x9D\x05\x1E\x10\x02\x9D\x9E\x07\x1F\x02\x02\x9E\xB8" +
    "\x03\x02\x02\x02\x9F\xA0\x07\"\x02\x02\xA0\xA1\x05\x1C\x0F\x02\xA1\xA2" +
    "\x07#\x02\x02\xA2\xA3\x05\x1C\x0F\x02\xA3\xA4\x07\x1E\x02\x02\xA4\xA5" +
    "\x07\x1F\x02\x02\xA5\xB8\x03\x02\x02\x02\xA6\xA7\x07\"\x02\x02\xA7\xA8" +
    "\x07#\x02\x02\xA8\xA9\x05\x1C\x0F\x02\xA9\xAA\x07\x1E\x02\x02\xAA\xAB" +
    "\x07\x1F\x02\x02\xAB\xB8\x03\x02\x02\x02\xAC\xAD\x07\"\x02\x02\xAD\xAE" +
    "\x07#\x02\x02\xAE\xAF\x05\x1C\x0F\x02\xAF\xB0\x07\x1E\x02\x02\xB0\xB1" +
    "\x05\x1E\x10\x02\xB1\xB2\x07\x1F\x02\x02\xB2\xB8\x03\x02\x02\x02\xB3\xB4" +
    "\x05\x1C\x0F\x02\xB4\xB5\x07\x1E\x02\x02\xB5\xB6\x07\x1F\x02\x02\xB6\xB8" +
    "\x03\x02\x02\x02\xB7\x92\x03\x02\x02\x02\xB7\x97\x03\x02\x02\x02\xB7\x9F" +
    "\x03\x02\x02\x02\xB7\xA6\x03\x02\x02\x02\xB7\xAC\x03\x02\x02\x02\xB7\xB3" +
    "\x03\x02\x02\x02\xB8\x19\x03\x02\x02\x02\xB9\xC0\x05\x1C\x0F\x02\xBA\xBB" +
    "\x07\"\x02\x02\xBB\xBC\x05\x1C\x0F\x02\xBC\xBD\x07#\x02\x02\xBD\xBE\x05" +
    "\x1C\x0F\x02\xBE\xC0\x03\x02\x02\x02\xBF\xB9\x03\x02\x02\x02\xBF\xBA\x03" +
    "\x02\x02\x02\xC0\x1B\x03\x02\x02\x02\xC1\xC6\x07+\x02\x02\xC2\xC3\x07" +
    "+\x02\x02\xC3\xC4\x07\x1D\x02\x02\xC4\xC6\x05\x1C\x0F\x02\xC5\xC1\x03" +
    "\x02\x02\x02\xC5\xC2\x03\x02\x02\x02\xC6\x1D\x03\x02\x02\x02\xC7\xCC\x05" +
    " \x11\x02\xC8\xC9\x05 \x11\x02\xC9\xCA\x05\x1E\x10\x02\xCA\xCC\x03\x02" +
    "\x02\x02\xCB\xC7\x03\x02\x02\x02\xCB\xC8\x03\x02\x02\x02\xCC\x1F\x03\x02" +
    "\x02\x02\xCD\xCE\x07\x0E\x02\x02\xCE\xCF\x05\x1C\x0F\x02\xCF\xD0\x07\x1C" +
    "\x02\x02\xD0\xE4\x03\x02\x02\x02\xD1\xD2\x07\r\x02\x02\xD2\xD3\x07\"\x02" +
    "\x02\xD3\xD4\x05\"\x12\x02\xD4\xD5\x07#\x02\x02\xD5\xD6\x05\x1C\x0F\x02" +
    "\xD6\xD7\x07\x1C\x02\x02\xD7\xE4\x03\x02\x02\x02\xD8\xD9\x07+\x02\x02" +
    "\xD9\xDA\x05\x1C\x0F\x02\xDA\xDB\x07\x1C\x02\x02\xDB\xE4\x03\x02\x02\x02" +
    "\xDC\xDD\x07+\x02\x02\xDD\xDE\x07\"\x02\x02\xDE\xDF\x05\"\x12\x02\xDF" +
    "\xE0\x07#\x02\x02\xE0\xE1\x05\x1C\x0F\x02\xE1\xE2\x07\x1C\x02\x02\xE2" +
    "\xE4\x03\x02\x02\x02\xE3\xCD\x03\x02\x02\x02\xE3\xD1\x03\x02\x02\x02\xE3" +
    "\xD8\x03\x02\x02\x02\xE3\xDC\x03\x02\x02\x02\xE4!\x03\x02\x02\x02\xE5" +
    "\xE6\b\x12\x01\x02\xE6\xE7\x05$\x13\x02\xE7\xED\x03\x02\x02\x02\xE8\xE9" +
    "\f\x03\x02\x02\xE9\xEA\x07\x1D\x02\x02\xEA\xEC\x05$\x13\x02\xEB\xE8\x03" +
    "\x02\x02\x02\xEC\xEF\x03\x02\x02\x02\xED\xEB\x03\x02\x02\x02\xED\xEE\x03" +
    "\x02\x02\x02\xEE#\x03\x02\x02\x02\xEF\xED\x03\x02\x02\x02\xF0\xF1\b\x13" +
    "\x01\x02\xF1\u0101\x07\x06\x02\x02\xF2\u0101\x07\x05\x02\x02\xF3\u0101" +
    "\x07)\x02\x02\xF4\u0101\x07+\x02\x02\xF5\xF6\x05&\x14\x02\xF6\xF7\x07" +
    "\"\x02\x02\xF7\xF8\x05$\x13\x02\xF8\xF9\x07#\x02\x02\xF9\u0101\x03\x02" +
    "\x02\x02\xFA\xFB\x07(\x02\x02\xFB\u0101\x05$\x13\t\xFC\xFD\x07\"\x02\x02" +
    "\xFD\xFE\x05$\x13\x02\xFE\xFF\x07#\x02\x02\xFF\u0101\x03\x02\x02\x02\u0100" +
    "\xF0\x03\x02\x02\x02\u0100\xF2\x03\x02\x02\x02\u0100\xF3\x03\x02\x02\x02" +
    "\u0100\xF4\x03\x02\x02\x02\u0100\xF5\x03\x02\x02\x02\u0100\xFA\x03\x02" +
    "\x02\x02\u0100\xFC\x03\x02\x02\x02\u0101\u0113\x03\x02\x02\x02\u0102\u0103" +
    "\f\x07\x02\x02\u0103\u0104\x07\'\x02\x02\u0104\u0112\x05$\x13\b\u0105" +
    "\u0106\f\x06\x02\x02\u0106\u0107\x07(\x02\x02\u0107\u0112\x05$\x13\x07" +
    "\u0108\u0109\f\x05\x02\x02\u0109\u010A\x07%\x02\x02\u010A\u0112\x05$\x13" +
    "\x06\u010B\u010C\f\x04\x02\x02\u010C\u010D\x07&\x02\x02\u010D\u0112\x05" +
    "$\x13\x05\u010E\u010F\f\x03\x02\x02\u010F\u0110\x07$\x02\x02\u0110\u0112" +
    "\x05$\x13\x04\u0111\u0102\x03\x02\x02\x02\u0111\u0105\x03\x02\x02\x02" +
    "\u0111\u0108\x03\x02\x02\x02\u0111\u010B\x03\x02\x02\x02\u0111\u010E\x03" +
    "\x02\x02\x02\u0112\u0115\x03\x02\x02\x02\u0113\u0111\x03\x02\x02\x02\u0113" +
    "\u0114\x03\x02\x02\x02\u0114%\x03\x02\x02\x02\u0115\u0113\x03\x02\x02" +
    "\x02\u0116\u0117\t\x02\x02\x02\u0117\'\x03\x02\x02\x02\u0118\u0119\x07" +
    "\x15\x02\x02\u0119\u011A\x05*\x16\x02\u011A\u011B\x07\x1B\x02\x02\u011B" +
    "\u011C\x05,\x17\x02\u011C\u0122\x03\x02\x02\x02\u011D\u011E\x07\x15\x02" +
    "\x02\u011E\u011F\x07+\x02\x02\u011F\u0120\x07\x1B\x02\x02\u0120\u0122" +
    "\x07+\x02\x02\u0121\u0118\x03\x02\x02\x02\u0121\u011D\x03\x02\x02\x02" +
    "\u0122)\x03\x02\x02\x02\u0123\u0124\x07+\x02\x02\u0124\u0125\x05\x12\n" +
    "\x02\u0125+\x03\x02\x02\x02\u0126\u0127\x07+\x02\x02\u0127\u0128\x05\x12" +
    "\n\x02\u0128-\x03\x02\x02\x02\u0129\u012A\x07+\x02\x02\u012A\u012B\x07" +
    "\"\x02\x02\u012B\u012C\x050\x19\x02\u012C\u012D\x07#\x02\x02\u012D\u012E" +
    "\x052\x1A\x02\u012E\u0132\x03\x02\x02\x02\u012F\u0130\x07+\x02\x02\u0130" +
    "\u0132\x052\x1A\x02\u0131\u0129\x03\x02\x02\x02\u0131\u012F\x03\x02\x02" +
    "\x02\u0132/\x03\x02\x02\x02\u0133\u0134\b\x19\x01\x02\u0134\u0135\x05" +
    "$\x13\x02\u0135\u013B\x03\x02\x02\x02\u0136\u0137\f\x03\x02\x02\u0137" +
    "\u0138\x07\x1D\x02\x02\u0138\u013A\x05$\x13\x02\u0139\u0136\x03\x02\x02" +
    "\x02\u013A\u013D\x03\x02\x02\x02\u013B\u0139\x03\x02\x02\x02\u013B\u013C" +
    "\x03\x02\x02\x02\u013C1\x03\x02\x02\x02\u013D\u013B\x03\x02\x02\x02\u013E" +
    "\u0144\x054\x1B\x02\u013F\u0140\x054\x1B\x02\u0140\u0141\x07\x1D\x02\x02" +
    "\u0141\u0142\x052\x1A\x02\u0142\u0144\x03\x02\x02\x02\u0143\u013E\x03" +
    "\x02\x02\x02\u0143\u013F\x03\x02\x02\x02\u01443\x03\x02\x02\x02\u0145" +
    "\u0149\x07+\x02\x02\u0146\u0147\x07+\x02\x02\u0147\u0149\x05\x12\n\x02" +
    "\u0148\u0145\x03\x02\x02\x02\u0148\u0146\x03\x02\x02\x02\u01495\x03\x02" +
    "\x02\x02\u014A\u014B\x07\x0E\x02\x02\u014B\u014C\x052\x1A\x02\u014C7\x03" +
    "\x02\x02\x02\u014D\u014E\x07\x16\x02\x02\u014E\u0152\x07+\x02\x02\u014F" +
    "\u0150\x07\x16\x02\x02\u0150\u0152\x05:\x1E\x02\u0151\u014D\x03\x02\x02" +
    "\x02\u0151\u014F\x03\x02\x02\x02\u01529\x03\x02\x02\x02\u0153\u0159\x05" +
    "*\x16\x02\u0154\u0155\x05*\x16\x02\u0155\u0156\x07\x1D\x02\x02\u0156\u0157" +
    "\x05:\x1E\x02\u0157\u0159\x03\x02\x02\x02\u0158\u0153\x03\x02\x02\x02" +
    "\u0158\u0154\x03\x02\x02\x02\u0159;\x03\x02\x02\x02\u015A\u015B\x07\x17" +
    "\x02\x02\u015B\u015F\x07+\x02\x02\u015C\u015D\x07\x17\x02\x02\u015D\u015F" +
    "\x05*\x16\x02\u015E\u015A\x03\x02\x02\x02\u015E\u015C\x03\x02\x02\x02" +
    "\u015F=\x03\x02\x02\x02\x19CIOZl}\xB7\xBF\xC5\xCB\xE3\xED\u0100\u0111" +
    "\u0113\u0121\u0131\u013B\u0143\u0148\u0151\u0158\u015E";
__decorate([
    Decorators_2.Override,
    Decorators_1.NotNull
], QasmParser.prototype, "vocabulary", null);
__decorate([
    Decorators_2.Override
], QasmParser.prototype, "grammarFileName", null);
__decorate([
    Decorators_2.Override
], QasmParser.prototype, "ruleNames", null);
__decorate([
    Decorators_2.Override
], QasmParser.prototype, "serializedATN", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "code", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "headers", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "sentences", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "clean", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "sentence", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "definition", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "expression", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "conditional", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "qLine", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "gateDefinition", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "opaqueDefinition", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "gateDefinitionArguments", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "opaqueDefinitionArguments", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "paramsList", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "body", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "bodyExpression", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "paramsListBody", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "exp", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "unaryOp", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "measure", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "qubit", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "cbit", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "customArglist", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "paramsListNumber", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "qubitAndQregList", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "qbitOrQreg", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "cxGate", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "barrierGate", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "qubitList", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "resetGate", null);
exports.QasmParser = QasmParser;
class CodeContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    sentences() {
        return this.tryGetRuleContext(0, SentencesContext);
    }
    headers() {
        return this.tryGetRuleContext(0, HeadersContext);
    }
    clean() {
        return this.tryGetRuleContext(0, CleanContext);
    }
    get ruleIndex() { return QasmParser.RULE_code; }
    enterRule(listener) {
        if (listener.enterCode)
            listener.enterCode(this);
    }
    exitRule(listener) {
        if (listener.exitCode)
            listener.exitCode(this);
    }
    accept(visitor) {
        if (visitor.visitCode)
            return visitor.visitCode(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], CodeContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], CodeContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], CodeContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], CodeContext.prototype, "accept", null);
exports.CodeContext = CodeContext;
class HeadersContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    QasmDescriptor() { return this.tryGetToken(QasmParser.QasmDescriptor, 0); }
    Include() { return this.tryGetToken(QasmParser.Include, 0); }
    get ruleIndex() { return QasmParser.RULE_headers; }
    enterRule(listener) {
        if (listener.enterHeaders)
            listener.enterHeaders(this);
    }
    exitRule(listener) {
        if (listener.exitHeaders)
            listener.exitHeaders(this);
    }
    accept(visitor) {
        if (visitor.visitHeaders)
            return visitor.visitHeaders(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], HeadersContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], HeadersContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], HeadersContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], HeadersContext.prototype, "accept", null);
exports.HeadersContext = HeadersContext;
class SentencesContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    sentence() {
        return this.getRuleContext(0, SentenceContext);
    }
    sentences() {
        return this.tryGetRuleContext(0, SentencesContext);
    }
    get ruleIndex() { return QasmParser.RULE_sentences; }
    enterRule(listener) {
        if (listener.enterSentences)
            listener.enterSentences(this);
    }
    exitRule(listener) {
        if (listener.exitSentences)
            listener.exitSentences(this);
    }
    accept(visitor) {
        if (visitor.visitSentences)
            return visitor.visitSentences(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], SentencesContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], SentencesContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], SentencesContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], SentencesContext.prototype, "accept", null);
exports.SentencesContext = SentencesContext;
class CleanContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Clean() { return this.getToken(QasmParser.Clean, 0); }
    EOF() { return this.getToken(QasmParser.EOF, 0); }
    get ruleIndex() { return QasmParser.RULE_clean; }
    enterRule(listener) {
        if (listener.enterClean)
            listener.enterClean(this);
    }
    exitRule(listener) {
        if (listener.exitClean)
            listener.exitClean(this);
    }
    accept(visitor) {
        if (visitor.visitClean)
            return visitor.visitClean(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], CleanContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], CleanContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], CleanContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], CleanContext.prototype, "accept", null);
exports.CleanContext = CleanContext;
class SentenceContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    definition() {
        return this.tryGetRuleContext(0, DefinitionContext);
    }
    expression() {
        return this.tryGetRuleContext(0, ExpressionContext);
    }
    conditional() {
        return this.tryGetRuleContext(0, ConditionalContext);
    }
    EOF() { return this.tryGetToken(QasmParser.EOF, 0); }
    get ruleIndex() { return QasmParser.RULE_sentence; }
    enterRule(listener) {
        if (listener.enterSentence)
            listener.enterSentence(this);
    }
    exitRule(listener) {
        if (listener.exitSentence)
            listener.exitSentence(this);
    }
    accept(visitor) {
        if (visitor.visitSentence)
            return visitor.visitSentence(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], SentenceContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], SentenceContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], SentenceContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], SentenceContext.prototype, "accept", null);
exports.SentenceContext = SentenceContext;
class DefinitionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Qreg() { return this.tryGetToken(QasmParser.Qreg, 0); }
    Id() { return this.tryGetToken(QasmParser.Id, 0); }
    qLine() {
        return this.tryGetRuleContext(0, QLineContext);
    }
    Semi() { return this.tryGetToken(QasmParser.Semi, 0); }
    Creg() { return this.tryGetToken(QasmParser.Creg, 0); }
    gateDefinition() {
        return this.tryGetRuleContext(0, GateDefinitionContext);
    }
    opaqueDefinition() {
        return this.tryGetRuleContext(0, OpaqueDefinitionContext);
    }
    get ruleIndex() { return QasmParser.RULE_definition; }
    enterRule(listener) {
        if (listener.enterDefinition)
            listener.enterDefinition(this);
    }
    exitRule(listener) {
        if (listener.exitDefinition)
            listener.exitDefinition(this);
    }
    accept(visitor) {
        if (visitor.visitDefinition)
            return visitor.visitDefinition(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], DefinitionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], DefinitionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], DefinitionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], DefinitionContext.prototype, "accept", null);
exports.DefinitionContext = DefinitionContext;
class ExpressionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    measure() {
        return this.tryGetRuleContext(0, MeasureContext);
    }
    Semi() { return this.getToken(QasmParser.Semi, 0); }
    customArglist() {
        return this.tryGetRuleContext(0, CustomArglistContext);
    }
    cxGate() {
        return this.tryGetRuleContext(0, CxGateContext);
    }
    barrierGate() {
        return this.tryGetRuleContext(0, BarrierGateContext);
    }
    resetGate() {
        return this.tryGetRuleContext(0, ResetGateContext);
    }
    get ruleIndex() { return QasmParser.RULE_expression; }
    enterRule(listener) {
        if (listener.enterExpression)
            listener.enterExpression(this);
    }
    exitRule(listener) {
        if (listener.exitExpression)
            listener.exitExpression(this);
    }
    accept(visitor) {
        if (visitor.visitExpression)
            return visitor.visitExpression(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ExpressionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ExpressionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ExpressionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ExpressionContext.prototype, "accept", null);
exports.ExpressionContext = ExpressionContext;
class ConditionalContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    If() { return this.getToken(QasmParser.If, 0); }
    LeftParen() { return this.getToken(QasmParser.LeftParen, 0); }
    Id() { return this.getToken(QasmParser.Id, 0); }
    Equals() { return this.getToken(QasmParser.Equals, 0); }
    Int() { return this.getToken(QasmParser.Int, 0); }
    RightParen() { return this.getToken(QasmParser.RightParen, 0); }
    get ruleIndex() { return QasmParser.RULE_conditional; }
    enterRule(listener) {
        if (listener.enterConditional)
            listener.enterConditional(this);
    }
    exitRule(listener) {
        if (listener.exitConditional)
            listener.exitConditional(this);
    }
    accept(visitor) {
        if (visitor.visitConditional)
            return visitor.visitConditional(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ConditionalContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ConditionalContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ConditionalContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ConditionalContext.prototype, "accept", null);
exports.ConditionalContext = ConditionalContext;
class QLineContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    LeftBrace() { return this.getToken(QasmParser.LeftBrace, 0); }
    Int() { return this.getToken(QasmParser.Int, 0); }
    RightBrace() { return this.getToken(QasmParser.RightBrace, 0); }
    get ruleIndex() { return QasmParser.RULE_qLine; }
    enterRule(listener) {
        if (listener.enterQLine)
            listener.enterQLine(this);
    }
    exitRule(listener) {
        if (listener.exitQLine)
            listener.exitQLine(this);
    }
    accept(visitor) {
        if (visitor.visitQLine)
            return visitor.visitQLine(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], QLineContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], QLineContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], QLineContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], QLineContext.prototype, "accept", null);
exports.QLineContext = QLineContext;
class GateDefinitionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Gate() { return this.getToken(QasmParser.Gate, 0); }
    Id() { return this.getToken(QasmParser.Id, 0); }
    gateDefinitionArguments() {
        return this.getRuleContext(0, GateDefinitionArgumentsContext);
    }
    get ruleIndex() { return QasmParser.RULE_gateDefinition; }
    enterRule(listener) {
        if (listener.enterGateDefinition)
            listener.enterGateDefinition(this);
    }
    exitRule(listener) {
        if (listener.exitGateDefinition)
            listener.exitGateDefinition(this);
    }
    accept(visitor) {
        if (visitor.visitGateDefinition)
            return visitor.visitGateDefinition(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], GateDefinitionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], GateDefinitionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], GateDefinitionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], GateDefinitionContext.prototype, "accept", null);
exports.GateDefinitionContext = GateDefinitionContext;
class OpaqueDefinitionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Opaque() { return this.getToken(QasmParser.Opaque, 0); }
    Id() { return this.getToken(QasmParser.Id, 0); }
    opaqueDefinitionArguments() {
        return this.getRuleContext(0, OpaqueDefinitionArgumentsContext);
    }
    get ruleIndex() { return QasmParser.RULE_opaqueDefinition; }
    enterRule(listener) {
        if (listener.enterOpaqueDefinition)
            listener.enterOpaqueDefinition(this);
    }
    exitRule(listener) {
        if (listener.exitOpaqueDefinition)
            listener.exitOpaqueDefinition(this);
    }
    accept(visitor) {
        if (visitor.visitOpaqueDefinition)
            return visitor.visitOpaqueDefinition(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], OpaqueDefinitionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], OpaqueDefinitionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], OpaqueDefinitionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], OpaqueDefinitionContext.prototype, "accept", null);
exports.OpaqueDefinitionContext = OpaqueDefinitionContext;
class GateDefinitionArgumentsContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    paramsList(i) {
        if (i === undefined) {
            return this.getRuleContexts(ParamsListContext);
        }
        else {
            return this.getRuleContext(i, ParamsListContext);
        }
    }
    LeftCurlyBrace() { return this.getToken(QasmParser.LeftCurlyBrace, 0); }
    body() {
        return this.tryGetRuleContext(0, BodyContext);
    }
    RightCurlyBrace() { return this.getToken(QasmParser.RightCurlyBrace, 0); }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    get ruleIndex() { return QasmParser.RULE_gateDefinitionArguments; }
    enterRule(listener) {
        if (listener.enterGateDefinitionArguments)
            listener.enterGateDefinitionArguments(this);
    }
    exitRule(listener) {
        if (listener.exitGateDefinitionArguments)
            listener.exitGateDefinitionArguments(this);
    }
    accept(visitor) {
        if (visitor.visitGateDefinitionArguments)
            return visitor.visitGateDefinitionArguments(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], GateDefinitionArgumentsContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], GateDefinitionArgumentsContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], GateDefinitionArgumentsContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], GateDefinitionArgumentsContext.prototype, "accept", null);
exports.GateDefinitionArgumentsContext = GateDefinitionArgumentsContext;
class OpaqueDefinitionArgumentsContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    paramsList(i) {
        if (i === undefined) {
            return this.getRuleContexts(ParamsListContext);
        }
        else {
            return this.getRuleContext(i, ParamsListContext);
        }
    }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    get ruleIndex() { return QasmParser.RULE_opaqueDefinitionArguments; }
    enterRule(listener) {
        if (listener.enterOpaqueDefinitionArguments)
            listener.enterOpaqueDefinitionArguments(this);
    }
    exitRule(listener) {
        if (listener.exitOpaqueDefinitionArguments)
            listener.exitOpaqueDefinitionArguments(this);
    }
    accept(visitor) {
        if (visitor.visitOpaqueDefinitionArguments)
            return visitor.visitOpaqueDefinitionArguments(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], OpaqueDefinitionArgumentsContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], OpaqueDefinitionArgumentsContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], OpaqueDefinitionArgumentsContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], OpaqueDefinitionArgumentsContext.prototype, "accept", null);
exports.OpaqueDefinitionArgumentsContext = OpaqueDefinitionArgumentsContext;
class ParamsListContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.getToken(QasmParser.Id, 0); }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    paramsList() {
        return this.tryGetRuleContext(0, ParamsListContext);
    }
    get ruleIndex() { return QasmParser.RULE_paramsList; }
    enterRule(listener) {
        if (listener.enterParamsList)
            listener.enterParamsList(this);
    }
    exitRule(listener) {
        if (listener.exitParamsList)
            listener.exitParamsList(this);
    }
    accept(visitor) {
        if (visitor.visitParamsList)
            return visitor.visitParamsList(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ParamsListContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ParamsListContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ParamsListContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ParamsListContext.prototype, "accept", null);
exports.ParamsListContext = ParamsListContext;
class BodyContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    bodyExpression() {
        return this.getRuleContext(0, BodyExpressionContext);
    }
    body() {
        return this.tryGetRuleContext(0, BodyContext);
    }
    get ruleIndex() { return QasmParser.RULE_body; }
    enterRule(listener) {
        if (listener.enterBody)
            listener.enterBody(this);
    }
    exitRule(listener) {
        if (listener.exitBody)
            listener.exitBody(this);
    }
    accept(visitor) {
        if (visitor.visitBody)
            return visitor.visitBody(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], BodyContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], BodyContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], BodyContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], BodyContext.prototype, "accept", null);
exports.BodyContext = BodyContext;
class BodyExpressionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Cx() { return this.tryGetToken(QasmParser.Cx, 0); }
    paramsList() {
        return this.getRuleContext(0, ParamsListContext);
    }
    Semi() { return this.getToken(QasmParser.Semi, 0); }
    U() { return this.tryGetToken(QasmParser.U, 0); }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    paramsListBody() {
        return this.tryGetRuleContext(0, ParamsListBodyContext);
    }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    Id() { return this.tryGetToken(QasmParser.Id, 0); }
    get ruleIndex() { return QasmParser.RULE_bodyExpression; }
    enterRule(listener) {
        if (listener.enterBodyExpression)
            listener.enterBodyExpression(this);
    }
    exitRule(listener) {
        if (listener.exitBodyExpression)
            listener.exitBodyExpression(this);
    }
    accept(visitor) {
        if (visitor.visitBodyExpression)
            return visitor.visitBodyExpression(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], BodyExpressionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], BodyExpressionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], BodyExpressionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], BodyExpressionContext.prototype, "accept", null);
exports.BodyExpressionContext = BodyExpressionContext;
class ParamsListBodyContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    exp() {
        return this.getRuleContext(0, ExpContext);
    }
    paramsListBody() {
        return this.tryGetRuleContext(0, ParamsListBodyContext);
    }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    get ruleIndex() { return QasmParser.RULE_paramsListBody; }
    enterRule(listener) {
        if (listener.enterParamsListBody)
            listener.enterParamsListBody(this);
    }
    exitRule(listener) {
        if (listener.exitParamsListBody)
            listener.exitParamsListBody(this);
    }
    accept(visitor) {
        if (visitor.visitParamsListBody)
            return visitor.visitParamsListBody(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ParamsListBodyContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ParamsListBodyContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ParamsListBodyContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ParamsListBodyContext.prototype, "accept", null);
exports.ParamsListBodyContext = ParamsListBodyContext;
class ExpContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Int() { return this.tryGetToken(QasmParser.Int, 0); }
    Real() { return this.tryGetToken(QasmParser.Real, 0); }
    Pi() { return this.tryGetToken(QasmParser.Pi, 0); }
    Id() { return this.tryGetToken(QasmParser.Id, 0); }
    unaryOp() {
        return this.tryGetRuleContext(0, UnaryOpContext);
    }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    exp(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpContext);
        }
        else {
            return this.getRuleContext(i, ExpContext);
        }
    }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    get ruleIndex() { return QasmParser.RULE_exp; }
    enterRule(listener) {
        if (listener.enterExp)
            listener.enterExp(this);
    }
    exitRule(listener) {
        if (listener.exitExp)
            listener.exitExp(this);
    }
    accept(visitor) {
        if (visitor.visitExp)
            return visitor.visitExp(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ExpContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ExpContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ExpContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ExpContext.prototype, "accept", null);
exports.ExpContext = ExpContext;
class UnaryOpContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Sin() { return this.tryGetToken(QasmParser.Sin, 0); }
    Cos() { return this.tryGetToken(QasmParser.Cos, 0); }
    Tan() { return this.tryGetToken(QasmParser.Tan, 0); }
    Exp() { return this.tryGetToken(QasmParser.Exp, 0); }
    Ln() { return this.tryGetToken(QasmParser.Ln, 0); }
    Sqrt() { return this.tryGetToken(QasmParser.Sqrt, 0); }
    get ruleIndex() { return QasmParser.RULE_unaryOp; }
    enterRule(listener) {
        if (listener.enterUnaryOp)
            listener.enterUnaryOp(this);
    }
    exitRule(listener) {
        if (listener.exitUnaryOp)
            listener.exitUnaryOp(this);
    }
    accept(visitor) {
        if (visitor.visitUnaryOp)
            return visitor.visitUnaryOp(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], UnaryOpContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], UnaryOpContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], UnaryOpContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], UnaryOpContext.prototype, "accept", null);
exports.UnaryOpContext = UnaryOpContext;
class MeasureContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Measure() { return this.getToken(QasmParser.Measure, 0); }
    qubit() {
        return this.tryGetRuleContext(0, QubitContext);
    }
    Assign() { return this.getToken(QasmParser.Assign, 0); }
    cbit() {
        return this.tryGetRuleContext(0, CbitContext);
    }
    Id(i) {
        if (i === undefined) {
            return this.getTokens(QasmParser.Id);
        }
        else {
            return this.getToken(QasmParser.Id, i);
        }
    }
    get ruleIndex() { return QasmParser.RULE_measure; }
    enterRule(listener) {
        if (listener.enterMeasure)
            listener.enterMeasure(this);
    }
    exitRule(listener) {
        if (listener.exitMeasure)
            listener.exitMeasure(this);
    }
    accept(visitor) {
        if (visitor.visitMeasure)
            return visitor.visitMeasure(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], MeasureContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], MeasureContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], MeasureContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], MeasureContext.prototype, "accept", null);
exports.MeasureContext = MeasureContext;
class QubitContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.getToken(QasmParser.Id, 0); }
    qLine() {
        return this.getRuleContext(0, QLineContext);
    }
    get ruleIndex() { return QasmParser.RULE_qubit; }
    enterRule(listener) {
        if (listener.enterQubit)
            listener.enterQubit(this);
    }
    exitRule(listener) {
        if (listener.exitQubit)
            listener.exitQubit(this);
    }
    accept(visitor) {
        if (visitor.visitQubit)
            return visitor.visitQubit(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], QubitContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], QubitContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], QubitContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], QubitContext.prototype, "accept", null);
exports.QubitContext = QubitContext;
class CbitContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.getToken(QasmParser.Id, 0); }
    qLine() {
        return this.getRuleContext(0, QLineContext);
    }
    get ruleIndex() { return QasmParser.RULE_cbit; }
    enterRule(listener) {
        if (listener.enterCbit)
            listener.enterCbit(this);
    }
    exitRule(listener) {
        if (listener.exitCbit)
            listener.exitCbit(this);
    }
    accept(visitor) {
        if (visitor.visitCbit)
            return visitor.visitCbit(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], CbitContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], CbitContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], CbitContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], CbitContext.prototype, "accept", null);
exports.CbitContext = CbitContext;
class CustomArglistContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.getToken(QasmParser.Id, 0); }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    paramsListNumber() {
        return this.tryGetRuleContext(0, ParamsListNumberContext);
    }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    qubitAndQregList() {
        return this.getRuleContext(0, QubitAndQregListContext);
    }
    get ruleIndex() { return QasmParser.RULE_customArglist; }
    enterRule(listener) {
        if (listener.enterCustomArglist)
            listener.enterCustomArglist(this);
    }
    exitRule(listener) {
        if (listener.exitCustomArglist)
            listener.exitCustomArglist(this);
    }
    accept(visitor) {
        if (visitor.visitCustomArglist)
            return visitor.visitCustomArglist(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], CustomArglistContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], CustomArglistContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], CustomArglistContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], CustomArglistContext.prototype, "accept", null);
exports.CustomArglistContext = CustomArglistContext;
class ParamsListNumberContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    exp() {
        return this.getRuleContext(0, ExpContext);
    }
    paramsListNumber() {
        return this.tryGetRuleContext(0, ParamsListNumberContext);
    }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    get ruleIndex() { return QasmParser.RULE_paramsListNumber; }
    enterRule(listener) {
        if (listener.enterParamsListNumber)
            listener.enterParamsListNumber(this);
    }
    exitRule(listener) {
        if (listener.exitParamsListNumber)
            listener.exitParamsListNumber(this);
    }
    accept(visitor) {
        if (visitor.visitParamsListNumber)
            return visitor.visitParamsListNumber(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ParamsListNumberContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ParamsListNumberContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ParamsListNumberContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ParamsListNumberContext.prototype, "accept", null);
exports.ParamsListNumberContext = ParamsListNumberContext;
class QubitAndQregListContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    qbitOrQreg() {
        return this.getRuleContext(0, QbitOrQregContext);
    }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    qubitAndQregList() {
        return this.tryGetRuleContext(0, QubitAndQregListContext);
    }
    get ruleIndex() { return QasmParser.RULE_qubitAndQregList; }
    enterRule(listener) {
        if (listener.enterQubitAndQregList)
            listener.enterQubitAndQregList(this);
    }
    exitRule(listener) {
        if (listener.exitQubitAndQregList)
            listener.exitQubitAndQregList(this);
    }
    accept(visitor) {
        if (visitor.visitQubitAndQregList)
            return visitor.visitQubitAndQregList(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], QubitAndQregListContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], QubitAndQregListContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], QubitAndQregListContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], QubitAndQregListContext.prototype, "accept", null);
exports.QubitAndQregListContext = QubitAndQregListContext;
class QbitOrQregContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.getToken(QasmParser.Id, 0); }
    qLine() {
        return this.tryGetRuleContext(0, QLineContext);
    }
    get ruleIndex() { return QasmParser.RULE_qbitOrQreg; }
    enterRule(listener) {
        if (listener.enterQbitOrQreg)
            listener.enterQbitOrQreg(this);
    }
    exitRule(listener) {
        if (listener.exitQbitOrQreg)
            listener.exitQbitOrQreg(this);
    }
    accept(visitor) {
        if (visitor.visitQbitOrQreg)
            return visitor.visitQbitOrQreg(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], QbitOrQregContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], QbitOrQregContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], QbitOrQregContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], QbitOrQregContext.prototype, "accept", null);
exports.QbitOrQregContext = QbitOrQregContext;
class CxGateContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Cx() { return this.getToken(QasmParser.Cx, 0); }
    qubitAndQregList() {
        return this.getRuleContext(0, QubitAndQregListContext);
    }
    get ruleIndex() { return QasmParser.RULE_cxGate; }
    enterRule(listener) {
        if (listener.enterCxGate)
            listener.enterCxGate(this);
    }
    exitRule(listener) {
        if (listener.exitCxGate)
            listener.exitCxGate(this);
    }
    accept(visitor) {
        if (visitor.visitCxGate)
            return visitor.visitCxGate(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], CxGateContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], CxGateContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], CxGateContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], CxGateContext.prototype, "accept", null);
exports.CxGateContext = CxGateContext;
class BarrierGateContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Barrier() { return this.getToken(QasmParser.Barrier, 0); }
    Id() { return this.tryGetToken(QasmParser.Id, 0); }
    qubitList() {
        return this.tryGetRuleContext(0, QubitListContext);
    }
    get ruleIndex() { return QasmParser.RULE_barrierGate; }
    enterRule(listener) {
        if (listener.enterBarrierGate)
            listener.enterBarrierGate(this);
    }
    exitRule(listener) {
        if (listener.exitBarrierGate)
            listener.exitBarrierGate(this);
    }
    accept(visitor) {
        if (visitor.visitBarrierGate)
            return visitor.visitBarrierGate(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], BarrierGateContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], BarrierGateContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], BarrierGateContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], BarrierGateContext.prototype, "accept", null);
exports.BarrierGateContext = BarrierGateContext;
class QubitListContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    qubit() {
        return this.getRuleContext(0, QubitContext);
    }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    qubitList() {
        return this.tryGetRuleContext(0, QubitListContext);
    }
    get ruleIndex() { return QasmParser.RULE_qubitList; }
    enterRule(listener) {
        if (listener.enterQubitList)
            listener.enterQubitList(this);
    }
    exitRule(listener) {
        if (listener.exitQubitList)
            listener.exitQubitList(this);
    }
    accept(visitor) {
        if (visitor.visitQubitList)
            return visitor.visitQubitList(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], QubitListContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], QubitListContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], QubitListContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], QubitListContext.prototype, "accept", null);
exports.QubitListContext = QubitListContext;
class ResetGateContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Reset() { return this.getToken(QasmParser.Reset, 0); }
    Id() { return this.tryGetToken(QasmParser.Id, 0); }
    qubit() {
        return this.tryGetRuleContext(0, QubitContext);
    }
    get ruleIndex() { return QasmParser.RULE_resetGate; }
    enterRule(listener) {
        if (listener.enterResetGate)
            listener.enterResetGate(this);
    }
    exitRule(listener) {
        if (listener.exitResetGate)
            listener.exitResetGate(this);
    }
    accept(visitor) {
        if (visitor.visitResetGate)
            return visitor.visitResetGate(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ResetGateContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ResetGateContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ResetGateContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ResetGateContext.prototype, "accept", null);
exports.ResetGateContext = ResetGateContext;
