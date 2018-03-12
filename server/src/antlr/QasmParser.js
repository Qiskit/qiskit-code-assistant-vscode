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
    startProgram() {
        let _localctx = new StartProgramContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, QasmParser.RULE_startProgram);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 72;
                this.code();
                this.state = 73;
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
    code() {
        let _localctx = new CodeContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, QasmParser.RULE_code);
        try {
            this.state = 82;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 0, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 75;
                        this.ibmDefinition();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 76;
                        this.ibmDefinition();
                        this.state = 77;
                        this.program(0);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 79;
                        this.library(0);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 80;
                        this.clean();
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
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
        this.enterRule(_localctx, 4, QasmParser.RULE_clean);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 84;
                this.match(QasmParser.Clean);
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
    ibmDefinition() {
        let _localctx = new IbmDefinitionContext(this._ctx, this.state);
        this.enterRule(_localctx, 6, QasmParser.RULE_ibmDefinition);
        try {
            this.state = 93;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 1, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 86;
                        this.match(QasmParser.IbmQasm);
                        this.state = 87;
                        this.match(QasmParser.Real);
                        this.state = 88;
                        this.match(QasmParser.Semi);
                        this.state = 89;
                        this.include();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 90;
                        this.match(QasmParser.IbmQasm);
                        this.state = 91;
                        this.match(QasmParser.Real);
                        this.state = 92;
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
    include() {
        let _localctx = new IncludeContext(this._ctx, this.state);
        this.enterRule(_localctx, 8, QasmParser.RULE_include);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 95;
                this.match(QasmParser.Include);
                this.state = 96;
                this.match(QasmParser.Qelib);
                this.state = 97;
                this.match(QasmParser.Semi);
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
    library(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new LibraryContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 10;
        this.enterRecursionRule(_localctx, 10, QasmParser.RULE_library, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 100;
                    this.declaration();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 106;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new LibraryContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_library);
                                this.state = 102;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 103;
                                this.declaration();
                            }
                        }
                    }
                    this.state = 108;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
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
    program(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new ProgramContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 12;
        this.enterRecursionRule(_localctx, 12, QasmParser.RULE_program, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 110;
                    this.statement();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 116;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new ProgramContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_program);
                                this.state = 112;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 113;
                                this.statement();
                            }
                        }
                    }
                    this.state = 118;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
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
    statement() {
        let _localctx = new StatementContext(this._ctx, this.state);
        this.enterRule(_localctx, 14, QasmParser.RULE_statement);
        try {
            this.state = 121;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Qreg:
                case QasmParser.Creg:
                case QasmParser.Gate:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 119;
                        this.declaration();
                    }
                    break;
                case QasmParser.U:
                case QasmParser.Cx:
                case QasmParser.Measure:
                case QasmParser.Barrier:
                case QasmParser.Reset:
                case QasmParser.Opaque:
                case QasmParser.Id:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 120;
                        this.qoperation();
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
    declaration() {
        let _localctx = new DeclarationContext(this._ctx, this.state);
        this.enterRule(_localctx, 16, QasmParser.RULE_declaration);
        try {
            this.state = 126;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Qreg:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 123;
                        this.qregDeclaration();
                    }
                    break;
                case QasmParser.Creg:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 124;
                        this.cregDeclaration();
                    }
                    break;
                case QasmParser.Gate:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 125;
                        this.gateDeclaration();
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
    qoperation() {
        let _localctx = new QoperationContext(this._ctx, this.state);
        this.enterRule(_localctx, 18, QasmParser.RULE_qoperation);
        try {
            this.state = 143;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.U:
                case QasmParser.Cx:
                case QasmParser.Id:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 128;
                        this.unitaryOperation();
                        this.state = 129;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Opaque:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 131;
                        this.opaque();
                        this.state = 132;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Measure:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 134;
                        this.measure();
                        this.state = 135;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Barrier:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 137;
                        this.barrier();
                        this.state = 138;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Reset:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 140;
                        this.resetOperation();
                        this.state = 141;
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
    unitaryOperation() {
        let _localctx = new UnitaryOperationContext(this._ctx, this.state);
        this.enterRule(_localctx, 20, QasmParser.RULE_unitaryOperation);
        try {
            this.state = 168;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 7, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 145;
                        this.match(QasmParser.U);
                        this.state = 146;
                        this.match(QasmParser.LeftParen);
                        this.state = 147;
                        this.expList(0);
                        this.state = 148;
                        this.match(QasmParser.RightParen);
                        this.state = 149;
                        this.primary();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 151;
                        this.match(QasmParser.Cx);
                        this.state = 152;
                        this.primary();
                        this.state = 153;
                        this.match(QasmParser.Comma);
                        this.state = 154;
                        this.primary();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 156;
                        this.match(QasmParser.Id);
                        this.state = 157;
                        this.primaryList(0);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 158;
                        this.match(QasmParser.Id);
                        this.state = 159;
                        this.match(QasmParser.LeftParen);
                        this.state = 160;
                        this.match(QasmParser.RightParen);
                        this.state = 161;
                        this.primaryList(0);
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 162;
                        this.match(QasmParser.Id);
                        this.state = 163;
                        this.match(QasmParser.LeftParen);
                        this.state = 164;
                        this.expList(0);
                        this.state = 165;
                        this.match(QasmParser.RightParen);
                        this.state = 166;
                        this.primaryList(0);
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
    opaque() {
        let _localctx = new OpaqueContext(this._ctx, this.state);
        this.enterRule(_localctx, 22, QasmParser.RULE_opaque);
        try {
            this.state = 190;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 8, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 170;
                        this.match(QasmParser.Opaque);
                        this.state = 171;
                        this.match(QasmParser.Id);
                        this.state = 172;
                        this.gateScope();
                        this.state = 173;
                        this.bitList(0);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 175;
                        this.match(QasmParser.Opaque);
                        this.state = 176;
                        this.match(QasmParser.Id);
                        this.state = 177;
                        this.gateScope();
                        this.state = 178;
                        this.match(QasmParser.LeftParen);
                        this.state = 179;
                        this.match(QasmParser.RightParen);
                        this.state = 180;
                        this.bitList(0);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 182;
                        this.match(QasmParser.Opaque);
                        this.state = 183;
                        this.match(QasmParser.Id);
                        this.state = 184;
                        this.gateScope();
                        this.state = 185;
                        this.match(QasmParser.LeftParen);
                        this.state = 186;
                        this.gateIdList(0);
                        this.state = 187;
                        this.match(QasmParser.RightParen);
                        this.state = 188;
                        this.bitList(0);
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
    measure() {
        let _localctx = new MeasureContext(this._ctx, this.state);
        this.enterRule(_localctx, 24, QasmParser.RULE_measure);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 192;
                this.match(QasmParser.Measure);
                this.state = 193;
                this.primary();
                this.state = 194;
                this.match(QasmParser.Assign);
                this.state = 195;
                this.primary();
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
    barrier() {
        let _localctx = new BarrierContext(this._ctx, this.state);
        this.enterRule(_localctx, 26, QasmParser.RULE_barrier);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 197;
                this.match(QasmParser.Barrier);
                this.state = 198;
                this.primaryList(0);
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
    resetOperation() {
        let _localctx = new ResetOperationContext(this._ctx, this.state);
        this.enterRule(_localctx, 28, QasmParser.RULE_resetOperation);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 200;
                this.match(QasmParser.Reset);
                this.state = 201;
                this.primary();
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
    primaryList(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new PrimaryListContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 30;
        this.enterRecursionRule(_localctx, 30, QasmParser.RULE_primaryList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 204;
                    this.primary();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 211;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new PrimaryListContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_primaryList);
                                this.state = 206;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 207;
                                this.match(QasmParser.Comma);
                                this.state = 208;
                                this.primary();
                            }
                        }
                    }
                    this.state = 213;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
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
    primary() {
        let _localctx = new PrimaryContext(this._ctx, this.state);
        this.enterRule(_localctx, 32, QasmParser.RULE_primary);
        try {
            this.state = 216;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 10, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 214;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 215;
                        this.indexedId();
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
    indexedId() {
        let _localctx = new IndexedIdContext(this._ctx, this.state);
        this.enterRule(_localctx, 34, QasmParser.RULE_indexedId);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 218;
                this.match(QasmParser.Id);
                this.state = 219;
                this.match(QasmParser.LeftBrace);
                this.state = 220;
                this.match(QasmParser.Int);
                this.state = 221;
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
    qregDeclaration() {
        let _localctx = new QregDeclarationContext(this._ctx, this.state);
        this.enterRule(_localctx, 36, QasmParser.RULE_qregDeclaration);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 223;
                this.match(QasmParser.Qreg);
                this.state = 224;
                this.match(QasmParser.Id);
                this.state = 225;
                this.match(QasmParser.LeftBrace);
                this.state = 226;
                this.match(QasmParser.Int);
                this.state = 227;
                this.match(QasmParser.RightBrace);
                this.state = 228;
                this.match(QasmParser.Semi);
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
    cregDeclaration() {
        let _localctx = new CregDeclarationContext(this._ctx, this.state);
        this.enterRule(_localctx, 38, QasmParser.RULE_cregDeclaration);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 230;
                this.match(QasmParser.Creg);
                this.state = 231;
                this.match(QasmParser.Id);
                this.state = 232;
                this.match(QasmParser.LeftBrace);
                this.state = 233;
                this.match(QasmParser.Int);
                this.state = 234;
                this.match(QasmParser.RightBrace);
                this.state = 235;
                this.match(QasmParser.Semi);
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
    gateDeclaration() {
        let _localctx = new GateDeclarationContext(this._ctx, this.state);
        this.enterRule(_localctx, 40, QasmParser.RULE_gateDeclaration);
        try {
            this.state = 260;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 11, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 237;
                        this.match(QasmParser.Gate);
                        this.state = 238;
                        this.match(QasmParser.Id);
                        this.state = 239;
                        this.gateScope();
                        this.state = 240;
                        this.bitList(0);
                        this.state = 241;
                        this.gateBody();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 243;
                        this.match(QasmParser.Gate);
                        this.state = 244;
                        this.match(QasmParser.Id);
                        this.state = 245;
                        this.gateScope();
                        this.state = 246;
                        this.match(QasmParser.LeftParen);
                        this.state = 247;
                        this.match(QasmParser.RightParen);
                        this.state = 248;
                        this.bitList(0);
                        this.state = 249;
                        this.gateBody();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 251;
                        this.match(QasmParser.Gate);
                        this.state = 252;
                        this.match(QasmParser.Id);
                        this.state = 253;
                        this.gateScope();
                        this.state = 254;
                        this.match(QasmParser.LeftParen);
                        this.state = 255;
                        this.gateIdList(0);
                        this.state = 256;
                        this.match(QasmParser.RightParen);
                        this.state = 257;
                        this.bitList(0);
                        this.state = 258;
                        this.gateBody();
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
    gateScope() {
        let _localctx = new GateScopeContext(this._ctx, this.state);
        this.enterRule(_localctx, 42, QasmParser.RULE_gateScope);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
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
    bitList(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new BitListContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 44;
        this.enterRecursionRule(_localctx, 44, QasmParser.RULE_bitList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 265;
                    this.bit();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 272;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new BitListContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_bitList);
                                this.state = 267;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 268;
                                this.match(QasmParser.Comma);
                                this.state = 269;
                                this.bit();
                            }
                        }
                    }
                    this.state = 274;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
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
    bit() {
        let _localctx = new BitContext(this._ctx, this.state);
        this.enterRule(_localctx, 46, QasmParser.RULE_bit);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 275;
                this.match(QasmParser.Id);
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
    gateBody() {
        let _localctx = new GateBodyContext(this._ctx, this.state);
        this.enterRule(_localctx, 48, QasmParser.RULE_gateBody);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 277;
                this.match(QasmParser.LeftCurlyBrace);
                this.state = 278;
                this.gateOpList(0);
                this.state = 279;
                this.match(QasmParser.RightCurlyBrace);
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
    gateOpList(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new GateOpListContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 50;
        this.enterRecursionRule(_localctx, 50, QasmParser.RULE_gateOpList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 283;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 13, this._ctx)) {
                    case 1:
                        {
                        }
                        break;
                    case 2:
                        {
                            this.state = 282;
                            this.gateOp();
                        }
                        break;
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 289;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new GateOpListContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_gateOpList);
                                this.state = 285;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 286;
                                this.gateOp();
                            }
                        }
                    }
                    this.state = 291;
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
    gateOp() {
        let _localctx = new GateOpContext(this._ctx, this.state);
        this.enterRule(_localctx, 52, QasmParser.RULE_gateOp);
        try {
            this.state = 325;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 15, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 292;
                        this.match(QasmParser.U);
                        this.state = 293;
                        this.match(QasmParser.LeftParen);
                        this.state = 294;
                        this.expList(0);
                        this.state = 295;
                        this.match(QasmParser.RightParen);
                        this.state = 296;
                        this.match(QasmParser.Id);
                        this.state = 297;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 299;
                        this.match(QasmParser.Cx);
                        this.state = 300;
                        this.match(QasmParser.Id);
                        this.state = 301;
                        this.match(QasmParser.Comma);
                        this.state = 302;
                        this.match(QasmParser.Id);
                        this.state = 303;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 304;
                        this.match(QasmParser.Id);
                        this.state = 305;
                        this.idList(0);
                        this.state = 306;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 308;
                        this.match(QasmParser.Id);
                        this.state = 309;
                        this.match(QasmParser.LeftParen);
                        this.state = 310;
                        this.match(QasmParser.RightParen);
                        this.state = 311;
                        this.idList(0);
                        this.state = 312;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 314;
                        this.match(QasmParser.Id);
                        this.state = 315;
                        this.match(QasmParser.LeftParen);
                        this.state = 316;
                        this.expList(0);
                        this.state = 317;
                        this.match(QasmParser.RightParen);
                        this.state = 318;
                        this.idList(0);
                        this.state = 319;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 6:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 321;
                        this.match(QasmParser.Barrier);
                        this.state = 322;
                        this.idList(0);
                        this.state = 323;
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
    gateIdList(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new GateIdListContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 54;
        this.enterRecursionRule(_localctx, 54, QasmParser.RULE_gateIdList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 328;
                    this.gate();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 335;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new GateIdListContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_gateIdList);
                                this.state = 330;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 331;
                                this.match(QasmParser.Comma);
                                this.state = 332;
                                this.gate();
                            }
                        }
                    }
                    this.state = 337;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
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
    gate() {
        let _localctx = new GateContext(this._ctx, this.state);
        this.enterRule(_localctx, 56, QasmParser.RULE_gate);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 338;
                this.match(QasmParser.Id);
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
    expList(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new ExpListContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 58;
        this.enterRecursionRule(_localctx, 58, QasmParser.RULE_expList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 341;
                    this.expression(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 348;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 17, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new ExpListContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_expList);
                                this.state = 343;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 344;
                                this.match(QasmParser.Comma);
                                this.state = 345;
                                this.expression(0);
                            }
                        }
                    }
                    this.state = 350;
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
    expression(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new ExpressionContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 60;
        this.enterRecursionRule(_localctx, 60, QasmParser.RULE_expression, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 352;
                    this.multiplicativeExpression(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 359;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new ExpressionContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_expression);
                                this.state = 354;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 355;
                                this.match(QasmParser.Pow);
                                this.state = 356;
                                this.multiplicativeExpression(0);
                            }
                        }
                    }
                    this.state = 361;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
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
    multiplicativeExpression(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new MultiplicativeExpressionContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 62;
        this.enterRecursionRule(_localctx, 62, QasmParser.RULE_multiplicativeExpression, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 363;
                    this.additiveExpression(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 373;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            this.state = 371;
                            this._errHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this._input, 19, this._ctx)) {
                                case 1:
                                    {
                                        _localctx = new MultiplicativeExpressionContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_multiplicativeExpression);
                                        this.state = 365;
                                        if (!(this.precpred(this._ctx, 2)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                                        this.state = 366;
                                        this.match(QasmParser.Mult);
                                        this.state = 367;
                                        this.multiplicativeExpression(3);
                                    }
                                    break;
                                case 2:
                                    {
                                        _localctx = new MultiplicativeExpressionContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_multiplicativeExpression);
                                        this.state = 368;
                                        if (!(this.precpred(this._ctx, 1)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                        this.state = 369;
                                        this.match(QasmParser.Div);
                                        this.state = 370;
                                        this.multiplicativeExpression(2);
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 375;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
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
    additiveExpression(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new AdditiveExpressionContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 64;
        this.enterRecursionRule(_localctx, 64, QasmParser.RULE_additiveExpression, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 377;
                    this.prefixExpression();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 387;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            this.state = 385;
                            this._errHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this._input, 21, this._ctx)) {
                                case 1:
                                    {
                                        _localctx = new AdditiveExpressionContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_additiveExpression);
                                        this.state = 379;
                                        if (!(this.precpred(this._ctx, 2)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                                        this.state = 380;
                                        this.match(QasmParser.Sum);
                                        this.state = 381;
                                        this.additiveExpression(3);
                                    }
                                    break;
                                case 2:
                                    {
                                        _localctx = new AdditiveExpressionContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_additiveExpression);
                                        this.state = 382;
                                        if (!(this.precpred(this._ctx, 1)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                        this.state = 383;
                                        this.match(QasmParser.Subs);
                                        this.state = 384;
                                        this.additiveExpression(2);
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 389;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
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
    prefixExpression() {
        let _localctx = new PrefixExpressionContext(this._ctx, this.state);
        this.enterRule(_localctx, 66, QasmParser.RULE_prefixExpression);
        try {
            this.state = 395;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Real:
                case QasmParser.Int:
                case QasmParser.LeftParen:
                case QasmParser.Pi:
                case QasmParser.Id:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 390;
                        this.unary();
                    }
                    break;
                case QasmParser.Sum:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 391;
                        this.match(QasmParser.Sum);
                        this.state = 392;
                        this.prefixExpression();
                    }
                    break;
                case QasmParser.Subs:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 393;
                        this.match(QasmParser.Subs);
                        this.state = 394;
                        this.prefixExpression();
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
    unary() {
        let _localctx = new UnaryContext(this._ctx, this.state);
        this.enterRule(_localctx, 68, QasmParser.RULE_unary);
        try {
            this.state = 410;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 24, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 397;
                        this.match(QasmParser.Int);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 398;
                        this.match(QasmParser.Real);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 399;
                        this.match(QasmParser.Pi);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 400;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 401;
                        this.match(QasmParser.LeftParen);
                        this.state = 402;
                        this.expression(0);
                        this.state = 403;
                        this.match(QasmParser.RightParen);
                    }
                    break;
                case 6:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 405;
                        this.match(QasmParser.Id);
                        this.state = 406;
                        this.match(QasmParser.LeftParen);
                        this.state = 407;
                        this.expression(0);
                        this.state = 408;
                        this.match(QasmParser.RightParen);
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
    idList(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new IdListContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 70;
        this.enterRecursionRule(_localctx, 70, QasmParser.RULE_idList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 413;
                    this.match(QasmParser.Id);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 420;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            {
                                _localctx = new IdListContext(_parentctx, _parentState);
                                this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_idList);
                                this.state = 415;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 416;
                                this.match(QasmParser.Comma);
                                this.state = 417;
                                this.match(QasmParser.Id);
                            }
                        }
                    }
                    this.state = 422;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
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
    sempred(_localctx, ruleIndex, predIndex) {
        switch (ruleIndex) {
            case 5:
                return this.library_sempred(_localctx, predIndex);
            case 6:
                return this.program_sempred(_localctx, predIndex);
            case 15:
                return this.primaryList_sempred(_localctx, predIndex);
            case 22:
                return this.bitList_sempred(_localctx, predIndex);
            case 25:
                return this.gateOpList_sempred(_localctx, predIndex);
            case 27:
                return this.gateIdList_sempred(_localctx, predIndex);
            case 29:
                return this.expList_sempred(_localctx, predIndex);
            case 30:
                return this.expression_sempred(_localctx, predIndex);
            case 31:
                return this.multiplicativeExpression_sempred(_localctx, predIndex);
            case 32:
                return this.additiveExpression_sempred(_localctx, predIndex);
            case 35:
                return this.idList_sempred(_localctx, predIndex);
        }
        return true;
    }
    library_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 0:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    program_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 1:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    primaryList_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 2:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    bitList_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 3:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    gateOpList_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 4:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    gateIdList_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 5:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    expList_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 6:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    expression_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 7:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    multiplicativeExpression_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 8:
                return this.precpred(this._ctx, 2);
            case 9:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    additiveExpression_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 10:
                return this.precpred(this._ctx, 2);
            case 11:
                return this.precpred(this._ctx, 1);
        }
        return true;
    }
    idList_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 12:
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
QasmParser.IbmQasm = 5;
QasmParser.Include = 6;
QasmParser.Qelib = 7;
QasmParser.Qreg = 8;
QasmParser.Creg = 9;
QasmParser.Clean = 10;
QasmParser.U = 11;
QasmParser.Cx = 12;
QasmParser.Measure = 13;
QasmParser.Barrier = 14;
QasmParser.Reset = 15;
QasmParser.Opaque = 16;
QasmParser.Assign = 17;
QasmParser.Semi = 18;
QasmParser.Comma = 19;
QasmParser.LeftCurlyBrace = 20;
QasmParser.RightCurlyBrace = 21;
QasmParser.LeftBrace = 22;
QasmParser.RightBrace = 23;
QasmParser.LeftParen = 24;
QasmParser.RightParen = 25;
QasmParser.Pow = 26;
QasmParser.Mult = 27;
QasmParser.Div = 28;
QasmParser.Sum = 29;
QasmParser.Subs = 30;
QasmParser.Pi = 31;
QasmParser.Gate = 32;
QasmParser.Id = 33;
QasmParser.RULE_startProgram = 0;
QasmParser.RULE_code = 1;
QasmParser.RULE_clean = 2;
QasmParser.RULE_ibmDefinition = 3;
QasmParser.RULE_include = 4;
QasmParser.RULE_library = 5;
QasmParser.RULE_program = 6;
QasmParser.RULE_statement = 7;
QasmParser.RULE_declaration = 8;
QasmParser.RULE_qoperation = 9;
QasmParser.RULE_unitaryOperation = 10;
QasmParser.RULE_opaque = 11;
QasmParser.RULE_measure = 12;
QasmParser.RULE_barrier = 13;
QasmParser.RULE_resetOperation = 14;
QasmParser.RULE_primaryList = 15;
QasmParser.RULE_primary = 16;
QasmParser.RULE_indexedId = 17;
QasmParser.RULE_qregDeclaration = 18;
QasmParser.RULE_cregDeclaration = 19;
QasmParser.RULE_gateDeclaration = 20;
QasmParser.RULE_gateScope = 21;
QasmParser.RULE_bitList = 22;
QasmParser.RULE_bit = 23;
QasmParser.RULE_gateBody = 24;
QasmParser.RULE_gateOpList = 25;
QasmParser.RULE_gateOp = 26;
QasmParser.RULE_gateIdList = 27;
QasmParser.RULE_gate = 28;
QasmParser.RULE_expList = 29;
QasmParser.RULE_expression = 30;
QasmParser.RULE_multiplicativeExpression = 31;
QasmParser.RULE_additiveExpression = 32;
QasmParser.RULE_prefixExpression = 33;
QasmParser.RULE_unary = 34;
QasmParser.RULE_idList = 35;
QasmParser.ruleNames = [
    "startProgram", "code", "clean", "ibmDefinition", "include", "library",
    "program", "statement", "declaration", "qoperation", "unitaryOperation",
    "opaque", "measure", "barrier", "resetOperation", "primaryList", "primary",
    "indexedId", "qregDeclaration", "cregDeclaration", "gateDeclaration",
    "gateScope", "bitList", "bit", "gateBody", "gateOpList", "gateOp", "gateIdList",
    "gate", "expList", "expression", "multiplicativeExpression", "additiveExpression",
    "prefixExpression", "unary", "idList"
];
QasmParser._LITERAL_NAMES = [
    undefined, undefined, undefined, undefined, undefined, undefined, "'include'",
    "'QELIB.INC'", "'qreg'", "'creg'", "'clean'", "'U'", "'CX'", "'measure'",
    "'barrier'", "'reset'", "'opaque'", "'->'", "';'", "','", "'{'", "'}'",
    "'['", "']'", "'('", "')'", "'^'", "'*'", "'/'", "'+'", "'-'", "'pi'",
    "'gate'"
];
QasmParser._SYMBOLIC_NAMES = [
    undefined, "Comment", "WhiteSpace", "Real", "Int", "IbmQasm", "Include",
    "Qelib", "Qreg", "Creg", "Clean", "U", "Cx", "Measure", "Barrier", "Reset",
    "Opaque", "Assign", "Semi", "Comma", "LeftCurlyBrace", "RightCurlyBrace",
    "LeftBrace", "RightBrace", "LeftParen", "RightParen", "Pow", "Mult", "Div",
    "Sum", "Subs", "Pi", "Gate", "Id"
];
QasmParser.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(QasmParser._LITERAL_NAMES, QasmParser._SYMBOLIC_NAMES, []);
QasmParser._serializedATN = "\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03#\u01AA\x04\x02" +
    "\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
    "\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
    "\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
    "\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
    "\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
    "\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
    "\t#\x04$\t$\x04%\t%\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03" +
    "\x03\x03\x03\x03\x03\x03\x03\x05\x03U\n\x03\x03\x04\x03\x04\x03\x05\x03" +
    "\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05`\n\x05\x03\x06\x03" +
    "\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x07\x07k" +
    "\n\x07\f\x07\x0E\x07n\v\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x07\bu\n\b\f" +
    "\b\x0E\bx\v\b\x03\t\x03\t\x05\t|\n\t\x03\n\x03\n\x03\n\x05\n\x81\n\n\x03" +
    "\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
    "\v\x03\v\x03\v\x05\v\x92\n\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f" +
    "\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03" +
    "\f\x03\f\x03\f\x03\f\x03\f\x05\f\xAB\n\f\x03\r\x03\r\x03\r\x03\r\x03\r" +
    "\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
    "\r\x03\r\x03\r\x03\r\x05\r\xC1\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03" +
    "\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03" +
    "\x11\x03\x11\x03\x11\x03\x11\x07\x11\xD4\n\x11\f\x11\x0E\x11\xD7\v\x11" +
    "\x03\x12\x03\x12\x05\x12\xDB\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
    "\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15\x03" +
    "\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03" +
    "\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
    "\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
    "\x16\x03\x16\x05\x16\u0107\n\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18" +
    "\x03\x18\x03\x18\x03\x18\x07\x18\u0111\n\x18\f\x18\x0E\x18\u0114\v\x18" +
    "\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x05\x1B" +
    "\u011E\n\x1B\x03\x1B\x03\x1B\x07\x1B\u0122\n\x1B\f\x1B\x0E\x1B\u0125\v" +
    "\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03" +
    "\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03" +
    "\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03" +
    "\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u0148\n\x1C" +
    "\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u0150\n\x1D\f" +
    "\x1D\x0E\x1D\u0153\v\x1D\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F" +
    "\x03\x1F\x03\x1F\x07\x1F\u015D\n\x1F\f\x1F\x0E\x1F\u0160\v\x1F\x03 \x03" +
    " \x03 \x03 \x03 \x03 \x07 \u0168\n \f \x0E \u016B\v \x03!\x03!\x03!\x03" +
    "!\x03!\x03!\x03!\x03!\x03!\x07!\u0176\n!\f!\x0E!\u0179\v!\x03\"\x03\"" +
    "\x03\"\x03\"\x03\"\x03\"\x03\"\x03\"\x03\"\x07\"\u0184\n\"\f\"\x0E\"\u0187" +
    "\v\"\x03#\x03#\x03#\x03#\x03#\x05#\u018E\n#\x03$\x03$\x03$\x03$\x03$\x03" +
    "$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x05$\u019D\n$\x03%\x03%\x03%\x03" +
    "%\x03%\x03%\x07%\u01A5\n%\f%\x0E%\u01A8\v%\x03%\x02\x02\r\f\x0E .48<>" +
    "@BH&\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02" +
    "\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02" +
    "(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02" +
    "D\x02F\x02H\x02\x02\x02\u01B4\x02J\x03\x02\x02\x02\x04T\x03\x02\x02\x02" +
    "\x06V\x03\x02\x02\x02\b_\x03\x02\x02\x02\na\x03\x02\x02\x02\fe\x03\x02" +
    "\x02\x02\x0Eo\x03\x02\x02\x02\x10{\x03\x02\x02\x02\x12\x80\x03\x02\x02" +
    "\x02\x14\x91\x03\x02\x02\x02\x16\xAA\x03\x02\x02\x02\x18\xC0\x03\x02\x02" +
    "\x02\x1A\xC2\x03\x02\x02\x02\x1C\xC7\x03\x02\x02\x02\x1E\xCA\x03\x02\x02" +
    "\x02 \xCD\x03\x02\x02\x02\"\xDA\x03\x02\x02\x02$\xDC\x03\x02\x02\x02&" +
    "\xE1\x03\x02\x02\x02(\xE8\x03\x02\x02\x02*\u0106\x03\x02\x02\x02,\u0108" +
    "\x03\x02\x02\x02.\u010A\x03\x02\x02\x020\u0115\x03\x02\x02\x022\u0117" +
    "\x03\x02\x02\x024\u011D\x03\x02\x02\x026\u0147\x03\x02\x02\x028\u0149" +
    "\x03\x02\x02\x02:\u0154\x03\x02\x02\x02<\u0156\x03\x02\x02\x02>\u0161" +
    "\x03\x02\x02\x02@\u016C\x03\x02\x02\x02B\u017A\x03\x02\x02\x02D\u018D" +
    "\x03\x02\x02\x02F\u019C\x03\x02\x02\x02H\u019E\x03\x02\x02\x02JK\x05\x04" +
    "\x03\x02KL\x07\x02\x02\x03L\x03\x03\x02\x02\x02MU\x05\b\x05\x02NO\x05" +
    "\b\x05\x02OP\x05\x0E\b\x02PU\x03\x02\x02\x02QU\x05\f\x07\x02RU\x05\x06" +
    "\x04\x02SU\x03\x02\x02\x02TM\x03\x02\x02\x02TN\x03\x02\x02\x02TQ\x03\x02" +
    "\x02\x02TR\x03\x02\x02\x02TS\x03\x02\x02\x02U\x05\x03\x02\x02\x02VW\x07" +
    "\f\x02\x02W\x07\x03\x02\x02\x02XY\x07\x07\x02\x02YZ\x07\x05\x02\x02Z[" +
    "\x07\x14\x02\x02[`\x05\n\x06\x02\\]\x07\x07\x02\x02]^\x07\x05\x02\x02" +
    "^`\x07\x14\x02\x02_X\x03\x02\x02\x02_\\\x03\x02\x02\x02`\t\x03\x02\x02" +
    "\x02ab\x07\b\x02\x02bc\x07\t\x02\x02cd\x07\x14\x02\x02d\v\x03\x02\x02" +
    "\x02ef\b\x07\x01\x02fg\x05\x12\n\x02gl\x03\x02\x02\x02hi\f\x03\x02\x02" +
    "ik\x05\x12\n\x02jh\x03\x02\x02\x02kn\x03\x02\x02\x02lj\x03\x02\x02\x02" +
    "lm\x03\x02\x02\x02m\r\x03\x02\x02\x02nl\x03\x02\x02\x02op\b\b\x01\x02" +
    "pq\x05\x10\t\x02qv\x03\x02\x02\x02rs\f\x03\x02\x02su\x05\x10\t\x02tr\x03" +
    "\x02\x02\x02ux\x03\x02\x02\x02vt\x03\x02\x02\x02vw\x03\x02\x02\x02w\x0F" +
    "\x03\x02\x02\x02xv\x03\x02\x02\x02y|\x05\x12\n\x02z|\x05\x14\v\x02{y\x03" +
    "\x02\x02\x02{z\x03\x02\x02\x02|\x11\x03\x02\x02\x02}\x81\x05&\x14\x02" +
    "~\x81\x05(\x15\x02\x7F\x81\x05*\x16\x02\x80}\x03\x02\x02\x02\x80~\x03" +
    "\x02\x02\x02\x80\x7F\x03\x02\x02\x02\x81\x13\x03\x02\x02\x02\x82\x83\x05" +
    "\x16\f\x02\x83\x84\x07\x14\x02\x02\x84\x92\x03\x02\x02\x02\x85\x86\x05" +
    "\x18\r\x02\x86\x87\x07\x14\x02\x02\x87\x92\x03\x02\x02\x02\x88\x89\x05" +
    "\x1A\x0E\x02\x89\x8A\x07\x14\x02\x02\x8A\x92\x03\x02\x02\x02\x8B\x8C\x05" +
    "\x1C\x0F\x02\x8C\x8D\x07\x14\x02\x02\x8D\x92\x03\x02\x02\x02\x8E\x8F\x05" +
    "\x1E\x10\x02\x8F\x90\x07\x14\x02\x02\x90\x92\x03\x02\x02\x02\x91\x82\x03" +
    "\x02\x02\x02\x91\x85\x03\x02\x02\x02\x91\x88\x03\x02\x02\x02\x91\x8B\x03" +
    "\x02\x02\x02\x91\x8E\x03\x02\x02\x02\x92\x15\x03\x02\x02\x02\x93\x94\x07" +
    "\r\x02\x02\x94\x95\x07\x1A\x02\x02\x95\x96\x05<\x1F\x02\x96\x97\x07\x1B" +
    "\x02\x02\x97\x98\x05\"\x12\x02\x98\xAB\x03\x02\x02\x02\x99\x9A\x07\x0E" +
    "\x02\x02\x9A\x9B\x05\"\x12\x02\x9B\x9C\x07\x15\x02\x02\x9C\x9D\x05\"\x12" +
    "\x02\x9D\xAB\x03\x02\x02\x02\x9E\x9F\x07#\x02\x02\x9F\xAB\x05 \x11\x02" +
    "\xA0\xA1\x07#\x02\x02\xA1\xA2\x07\x1A\x02\x02\xA2\xA3\x07\x1B\x02\x02" +
    "\xA3\xAB\x05 \x11\x02\xA4\xA5\x07#\x02\x02\xA5\xA6\x07\x1A\x02\x02\xA6" +
    "\xA7\x05<\x1F\x02\xA7\xA8\x07\x1B\x02\x02\xA8\xA9\x05 \x11\x02\xA9\xAB" +
    "\x03\x02\x02\x02\xAA\x93\x03\x02\x02\x02\xAA\x99\x03\x02\x02\x02\xAA\x9E" +
    "\x03\x02\x02\x02\xAA\xA0\x03\x02\x02\x02\xAA\xA4\x03\x02\x02\x02\xAB\x17" +
    "\x03\x02\x02\x02\xAC\xAD\x07\x12\x02\x02\xAD\xAE\x07#\x02\x02\xAE\xAF" +
    "\x05,\x17\x02\xAF\xB0\x05.\x18\x02\xB0\xC1\x03\x02\x02\x02\xB1\xB2\x07" +
    "\x12\x02\x02\xB2\xB3\x07#\x02\x02\xB3\xB4\x05,\x17\x02\xB4\xB5\x07\x1A" +
    "\x02\x02\xB5\xB6\x07\x1B\x02\x02\xB6\xB7\x05.\x18\x02\xB7\xC1\x03\x02" +
    "\x02\x02\xB8\xB9\x07\x12\x02\x02\xB9\xBA\x07#\x02\x02\xBA\xBB\x05,\x17" +
    "\x02\xBB\xBC\x07\x1A\x02\x02\xBC\xBD\x058\x1D\x02\xBD\xBE\x07\x1B\x02" +
    "\x02\xBE\xBF\x05.\x18\x02\xBF\xC1\x03\x02\x02\x02\xC0\xAC\x03\x02\x02" +
    "\x02\xC0\xB1\x03\x02\x02\x02\xC0\xB8\x03\x02\x02\x02\xC1\x19\x03\x02\x02" +
    "\x02\xC2\xC3\x07\x0F\x02\x02\xC3\xC4\x05\"\x12\x02\xC4\xC5\x07\x13\x02" +
    "\x02\xC5\xC6\x05\"\x12\x02\xC6\x1B\x03\x02\x02\x02\xC7\xC8\x07\x10\x02" +
    "\x02\xC8\xC9\x05 \x11\x02\xC9\x1D\x03\x02\x02\x02\xCA\xCB\x07\x11\x02" +
    "\x02\xCB\xCC\x05\"\x12\x02\xCC\x1F\x03\x02\x02\x02\xCD\xCE\b\x11\x01\x02" +
    "\xCE\xCF\x05\"\x12\x02\xCF\xD5\x03\x02\x02\x02\xD0\xD1\f\x03\x02\x02\xD1" +
    "\xD2\x07\x15\x02\x02\xD2\xD4\x05\"\x12\x02\xD3\xD0\x03\x02\x02\x02\xD4" +
    "\xD7\x03\x02\x02\x02\xD5\xD3\x03\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6" +
    "!\x03\x02\x02\x02\xD7\xD5\x03\x02\x02\x02\xD8\xDB\x07#\x02\x02\xD9\xDB" +
    "\x05$\x13\x02\xDA\xD8\x03\x02\x02\x02\xDA\xD9\x03\x02\x02\x02\xDB#\x03" +
    "\x02\x02\x02\xDC\xDD\x07#\x02\x02\xDD\xDE\x07\x18\x02\x02\xDE\xDF\x07" +
    "\x06\x02\x02\xDF\xE0\x07\x19\x02\x02\xE0%\x03\x02\x02\x02\xE1\xE2\x07" +
    "\n\x02\x02\xE2\xE3\x07#\x02\x02\xE3\xE4\x07\x18\x02\x02\xE4\xE5\x07\x06" +
    "\x02\x02\xE5\xE6\x07\x19\x02\x02\xE6\xE7\x07\x14\x02\x02\xE7\'\x03\x02" +
    "\x02\x02\xE8\xE9\x07\v\x02\x02\xE9\xEA\x07#\x02\x02\xEA\xEB\x07\x18\x02" +
    "\x02\xEB\xEC\x07\x06\x02\x02\xEC\xED\x07\x19\x02\x02\xED\xEE\x07\x14\x02" +
    "\x02\xEE)\x03\x02\x02\x02\xEF\xF0\x07\"\x02\x02\xF0\xF1\x07#\x02\x02\xF1" +
    "\xF2\x05,\x17\x02\xF2\xF3\x05.\x18\x02\xF3\xF4\x052\x1A\x02\xF4\u0107" +
    "\x03\x02\x02\x02\xF5\xF6\x07\"\x02\x02\xF6\xF7\x07#\x02\x02\xF7\xF8\x05" +
    ",\x17\x02\xF8\xF9\x07\x1A\x02\x02\xF9\xFA\x07\x1B\x02\x02\xFA\xFB\x05" +
    ".\x18\x02\xFB\xFC\x052\x1A\x02\xFC\u0107\x03\x02\x02\x02\xFD\xFE\x07\"" +
    "\x02\x02\xFE\xFF\x07#\x02\x02\xFF\u0100\x05,\x17\x02\u0100\u0101\x07\x1A" +
    "\x02\x02\u0101\u0102\x058\x1D\x02\u0102\u0103\x07\x1B\x02\x02\u0103\u0104" +
    "\x05.\x18\x02\u0104\u0105\x052\x1A\x02\u0105\u0107\x03\x02\x02\x02\u0106" +
    "\xEF\x03\x02\x02\x02\u0106\xF5\x03\x02\x02\x02\u0106\xFD\x03\x02\x02\x02" +
    "\u0107+\x03\x02\x02\x02\u0108\u0109\x03\x02\x02\x02\u0109-\x03\x02\x02" +
    "\x02\u010A\u010B\b\x18\x01\x02\u010B\u010C\x050\x19\x02\u010C\u0112\x03" +
    "\x02\x02\x02\u010D\u010E\f\x03\x02\x02\u010E\u010F\x07\x15\x02\x02\u010F" +
    "\u0111\x050\x19\x02\u0110\u010D\x03\x02\x02\x02\u0111\u0114\x03\x02\x02" +
    "\x02\u0112\u0110\x03\x02\x02\x02\u0112\u0113\x03\x02\x02\x02\u0113/\x03" +
    "\x02\x02\x02\u0114\u0112\x03\x02\x02\x02\u0115\u0116\x07#\x02\x02\u0116" +
    "1\x03\x02\x02\x02\u0117\u0118\x07\x16\x02\x02\u0118\u0119\x054\x1B\x02" +
    "\u0119\u011A\x07\x17\x02\x02\u011A3\x03\x02\x02\x02\u011B\u011E\b\x1B" +
    "\x01\x02\u011C\u011E\x056\x1C\x02\u011D\u011B\x03\x02\x02\x02\u011D\u011C" +
    "\x03\x02\x02\x02\u011E\u0123\x03\x02\x02\x02\u011F\u0120\f\x03\x02\x02" +
    "\u0120\u0122\x056\x1C\x02\u0121\u011F\x03\x02\x02\x02\u0122\u0125\x03" +
    "\x02\x02\x02\u0123\u0121\x03\x02\x02\x02\u0123\u0124\x03\x02\x02\x02\u0124" +
    "5\x03\x02\x02\x02\u0125\u0123\x03\x02\x02\x02\u0126\u0127\x07\r\x02\x02" +
    "\u0127\u0128\x07\x1A\x02\x02\u0128\u0129\x05<\x1F\x02\u0129\u012A\x07" +
    "\x1B\x02\x02\u012A\u012B\x07#\x02\x02\u012B\u012C\x07\x14\x02\x02\u012C" +
    "\u0148\x03\x02\x02\x02\u012D\u012E\x07\x0E\x02\x02\u012E\u012F\x07#\x02" +
    "\x02\u012F\u0130\x07\x15\x02\x02\u0130\u0131\x07#\x02\x02\u0131\u0148" +
    "\x07\x14\x02\x02\u0132\u0133\x07#\x02\x02\u0133\u0134\x05H%\x02\u0134" +
    "\u0135\x07\x14\x02\x02\u0135\u0148\x03\x02\x02\x02\u0136\u0137\x07#\x02" +
    "\x02\u0137\u0138\x07\x1A\x02\x02\u0138\u0139\x07\x1B\x02\x02\u0139\u013A" +
    "\x05H%\x02\u013A\u013B\x07\x14\x02\x02\u013B\u0148\x03\x02\x02\x02\u013C" +
    "\u013D\x07#\x02\x02\u013D\u013E\x07\x1A\x02\x02\u013E\u013F\x05<\x1F\x02" +
    "\u013F\u0140\x07\x1B\x02\x02\u0140\u0141\x05H%\x02\u0141\u0142\x07\x14" +
    "\x02\x02\u0142\u0148\x03\x02\x02\x02\u0143\u0144\x07\x10\x02\x02\u0144" +
    "\u0145\x05H%\x02\u0145\u0146\x07\x14\x02\x02\u0146\u0148\x03\x02\x02\x02" +
    "\u0147\u0126\x03\x02\x02\x02\u0147\u012D\x03\x02\x02\x02\u0147\u0132\x03" +
    "\x02\x02\x02\u0147\u0136\x03\x02\x02\x02\u0147\u013C\x03\x02\x02\x02\u0147" +
    "\u0143\x03\x02\x02\x02\u01487\x03\x02\x02\x02\u0149\u014A\b\x1D\x01\x02" +
    "\u014A\u014B\x05:\x1E\x02\u014B\u0151\x03\x02\x02\x02\u014C\u014D\f\x03" +
    "\x02\x02\u014D\u014E\x07\x15\x02\x02\u014E\u0150\x05:\x1E\x02\u014F\u014C" +
    "\x03\x02\x02\x02\u0150\u0153\x03\x02\x02\x02\u0151\u014F\x03\x02\x02\x02" +
    "\u0151\u0152\x03\x02\x02\x02\u01529\x03\x02\x02\x02\u0153\u0151\x03\x02" +
    "\x02\x02\u0154\u0155\x07#\x02\x02\u0155;\x03\x02\x02\x02\u0156\u0157\b" +
    "\x1F\x01\x02\u0157\u0158\x05> \x02\u0158\u015E\x03\x02\x02\x02\u0159\u015A" +
    "\f\x03\x02\x02\u015A\u015B\x07\x15\x02\x02\u015B\u015D\x05> \x02\u015C" +
    "\u0159\x03\x02\x02\x02\u015D\u0160\x03\x02\x02\x02\u015E\u015C\x03\x02" +
    "\x02\x02\u015E\u015F\x03\x02\x02\x02\u015F=\x03\x02\x02\x02\u0160\u015E" +
    "\x03\x02\x02\x02\u0161\u0162\b \x01\x02\u0162\u0163\x05@!\x02\u0163\u0169" +
    "\x03\x02\x02\x02\u0164\u0165\f\x03\x02\x02\u0165\u0166\x07\x1C\x02\x02" +
    "\u0166\u0168\x05@!\x02\u0167\u0164\x03\x02\x02\x02\u0168\u016B\x03\x02" +
    "\x02\x02\u0169\u0167\x03\x02\x02\x02\u0169\u016A\x03\x02\x02\x02\u016A" +
    "?\x03\x02\x02\x02\u016B\u0169\x03\x02\x02\x02\u016C\u016D\b!\x01\x02\u016D" +
    "\u016E\x05B\"\x02\u016E\u0177\x03\x02\x02\x02\u016F\u0170\f\x04\x02\x02" +
    "\u0170\u0171\x07\x1D\x02\x02\u0171\u0176\x05@!\x05\u0172\u0173\f\x03\x02" +
    "\x02\u0173\u0174\x07\x1E\x02\x02\u0174\u0176\x05@!\x04\u0175\u016F\x03" +
    "\x02\x02\x02\u0175\u0172\x03\x02\x02\x02\u0176\u0179\x03\x02\x02\x02\u0177" +
    "\u0175\x03\x02\x02\x02\u0177\u0178\x03\x02\x02\x02\u0178A\x03\x02\x02" +
    "\x02\u0179\u0177\x03\x02\x02\x02\u017A\u017B\b\"\x01\x02\u017B\u017C\x05" +
    "D#\x02\u017C\u0185\x03\x02\x02\x02\u017D\u017E\f\x04\x02\x02\u017E\u017F" +
    "\x07\x1F\x02\x02\u017F\u0184\x05B\"\x05\u0180\u0181\f\x03\x02\x02\u0181" +
    "\u0182\x07 \x02\x02\u0182\u0184\x05B\"\x04\u0183\u017D\x03\x02\x02\x02" +
    "\u0183\u0180\x03\x02\x02\x02\u0184\u0187\x03\x02\x02\x02\u0185\u0183\x03" +
    "\x02\x02\x02\u0185\u0186\x03\x02\x02\x02\u0186C\x03\x02\x02\x02\u0187" +
    "\u0185\x03\x02\x02\x02\u0188\u018E\x05F$\x02\u0189\u018A\x07\x1F\x02\x02" +
    "\u018A\u018E\x05D#\x02\u018B\u018C\x07 \x02\x02\u018C\u018E\x05D#\x02" +
    "\u018D\u0188\x03\x02\x02\x02\u018D\u0189\x03\x02\x02\x02\u018D\u018B\x03" +
    "\x02\x02\x02\u018EE\x03\x02\x02\x02\u018F\u019D\x07\x06\x02\x02\u0190" +
    "\u019D\x07\x05\x02\x02\u0191\u019D\x07!\x02\x02\u0192\u019D\x07#\x02\x02" +
    "\u0193\u0194\x07\x1A\x02\x02\u0194\u0195\x05> \x02\u0195\u0196\x07\x1B" +
    "\x02\x02\u0196\u019D\x03\x02\x02\x02\u0197\u0198\x07#\x02\x02\u0198\u0199" +
    "\x07\x1A\x02\x02\u0199\u019A\x05> \x02\u019A\u019B\x07\x1B\x02\x02\u019B" +
    "\u019D\x03\x02\x02\x02\u019C\u018F\x03\x02\x02\x02\u019C\u0190\x03\x02" +
    "\x02\x02\u019C\u0191\x03\x02\x02\x02\u019C\u0192\x03\x02\x02\x02\u019C" +
    "\u0193\x03\x02\x02\x02\u019C\u0197\x03\x02\x02\x02\u019DG\x03\x02\x02" +
    "\x02\u019E\u019F\b%\x01\x02\u019F\u01A0\x07#\x02\x02\u01A0\u01A6\x03\x02" +
    "\x02\x02\u01A1\u01A2\f\x03\x02\x02\u01A2\u01A3\x07\x15\x02\x02\u01A3\u01A5" +
    "\x07#\x02\x02\u01A4\u01A1\x03\x02\x02\x02\u01A5\u01A8\x03\x02\x02\x02" +
    "\u01A6\u01A4\x03\x02\x02\x02\u01A6\u01A7\x03\x02\x02\x02\u01A7I\x03\x02" +
    "\x02\x02\u01A8\u01A6\x03\x02\x02\x02\x1CT_lv{\x80\x91\xAA\xC0\xD5\xDA" +
    "\u0106\u0112\u011D\u0123\u0147\u0151\u015E\u0169\u0175\u0177\u0183\u0185" +
    "\u018D\u019C\u01A6";
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
], QasmParser.prototype, "startProgram", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "code", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "clean", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "ibmDefinition", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "include", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "library", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "program", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "statement", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "declaration", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "qoperation", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "unitaryOperation", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "opaque", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "measure", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "barrier", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "resetOperation", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "primaryList", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "primary", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "indexedId", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "qregDeclaration", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "cregDeclaration", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "gateDeclaration", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "gateScope", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "bitList", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "bit", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "gateBody", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "gateOpList", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "gateOp", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "gateIdList", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "gate", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "expList", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "expression", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "multiplicativeExpression", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "additiveExpression", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "prefixExpression", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "unary", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], QasmParser.prototype, "idList", null);
exports.QasmParser = QasmParser;
class StartProgramContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    code() {
        return this.getRuleContext(0, CodeContext);
    }
    EOF() { return this.getToken(QasmParser.EOF, 0); }
    get ruleIndex() { return QasmParser.RULE_startProgram; }
    enterRule(listener) {
        if (listener.enterStartProgram)
            listener.enterStartProgram(this);
    }
    exitRule(listener) {
        if (listener.exitStartProgram)
            listener.exitStartProgram(this);
    }
    accept(visitor) {
        if (visitor.visitStartProgram)
            return visitor.visitStartProgram(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], StartProgramContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], StartProgramContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], StartProgramContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], StartProgramContext.prototype, "accept", null);
exports.StartProgramContext = StartProgramContext;
class CodeContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    ibmDefinition() {
        return this.tryGetRuleContext(0, IbmDefinitionContext);
    }
    program() {
        return this.tryGetRuleContext(0, ProgramContext);
    }
    library() {
        return this.tryGetRuleContext(0, LibraryContext);
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
class CleanContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Clean() { return this.getToken(QasmParser.Clean, 0); }
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
class IbmDefinitionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    IbmQasm() { return this.getToken(QasmParser.IbmQasm, 0); }
    Real() { return this.getToken(QasmParser.Real, 0); }
    Semi() { return this.getToken(QasmParser.Semi, 0); }
    include() {
        return this.tryGetRuleContext(0, IncludeContext);
    }
    get ruleIndex() { return QasmParser.RULE_ibmDefinition; }
    enterRule(listener) {
        if (listener.enterIbmDefinition)
            listener.enterIbmDefinition(this);
    }
    exitRule(listener) {
        if (listener.exitIbmDefinition)
            listener.exitIbmDefinition(this);
    }
    accept(visitor) {
        if (visitor.visitIbmDefinition)
            return visitor.visitIbmDefinition(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], IbmDefinitionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], IbmDefinitionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], IbmDefinitionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], IbmDefinitionContext.prototype, "accept", null);
exports.IbmDefinitionContext = IbmDefinitionContext;
class IncludeContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Include() { return this.getToken(QasmParser.Include, 0); }
    Qelib() { return this.getToken(QasmParser.Qelib, 0); }
    Semi() { return this.getToken(QasmParser.Semi, 0); }
    get ruleIndex() { return QasmParser.RULE_include; }
    enterRule(listener) {
        if (listener.enterInclude)
            listener.enterInclude(this);
    }
    exitRule(listener) {
        if (listener.exitInclude)
            listener.exitInclude(this);
    }
    accept(visitor) {
        if (visitor.visitInclude)
            return visitor.visitInclude(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], IncludeContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], IncludeContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], IncludeContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], IncludeContext.prototype, "accept", null);
exports.IncludeContext = IncludeContext;
class LibraryContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    declaration() {
        return this.getRuleContext(0, DeclarationContext);
    }
    library() {
        return this.tryGetRuleContext(0, LibraryContext);
    }
    get ruleIndex() { return QasmParser.RULE_library; }
    enterRule(listener) {
        if (listener.enterLibrary)
            listener.enterLibrary(this);
    }
    exitRule(listener) {
        if (listener.exitLibrary)
            listener.exitLibrary(this);
    }
    accept(visitor) {
        if (visitor.visitLibrary)
            return visitor.visitLibrary(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], LibraryContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], LibraryContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], LibraryContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], LibraryContext.prototype, "accept", null);
exports.LibraryContext = LibraryContext;
class ProgramContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    statement() {
        return this.getRuleContext(0, StatementContext);
    }
    program() {
        return this.tryGetRuleContext(0, ProgramContext);
    }
    get ruleIndex() { return QasmParser.RULE_program; }
    enterRule(listener) {
        if (listener.enterProgram)
            listener.enterProgram(this);
    }
    exitRule(listener) {
        if (listener.exitProgram)
            listener.exitProgram(this);
    }
    accept(visitor) {
        if (visitor.visitProgram)
            return visitor.visitProgram(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ProgramContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ProgramContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ProgramContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ProgramContext.prototype, "accept", null);
exports.ProgramContext = ProgramContext;
class StatementContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    declaration() {
        return this.tryGetRuleContext(0, DeclarationContext);
    }
    qoperation() {
        return this.tryGetRuleContext(0, QoperationContext);
    }
    get ruleIndex() { return QasmParser.RULE_statement; }
    enterRule(listener) {
        if (listener.enterStatement)
            listener.enterStatement(this);
    }
    exitRule(listener) {
        if (listener.exitStatement)
            listener.exitStatement(this);
    }
    accept(visitor) {
        if (visitor.visitStatement)
            return visitor.visitStatement(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], StatementContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], StatementContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], StatementContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], StatementContext.prototype, "accept", null);
exports.StatementContext = StatementContext;
class DeclarationContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    qregDeclaration() {
        return this.tryGetRuleContext(0, QregDeclarationContext);
    }
    cregDeclaration() {
        return this.tryGetRuleContext(0, CregDeclarationContext);
    }
    gateDeclaration() {
        return this.tryGetRuleContext(0, GateDeclarationContext);
    }
    get ruleIndex() { return QasmParser.RULE_declaration; }
    enterRule(listener) {
        if (listener.enterDeclaration)
            listener.enterDeclaration(this);
    }
    exitRule(listener) {
        if (listener.exitDeclaration)
            listener.exitDeclaration(this);
    }
    accept(visitor) {
        if (visitor.visitDeclaration)
            return visitor.visitDeclaration(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], DeclarationContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], DeclarationContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], DeclarationContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], DeclarationContext.prototype, "accept", null);
