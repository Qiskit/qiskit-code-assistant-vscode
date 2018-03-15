grammar Qasm;

@header {

class SymbolsTable {

    qregs: string[] = [];

    cregs: string[] = [];

}

}

@members {
    
private symbolsTable = new SymbolsTable();

private declareCreg(input: any): void {
    this.symbolsTable.cregs.push(input.text);
}

private declareQreg(input: any): void {
    this.symbolsTable.qregs.push(input.text);
}

declaredVariables(): string[] {
    let result = [];
    
    result.push(...this.symbolsTable.qregs);
    result.push(...this.symbolsTable.cregs);

    return result;
}

}

code
    : sentences
    | headers sentences
    | clean
    ;

headers
    : QasmDescriptor
    | QasmDescriptor Include
    | Include
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
    : Qreg Id { this.declareQreg($Id); } qLine Semi 
    | Creg Id { this.declareCreg($Id); } qLine Semi 
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
    : If LeftParen Id Equals Int RightParen
    ;

qLine: 
    LeftBrace Int RightBrace
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
    | Measure Id Assign Id
    ;

qubit
    : Id qLine
    ;

cbit
    : Id qLine
    ;

customArglist
    : Id LeftParen paramsListNumber RightParen qubitAndQregList
    | Id qubitAndQregList
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
    | Id qLine
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
    : Reset Id
    | Reset qubit
    ;

// terminals

Comment: '//' ~[\r\n]* -> skip;
WhiteSpace: [ \t\n\r] -> skip;

Real: [0-9]+'.'[0-9]+;
Int: [0-9]+;
QasmDescriptor: 'OPENQASM 2.0;' | 'IBMQASM 2.0;';
Include: 'include "quelib1.inc";';
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
Id: [a-z][a-zA-Z0-9]*;