grammar Qasm;

startProgram
    : mainProgram EOF
    ;

mainProgram
    : ibmDefinition
    | ibmDefinition program
    | library
    ;

ibmDefinition
    : IbmQasm Real Semi include
    | IbmQasm Real Semi
    ;

include
    : Include Qelib Semi
    ;

library
    : declaration
    | library declaration
    ;

program
    : statement
    | program statement
    ;

statement
    : declaration
    | qoperation
    ;

declaration
    : qregDeclaration
    | cregDeclaration
    | gateDeclaration
    ;

qoperation
    : 'qoperation';

qregDeclaration
    : Qreg Id LeftBrace Int RightBrace Semi
    ;

cregDeclaration
    : Creg Id LeftBrace Int RightBrace Semi
    ;

gateDeclaration
    : Gate GateId gateScope bitList gateBody
    | Gate GateId gateScope LeftParen RightParen bitList gateBody
    | Gate GateId gateScope LeftParen gateIdList RightParen bitList gateBody
    ;

gateScope
    : // Epsilon
    ; 

bitList 
    : bit
    | bitList Comma bit
    ;

bit
    : Id
    ;

gateBody
    : LeftCurlyBrace gateOpList RightCurlyBrace
    ;

gateOpList
    : // Epsilon
    | gateOp
    | gateOpList gateOp
    ;

gateOp
    : U LeftParen expList RightParen Id Semi
    | Cx Id Comma Id Semi
    | Id idList Semi
    | Id LeftParen RightParen idList Semi
    | Id LeftParen expList RightParen idList Semi
    | Barrier idList Semi
    ;

gateIdList
    : gate
    | gateIdList Comma gate
    ;

gate
    : Id
    ;

expList
    : expression
    | expList Comma expression
    ;

expression 
    : 'expression';

idList 
    : Id
    | idList Comma Id
    ;

// terminals

Comment: '//' ~[\r\n]* -> skip;
WhiteSpace: [ \t\n\r] -> skip;

Real: [0-9]+'.'[0-9]+;
Int: [0-9]+;
IbmQasm: 'OPENQASM' | 'IBMQASM';
Include: 'include';
Qelib: 'QELIB.INC';
Qreg: 'qreg';
Creg: 'creg';
U: 'U';
Cx: 'CX';
Measure: 'measure';
Barrier: 'barrier';
Reset: 'reset';
Opaque: 'opaque';
Assign: '->';
Semi: ';';
Comma: ',';
LeftCurlyBrace: '{';
RightCurlyBrace: '}';
LeftBrace: '[';
RightBrace: ']';
LeftParen: '(';
RightParen: ')';
Gate: 'gate';
GateId: 'u1' | 'u2' | 'u3';
Id: [a-z][a-zA-Z0-9]*;