exports.DeclarationContext = DeclarationContext;
class QoperationContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    unitaryOperation() {
        return this.tryGetRuleContext(0, UnitaryOperationContext);
    }
    Semi() { return this.getToken(QasmParser.Semi, 0); }
    opaque() {
        return this.tryGetRuleContext(0, OpaqueContext);
    }
    measure() {
        return this.tryGetRuleContext(0, MeasureContext);
    }
    barrier() {
        return this.tryGetRuleContext(0, BarrierContext);
    }
    resetOperation() {
        return this.tryGetRuleContext(0, ResetOperationContext);
    }
    get ruleIndex() { return QasmParser.RULE_qoperation; }
    enterRule(listener) {
        if (listener.enterQoperation)
            listener.enterQoperation(this);
    }
    exitRule(listener) {
        if (listener.exitQoperation)
            listener.exitQoperation(this);
    }
    accept(visitor) {
        if (visitor.visitQoperation)
            return visitor.visitQoperation(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], QoperationContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], QoperationContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], QoperationContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], QoperationContext.prototype, "accept", null);
exports.QoperationContext = QoperationContext;
class UnitaryOperationContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    U() { return this.tryGetToken(QasmParser.U, 0); }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    expList() {
        return this.tryGetRuleContext(0, ExpListContext);
    }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    primary(i) {
        if (i === undefined) {
            return this.getRuleContexts(PrimaryContext);
        }
        else {
            return this.getRuleContext(i, PrimaryContext);
        }
    }
    Cx() { return this.tryGetToken(QasmParser.Cx, 0); }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    Id() { return this.tryGetToken(QasmParser.Id, 0); }
    primaryList() {
        return this.tryGetRuleContext(0, PrimaryListContext);
    }
    get ruleIndex() { return QasmParser.RULE_unitaryOperation; }
    enterRule(listener) {
        if (listener.enterUnitaryOperation)
            listener.enterUnitaryOperation(this);
    }
    exitRule(listener) {
        if (listener.exitUnitaryOperation)
            listener.exitUnitaryOperation(this);
    }
    accept(visitor) {
        if (visitor.visitUnitaryOperation)
            return visitor.visitUnitaryOperation(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], UnitaryOperationContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], UnitaryOperationContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], UnitaryOperationContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], UnitaryOperationContext.prototype, "accept", null);
