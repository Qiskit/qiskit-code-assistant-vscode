grammar Qasm;

// rules

startProgram
    : mainProgram EOF
    ;

mainProgram
    : ibmDefinition
    | ibmDefinition program
    | library
    ;

ibmDefinition
    : IBMQASM REAL ';' include
    | IBMQASM REAL ';'
    ;

include
    : INCLUDE QUELIB ';'
    ;

library 
    : declaration
    | library declaration
    ;

program
    : statement
    | program statement;

statement
    : declaration
    | qOperation ';'
    ;

declaration
    : qRegDeclaration
    | cRegDeclaration
    | gateDeclaration
    ;

qRegDeclaration
    : QREG id '[' INT ']' ';'
    ;    

cRegDeclaration
    : QREG id '[' INT ']' ';'
    ;    

gateDeclaration
    : GATE id gateScope bitList gateBody
    | GATE id gateScope '(' ')' bitList gateBody
    | GATE id gateScope '(' gateIdList ')' bitList gateBody
    ;

gateIdList
    : id
    | gateIdList ',' id
    ;

gate
    : ID
    ;

gateScope
    : // epsilon
    ;

bitList
    : id
    | bitList ',' id
    ;

gateBody
    : '{' gateOpList '}'
    | '{' '}'
    ;

gateOpList
    : gateOp
    | gateOpList gateOp
    ;

gateOp
    : U '(' expList ')' id ';'
    | CX id ',' id ';'
    | id idList ';'
    | id '(' ')' idList ';'
    | id '(' expList ')' idList ';'
    | BARRIER idList ';'
    ;

expList 
    : expression
    | expList ',' expression
    ;

expression
    : multiplicativeExpression
    | expression '^' multiplicativeExpression
    ;

multiplicativeExpression
    : additiveExpression
    | multiplicativeExpression '*' multiplicativeExpression
    | multiplicativeExpression '/' multiplicativeExpression
    ;

additiveExpression
    : prefixExpression
    | additiveExpression '+' additiveExpression
    | additiveExpression '-' additiveExpression
    ;

prefixExpression
    : unary
    | '+' prefixExpression
    | '-' prefixExpression
    ;

unary
    : INT
    | REAL
    | PI
    | id
    | '(' expression ')'
    | id '(' expression ')'
    ;

qOperation
    : unitaryOperation
    | opaque
    | measure
    | barrier
    | reset
    ;

unitaryOperation
    : U '(' expList ')' primary ';'
    | CX primary ',' primary
    | id primaryList
    | id '(' ')' primaryList
    | id '(' expList ')' primaryList
    ;

primary 
    : id
    | indexedId
    ;

id
    : ID // need semantica analyzes to avoid identifiers longer than 31 characters
    ;

primaryList
    : primary
    | primaryList ',' primary
    ;

indexedId
    : id '[' INT ']'
    ;

barrier
    : BARRIER primaryList
    ;

measure
    : MEASURE primary '->' primary
    ;

idList
    : id
    | idList ',' id
    ;

reset   
    : RESET primary;

opaque 
    : OPAQUE id gateScope bitList
    | OPAQUE id gateScope '(' ')' bitList
    | OPAQUE id gateScope '(' gateIdList ')' bitList
    ;

// terminals

COMMENT: '//' ~[\r\n]* -> skip;
WS: [ \t\n\r] -> skip;
REAL: [0-9]+('.'[0-9]+)?;
INT: [0-9]+;
IBMQASM: 'IBMQASM' | 'OPENQASM';
INCLUDE: 'include';
QUELIB: '"qelib1.inc"';
QREG: 'qreg';
CREG: 'creg';
CX: 'CX';
U: 'U';
MEASURE: 'measure';
BARRIER: 'barrier';
RESET: 'reset';
OPAQUE: 'opaque';
GATE: 'gate';
PI: 'pi';
ID: [a-z][a-zA-Z0-9]*;

