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
    | qoperation Semi 
    ;

declaration
    : qRegDeclaration Semi
    | cRegDeclaration Semi
    | gateDeclaration
    ;

qRegDeclaration
    : Qreg Id LeftParen Int RightParen
    ;
    
cRegDeclaration
    : Creg Id LeftParen Int RightParen
    ;

gateDeclaration
    : 'gate'
    ;

qoperation
    : unitaryOperation
    | opaque
    | measure
    | barrier
    | reset
    ;

unitaryOperation
    : U LeftParen exprList RightParen primary 
    | Cx primary Comma primary
    | Id primaryList
    | Id LeftParen RightParen primaryList
    | Id LeftParen exprList RightParen primaryList
    ;

opaque 
    : Opaque Id gateScope bitList
    | Opaque Id gateScope LeftParen RightParen bitList
    | Opaque Id gateScope LeftParen gateIdList RightParen bitList
    ;

measure 
    : Measure primary Assign primary
    ;

barrier 
    : Barrier primaryList
    ;

reset 
    : Reset primary
    ;

exprList
    : 'exprList'
    ;

primaryList
    : primary
    | primaryList Comma primary
    ;

primary 
    : 'primary'
    ;

gateScope
    : 'gateScope'
    ;

bitList 
    : 'gitList'
    ;

gateIdList
    : 'gateIdList'
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
Id: [a-z][a-zA-Z0-9]*;

