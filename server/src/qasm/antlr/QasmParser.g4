parser grammar QasmParser;
options { tokenVocab=QasmLexer; }

@header {

class SymbolsTable {

    qregs: string[] = [];

    cregs: string[] = [];

    gates: string[] = [];

    opaques: string[] = [];

}

}

@members {
    
private symbolsTable = new SymbolsTable();

private declareCreg(input: Token): void {
    this.symbolsTable.cregs.push(input.text);
}

private declareQreg(input: Token): void {
    this.symbolsTable.qregs.push(input.text);
}

private declareGate(input: Token): void {
    this.symbolsTable.gates.push(input.text);
}

private declareOpaque(input: Token): void {
    this.symbolsTable.opaques.push(input.text);
}

private verifyQregDeclaration(input: Token): void {
    if (this.symbolsTable.qregs.indexOf(input.text) === -1) {
        let message = 'Qubit ' + input.text + ' is not previously defined.';
        this.notifyErrorListeners(message, input, null);
    }
}

private verifyCregDeclaration(input: Token): void {
    if (this.symbolsTable.cregs.indexOf(input.text) === -1) {
        let message = 'Cbit ' + input.text + ' is not previously defined.';
        this.notifyErrorListeners(message, input, null);
    }
}

private verifyGateDeclaration(input: Token): void {
    if (this.symbolsTable.gates.indexOf(input.text) === -1) {
        let message = 'Gate ' + input.text + ' is not previously defined.';
        this.notifyErrorListeners(message, input, null);
    }
}

declaredVariables(): string[] {
    let result = [];
    
    result.push(...this.symbolsTable.qregs);
    result.push(...this.symbolsTable.cregs);
    result.push(...this.symbolsTable.gates);
    result.push(...this.symbolsTable.opaques);

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
    Gate Id { this.declareGate($Id); } gateDefinitionArguments
    ;

opaqueDefinition
    : Opaque Id { this.declareOpaque($Id); } opaqueDefinitionArguments
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
    | Measure q=Id Assign c=Id 
    {
        this.verifyQregDeclaration($q);
        this.verifyCregDeclaration($c);
    }
    ;

qubit
    : Id { this.verifyQregDeclaration($Id); } qLine 
    ;

cbit
    : Id { this.verifyCregDeclaration($Id); } qLine 
    ;

customArglist
    : Id {this.verifyGateDeclaration($Id); } LeftParen paramsListNumber RightParen qubitAndQregList
    | Id {this.verifyGateDeclaration($Id); } qubitAndQregList
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
    : Id { this.verifyQregDeclaration($Id); }
    | Id { this.verifyQregDeclaration($Id); } qLine
    ;

cxGate
    : Cx qubitAndQregList
    ;

barrierGate
    : Barrier Id { this.verifyQregDeclaration($Id); }
    | Barrier qubitList 
    ;

qubitList
    : qubit
    | qubit Comma qubitList
    ; 

resetGate
    : Reset Id { this.verifyQregDeclaration($Id); }
    | Reset qubit
    ;