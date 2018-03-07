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
    : 'foo'
    ;

program
    : statement
    | program statement
    ;

statement
    : Qreg Id LeftParen Int RightParen Semi
    | Creg Id LeftParen Int RightParen Semi
    ;

// terminals

Comment: '//' ~[\r\n]* -> skip;
WhiteSpace: [ \t\n\r] -> skip;

Real: [0-9]+'.'[0-9]+;
Int: [0-9]+;
IbmQasm: 'OPENQASM' | 'IBMQASM';
Qreg: 'qreg';
Creg: 'creg';
Include: 'include';
Qelib: 'QELIB.INC';
Id: [a-z][a-zA-Z0-9]*;
Semi: ';';
LeftParen: '[';
RightParen: ']';