exports.UnitaryOperationContext = UnitaryOperationContext;
class OpaqueContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Opaque() { return this.getToken(QasmParser.Opaque, 0); }
    Id() { return this.getToken(QasmParser.Id, 0); }
    gateScope() {
        return this.getRuleContext(0, GateScopeContext);
    }
    bitList() {
        return this.getRuleContext(0, BitListContext);
    }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    gateIdList() {
        return this.tryGetRuleContext(0, GateIdListContext);
    }
    get ruleIndex() { return QasmParser.RULE_opaque; }
    enterRule(listener) {
        if (listener.enterOpaque)
            listener.enterOpaque(this);
    }
    exitRule(listener) {
        if (listener.exitOpaque)
            listener.exitOpaque(this);
    }
    accept(visitor) {
        if (visitor.visitOpaque)
            return visitor.visitOpaque(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], OpaqueContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], OpaqueContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], OpaqueContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], OpaqueContext.prototype, "accept", null);
exports.OpaqueContext = OpaqueContext;
class MeasureContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Measure() { return this.getToken(QasmParser.Measure, 0); }
    primary(i) {
        if (i === undefined) {
            return this.getRuleContexts(PrimaryContext);
        }
        else {
            return this.getRuleContext(i, PrimaryContext);
        }
    }
    Assign() { return this.getToken(QasmParser.Assign, 0); }
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
class BarrierContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Barrier() { return this.getToken(QasmParser.Barrier, 0); }
    primaryList() {
        return this.getRuleContext(0, PrimaryListContext);
    }
    get ruleIndex() { return QasmParser.RULE_barrier; }
    enterRule(listener) {
        if (listener.enterBarrier)
            listener.enterBarrier(this);
    }
    exitRule(listener) {
        if (listener.exitBarrier)
            listener.exitBarrier(this);
    }
    accept(visitor) {
        if (visitor.visitBarrier)
            return visitor.visitBarrier(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], BarrierContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], BarrierContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], BarrierContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], BarrierContext.prototype, "accept", null);
