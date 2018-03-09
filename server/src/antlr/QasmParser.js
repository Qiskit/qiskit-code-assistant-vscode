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
                this.state = 70;
                this.mainProgram();
                this.state = 71;
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
    mainProgram() {
        let _localctx = new MainProgramContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, QasmParser.RULE_mainProgram);
        try {
            this.state = 78;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 0, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 73;
                        this.ibmDefinition();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 74;
                        this.ibmDefinition();
                        this.state = 75;
                        this.program(0);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 77;
                        this.library(0);
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
    ibmDefinition() {
        let _localctx = new IbmDefinitionContext(this._ctx, this.state);
        this.enterRule(_localctx, 4, QasmParser.RULE_ibmDefinition);
        try {
            this.state = 87;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 1, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 80;
                        this.match(QasmParser.IbmQasm);
                        this.state = 81;
                        this.match(QasmParser.Real);
                        this.state = 82;
                        this.match(QasmParser.Semi);
                        this.state = 83;
                        this.include();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 84;
                        this.match(QasmParser.IbmQasm);
                        this.state = 85;
                        this.match(QasmParser.Real);
                        this.state = 86;
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
        this.enterRule(_localctx, 6, QasmParser.RULE_include);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 89;
                this.match(QasmParser.Include);
                this.state = 90;
                this.match(QasmParser.Qelib);
                this.state = 91;
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
        let _startState = 8;
        this.enterRecursionRule(_localctx, 8, QasmParser.RULE_library, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 94;
                    this.declaration();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 100;
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
                                this.state = 96;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 97;
                                this.declaration();
                            }
                        }
                    }
                    this.state = 102;
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
        let _startState = 10;
        this.enterRecursionRule(_localctx, 10, QasmParser.RULE_program, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 104;
                    this.statement();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 110;
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
                                this.state = 106;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 107;
                                this.statement();
                            }
                        }
                    }
                    this.state = 112;
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
        this.enterRule(_localctx, 12, QasmParser.RULE_statement);
        try {
            this.state = 115;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Qreg:
                case QasmParser.Creg:
                case QasmParser.Gate:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 113;
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
                        this.state = 114;
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
        this.enterRule(_localctx, 14, QasmParser.RULE_declaration);
        try {
            this.state = 120;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Qreg:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 117;
                        this.qregDeclaration();
                    }
                    break;
                case QasmParser.Creg:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 118;
                        this.cregDeclaration();
                    }
                    break;
                case QasmParser.Gate:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 119;
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
        this.enterRule(_localctx, 16, QasmParser.RULE_qoperation);
        try {
            this.state = 137;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.U:
                case QasmParser.Cx:
                case QasmParser.Id:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 122;
                        this.unitaryOperation();
                        this.state = 123;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Opaque:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 125;
                        this.opaque();
                        this.state = 126;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Measure:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 128;
                        this.measure();
                        this.state = 129;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Barrier:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 131;
                        this.barrier();
                        this.state = 132;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case QasmParser.Reset:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 134;
                        this.resetOperation();
                        this.state = 135;
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
        this.enterRule(_localctx, 18, QasmParser.RULE_unitaryOperation);
        try {
            this.state = 162;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 7, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 139;
                        this.match(QasmParser.U);
                        this.state = 140;
                        this.match(QasmParser.LeftParen);
                        this.state = 141;
                        this.expList(0);
                        this.state = 142;
                        this.match(QasmParser.RightParen);
                        this.state = 143;
                        this.primary();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 145;
                        this.match(QasmParser.Cx);
                        this.state = 146;
                        this.primary();
                        this.state = 147;
                        this.match(QasmParser.Comma);
                        this.state = 148;
                        this.primary();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 150;
                        this.match(QasmParser.Id);
                        this.state = 151;
                        this.primaryList(0);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 152;
                        this.match(QasmParser.Id);
                        this.state = 153;
                        this.match(QasmParser.LeftParen);
                        this.state = 154;
                        this.match(QasmParser.RightParen);
                        this.state = 155;
                        this.primaryList(0);
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 156;
                        this.match(QasmParser.Id);
                        this.state = 157;
                        this.match(QasmParser.LeftParen);
                        this.state = 158;
                        this.expList(0);
                        this.state = 159;
                        this.match(QasmParser.RightParen);
                        this.state = 160;
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
        this.enterRule(_localctx, 20, QasmParser.RULE_opaque);
        try {
            this.state = 184;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 8, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 164;
                        this.match(QasmParser.Opaque);
                        this.state = 165;
                        this.match(QasmParser.Id);
                        this.state = 166;
                        this.gateScope();
                        this.state = 167;
                        this.bitList(0);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 169;
                        this.match(QasmParser.Opaque);
                        this.state = 170;
                        this.match(QasmParser.Id);
                        this.state = 171;
                        this.gateScope();
                        this.state = 172;
                        this.match(QasmParser.LeftParen);
                        this.state = 173;
                        this.match(QasmParser.RightParen);
                        this.state = 174;
                        this.bitList(0);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 176;
                        this.match(QasmParser.Opaque);
                        this.state = 177;
                        this.match(QasmParser.Id);
                        this.state = 178;
                        this.gateScope();
                        this.state = 179;
                        this.match(QasmParser.LeftParen);
                        this.state = 180;
                        this.gateIdList(0);
                        this.state = 181;
                        this.match(QasmParser.RightParen);
                        this.state = 182;
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
        this.enterRule(_localctx, 22, QasmParser.RULE_measure);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 186;
                this.match(QasmParser.Measure);
                this.state = 187;
                this.primary();
                this.state = 188;
                this.match(QasmParser.Assign);
                this.state = 189;
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
        this.enterRule(_localctx, 24, QasmParser.RULE_barrier);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 191;
                this.match(QasmParser.Barrier);
                this.state = 192;
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
        this.enterRule(_localctx, 26, QasmParser.RULE_resetOperation);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 194;
                this.match(QasmParser.Reset);
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
    primaryList(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new PrimaryListContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 28;
        this.enterRecursionRule(_localctx, 28, QasmParser.RULE_primaryList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 198;
                    this.primary();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 205;
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
                                this.state = 200;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 201;
                                this.match(QasmParser.Comma);
                                this.state = 202;
                                this.primary();
                            }
                        }
                    }
                    this.state = 207;
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
        this.enterRule(_localctx, 30, QasmParser.RULE_primary);
        try {
            this.state = 210;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 10, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 208;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 209;
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
        this.enterRule(_localctx, 32, QasmParser.RULE_indexedId);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 212;
                this.match(QasmParser.Id);
                this.state = 213;
                this.match(QasmParser.LeftBrace);
                this.state = 214;
                this.match(QasmParser.Int);
                this.state = 215;
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
        this.enterRule(_localctx, 34, QasmParser.RULE_qregDeclaration);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 217;
                this.match(QasmParser.Qreg);
                this.state = 218;
                this.match(QasmParser.Id);
                this.state = 219;
                this.match(QasmParser.LeftBrace);
                this.state = 220;
                this.match(QasmParser.Int);
                this.state = 221;
                this.match(QasmParser.RightBrace);
                this.state = 222;
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
        this.enterRule(_localctx, 36, QasmParser.RULE_cregDeclaration);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 224;
                this.match(QasmParser.Creg);
                this.state = 225;
                this.match(QasmParser.Id);
                this.state = 226;
                this.match(QasmParser.LeftBrace);
                this.state = 227;
                this.match(QasmParser.Int);
                this.state = 228;
                this.match(QasmParser.RightBrace);
                this.state = 229;
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
        this.enterRule(_localctx, 38, QasmParser.RULE_gateDeclaration);
        try {
            this.state = 254;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 11, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 231;
                        this.match(QasmParser.Gate);
                        this.state = 232;
                        this.match(QasmParser.Id);
                        this.state = 233;
                        this.gateScope();
                        this.state = 234;
                        this.bitList(0);
                        this.state = 235;
                        this.gateBody();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 237;
                        this.match(QasmParser.Gate);
                        this.state = 238;
                        this.match(QasmParser.Id);
                        this.state = 239;
                        this.gateScope();
                        this.state = 240;
                        this.match(QasmParser.LeftParen);
                        this.state = 241;
                        this.match(QasmParser.RightParen);
                        this.state = 242;
                        this.bitList(0);
                        this.state = 243;
                        this.gateBody();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 245;
                        this.match(QasmParser.Gate);
                        this.state = 246;
                        this.match(QasmParser.Id);
                        this.state = 247;
                        this.gateScope();
                        this.state = 248;
                        this.match(QasmParser.LeftParen);
                        this.state = 249;
                        this.gateIdList(0);
                        this.state = 250;
                        this.match(QasmParser.RightParen);
                        this.state = 251;
                        this.bitList(0);
                        this.state = 252;
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
        this.enterRule(_localctx, 40, QasmParser.RULE_gateScope);
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
        let _startState = 42;
        this.enterRecursionRule(_localctx, 42, QasmParser.RULE_bitList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 259;
                    this.bit();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 266;
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
                                this.state = 261;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 262;
                                this.match(QasmParser.Comma);
                                this.state = 263;
                                this.bit();
                            }
                        }
                    }
                    this.state = 268;
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
        this.enterRule(_localctx, 44, QasmParser.RULE_bit);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 269;
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
        this.enterRule(_localctx, 46, QasmParser.RULE_gateBody);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 271;
                this.match(QasmParser.LeftCurlyBrace);
                this.state = 272;
                this.gateOpList(0);
                this.state = 273;
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
        let _startState = 48;
        this.enterRecursionRule(_localctx, 48, QasmParser.RULE_gateOpList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 277;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 13, this._ctx)) {
                    case 1:
                        {
                        }
                        break;
                    case 2:
                        {
                            this.state = 276;
                            this.gateOp();
                        }
                        break;
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 283;
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
                                this.state = 279;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 280;
                                this.gateOp();
                            }
                        }
                    }
                    this.state = 285;
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
        this.enterRule(_localctx, 50, QasmParser.RULE_gateOp);
        try {
            this.state = 319;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 15, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 286;
                        this.match(QasmParser.U);
                        this.state = 287;
                        this.match(QasmParser.LeftParen);
                        this.state = 288;
                        this.expList(0);
                        this.state = 289;
                        this.match(QasmParser.RightParen);
                        this.state = 290;
                        this.match(QasmParser.Id);
                        this.state = 291;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 293;
                        this.match(QasmParser.Cx);
                        this.state = 294;
                        this.match(QasmParser.Id);
                        this.state = 295;
                        this.match(QasmParser.Comma);
                        this.state = 296;
                        this.match(QasmParser.Id);
                        this.state = 297;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 298;
                        this.match(QasmParser.Id);
                        this.state = 299;
                        this.idList(0);
                        this.state = 300;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 302;
                        this.match(QasmParser.Id);
                        this.state = 303;
                        this.match(QasmParser.LeftParen);
                        this.state = 304;
                        this.match(QasmParser.RightParen);
                        this.state = 305;
                        this.idList(0);
                        this.state = 306;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 308;
                        this.match(QasmParser.Id);
                        this.state = 309;
                        this.match(QasmParser.LeftParen);
                        this.state = 310;
                        this.expList(0);
                        this.state = 311;
                        this.match(QasmParser.RightParen);
                        this.state = 312;
                        this.idList(0);
                        this.state = 313;
                        this.match(QasmParser.Semi);
                    }
                    break;
                case 6:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 315;
                        this.match(QasmParser.Barrier);
                        this.state = 316;
                        this.idList(0);
                        this.state = 317;
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
        let _startState = 52;
        this.enterRecursionRule(_localctx, 52, QasmParser.RULE_gateIdList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 322;
                    this.gate();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 329;
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
                                this.state = 324;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 325;
                                this.match(QasmParser.Comma);
                                this.state = 326;
                                this.gate();
                            }
                        }
                    }
                    this.state = 331;
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
        this.enterRule(_localctx, 54, QasmParser.RULE_gate);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 332;
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
        let _startState = 56;
        this.enterRecursionRule(_localctx, 56, QasmParser.RULE_expList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 335;
                    this.expression(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 342;
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
                                this.state = 337;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 338;
                                this.match(QasmParser.Comma);
                                this.state = 339;
                                this.expression(0);
                            }
                        }
                    }
                    this.state = 344;
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
        let _startState = 58;
        this.enterRecursionRule(_localctx, 58, QasmParser.RULE_expression, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 346;
                    this.multiplicativeExpression(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 353;
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
                                this.state = 348;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 349;
                                this.match(QasmParser.Pow);
                                this.state = 350;
                                this.multiplicativeExpression(0);
                            }
                        }
                    }
                    this.state = 355;
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
        let _startState = 60;
        this.enterRecursionRule(_localctx, 60, QasmParser.RULE_multiplicativeExpression, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 357;
                    this.additiveExpression(0);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 367;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            this.state = 365;
                            this._errHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this._input, 19, this._ctx)) {
                                case 1:
                                    {
                                        _localctx = new MultiplicativeExpressionContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_multiplicativeExpression);
                                        this.state = 359;
                                        if (!(this.precpred(this._ctx, 2)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                                        this.state = 360;
                                        this.match(QasmParser.Mult);
                                        this.state = 361;
                                        this.multiplicativeExpression(3);
                                    }
                                    break;
                                case 2:
                                    {
                                        _localctx = new MultiplicativeExpressionContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_multiplicativeExpression);
                                        this.state = 362;
                                        if (!(this.precpred(this._ctx, 1)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                        this.state = 363;
                                        this.match(QasmParser.Div);
                                        this.state = 364;
                                        this.multiplicativeExpression(2);
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 369;
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
        let _startState = 62;
        this.enterRecursionRule(_localctx, 62, QasmParser.RULE_additiveExpression, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 371;
                    this.prefixExpression();
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 381;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null)
                            this.triggerExitRuleEvent();
                        _prevctx = _localctx;
                        {
                            this.state = 379;
                            this._errHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this._input, 21, this._ctx)) {
                                case 1:
                                    {
                                        _localctx = new AdditiveExpressionContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_additiveExpression);
                                        this.state = 373;
                                        if (!(this.precpred(this._ctx, 2)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                                        this.state = 374;
                                        this.match(QasmParser.Sum);
                                        this.state = 375;
                                        this.additiveExpression(3);
                                    }
                                    break;
                                case 2:
                                    {
                                        _localctx = new AdditiveExpressionContext(_parentctx, _parentState);
                                        this.pushNewRecursionContext(_localctx, _startState, QasmParser.RULE_additiveExpression);
                                        this.state = 376;
                                        if (!(this.precpred(this._ctx, 1)))
                                            throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                        this.state = 377;
                                        this.match(QasmParser.Subs);
                                        this.state = 378;
                                        this.additiveExpression(2);
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 383;
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
        this.enterRule(_localctx, 64, QasmParser.RULE_prefixExpression);
        try {
            this.state = 389;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case QasmParser.Real:
                case QasmParser.Int:
                case QasmParser.LeftParen:
                case QasmParser.Pi:
                case QasmParser.Id:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 384;
                        this.unary();
                    }
                    break;
                case QasmParser.Sum:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 385;
                        this.match(QasmParser.Sum);
                        this.state = 386;
                        this.prefixExpression();
                    }
                    break;
                case QasmParser.Subs:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 387;
                        this.match(QasmParser.Subs);
                        this.state = 388;
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
        this.enterRule(_localctx, 66, QasmParser.RULE_unary);
        try {
            this.state = 404;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 24, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 391;
                        this.match(QasmParser.Int);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 392;
                        this.match(QasmParser.Real);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 393;
                        this.match(QasmParser.Pi);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 394;
                        this.match(QasmParser.Id);
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 395;
                        this.match(QasmParser.LeftParen);
                        this.state = 396;
                        this.expression(0);
                        this.state = 397;
                        this.match(QasmParser.RightParen);
                    }
                    break;
                case 6:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 399;
                        this.match(QasmParser.Id);
                        this.state = 400;
                        this.match(QasmParser.LeftParen);
                        this.state = 401;
                        this.expression(0);
                        this.state = 402;
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
        let _startState = 68;
        this.enterRecursionRule(_localctx, 68, QasmParser.RULE_idList, _p);
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 407;
                    this.match(QasmParser.Id);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 414;
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
                                this.state = 409;
                                if (!(this.precpred(this._ctx, 1)))
                                    throw new FailedPredicateException_1.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                                this.state = 410;
                                this.match(QasmParser.Comma);
                                this.state = 411;
                                this.match(QasmParser.Id);
                            }
                        }
                    }
                    this.state = 416;
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
            case 4:
                return this.library_sempred(_localctx, predIndex);
            case 5:
                return this.program_sempred(_localctx, predIndex);
            case 14:
                return this.primaryList_sempred(_localctx, predIndex);
            case 21:
                return this.bitList_sempred(_localctx, predIndex);
            case 24:
                return this.gateOpList_sempred(_localctx, predIndex);
            case 26:
                return this.gateIdList_sempred(_localctx, predIndex);
            case 28:
                return this.expList_sempred(_localctx, predIndex);
            case 29:
                return this.expression_sempred(_localctx, predIndex);
            case 30:
                return this.multiplicativeExpression_sempred(_localctx, predIndex);
            case 31:
                return this.additiveExpression_sempred(_localctx, predIndex);
            case 34:
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
QasmParser.U = 10;
QasmParser.Cx = 11;
QasmParser.Measure = 12;
QasmParser.Barrier = 13;
QasmParser.Reset = 14;
QasmParser.Opaque = 15;
QasmParser.Assign = 16;
QasmParser.Semi = 17;
QasmParser.Comma = 18;
QasmParser.LeftCurlyBrace = 19;
QasmParser.RightCurlyBrace = 20;
QasmParser.LeftBrace = 21;
QasmParser.RightBrace = 22;
QasmParser.LeftParen = 23;
QasmParser.RightParen = 24;
QasmParser.Pow = 25;
QasmParser.Mult = 26;
QasmParser.Div = 27;
QasmParser.Sum = 28;
QasmParser.Subs = 29;
QasmParser.Pi = 30;
QasmParser.Gate = 31;
QasmParser.Id = 32;
QasmParser.RULE_startProgram = 0;
QasmParser.RULE_mainProgram = 1;
QasmParser.RULE_ibmDefinition = 2;
QasmParser.RULE_include = 3;
QasmParser.RULE_library = 4;
QasmParser.RULE_program = 5;
QasmParser.RULE_statement = 6;
QasmParser.RULE_declaration = 7;
QasmParser.RULE_qoperation = 8;
QasmParser.RULE_unitaryOperation = 9;
QasmParser.RULE_opaque = 10;
QasmParser.RULE_measure = 11;
QasmParser.RULE_barrier = 12;
QasmParser.RULE_resetOperation = 13;
QasmParser.RULE_primaryList = 14;
QasmParser.RULE_primary = 15;
QasmParser.RULE_indexedId = 16;
QasmParser.RULE_qregDeclaration = 17;
QasmParser.RULE_cregDeclaration = 18;
QasmParser.RULE_gateDeclaration = 19;
QasmParser.RULE_gateScope = 20;
QasmParser.RULE_bitList = 21;
QasmParser.RULE_bit = 22;
QasmParser.RULE_gateBody = 23;
QasmParser.RULE_gateOpList = 24;
QasmParser.RULE_gateOp = 25;
QasmParser.RULE_gateIdList = 26;
QasmParser.RULE_gate = 27;
QasmParser.RULE_expList = 28;
QasmParser.RULE_expression = 29;
QasmParser.RULE_multiplicativeExpression = 30;
QasmParser.RULE_additiveExpression = 31;
QasmParser.RULE_prefixExpression = 32;
QasmParser.RULE_unary = 33;
QasmParser.RULE_idList = 34;
QasmParser.ruleNames = [
    "startProgram", "mainProgram", "ibmDefinition", "include", "library",
    "program", "statement", "declaration", "qoperation", "unitaryOperation",
    "opaque", "measure", "barrier", "resetOperation", "primaryList", "primary",
    "indexedId", "qregDeclaration", "cregDeclaration", "gateDeclaration",
    "gateScope", "bitList", "bit", "gateBody", "gateOpList", "gateOp", "gateIdList",
    "gate", "expList", "expression", "multiplicativeExpression", "additiveExpression",
    "prefixExpression", "unary", "idList"
];
QasmParser._LITERAL_NAMES = [
    undefined, undefined, undefined, undefined, undefined, undefined, "'include'",
    "'QELIB.INC'", "'qreg'", "'creg'", "'U'", "'CX'", "'measure'", "'barrier'",
    "'reset'", "'opaque'", "'->'", "';'", "','", "'{'", "'}'", "'['", "']'",
    "'('", "')'", "'^'", "'*'", "'/'", "'+'", "'-'", "'pi'", "'gate'"
];
QasmParser._SYMBOLIC_NAMES = [
    undefined, "Comment", "WhiteSpace", "Real", "Int", "IbmQasm", "Include",
    "Qelib", "Qreg", "Creg", "U", "Cx", "Measure", "Barrier", "Reset", "Opaque",
    "Assign", "Semi", "Comma", "LeftCurlyBrace", "RightCurlyBrace", "LeftBrace",
    "RightBrace", "LeftParen", "RightParen", "Pow", "Mult", "Div", "Sum",
    "Subs", "Pi", "Gate", "Id"
];
QasmParser.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(QasmParser._LITERAL_NAMES, QasmParser._SYMBOLIC_NAMES, []);
QasmParser._serializedATN = "\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03\"\u01A4\x04\x02" +
    "\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
    "\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
    "\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
    "\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
    "\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
    "\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
    "\t#\x04$\t$\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
    "\x03\x05\x03Q\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
    "\x04\x05\x04Z\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03" +
    "\x06\x03\x06\x03\x06\x07\x06e\n\x06\f\x06\x0E\x06h\v\x06\x03\x07\x03\x07" +
    "\x03\x07\x03\x07\x03\x07\x07\x07o\n\x07\f\x07\x0E\x07r\v\x07\x03\b\x03" +
    "\b\x05\bv\n\b\x03\t\x03\t\x03\t\x05\t{\n\t\x03\n\x03\n\x03\n\x03\n\x03" +
    "\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\x8C" +
    "\n\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v" +
    "\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
    "\v\x05\v\xA5\n\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f" +
    "\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05" +
    "\f\xBB\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0F" +
    "\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x07\x10" +
    "\xCE\n\x10\f\x10\x0E\x10\xD1\v\x10\x03\x11\x03\x11\x05\x11\xD5\n\x11\x03" +
    "\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
    "\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03" +
    "\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03" +
    "\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03" +
    "\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x05\x15\u0101\n\x15\x03\x16" +
    "\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x07\x17\u010B" +
    "\n\x17\f\x17\x0E\x17\u010E\v\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19" +
    "\x03\x19\x03\x1A\x03\x1A\x05\x1A\u0118\n\x1A\x03\x1A\x03\x1A\x07\x1A\u011C" +
    "\n\x1A\f\x1A\x0E\x1A\u011F\v\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
    "\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
    "\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
    "\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
    "\x03\x1B\x05\x1B\u0142\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03" +
    "\x1C\x07\x1C\u014A\n\x1C\f\x1C\x0E\x1C\u014D\v\x1C\x03\x1D\x03\x1D\x03" +
    "\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x07\x1E\u0157\n\x1E\f\x1E" +
    "\x0E\x1E\u015A\v\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x07" +
    "\x1F\u0162\n\x1F\f\x1F\x0E\x1F\u0165\v\x1F\x03 \x03 \x03 \x03 \x03 \x03" +
    " \x03 \x03 \x03 \x07 \u0170\n \f \x0E \u0173\v \x03!\x03!\x03!\x03!\x03" +
    "!\x03!\x03!\x03!\x03!\x07!\u017E\n!\f!\x0E!\u0181\v!\x03\"\x03\"\x03\"" +
    "\x03\"\x03\"\x05\"\u0188\n\"\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
    "#\x03#\x03#\x03#\x03#\x05#\u0197\n#\x03$\x03$\x03$\x03$\x03$\x03$\x07" +
    "$\u019F\n$\f$\x0E$\u01A2\v$\x03$\x02\x02\r\n\f\x1E,26:<>@F%\x02\x02\x04" +
    "\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02" +
    "\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02." +
    "\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02\x02\x02" +
    "\u01AD\x02H\x03\x02\x02\x02\x04P\x03\x02\x02\x02\x06Y\x03\x02\x02\x02" +
    "\b[\x03\x02\x02\x02\n_\x03\x02\x02\x02\fi\x03\x02\x02\x02\x0Eu\x03\x02" +
    "\x02\x02\x10z\x03\x02\x02\x02\x12\x8B\x03\x02\x02\x02\x14\xA4\x03\x02" +
    "\x02\x02\x16\xBA\x03\x02\x02\x02\x18\xBC\x03\x02\x02\x02\x1A\xC1\x03\x02" +
    "\x02\x02\x1C\xC4\x03\x02\x02\x02\x1E\xC7\x03\x02\x02\x02 \xD4\x03\x02" +
    "\x02\x02\"\xD6\x03\x02\x02\x02$\xDB\x03\x02\x02\x02&\xE2\x03\x02\x02\x02" +
    "(\u0100\x03\x02\x02\x02*\u0102\x03\x02\x02\x02,\u0104\x03\x02\x02\x02" +
    ".\u010F\x03\x02\x02\x020\u0111\x03\x02\x02\x022\u0117\x03\x02\x02\x02" +
    "4\u0141\x03\x02\x02\x026\u0143\x03\x02\x02\x028\u014E\x03\x02\x02\x02" +
    ":\u0150\x03\x02\x02\x02<\u015B\x03\x02\x02\x02>\u0166\x03\x02\x02\x02" +
    "@\u0174\x03\x02\x02\x02B\u0187\x03\x02\x02\x02D\u0196\x03\x02\x02\x02" +
    "F\u0198\x03\x02\x02\x02HI\x05\x04\x03\x02IJ\x07\x02\x02\x03J\x03\x03\x02" +
    "\x02\x02KQ\x05\x06\x04\x02LM\x05\x06\x04\x02MN\x05\f\x07\x02NQ\x03\x02" +
    "\x02\x02OQ\x05\n\x06\x02PK\x03\x02\x02\x02PL\x03\x02\x02\x02PO\x03\x02" +
    "\x02\x02Q\x05\x03\x02\x02\x02RS\x07\x07\x02\x02ST\x07\x05\x02\x02TU\x07" +
    "\x13\x02\x02UZ\x05\b\x05\x02VW\x07\x07\x02\x02WX\x07\x05\x02\x02XZ\x07" +
    "\x13\x02\x02YR\x03\x02\x02\x02YV\x03\x02\x02\x02Z\x07\x03\x02\x02\x02" +
    "[\\\x07\b\x02\x02\\]\x07\t\x02\x02]^\x07\x13\x02\x02^\t\x03\x02\x02\x02" +
    "_`\b\x06\x01\x02`a\x05\x10\t\x02af\x03\x02\x02\x02bc\f\x03\x02\x02ce\x05" +
    "\x10\t\x02db\x03\x02\x02\x02eh\x03\x02\x02\x02fd\x03\x02\x02\x02fg\x03" +
    "\x02\x02\x02g\v\x03\x02\x02\x02hf\x03\x02\x02\x02ij\b\x07\x01\x02jk\x05" +
    "\x0E\b\x02kp\x03\x02\x02\x02lm\f\x03\x02\x02mo\x05\x0E\b\x02nl\x03\x02" +
    "\x02\x02or\x03\x02\x02\x02pn\x03\x02\x02\x02pq\x03\x02\x02\x02q\r\x03" +
    "\x02\x02\x02rp\x03\x02\x02\x02sv\x05\x10\t\x02tv\x05\x12\n\x02us\x03\x02" +
    "\x02\x02ut\x03\x02\x02\x02v\x0F\x03\x02\x02\x02w{\x05$\x13\x02x{\x05&" +
    "\x14\x02y{\x05(\x15\x02zw\x03\x02\x02\x02zx\x03\x02\x02\x02zy\x03\x02" +
    "\x02\x02{\x11\x03\x02\x02\x02|}\x05\x14\v\x02}~\x07\x13\x02\x02~\x8C\x03" +
    "\x02\x02\x02\x7F\x80\x05\x16\f\x02\x80\x81\x07\x13\x02\x02\x81\x8C\x03" +
    "\x02\x02\x02\x82\x83\x05\x18\r\x02\x83\x84\x07\x13\x02\x02\x84\x8C\x03" +
    "\x02\x02\x02\x85\x86\x05\x1A\x0E\x02\x86\x87\x07\x13\x02\x02\x87\x8C\x03" +
    "\x02\x02\x02\x88\x89\x05\x1C\x0F\x02\x89\x8A\x07\x13\x02\x02\x8A\x8C\x03" +
    "\x02\x02\x02\x8B|\x03\x02\x02\x02\x8B\x7F\x03\x02\x02\x02\x8B\x82\x03" +
    "\x02\x02\x02\x8B\x85\x03\x02\x02\x02\x8B\x88\x03\x02\x02\x02\x8C\x13\x03" +
    "\x02\x02\x02\x8D\x8E\x07\f\x02\x02\x8E\x8F\x07\x19\x02\x02\x8F\x90\x05" +
    ":\x1E\x02\x90\x91\x07\x1A\x02\x02\x91\x92\x05 \x11\x02\x92\xA5\x03\x02" +
    "\x02\x02\x93\x94\x07\r\x02\x02\x94\x95\x05 \x11\x02\x95\x96\x07\x14\x02" +
    "\x02\x96\x97\x05 \x11\x02\x97\xA5\x03\x02\x02\x02\x98\x99\x07\"\x02\x02" +
    "\x99\xA5\x05\x1E\x10\x02\x9A\x9B\x07\"\x02\x02\x9B\x9C\x07\x19\x02\x02" +
    "\x9C\x9D\x07\x1A\x02\x02\x9D\xA5\x05\x1E\x10\x02\x9E\x9F\x07\"\x02\x02" +
    "\x9F\xA0\x07\x19\x02\x02\xA0\xA1\x05:\x1E\x02\xA1\xA2\x07\x1A\x02\x02" +
    "\xA2\xA3\x05\x1E\x10\x02\xA3\xA5\x03\x02\x02\x02\xA4\x8D\x03\x02\x02\x02" +
    "\xA4\x93\x03\x02\x02\x02\xA4\x98\x03\x02\x02\x02\xA4\x9A\x03\x02\x02\x02" +
    "\xA4\x9E\x03\x02\x02\x02\xA5\x15\x03\x02\x02\x02\xA6\xA7\x07\x11\x02\x02" +
    "\xA7\xA8\x07\"\x02\x02\xA8\xA9\x05*\x16\x02\xA9\xAA\x05,\x17\x02\xAA\xBB" +
    "\x03\x02\x02\x02\xAB\xAC\x07\x11\x02\x02\xAC\xAD\x07\"\x02\x02\xAD\xAE" +
    "\x05*\x16\x02\xAE\xAF\x07\x19\x02\x02\xAF\xB0\x07\x1A\x02\x02\xB0\xB1" +
    "\x05,\x17\x02\xB1\xBB\x03\x02\x02\x02\xB2\xB3\x07\x11\x02\x02\xB3\xB4" +
    "\x07\"\x02\x02\xB4\xB5\x05*\x16\x02\xB5\xB6\x07\x19\x02\x02\xB6\xB7\x05" +
    "6\x1C\x02\xB7\xB8\x07\x1A\x02\x02\xB8\xB9\x05,\x17\x02\xB9\xBB\x03\x02" +
    "\x02\x02\xBA\xA6\x03\x02\x02\x02\xBA\xAB\x03\x02\x02\x02\xBA\xB2\x03\x02" +
    "\x02\x02\xBB\x17\x03\x02\x02\x02\xBC\xBD\x07\x0E\x02\x02\xBD\xBE\x05 " +
    "\x11\x02\xBE\xBF\x07\x12\x02\x02\xBF\xC0\x05 \x11\x02\xC0\x19\x03\x02" +
    "\x02\x02\xC1\xC2\x07\x0F\x02\x02\xC2\xC3\x05\x1E\x10\x02\xC3\x1B\x03\x02" +
    "\x02\x02\xC4\xC5\x07\x10\x02\x02\xC5\xC6\x05 \x11\x02\xC6\x1D\x03\x02" +
    "\x02\x02\xC7\xC8\b\x10\x01\x02\xC8\xC9\x05 \x11\x02\xC9\xCF\x03\x02\x02" +
    "\x02\xCA\xCB\f\x03\x02\x02\xCB\xCC\x07\x14\x02\x02\xCC\xCE\x05 \x11\x02" +
    "\xCD\xCA\x03\x02\x02\x02\xCE\xD1\x03\x02\x02\x02\xCF\xCD\x03\x02\x02\x02" +
    "\xCF\xD0\x03\x02\x02\x02\xD0\x1F\x03\x02\x02\x02\xD1\xCF\x03\x02\x02\x02" +
    "\xD2\xD5\x07\"\x02\x02\xD3\xD5\x05\"\x12\x02\xD4\xD2\x03\x02\x02\x02\xD4" +
    "\xD3\x03\x02\x02\x02\xD5!\x03\x02\x02\x02\xD6\xD7\x07\"\x02\x02\xD7\xD8" +
    "\x07\x17\x02\x02\xD8\xD9\x07\x06\x02\x02\xD9\xDA\x07\x18\x02\x02\xDA#" +
    "\x03\x02\x02\x02\xDB\xDC\x07\n\x02\x02\xDC\xDD\x07\"\x02\x02\xDD\xDE\x07" +
    "\x17\x02\x02\xDE\xDF\x07\x06\x02\x02\xDF\xE0\x07\x18\x02\x02\xE0\xE1\x07" +
    "\x13\x02\x02\xE1%\x03\x02\x02\x02\xE2\xE3\x07\v\x02\x02\xE3\xE4\x07\"" +
    "\x02\x02\xE4\xE5\x07\x17\x02\x02\xE5\xE6\x07\x06\x02\x02\xE6\xE7\x07\x18" +
    "\x02\x02\xE7\xE8\x07\x13\x02\x02\xE8\'\x03\x02\x02\x02\xE9\xEA\x07!\x02" +
    "\x02\xEA\xEB\x07\"\x02\x02\xEB\xEC\x05*\x16\x02\xEC\xED\x05,\x17\x02\xED" +
    "\xEE\x050\x19\x02\xEE\u0101\x03\x02\x02\x02\xEF\xF0\x07!\x02\x02\xF0\xF1" +
    "\x07\"\x02\x02\xF1\xF2\x05*\x16\x02\xF2\xF3\x07\x19\x02\x02\xF3\xF4\x07" +
    "\x1A\x02\x02\xF4\xF5\x05,\x17\x02\xF5\xF6\x050\x19\x02\xF6\u0101\x03\x02" +
    "\x02\x02\xF7\xF8\x07!\x02\x02\xF8\xF9\x07\"\x02\x02\xF9\xFA\x05*\x16\x02" +
    "\xFA\xFB\x07\x19\x02\x02\xFB\xFC\x056\x1C\x02\xFC\xFD\x07\x1A\x02\x02" +
    "\xFD\xFE\x05,\x17\x02\xFE\xFF\x050\x19\x02\xFF\u0101\x03\x02\x02\x02\u0100" +
    "\xE9\x03\x02\x02\x02\u0100\xEF\x03\x02\x02\x02\u0100\xF7\x03\x02\x02\x02" +
    "\u0101)\x03\x02\x02\x02\u0102\u0103\x03\x02\x02\x02\u0103+\x03\x02\x02" +
    "\x02\u0104\u0105\b\x17\x01\x02\u0105\u0106\x05.\x18\x02\u0106\u010C\x03" +
    "\x02\x02\x02\u0107\u0108\f\x03\x02\x02\u0108\u0109\x07\x14\x02\x02\u0109" +
    "\u010B\x05.\x18\x02\u010A\u0107\x03\x02\x02\x02\u010B\u010E\x03\x02\x02" +
    "\x02\u010C\u010A\x03\x02\x02\x02\u010C\u010D\x03\x02\x02\x02\u010D-\x03" +
    "\x02\x02\x02\u010E\u010C\x03\x02\x02\x02\u010F\u0110\x07\"\x02\x02\u0110" +
    "/\x03\x02\x02\x02\u0111\u0112\x07\x15\x02\x02\u0112\u0113\x052\x1A\x02" +
    "\u0113\u0114\x07\x16\x02\x02\u01141\x03\x02\x02\x02\u0115\u0118\b\x1A" +
    "\x01\x02\u0116\u0118\x054\x1B\x02\u0117\u0115\x03\x02\x02\x02\u0117\u0116" +
    "\x03\x02\x02\x02\u0118\u011D\x03\x02\x02\x02\u0119\u011A\f\x03\x02\x02" +
    "\u011A\u011C\x054\x1B\x02\u011B\u0119\x03\x02\x02\x02\u011C\u011F\x03" +
    "\x02\x02\x02\u011D\u011B\x03\x02\x02\x02\u011D\u011E\x03\x02\x02\x02\u011E" +
    "3\x03\x02\x02\x02\u011F\u011D\x03\x02\x02\x02\u0120\u0121\x07\f\x02\x02" +
    "\u0121\u0122\x07\x19\x02\x02\u0122\u0123\x05:\x1E\x02\u0123\u0124\x07" +
    "\x1A\x02\x02\u0124\u0125\x07\"\x02\x02\u0125\u0126\x07\x13\x02\x02\u0126" +
    "\u0142\x03\x02\x02\x02\u0127\u0128\x07\r\x02\x02\u0128\u0129\x07\"\x02" +
    "\x02\u0129\u012A\x07\x14\x02\x02\u012A\u012B\x07\"\x02\x02\u012B\u0142" +
    "\x07\x13\x02\x02\u012C\u012D\x07\"\x02\x02\u012D\u012E\x05F$\x02\u012E" +
    "\u012F\x07\x13\x02\x02\u012F\u0142\x03\x02\x02\x02\u0130\u0131\x07\"\x02" +
    "\x02\u0131\u0132\x07\x19\x02\x02\u0132\u0133\x07\x1A\x02\x02\u0133\u0134" +
    "\x05F$\x02\u0134\u0135\x07\x13\x02\x02\u0135\u0142\x03\x02\x02\x02\u0136" +
    "\u0137\x07\"\x02\x02\u0137\u0138\x07\x19\x02\x02\u0138\u0139\x05:\x1E" +
    "\x02\u0139\u013A\x07\x1A\x02\x02\u013A\u013B\x05F$\x02\u013B\u013C\x07" +
    "\x13\x02\x02\u013C\u0142\x03\x02\x02\x02\u013D\u013E\x07\x0F\x02\x02\u013E" +
    "\u013F\x05F$\x02\u013F\u0140\x07\x13\x02\x02\u0140\u0142\x03\x02\x02\x02" +
    "\u0141\u0120\x03\x02\x02\x02\u0141\u0127\x03\x02\x02\x02\u0141\u012C\x03" +
    "\x02\x02\x02\u0141\u0130\x03\x02\x02\x02\u0141\u0136\x03\x02\x02\x02\u0141" +
    "\u013D\x03\x02\x02\x02\u01425\x03\x02\x02\x02\u0143\u0144\b\x1C\x01\x02" +
    "\u0144\u0145\x058\x1D\x02\u0145\u014B\x03\x02\x02\x02\u0146\u0147\f\x03" +
    "\x02\x02\u0147\u0148\x07\x14\x02\x02\u0148\u014A\x058\x1D\x02\u0149\u0146" +
    "\x03\x02\x02\x02\u014A\u014D\x03\x02\x02\x02\u014B\u0149\x03\x02\x02\x02" +
    "\u014B\u014C\x03\x02\x02\x02\u014C7\x03\x02\x02\x02\u014D\u014B\x03\x02" +
    "\x02\x02\u014E\u014F\x07\"\x02\x02\u014F9\x03\x02\x02\x02\u0150\u0151" +
    "\b\x1E\x01\x02\u0151\u0152\x05<\x1F\x02\u0152\u0158\x03\x02\x02\x02\u0153" +
    "\u0154\f\x03\x02\x02\u0154\u0155\x07\x14\x02\x02\u0155\u0157\x05<\x1F" +
    "\x02\u0156\u0153\x03\x02\x02\x02\u0157\u015A\x03\x02\x02\x02\u0158\u0156" +
    "\x03\x02\x02\x02\u0158\u0159\x03\x02\x02\x02\u0159;\x03\x02\x02\x02\u015A" +
    "\u0158\x03\x02\x02\x02\u015B\u015C\b\x1F\x01\x02\u015C\u015D\x05> \x02" +
    "\u015D\u0163\x03\x02\x02\x02\u015E\u015F\f\x03\x02\x02\u015F\u0160\x07" +
    "\x1B\x02\x02\u0160\u0162\x05> \x02\u0161\u015E\x03\x02\x02\x02\u0162\u0165" +
    "\x03\x02\x02\x02\u0163\u0161\x03\x02\x02\x02\u0163\u0164\x03\x02\x02\x02" +
    "\u0164=\x03\x02\x02\x02\u0165\u0163\x03\x02\x02\x02\u0166\u0167\b \x01" +
    "\x02\u0167\u0168\x05@!\x02\u0168\u0171\x03\x02\x02\x02\u0169\u016A\f\x04" +
    "\x02\x02\u016A\u016B\x07\x1C\x02\x02\u016B\u0170\x05> \x05\u016C\u016D" +
    "\f\x03\x02\x02\u016D\u016E\x07\x1D\x02\x02\u016E\u0170\x05> \x04\u016F" +
    "\u0169\x03\x02\x02\x02\u016F\u016C\x03\x02\x02\x02\u0170\u0173\x03\x02" +
    "\x02\x02\u0171\u016F\x03\x02\x02\x02\u0171\u0172\x03\x02\x02\x02\u0172" +
    "?\x03\x02\x02\x02\u0173\u0171\x03\x02\x02\x02\u0174\u0175\b!\x01\x02\u0175" +
    "\u0176\x05B\"\x02\u0176\u017F\x03\x02\x02\x02\u0177\u0178\f\x04\x02\x02" +
    "\u0178\u0179\x07\x1E\x02\x02\u0179\u017E\x05@!\x05\u017A\u017B\f\x03\x02" +
    "\x02\u017B\u017C\x07\x1F\x02\x02\u017C\u017E\x05@!\x04\u017D\u0177\x03" +
    "\x02\x02\x02\u017D\u017A\x03\x02\x02\x02\u017E\u0181\x03\x02\x02\x02\u017F" +
    "\u017D\x03\x02\x02\x02\u017F\u0180\x03\x02\x02\x02\u0180A\x03\x02\x02" +
    "\x02\u0181\u017F\x03\x02\x02\x02\u0182\u0188\x05D#\x02\u0183\u0184\x07" +
    "\x1E\x02\x02\u0184\u0188\x05B\"\x02\u0185\u0186\x07\x1F\x02\x02\u0186" +
    "\u0188\x05B\"\x02\u0187\u0182\x03\x02\x02\x02\u0187\u0183\x03\x02\x02" +
    "\x02\u0187\u0185\x03\x02\x02\x02\u0188C\x03\x02\x02\x02\u0189\u0197\x07" +
    "\x06\x02\x02\u018A\u0197\x07\x05\x02\x02\u018B\u0197\x07 \x02\x02\u018C" +
    "\u0197\x07\"\x02\x02\u018D\u018E\x07\x19\x02\x02\u018E\u018F\x05<\x1F" +
    "\x02\u018F\u0190\x07\x1A\x02\x02\u0190\u0197\x03\x02\x02\x02\u0191\u0192" +
    "\x07\"\x02\x02\u0192\u0193\x07\x19\x02\x02\u0193\u0194\x05<\x1F\x02\u0194" +
    "\u0195\x07\x1A\x02\x02\u0195\u0197\x03\x02\x02\x02\u0196\u0189\x03\x02" +
    "\x02\x02\u0196\u018A\x03\x02\x02\x02\u0196\u018B\x03\x02\x02\x02\u0196" +
    "\u018C\x03\x02\x02\x02\u0196\u018D\x03\x02\x02\x02\u0196\u0191\x03\x02" +
    "\x02\x02\u0197E\x03\x02\x02\x02\u0198\u0199\b$\x01\x02\u0199\u019A\x07" +
    "\"\x02\x02\u019A\u01A0\x03\x02\x02\x02\u019B\u019C\f\x03\x02\x02\u019C" +
    "\u019D\x07\x14\x02\x02\u019D\u019F\x07\"\x02\x02\u019E\u019B\x03\x02\x02" +
    "\x02\u019F\u01A2\x03\x02\x02\x02\u01A0\u019E\x03\x02\x02\x02\u01A0\u01A1" +
    "\x03\x02\x02\x02\u01A1G\x03\x02\x02\x02\u01A2\u01A0\x03\x02\x02\x02\x1C" +
    "PYfpuz\x8B\xA4\xBA\xCF\xD4\u0100\u010C\u0117\u011D\u0141\u014B\u0158\u0163" +
    "\u016F\u0171\u017D\u017F\u0187\u0196\u01A0";
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
], QasmParser.prototype, "mainProgram", null);
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
    mainProgram() {
        return this.getRuleContext(0, MainProgramContext);
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
class MainProgramContext extends ParserRuleContext_1.ParserRuleContext {
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
    get ruleIndex() { return QasmParser.RULE_mainProgram; }
    enterRule(listener) {
        if (listener.enterMainProgram)
            listener.enterMainProgram(this);
    }
    exitRule(listener) {
        if (listener.exitMainProgram)
            listener.exitMainProgram(this);
    }
    accept(visitor) {
        if (visitor.visitMainProgram)
            return visitor.visitMainProgram(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], MainProgramContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], MainProgramContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], MainProgramContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], MainProgramContext.prototype, "accept", null);
exports.MainProgramContext = MainProgramContext;
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
