"use strict";
// Generated from src/antlr/Qasm.g4 by ANTLR 4.6-SNAPSHOT
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        this._interp = new ParserATNSimulator_1.ParserATNSimulator(QasmParser._ATN, this);
    }
    get vocabulary() {
        return QasmParser.VOCABULARY;
    }
    get grammarFileName() { return "Qasm.g4"; }
    get ruleNames() { return QasmParser.ruleNames; }
    get serializedATN() { return QasmParser._serializedATN; }
    code() {
        let _localctx = new CodeContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, QasmParser.RULE_code);
        try {
            this.state = 65;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.EOF:
                case QasmParser.T__0:
                case QasmParser.Qreg:
                case QasmParser.Creg:
                case QasmParser.Cx:
                case QasmParser.Measure:
                case QasmParser.Barrier:
                case QasmParser.Reset:
                case QasmParser.Opaque:
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
                case QasmParser.T__0:
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
            this.state = 104;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Qreg:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 90;
                        this.match(QasmParser.Qreg);
                        this.state = 91;
                        this.match(QasmParser.Id);
                        this.state = 92;
                        this.qLine();
                        this.state = 93;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Creg:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 95;
                        this.match(QasmParser.Creg);
                        this.state = 96;
                        this.match(QasmParser.Id);
                        this.state = 97;
                        this.qLine();
                        this.state = 98;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Gate:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 100;
                        this.gateDefinition();
                    }
                    break;
                case QasmParser.Opaque:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 101;
                        this.opaqueDefinition();
                        this.state = 102;
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
            this.state = 121;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Measure:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 106;
                        this.measure();
                        this.state = 107;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Id:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 109;
                        this.customArglist();
                        this.state = 110;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Cx:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 112;
                        this.cxGate();
                        this.state = 113;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Barrier:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 115;
                        this.barrierGate();
                        this.state = 116;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Reset:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 118;
                        this.resetGate();
                        this.state = 119;
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
                this.state = 123;
                this.match(QasmParser.T__0);
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
                this.state = 125;
                this.match(QasmParser.LeftBrace);
                this.state = 126;
                this.match(QasmParser.Int);
                this.state = 127;
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
                this.state = 129;
                this.match(QasmParser.Gate);
                this.state = 130;
                this.match(QasmParser.Id);
                this.state = 131;
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
                this.state = 133;
                this.match(QasmParser.Opaque);
                this.state = 134;
                this.match(QasmParser.Id);
                this.state = 135;
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
            this.state = 174;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 6, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 137;
                        this.paramsList();
                        this.state = 138;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 139;
                        this.body();
                        this.state = 140;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 142;
                        this.match(QasmParser.LeftParen);
                        this.state = 143;
                        this.paramsList();
                        this.state = 144;
                        this.match(QasmParser.RightParen);
                        this.state = 145;
                        this.paramsList();
                        this.state = 146;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 147;
                        this.body();
                        this.state = 148;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 150;
                        this.match(QasmParser.LeftParen);
                        this.state = 151;
                        this.paramsList();
                        this.state = 152;
                        this.match(QasmParser.RightParen);
                        this.state = 153;
                        this.paramsList();
                        this.state = 154;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 155;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 157;
                        this.match(QasmParser.LeftParen);
                        this.state = 158;
                        this.match(QasmParser.RightParen);
                        this.state = 159;
                        this.paramsList();
                        this.state = 160;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 161;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 163;
                        this.match(QasmParser.LeftParen);
                        this.state = 164;
                        this.match(QasmParser.RightParen);
                        this.state = 165;
                        this.paramsList();
                        this.state = 166;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 167;
                        this.body();
                        this.state = 168;
                        this.match(QasmParser.RightCurlyBrace);
                    }
                    break;
                case 6:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 170;
                        this.paramsList();
                        this.state = 171;
                        this.match(QasmParser.LeftCurlyBrace);
                        this.state = 172;
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
            this.state = 182;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Id:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 176;
                        this.paramsList();
                    }
                    break;
                case QasmParser.LeftParen:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 177;
                        this.match(QasmParser.LeftParen);
                        this.state = 178;
                        this.paramsList();
                        this.state = 179;
                        this.match(QasmParser.RightParen);
                        this.state = 180;
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
            this.state = 188;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 8, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 184;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 185;
                        this.match(QasmParser.Id);
                        this.state = 186;
                        this.match(QasmParser.Comma);
                        this.state = 187;
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
            this.state = 194;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 190;
                        this.bodyExpression();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 191;
                        this.bodyExpression();
                        this.state = 192;
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
            this.state = 218;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 10, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 196;
                        this.match(QasmParser.Cx);
                        this.state = 197;
                        this.paramsList();
                        this.state = 198;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 200;
                        this.match(QasmParser.U);
                        this.state = 201;
                        this.match(QasmParser.LeftParen);
                        this.state = 202;
                        this.paramsListBody(0);
                        this.state = 203;
                        this.match(QasmParser.RightParen);
                        this.state = 204;
                        this.paramsList();
                        this.state = 205;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 207;
                        this.match(QasmParser.Id);
                        this.state = 208;
                        this.paramsList();
                        this.state = 209;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 211;
                        this.match(QasmParser.Id);
                        this.state = 212;
                        this.match(QasmParser.LeftParen);
                        this.state = 213;
                        this.paramsListBody(0);
                        this.state = 214;
                        this.match(QasmParser.RightParen);
                        this.state = 215;
                        this.paramsList();
                        this.state = 216;
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
                    this.state = 221;
                    this.exp(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 228;
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
                                this.state = 223;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 224;
                                this.match(QasmParser.Comma);
                                this.state = 225;
                                this.exp(0);
                            }
                        }
                    }
                    this.state = 230;
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
                this.state = 247;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case QasmParser.Int:
                        {
                            this.state = 232;
                            this.match(QasmParser.Int);
                        }
                        break;
                    case QasmParser.Real:
                        {
                            this.state = 233;
                            this.match(QasmParser.Real);
                        }
                        break;
                    case QasmParser.Pi:
                        {
                            this.state = 234;
                            this.match(QasmParser.Pi);
                        }
                        break;
                    case QasmParser.Id:
                        {
                            this.state = 235;
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
                            this.state = 236;
                            this.unaryOp();
                            this.state = 237;
                            this.match(QasmParser.LeftParen);
                            this.state = 238;
                            this.exp(0);
                            this.state = 239;
                            this.match(QasmParser.RightParen);
                        }
                        break;
                    case QasmParser.Subs:
                        {
                            this.state = 241;
                            this.match(QasmParser.Subs);
                            this.state = 242;
                            this.exp(7);
                        }
                        break;
                    case QasmParser.LeftParen:
                        {
                            this.state = 243;
                            this.match(QasmParser.LeftParen);
                            this.state = 244;
                            this.exp(0);
                            this.state = 245;
                            this.match(QasmParser.RightParen);
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 266;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            this.state = 264;
                            this._errHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this._input, 13, this._ctx)) {
                                case 1:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 249;
                                        if (!(this.precpred(this._ctx, 5)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                                        this.state = 250;
                                        this.match(QasmParser.Sum);
                                        this.state = 251;
                                        this.exp(6);
                                    }
                                    break;
                                case 2:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 252;
                                        if (!(this.precpred(this._ctx, 4)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                                        this.state = 253;
                                        this.match(QasmParser.Subs);
                                        this.state = 254;
                                        this.exp(5);
                                    }
                                    break;
                                case 3:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 255;
                                        if (!(this.precpred(this._ctx, 3)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                                        this.state = 256;
                                        this.match(QasmParser.Mult);
                                        this.state = 257;
                                        this.exp(4);
                                    }
                                    break;
                                case 4:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 258;
                                        if (!(this.precpred(this._ctx, 2)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                                        this.state = 259;
                                        this.match(QasmParser.Div);
                                        this.state = 260;
                                        this.exp(3);
                                    }
                                    break;
                                case 5:
                                    {
                                        _localctx = new ExpContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_exp);
                                        this.state = 261;
                                        if (!(this.precpred(this._ctx, 1)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                        this.state = 262;
                                        this.match(QasmParser.Pow);
                                        this.state = 263;
                                        this.exp(2);
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 268;
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
                this.state = 269;
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
            this.state = 280;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 15, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 271;
                        this.match(QasmParser.Measure);
                        this.state = 272;
                        this.qubit();
                        this.state = 273;
                        this.match(QasmParser.Assign);
                        this.state = 274;
                        this.cbit();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 276;
                        this.match(QasmParser.Measure);
                        this.state = 277;
                        this.match(QasmParser.Id);
                        this.state = 278;
                        this.match(QasmParser.Assign);
                        this.state = 279;
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
                this.state = 282;
                this.match(QasmParser.Id);
                this.state = 283;
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
                this.state = 285;
                this.match(QasmParser.Id);
                this.state = 286;
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
            this.state = 296;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 16, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 288;
                        this.match(QasmParser.Id);
                        this.state = 289;
                        this.match(QasmParser.LeftParen);
                        this.state = 290;
                        this.paramsListNumber(0);
                        this.state = 291;
                        this.match(QasmParser.RightParen);
                        this.state = 292;
                        this.qubitAndQregList();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 294;
                        this.match(QasmParser.Id);
                        this.state = 295;
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
                    this.state = 299;
                    this.exp(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 306;
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
                                this.state = 301;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 302;
                                this.match(QasmParser.Comma);
                                this.state = 303;
                                this.exp(0);
                            }
                        }
                    }
                    this.state = 308;
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
            this.state = 314;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 18, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 309;
                        this.qbitOrQreg();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 310;
                        this.qbitOrQreg();
                        this.state = 311;
                        this.match(QasmParser.Comma);
                        this.state = 312;
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
            this.state = 319;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 19, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 316;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 317;
                        this.match(QasmParser.Id);
                        this.state = 318;
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
                this.state = 321;
                this.match(QasmParser.Cx);
                this.state = 322;
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
            this.state = 328;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 20, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 324;
                        this.match(QasmParser.Barrier);
                        this.state = 325;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 326;
                        this.match(QasmParser.Barrier);
                        this.state = 327;
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
            this.state = 335;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 21, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 330;
                        this.qubit();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 331;
                        this.qubit();
                        this.state = 332;
                        this.match(QasmParser.Comma);
                        this.state = 333;
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
            this.state = 341;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 22, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 337;
                        this.match(QasmParser.Reset);
                        this.state = 338;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 339;
                        this.match(QasmParser.Reset);
                        this.state = 340;
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
QasmParser.T__0 = 1;
QasmParser.Comment = 2;
QasmParser.WhiteSpace = 3;
QasmParser.Real = 4;
QasmParser.Int = 5;
QasmParser.QasmDescriptor = 6;
QasmParser.Include = 7;
QasmParser.Qelib = 8;
QasmParser.Qreg = 9;
QasmParser.Creg = 10;
QasmParser.Clean = 11;
QasmParser.U = 12;
QasmParser.Cx = 13;
QasmParser.Sin = 14;
QasmParser.Cos = 15;
QasmParser.Tan = 16;
QasmParser.Exp = 17;
QasmParser.Ln = 18;
QasmParser.Sqrt = 19;
QasmParser.Measure = 20;
QasmParser.Barrier = 21;
QasmParser.Reset = 22;
QasmParser.Opaque = 23;
QasmParser.Assign = 24;
QasmParser.Semi = 25;
QasmParser.Comma = 26;
QasmParser.LeftCurlyBrace = 27;
QasmParser.RightCurlyBrace = 28;
QasmParser.LeftBrace = 29;
QasmParser.RightBrace = 30;
QasmParser.LeftParen = 31;
QasmParser.RightParen = 32;
QasmParser.Pow = 33;
QasmParser.Mult = 34;
QasmParser.Div = 35;
QasmParser.Sum = 36;
QasmParser.Subs = 37;
QasmParser.Pi = 38;
QasmParser.Gate = 39;
QasmParser.Id = 40;
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
    undefined, "'conditional'", undefined, undefined, undefined, undefined,
    undefined, "'include \"quelib1.inc\";'", "'QELIB.INC'", "'qreg'", "'creg'",
    "'clean'", "'U'", "'CX'", "'sin'", "'cos'", "'tan'", "'exp'", "'ln'",
    "'sqrt'", "'measure'", "'barrier'", "'reset'", "'opaque'", "'->'", "';'",
    "','", "'{'", "'}'", "'['", "']'", "'('", "')'", "'^'", "'*'", "'/'",
    "'+'", "'-'", "'pi'", "'gate'"
];
QasmParser._SYMBOLIC_NAMES = [
    undefined, undefined, "Comment", "WhiteSpace", "Real", "Int", "QasmDescriptor",
    "Include", "Qelib", "Qreg", "Creg", "Clean", "U", "Cx", "Sin", "Cos",
    "Tan", "Exp", "Ln", "Sqrt", "Measure", "Barrier", "Reset", "Opaque", "Assign",
    "Semi", "Comma", "LeftCurlyBrace", "RightCurlyBrace", "LeftBrace", "RightBrace",
    "LeftParen", "RightParen", "Pow", "Mult", "Div", "Sum", "Subs", "Pi",
    "Gate", "Id"
];
QasmParser.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(QasmParser._LITERAL_NAMES, QasmParser._SYMBOLIC_NAMES, []);
QasmParser._serializedATN = "\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03*\u015A\x04\x02" +
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
    "\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07k\n\x07\x03\b\x03\b\x03\b\x03" +
    "\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05" +
    "\b|\n\b\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03" +
    "\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
    "\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
    "\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
    "\r\x03\r\x03\r\x03\r\x03\r\x05\r\xB1\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
    "\x03\x0E\x03\x0E\x05\x0E\xB9\n\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05" +
    "\x0F\xBF\n\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\xC5\n\x10\x03\x11" +
    "\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
    "\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
    "\x03\x11\x03\x11\x03\x11\x05\x11\xDD\n\x11\x03\x12\x03\x12\x03\x12\x03" +
    "\x12\x03\x12\x03\x12\x07\x12\xE5\n\x12\f\x12\x0E\x12\xE8\v\x12\x03\x13" +
    "\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13" +
    "\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\xFA\n\x13\x03" +
    "\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
    "\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x07\x13\u010B\n\x13\f\x13" +
    "\x0E\x13\u010E\v\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03" +
    "\x15\x03\x15\x03\x15\x03\x15\x03\x15\x05\x15\u011B\n\x15\x03\x16\x03\x16" +
    "\x03\x16\x03\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18" +
    "\x03\x18\x03\x18\x03\x18\x05\x18\u012B\n\x18\x03\x19\x03\x19\x03\x19\x03" +
    "\x19\x03\x19\x03\x19\x07\x19\u0133\n\x19\f\x19\x0E\x19\u0136\v\x19\x03" +
    "\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u013D\n\x1A\x03\x1B\x03\x1B" +
    "\x03\x1B\x05\x1B\u0142\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03" +
    "\x1D\x03\x1D\x05\x1D\u014B\n\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
    "\x05\x1E\u0152\n\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u0158\n\x1F" +
    "\x03\x1F\x02\x02\x05\"$0 \x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
    "\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 " +
    "\x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02" +
    "<\x02\x02\x03\x03\x02\x10\x15\u0169\x02C\x03\x02\x02\x02\x04I\x03\x02" +
    "\x02\x02\x06O\x03\x02\x02\x02\bQ\x03\x02\x02\x02\nZ\x03\x02\x02\x02\f" +
    "j\x03\x02\x02\x02\x0E{\x03\x02\x02\x02\x10}\x03\x02\x02\x02\x12\x7F\x03" +
    "\x02\x02\x02\x14\x83\x03\x02\x02\x02\x16\x87\x03\x02\x02\x02\x18\xB0\x03" +
    "\x02\x02\x02\x1A\xB8\x03\x02\x02\x02\x1C\xBE\x03\x02\x02\x02\x1E\xC4\x03" +
    "\x02\x02\x02 \xDC\x03\x02\x02\x02\"\xDE\x03\x02\x02\x02$\xF9\x03\x02\x02" +
    "\x02&\u010F\x03\x02\x02\x02(\u011A\x03\x02\x02\x02*\u011C\x03\x02\x02" +
    "\x02,\u011F\x03\x02\x02\x02.\u012A\x03\x02\x02\x020\u012C\x03\x02\x02" +
    "\x022\u013C\x03\x02\x02\x024\u0141\x03\x02\x02\x026\u0143\x03\x02\x02" +
    "\x028\u014A\x03\x02\x02\x02:\u0151\x03\x02\x02\x02<\u0157\x03\x02\x02" +
    "\x02>D\x05\x06\x04\x02?@\x05\x04\x03\x02@A\x05\x06\x04\x02AD\x03\x02\x02" +
    "\x02BD\x05\b\x05\x02C>\x03\x02\x02\x02C?\x03\x02\x02\x02CB\x03\x02\x02" +
    "\x02D\x03\x03\x02\x02\x02EJ\x07\b\x02\x02FG\x07\b\x02\x02GJ\x07\t\x02" +
    "\x02HJ\x07\t\x02\x02IE\x03\x02\x02\x02IF\x03\x02\x02\x02IH\x03\x02\x02" +
    "\x02J\x05\x03\x02\x02\x02KP\x05\n\x06\x02LM\x05\n\x06\x02MN\x05\x06\x04" +
    "\x02NP\x03\x02\x02\x02OK\x03\x02\x02\x02OL\x03\x02\x02\x02P\x07\x03\x02" +
    "\x02\x02QR\x07\r\x02\x02RS\x07\x02\x02\x03S\t\x03\x02\x02\x02T[\x05\f" +
    "\x07\x02U[\x05\x0E\b\x02VW\x05\x10\t\x02WX\x05\x0E\b\x02X[\x03\x02\x02" +
    "\x02Y[\x07\x02\x02\x03ZT\x03\x02\x02\x02ZU\x03\x02\x02\x02ZV\x03\x02\x02" +
    "\x02ZY\x03\x02\x02\x02[\v\x03\x02\x02\x02\\]\x07\v\x02\x02]^\x07*\x02" +
    "\x02^_\x05\x12\n\x02_`\x07\x1B\x02\x02`k\x03\x02\x02\x02ab\x07\f\x02\x02" +
    "bc\x07*\x02\x02cd\x05\x12\n\x02de\x07\x1B\x02\x02ek\x03\x02\x02\x02fk" +
    "\x05\x14\v\x02gh\x05\x16\f\x02hi\x07\x1B\x02\x02ik\x03\x02\x02\x02j\\" +
    "\x03\x02\x02\x02ja\x03\x02\x02\x02jf\x03\x02\x02\x02jg\x03\x02\x02\x02" +
    "k\r\x03\x02\x02\x02lm\x05(\x15\x02mn\x07\x1B\x02\x02n|\x03\x02\x02\x02" +
    "op\x05.\x18\x02pq\x07\x1B\x02\x02q|\x03\x02\x02\x02rs\x056\x1C\x02st\x07" +
    "\x1B\x02\x02t|\x03\x02\x02\x02uv\x058\x1D\x02vw\x07\x1B\x02\x02w|\x03" +
    "\x02\x02\x02xy\x05<\x1F\x02yz\x07\x1B\x02\x02z|\x03\x02\x02\x02{l\x03" +
    "\x02\x02\x02{o\x03\x02\x02\x02{r\x03\x02\x02\x02{u\x03\x02\x02\x02{x\x03" +
    "\x02\x02\x02|\x0F\x03\x02\x02\x02}~\x07\x03\x02\x02~\x11\x03\x02\x02\x02" +
    "\x7F\x80\x07\x1F\x02\x02\x80\x81\x07\x07\x02\x02\x81\x82\x07 \x02\x02" +
    "\x82\x13\x03\x02\x02\x02\x83\x84\x07)\x02\x02\x84\x85\x07*\x02\x02\x85" +
    "\x86\x05\x18\r\x02\x86\x15\x03\x02\x02\x02\x87\x88\x07\x19\x02\x02\x88" +
    "\x89\x07*\x02\x02\x89\x8A\x05\x1A\x0E\x02\x8A\x17\x03\x02\x02\x02\x8B" +
    "\x8C\x05\x1C\x0F\x02\x8C\x8D\x07\x1D\x02\x02\x8D\x8E\x05\x1E\x10\x02\x8E" +
    "\x8F\x07\x1E\x02\x02\x8F\xB1\x03\x02\x02\x02\x90\x91\x07!\x02\x02\x91" +
    "\x92\x05\x1C\x0F\x02\x92\x93\x07\"\x02\x02\x93\x94\x05\x1C\x0F\x02\x94" +
    "\x95\x07\x1D\x02\x02\x95\x96\x05\x1E\x10\x02\x96\x97\x07\x1E\x02\x02\x97" +
    "\xB1\x03\x02\x02\x02\x98\x99\x07!\x02\x02\x99\x9A\x05\x1C\x0F\x02\x9A" +
    "\x9B\x07\"\x02\x02\x9B\x9C\x05\x1C\x0F\x02\x9C\x9D\x07\x1D\x02\x02\x9D" +
    "\x9E\x07\x1E\x02\x02\x9E\xB1\x03\x02\x02\x02\x9F\xA0\x07!\x02\x02\xA0" +
    "\xA1\x07\"\x02\x02\xA1\xA2\x05\x1C\x0F\x02\xA2\xA3\x07\x1D\x02\x02\xA3" +
    "\xA4\x07\x1E\x02\x02\xA4\xB1\x03\x02\x02\x02\xA5\xA6\x07!\x02\x02\xA6" +
    "\xA7\x07\"\x02\x02\xA7\xA8\x05\x1C\x0F\x02\xA8\xA9\x07\x1D\x02\x02\xA9" +
    "\xAA\x05\x1E\x10\x02\xAA\xAB\x07\x1E\x02\x02\xAB\xB1\x03\x02\x02\x02\xAC" +
    "\xAD\x05\x1C\x0F\x02\xAD\xAE\x07\x1D\x02\x02\xAE\xAF\x07\x1E\x02\x02\xAF" +
    "\xB1\x03\x02\x02\x02\xB0\x8B\x03\x02\x02\x02\xB0\x90\x03\x02\x02\x02\xB0" +
    "\x98\x03\x02\x02\x02\xB0\x9F\x03\x02\x02\x02\xB0\xA5\x03\x02\x02\x02\xB0" +
    "\xAC\x03\x02\x02\x02\xB1\x19\x03\x02\x02\x02\xB2\xB9\x05\x1C\x0F\x02\xB3" +
    "\xB4\x07!\x02\x02\xB4\xB5\x05\x1C\x0F\x02\xB5\xB6\x07\"\x02\x02\xB6\xB7" +
    "\x05\x1C\x0F\x02\xB7\xB9\x03\x02\x02\x02\xB8\xB2\x03\x02\x02\x02\xB8\xB3" +
    "\x03\x02\x02\x02\xB9\x1B\x03\x02\x02\x02\xBA\xBF\x07*\x02\x02\xBB\xBC" +
    "\x07*\x02\x02\xBC\xBD\x07\x1C\x02\x02\xBD\xBF\x05\x1C\x0F\x02\xBE\xBA" +
    "\x03\x02\x02\x02\xBE\xBB\x03\x02\x02\x02\xBF\x1D\x03\x02\x02\x02\xC0\xC5" +
    "\x05 \x11\x02\xC1\xC2\x05 \x11\x02\xC2\xC3\x05\x1E\x10\x02\xC3\xC5\x03" +
    "\x02\x02\x02\xC4\xC0\x03\x02\x02\x02\xC4\xC1\x03\x02\x02\x02\xC5\x1F\x03" +
    "\x02\x02\x02\xC6\xC7\x07\x0F\x02\x02\xC7\xC8\x05\x1C\x0F\x02\xC8\xC9\x07" +
    "\x1B\x02\x02\xC9\xDD\x03\x02\x02\x02\xCA\xCB\x07\x0E\x02\x02\xCB\xCC\x07" +
    "!\x02\x02\xCC\xCD\x05\"\x12\x02\xCD\xCE\x07\"\x02\x02\xCE\xCF\x05\x1C" +
    "\x0F\x02\xCF\xD0\x07\x1B\x02\x02\xD0\xDD\x03\x02\x02\x02\xD1\xD2\x07*" +
    "\x02\x02\xD2\xD3\x05\x1C\x0F\x02\xD3\xD4\x07\x1B\x02\x02\xD4\xDD\x03\x02" +
    "\x02\x02\xD5\xD6\x07*\x02\x02\xD6\xD7\x07!\x02\x02\xD7\xD8\x05\"\x12\x02" +
    "\xD8\xD9\x07\"\x02\x02\xD9\xDA\x05\x1C\x0F\x02\xDA\xDB\x07\x1B\x02\x02" +
    "\xDB\xDD\x03\x02\x02\x02\xDC\xC6\x03\x02\x02\x02\xDC\xCA\x03\x02\x02\x02" +
    "\xDC\xD1\x03\x02\x02\x02\xDC\xD5\x03\x02\x02\x02\xDD!\x03\x02\x02\x02" +
    "\xDE\xDF\b\x12\x01\x02\xDF\xE0\x05$\x13\x02\xE0\xE6\x03\x02\x02\x02\xE1" +
    "\xE2\f\x03\x02\x02\xE2\xE3\x07\x1C\x02\x02\xE3\xE5\x05$\x13\x02\xE4\xE1" +
    "\x03\x02\x02\x02\xE5\xE8\x03\x02\x02\x02\xE6\xE4\x03\x02\x02\x02\xE6\xE7" +
    "\x03\x02\x02\x02\xE7#\x03\x02\x02\x02\xE8\xE6\x03\x02\x02\x02\xE9\xEA" +
    "\b\x13\x01\x02\xEA\xFA\x07\x07\x02\x02\xEB\xFA\x07\x06\x02\x02\xEC\xFA" +
    "\x07(\x02\x02\xED\xFA\x07*\x02\x02\xEE\xEF\x05&\x14\x02\xEF\xF0\x07!\x02" +
    "\x02\xF0\xF1\x05$\x13\x02\xF1\xF2\x07\"\x02\x02\xF2\xFA\x03\x02\x02\x02" +
    "\xF3\xF4\x07\'\x02\x02\xF4\xFA\x05$\x13\t\xF5\xF6\x07!\x02\x02\xF6\xF7" +
    "\x05$\x13\x02\xF7\xF8\x07\"\x02\x02\xF8\xFA\x03\x02\x02\x02\xF9\xE9\x03" +
    "\x02\x02\x02\xF9\xEB\x03\x02\x02\x02\xF9\xEC\x03\x02\x02\x02\xF9\xED\x03" +
    "\x02\x02\x02\xF9\xEE\x03\x02\x02\x02\xF9\xF3\x03\x02\x02\x02\xF9\xF5\x03" +
    "\x02\x02\x02\xFA\u010C\x03\x02\x02\x02\xFB\xFC\f\x07\x02\x02\xFC\xFD\x07" +
    "&\x02\x02\xFD\u010B\x05$\x13\b\xFE\xFF\f\x06\x02\x02\xFF\u0100\x07\'\x02" +
    "\x02\u0100\u010B\x05$\x13\x07\u0101\u0102\f\x05\x02\x02\u0102\u0103\x07" +
    "$\x02\x02\u0103\u010B\x05$\x13\x06\u0104\u0105\f\x04\x02\x02\u0105\u0106" +
    "\x07%\x02\x02\u0106\u010B\x05$\x13\x05\u0107\u0108\f\x03\x02\x02\u0108" +
    "\u0109\x07#\x02\x02\u0109\u010B\x05$\x13\x04\u010A\xFB\x03\x02\x02\x02" +
    "\u010A\xFE\x03\x02\x02\x02\u010A\u0101\x03\x02\x02\x02\u010A\u0104\x03" +
    "\x02\x02\x02\u010A\u0107\x03\x02\x02\x02\u010B\u010E\x03\x02\x02\x02\u010C" +
    "\u010A\x03\x02\x02\x02\u010C\u010D\x03\x02\x02\x02\u010D%\x03\x02\x02" +
    "\x02\u010E\u010C\x03\x02\x02\x02\u010F\u0110\t\x02\x02\x02\u0110\'\x03" +
    "\x02\x02\x02\u0111\u0112\x07\x16\x02\x02\u0112\u0113\x05*\x16\x02\u0113" +
    "\u0114\x07\x1A\x02\x02\u0114\u0115\x05,\x17\x02\u0115\u011B\x03\x02\x02" +
    "\x02\u0116\u0117\x07\x16\x02\x02\u0117\u0118\x07*\x02\x02\u0118\u0119" +
    "\x07\x1A\x02\x02\u0119\u011B\x07*\x02\x02\u011A\u0111\x03\x02\x02\x02" +
    "\u011A\u0116\x03\x02\x02\x02\u011B)\x03\x02\x02\x02\u011C\u011D\x07*\x02" +
    "\x02\u011D\u011E\x05\x12\n\x02\u011E+\x03\x02\x02\x02\u011F\u0120\x07" +
    "*\x02\x02\u0120\u0121\x05\x12\n\x02\u0121-\x03\x02\x02\x02\u0122\u0123" +
    "\x07*\x02\x02\u0123\u0124\x07!\x02\x02\u0124\u0125\x050\x19\x02\u0125" +
    "\u0126\x07\"\x02\x02\u0126\u0127\x052\x1A\x02\u0127\u012B\x03\x02\x02" +
    "\x02\u0128\u0129\x07*\x02\x02\u0129\u012B\x052\x1A\x02\u012A\u0122\x03" +
    "\x02\x02\x02\u012A\u0128\x03\x02\x02\x02\u012B/\x03\x02\x02\x02\u012C" +
    "\u012D\b\x19\x01\x02\u012D\u012E\x05$\x13\x02\u012E\u0134\x03\x02\x02" +
    "\x02\u012F\u0130\f\x03\x02\x02\u0130\u0131\x07\x1C\x02\x02\u0131\u0133" +
    "\x05$\x13\x02\u0132\u012F\x03\x02\x02\x02\u0133\u0136\x03\x02\x02\x02" +
    "\u0134\u0132\x03\x02\x02\x02\u0134\u0135\x03\x02\x02\x02\u01351\x03\x02" +
    "\x02\x02\u0136\u0134\x03\x02\x02\x02\u0137\u013D\x054\x1B\x02\u0138\u0139" +
    "\x054\x1B\x02\u0139\u013A\x07\x1C\x02\x02\u013A\u013B\x052\x1A\x02\u013B" +
    "\u013D\x03\x02\x02\x02\u013C\u0137\x03\x02\x02\x02\u013C\u0138\x03\x02" +
    "\x02\x02\u013D3\x03\x02\x02\x02\u013E\u0142\x07*\x02\x02\u013F\u0140\x07" +
    "*\x02\x02\u0140\u0142\x05\x12\n\x02\u0141\u013E\x03\x02\x02\x02\u0141" +
    "\u013F\x03\x02\x02\x02\u01425\x03\x02\x02\x02\u0143\u0144\x07\x0F\x02" +
    "\x02\u0144\u0145\x052\x1A\x02\u01457\x03\x02\x02\x02\u0146\u0147\x07\x17" +
    "\x02\x02\u0147\u014B\x07*\x02\x02\u0148\u0149\x07\x17\x02\x02\u0149\u014B" +
    "\x05:\x1E\x02\u014A\u0146\x03\x02\x02\x02\u014A\u0148\x03\x02\x02\x02" +
    "\u014B9\x03\x02\x02\x02\u014C\u0152\x05*\x16\x02\u014D\u014E\x05*\x16" +
    "\x02\u014E\u014F\x07\x1C\x02\x02\u014F\u0150\x05:\x1E\x02\u0150\u0152" +
    "\x03\x02\x02\x02\u0151\u014C\x03\x02\x02\x02\u0151\u014D\x03\x02\x02\x02" +
    "\u0152;\x03\x02\x02\x02\u0153\u0154\x07\x18\x02\x02\u0154\u0158\x07*\x02" +
    "\x02\u0155\u0156\x07\x18\x02\x02\u0156\u0158\x05*\x16\x02\u0157\u0153" +
    "\x03\x02\x02\x02\u0157\u0155\x03\x02\x02\x02\u0158=\x03\x02\x02\x02\x19" +
    "CIOZj{\xB0\xB8\xBE\xC4\xDC\xE6\xF9\u010A\u010C\u011A\u012A\u0134\u013C" +
    "\u0141\u014A\u0151\u0157";
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