exports.BarrierContext = BarrierContext;
class ResetOperationContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Reset() { return this.getToken(QasmParser.Reset, 0); }
    primary() {
        return this.getRuleContext(0, PrimaryContext);
    }
    get ruleIndex() { return QasmParser.RULE_resetOperation; }
    enterRule(listener) {
        if (listener.enterResetOperation)
            listener.enterResetOperation(this);
    }
    exitRule(listener) {
        if (listener.exitResetOperation)
            listener.exitResetOperation(this);
    }
    accept(visitor) {
        if (visitor.visitResetOperation)
            return visitor.visitResetOperation(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ResetOperationContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ResetOperationContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ResetOperationContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ResetOperationContext.prototype, "accept", null);
exports.ResetOperationContext = ResetOperationContext;
class PrimaryListContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    primary() {
        return this.getRuleContext(0, PrimaryContext);
    }
    primaryList() {
        return this.tryGetRuleContext(0, PrimaryListContext);
    }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    get ruleIndex() { return QasmParser.RULE_primaryList; }
    enterRule(listener) {
        if (listener.enterPrimaryList)
            listener.enterPrimaryList(this);
    }
    exitRule(listener) {
        if (listener.exitPrimaryList)
            listener.exitPrimaryList(this);
    }
    accept(visitor) {
        if (visitor.visitPrimaryList)
            return visitor.visitPrimaryList(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], PrimaryListContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], PrimaryListContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], PrimaryListContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], PrimaryListContext.prototype, "accept", null);
