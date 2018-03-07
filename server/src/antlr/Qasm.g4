grammar Qasm;

startProgram
    : ibmDefinition EOF
    ;

ibmDefinition
    : IBMQASM REAL END_LINE
    ;

// terminals

COMMENT: '//' ~[\r\n]* -> skip;
WS: [ \t\n\r] -> skip;

REAL: [0-9]+('.'[0-9]+)?;
IBMQASM: 'OPENQASM' | 'IBMQASM';
END_LINE: ';';
