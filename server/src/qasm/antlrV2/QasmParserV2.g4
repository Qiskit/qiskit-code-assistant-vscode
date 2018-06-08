// Copyright 2018 IBM RESEARCH. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

parser grammar QasmParserV2;
options { tokenVocab=QasmLexerV2; }

code
    : sentences
    | headers sentences
    | clean
    ;

headers
    : QasmDescriptor
    | QasmDescriptor includeLibrary
    | includeLibrary
    ;

includeLibrary
    : Include Library Semi 
    ;

sentences
    : sentence
    | sentence sentences
    ;

clean  
    : Clean EOF
    ;

sentence
    : definition
    | expression
    | conditional expression
    | EOF
    ;

definition
    : qregDefinition
    | cregDefinition
    | gateDefinition
    | opaqueDefinition Semi
    ;

expression
    : measure Semi 
    | customArglist Semi
    | cxGate Semi
    | barrierGate Semi
    | resetGate Semi
    ;

conditional
    : If LeftParen Id  Equals Int RightParen
    ;

qregDefinition: 
    Qreg Id LeftBrace dimension RightBrace Semi
    ;

cregDefinition:
    Creg Id LeftBrace dimension RightBrace Semi
    ;

dimension:
    Int
    ;

gateDefinition: 
    Gate Id gateDefinitionArguments
    ;

opaqueDefinition
    : Opaque Id opaqueDefinitionArguments
    ;

gateDefinitionArguments
    : paramsList LeftCurlyBrace body RightCurlyBrace
    | LeftParen paramsList RightParen paramsList LeftCurlyBrace body RightCurlyBrace
    | LeftParen paramsList RightParen paramsList LeftCurlyBrace RightCurlyBrace
    | LeftParen RightParen paramsList LeftCurlyBrace RightCurlyBrace
    | LeftParen RightParen paramsList LeftCurlyBrace body RightCurlyBrace
    | paramsList LeftCurlyBrace RightCurlyBrace
    ;

opaqueDefinitionArguments
    : paramsList
    | LeftParen paramsList RightParen paramsList
    ; 

paramsList
    : Id
    | Id Comma paramsList
    ;

body
    : bodyExpression
    | bodyExpression body
    ;

bodyExpression
    : Cx paramsList Semi
    | U LeftParen paramsListBody RightParen paramsList Semi
    | Id paramsList Semi 
    | Id LeftParen paramsListBody RightParen paramsList Semi 
    ;

paramsListBody
    : exp
    | paramsListBody Comma exp
    ;

exp
    : Int
    | Real
    | Pi
    | Id
    | unaryOp LeftParen exp RightParen
    | '-' exp
    | LeftParen exp RightParen
    | exp '+' exp
    | exp '-' exp
    | exp '*' exp
    | exp '/' exp
    | exp '^' exp
    ;

unaryOp
    : Sin
    | Cos
    | Tan
    | Exp
    | Ln
    | Sqrt
    ;

measure
    : Measure qubit Assign cbit 
    | Measure quantumRegister=Id  Assign classicalRegister=Id
    ;

qubit
    : Id LeftBrace position=Int RightBrace 
    ;

cbit
    : Id LeftBrace position=Int RightBrace 
    ;

customArglist
    : gate=Id LeftParen paramsListNumber RightParen qubitAndQregList 
    | gate=Id qubitAndQregList 
    ;

paramsListNumber
    : exp
    | paramsListNumber Comma exp
    ;

qubitAndQregList
    : qbitOrQreg
    | qbitOrQreg Comma qubitAndQregList 
    ;

qbitOrQreg
    : Id 
    | Id LeftBrace position=Int RightBrace 
    ;

cxGate
    : Cx qubitAndQregList
    ;

barrierGate
    : Barrier Id 
    | Barrier qubitList 
    ;

qubitList
    : qubit
    | qubit Comma qubitList
    ; 

resetGate
    : Reset qbitOrQreg
    ;