exports.PrimaryListContext = PrimaryListContext;
class PrimaryContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.tryGetToken(QasmParser.Id, 0); }
    indexedId() {
        return this.tryGetRuleContext(0, IndexedIdContext);
    }
    get ruleIndex() { return QasmParser.RULE_primary; }
    enterRule(listener) {
        if (listener.enterPrimary)
            listener.enterPrimary(this);
    }
    exitRule(listener) {
        if (listener.exitPrimary)
            listener.exitPrimary(this);
    }
    accept(visitor) {
        if (visitor.visitPrimary)
            return visitor.visitPrimary(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], PrimaryContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], PrimaryContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], PrimaryContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], PrimaryContext.prototype, "accept", null);
exports.PrimaryContext = PrimaryContext;
class IndexedIdContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.getToken(QasmParser.Id, 0); }
    LeftBrace() { return this.getToken(QasmParser.LeftBrace, 0); }
    Int() { return this.getToken(QasmParser.Int, 0); }
    RightBrace() { return this.getToken(QasmParser.RightBrace, 0); }
    get ruleIndex() { return QasmParser.RULE_indexedId; }
    enterRule(listener) {
        if (listener.enterIndexedId)
            listener.enterIndexedId(this);
    }
    exitRule(listener) {
        if (listener.exitIndexedId)
            listener.exitIndexedId(this);
    }
    accept(visitor) {
        if (visitor.visitIndexedId)
            return visitor.visitIndexedId(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], IndexedIdContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], IndexedIdContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], IndexedIdContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], IndexedIdContext.prototype, "accept", null);
