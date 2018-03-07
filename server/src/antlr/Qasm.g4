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
    : Qreg Id LeftBrac Int RightBrac Semi
    ;

cregDeclaration
    : Creg Id LeftBrac Int RightBrac Semi
    ;

gateDeclaration
    : Gate GateId gateScope bitList gateBody
    | Gate GateId gateScope LeftParen RightParen bitList gateBody
    | Gate GateId gateScope LeftParen gateIdList RightParen bitList gateBody
    ;

gateScope
    : 'gateScope';

bitList 
    : 'bitList';

gateBody
    : 'gateBody';

gateIdList
    : gate
    | gateIdList Comma gate
    ;

gate
    : id
    ;

id
    : Id
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
LeftBrac: '[';
RightBrac: ']';
LeftParen: '(';
RightParen: ')';
Gate: 'gate';
GateId: 'u1' | 'u2' | 'u3';
Id: [a-z][a-zA-Z0-9]*;