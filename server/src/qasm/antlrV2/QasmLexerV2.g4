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

lexer grammar QasmLexerV2;


Comment: '//' ~[\r\n]* -> skip;
WhiteSpace: [ \t\n\r] -> skip;

Real: [0-9]+'.'[0-9]+;
Int: [0-9]+;
QasmDescriptor: 'OPENQASM 2.0;' | 'IBMQASM 2.0;';
Include: 'include';
Qelib: 'QELIB.INC';
Qreg: 'qreg';
Creg: 'creg';
Clean: 'clean';
U: 'U';
Cx: 'CX';
Sin: 'sin';
Cos: 'cos';
Tan: 'tan';
Exp: 'exp';
Ln: 'ln';
Sqrt: 'sqrt';
Measure: 'measure';
Barrier: 'barrier';
Reset: 'reset';
Opaque: 'opaque';
If: 'if';
Equals: '==';
Assign: '->';
Semi: ';';
Comma: ',';
LeftCurlyBrace: '{';
RightCurlyBrace: '}';
LeftBrace: '[';
RightBrace: ']';
LeftParen: '(';
RightParen: ')';
Pow: '^';
Mult: '*';
Div: '/';
Sum: '+';
Subs: '-';
Pi: 'pi';
Gate: 'gate';
Library: [a-z][a-zA-Z0-9]*'.inc'; 
Id: [a-z][a-zA-Z0-9]*;