exports.IndexedIdContext = IndexedIdContext;
class QregDeclarationContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Qreg() { return this.getToken(QasmParser.Qreg, 0); }
    Id() { return this.getToken(QasmParser.Id, 0); }
    LeftBrace() { return this.getToken(QasmParser.LeftBrace, 0); }
    Int() { return this.getToken(QasmParser.Int, 0); }
    RightBrace() { return this.getToken(QasmParser.RightBrace, 0); }
    Semi() { return this.getToken(QasmParser.Semi, 0); }
    get ruleIndex() { return QasmParser.RULE_qregDeclaration; }
    enterRule(listener) {
        if (listener.enterQregDeclaration)
            listener.enterQregDeclaration(this);
    }
    exitRule(listener) {
        if (listener.exitQregDeclaration)
            listener.exitQregDeclaration(this);
    }
    accept(visitor) {
        if (visitor.visitQregDeclaration)
            return visitor.visitQregDeclaration(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], QregDeclarationContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], QregDeclarationContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], QregDeclarationContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], QregDeclarationContext.prototype, "accept", null);
exports.QregDeclarationContext = QregDeclarationContext;
class CregDeclarationContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Creg() { return this.getToken(QasmParser.Creg, 0); }
    Id() { return this.getToken(QasmParser.Id, 0); }
    LeftBrace() { return this.getToken(QasmParser.LeftBrace, 0); }
    Int() { return this.getToken(QasmParser.Int, 0); }
    RightBrace() { return this.getToken(QasmParser.RightBrace, 0); }
    Semi() { return this.getToken(QasmParser.Semi, 0); }
    get ruleIndex() { return QasmParser.RULE_cregDeclaration; }
    enterRule(listener) {
        if (listener.enterCregDeclaration)
            listener.enterCregDeclaration(this);
    }
    exitRule(listener) {
        if (listener.exitCregDeclaration)
            listener.exitCregDeclaration(this);
    }
    accept(visitor) {
        if (visitor.visitCregDeclaration)
            return visitor.visitCregDeclaration(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], CregDeclarationContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], CregDeclarationContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], CregDeclarationContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], CregDeclarationContext.prototype, "accept", null);
exports.CregDeclarationContext = CregDeclarationContext;
class GateDeclarationContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Gate() { return this.getToken(QasmParser.Gate, 0); }
    Id() { return this.getToken(QasmParser.Id, 0); }
    gateScope() {
        return this.getRuleContext(0, GateScopeContext);
    }
    bitList() {
        return this.getRuleContext(0, BitListContext);
    }
    gateBody() {
        return this.getRuleContext(0, GateBodyContext);
    }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    gateIdList() {
        return this.tryGetRuleContext(0, GateIdListContext);
    }
    get ruleIndex() { return QasmParser.RULE_gateDeclaration; }
    enterRule(listener) {
        if (listener.enterGateDeclaration)
            listener.enterGateDeclaration(this);
    }
    exitRule(listener) {
        if (listener.exitGateDeclaration)
            listener.exitGateDeclaration(this);
    }
    accept(visitor) {
        if (visitor.visitGateDeclaration)
            return visitor.visitGateDeclaration(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], GateDeclarationContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], GateDeclarationContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], GateDeclarationContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], GateDeclarationContext.prototype, "accept", null);
exports.GateDeclarationContext = GateDeclarationContext;
class GateScopeContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    get ruleIndex() { return QasmParser.RULE_gateScope; }
    enterRule(listener) {
        if (listener.enterGateScope)
            listener.enterGateScope(this);
    }
    exitRule(listener) {
        if (listener.exitGateScope)
            listener.exitGateScope(this);
    }
    accept(visitor) {
        if (visitor.visitGateScope)
            return visitor.visitGateScope(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], GateScopeContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], GateScopeContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], GateScopeContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], GateScopeContext.prototype, "accept", null);
exports.GateScopeContext = GateScopeContext;
class BitListContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    bit() {
        return this.getRuleContext(0, BitContext);
    }
    bitList() {
        return this.tryGetRuleContext(0, BitListContext);
    }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    get ruleIndex() { return QasmParser.RULE_bitList; }
    enterRule(listener) {
        if (listener.enterBitList)
            listener.enterBitList(this);
    }
    exitRule(listener) {
        if (listener.exitBitList)
            listener.exitBitList(this);
    }
    accept(visitor) {
        if (visitor.visitBitList)
            return visitor.visitBitList(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], BitListContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], BitListContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], BitListContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], BitListContext.prototype, "accept", null);
exports.BitListContext = BitListContext;
class BitContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.getToken(QasmParser.Id, 0); }
    get ruleIndex() { return QasmParser.RULE_bit; }
    enterRule(listener) {
        if (listener.enterBit)
            listener.enterBit(this);
    }
    exitRule(listener) {
        if (listener.exitBit)
            listener.exitBit(this);
    }
    accept(visitor) {
        if (visitor.visitBit)
            return visitor.visitBit(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], BitContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], BitContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], BitContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], BitContext.prototype, "accept", null);
exports.BitContext = BitContext;
class GateBodyContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    LeftCurlyBrace() { return this.getToken(QasmParser.LeftCurlyBrace, 0); }
    gateOpList() {
        return this.getRuleContext(0, GateOpListContext);
    }
    RightCurlyBrace() { return this.getToken(QasmParser.RightCurlyBrace, 0); }
    get ruleIndex() { return QasmParser.RULE_gateBody; }
    enterRule(listener) {
        if (listener.enterGateBody)
            listener.enterGateBody(this);
    }
    exitRule(listener) {
        if (listener.exitGateBody)
            listener.exitGateBody(this);
    }
    accept(visitor) {
        if (visitor.visitGateBody)
            return visitor.visitGateBody(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], GateBodyContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], GateBodyContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], GateBodyContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], GateBodyContext.prototype, "accept", null);
exports.GateBodyContext = GateBodyContext;
class GateOpListContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    gateOp() {
        return this.tryGetRuleContext(0, GateOpContext);
    }
    gateOpList() {
        return this.tryGetRuleContext(0, GateOpListContext);
    }
    get ruleIndex() { return QasmParser.RULE_gateOpList; }
    enterRule(listener) {
        if (listener.enterGateOpList)
            listener.enterGateOpList(this);
    }
    exitRule(listener) {
        if (listener.exitGateOpList)
            listener.exitGateOpList(this);
    }
    accept(visitor) {
        if (visitor.visitGateOpList)
            return visitor.visitGateOpList(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], GateOpListContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], GateOpListContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], GateOpListContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], GateOpListContext.prototype, "accept", null);
exports.GateOpListContext = GateOpListContext;
class GateOpContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    U() { return this.tryGetToken(QasmParser.U, 0); }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    expList() {
        return this.tryGetRuleContext(0, ExpListContext);
    }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    Id(i) {
        if (i === undefined) {
            return this.getTokens(QasmParser.Id);
        }
        else {
            return this.getToken(QasmParser.Id, i);
        }
    }
    Semi() { return this.getToken(QasmParser.Semi, 0); }
    Cx() { return this.tryGetToken(QasmParser.Cx, 0); }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    idList() {
        return this.tryGetRuleContext(0, IdListContext);
    }
    Barrier() { return this.tryGetToken(QasmParser.Barrier, 0); }
    get ruleIndex() { return QasmParser.RULE_gateOp; }
    enterRule(listener) {
        if (listener.enterGateOp)
            listener.enterGateOp(this);
    }
    exitRule(listener) {
        if (listener.exitGateOp)
            listener.exitGateOp(this);
    }
    accept(visitor) {
        if (visitor.visitGateOp)
            return visitor.visitGateOp(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], GateOpContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], GateOpContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], GateOpContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], GateOpContext.prototype, "accept", null);
exports.GateOpContext = GateOpContext;
class GateIdListContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    gate() {
        return this.getRuleContext(0, GateContext);
    }
    gateIdList() {
        return this.tryGetRuleContext(0, GateIdListContext);
    }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    get ruleIndex() { return QasmParser.RULE_gateIdList; }
    enterRule(listener) {
        if (listener.enterGateIdList)
            listener.enterGateIdList(this);
    }
    exitRule(listener) {
        if (listener.exitGateIdList)
            listener.exitGateIdList(this);
    }
    accept(visitor) {
        if (visitor.visitGateIdList)
            return visitor.visitGateIdList(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], GateIdListContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], GateIdListContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], GateIdListContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], GateIdListContext.prototype, "accept", null);
exports.GateIdListContext = GateIdListContext;
class GateContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.getToken(QasmParser.Id, 0); }
    get ruleIndex() { return QasmParser.RULE_gate; }
    enterRule(listener) {
        if (listener.enterGate)
            listener.enterGate(this);
    }
    exitRule(listener) {
        if (listener.exitGate)
            listener.exitGate(this);
    }
    accept(visitor) {
        if (visitor.visitGate)
            return visitor.visitGate(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], GateContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], GateContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], GateContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], GateContext.prototype, "accept", null);
exports.GateContext = GateContext;
class ExpListContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    expList() {
        return this.tryGetRuleContext(0, ExpListContext);
    }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    get ruleIndex() { return QasmParser.RULE_expList; }
    enterRule(listener) {
        if (listener.enterExpList)
            listener.enterExpList(this);
    }
    exitRule(listener) {
        if (listener.exitExpList)
            listener.exitExpList(this);
    }
    accept(visitor) {
        if (visitor.visitExpList)
            return visitor.visitExpList(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ExpListContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ExpListContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ExpListContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ExpListContext.prototype, "accept", null);
exports.ExpListContext = ExpListContext;
class ExpressionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    multiplicativeExpression() {
        return this.getRuleContext(0, MultiplicativeExpressionContext);
    }
    expression() {
        return this.tryGetRuleContext(0, ExpressionContext);
    }
    Pow() { return this.tryGetToken(QasmParser.Pow, 0); }
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
class MultiplicativeExpressionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    additiveExpression() {
        return this.tryGetRuleContext(0, AdditiveExpressionContext);
    }
    multiplicativeExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(MultiplicativeExpressionContext);
        }
        else {
            return this.getRuleContext(i, MultiplicativeExpressionContext);
        }
    }
    Mult() { return this.tryGetToken(QasmParser.Mult, 0); }
    Div() { return this.tryGetToken(QasmParser.Div, 0); }
    get ruleIndex() { return QasmParser.RULE_multiplicativeExpression; }
    enterRule(listener) {
        if (listener.enterMultiplicativeExpression)
            listener.enterMultiplicativeExpression(this);
    }
    exitRule(listener) {
        if (listener.exitMultiplicativeExpression)
            listener.exitMultiplicativeExpression(this);
    }
    accept(visitor) {
        if (visitor.visitMultiplicativeExpression)
            return visitor.visitMultiplicativeExpression(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], MultiplicativeExpressionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], MultiplicativeExpressionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], MultiplicativeExpressionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], MultiplicativeExpressionContext.prototype, "accept", null);
exports.MultiplicativeExpressionContext = MultiplicativeExpressionContext;
class AdditiveExpressionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    prefixExpression() {
        return this.tryGetRuleContext(0, PrefixExpressionContext);
    }
    additiveExpression(i) {
        if (i === undefined) {
            return this.getRuleContexts(AdditiveExpressionContext);
        }
        else {
            return this.getRuleContext(i, AdditiveExpressionContext);
        }
    }
    Sum() { return this.tryGetToken(QasmParser.Sum, 0); }
    Subs() { return this.tryGetToken(QasmParser.Subs, 0); }
    get ruleIndex() { return QasmParser.RULE_additiveExpression; }
    enterRule(listener) {
        if (listener.enterAdditiveExpression)
            listener.enterAdditiveExpression(this);
    }
    exitRule(listener) {
        if (listener.exitAdditiveExpression)
            listener.exitAdditiveExpression(this);
    }
    accept(visitor) {
        if (visitor.visitAdditiveExpression)
            return visitor.visitAdditiveExpression(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], AdditiveExpressionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], AdditiveExpressionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], AdditiveExpressionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], AdditiveExpressionContext.prototype, "accept", null);
exports.AdditiveExpressionContext = AdditiveExpressionContext;
class PrefixExpressionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    unary() {
        return this.tryGetRuleContext(0, UnaryContext);
    }
    Sum() { return this.tryGetToken(QasmParser.Sum, 0); }
    prefixExpression() {
        return this.tryGetRuleContext(0, PrefixExpressionContext);
    }
    Subs() { return this.tryGetToken(QasmParser.Subs, 0); }
    get ruleIndex() { return QasmParser.RULE_prefixExpression; }
    enterRule(listener) {
        if (listener.enterPrefixExpression)
            listener.enterPrefixExpression(this);
    }
    exitRule(listener) {
        if (listener.exitPrefixExpression)
            listener.exitPrefixExpression(this);
    }
    accept(visitor) {
        if (visitor.visitPrefixExpression)
            return visitor.visitPrefixExpression(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], PrefixExpressionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], PrefixExpressionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], PrefixExpressionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], PrefixExpressionContext.prototype, "accept", null);
exports.PrefixExpressionContext = PrefixExpressionContext;
class UnaryContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Int() { return this.tryGetToken(QasmParser.Int, 0); }
    Real() { return this.tryGetToken(QasmParser.Real, 0); }
    Pi() { return this.tryGetToken(QasmParser.Pi, 0); }
    Id() { return this.tryGetToken(QasmParser.Id, 0); }
    LeftParen() { return this.tryGetToken(QasmParser.LeftParen, 0); }
    expression() {
        return this.tryGetRuleContext(0, ExpressionContext);
    }
    RightParen() { return this.tryGetToken(QasmParser.RightParen, 0); }
    get ruleIndex() { return QasmParser.RULE_unary; }
    enterRule(listener) {
        if (listener.enterUnary)
            listener.enterUnary(this);
    }
    exitRule(listener) {
        if (listener.exitUnary)
            listener.exitUnary(this);
    }
    accept(visitor) {
        if (visitor.visitUnary)
            return visitor.visitUnary(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], UnaryContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], UnaryContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], UnaryContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], UnaryContext.prototype, "accept", null);
exports.UnaryContext = UnaryContext;
class IdListContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    Id() { return this.getToken(QasmParser.Id, 0); }
    idList() {
        return this.tryGetRuleContext(0, IdListContext);
    }
    Comma() { return this.tryGetToken(QasmParser.Comma, 0); }
    get ruleIndex() { return QasmParser.RULE_idList; }
    enterRule(listener) {
        if (listener.enterIdList)
            listener.enterIdList(this);
    }
    exitRule(listener) {
        if (listener.exitIdList)
            listener.exitIdList(this);
    }
    accept(visitor) {
        if (visitor.visitIdList)
            return visitor.visitIdList(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], IdListContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], IdListContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], IdListContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], IdListContext.prototype, "accept", null);
exports.IdListContext = IdListContext;
