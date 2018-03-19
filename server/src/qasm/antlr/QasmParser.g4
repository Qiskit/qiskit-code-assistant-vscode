parser grammar QasmParser;
options { tokenVocab=QasmLexer; }

@header {

class Register {
    name: string;
    size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }
}

class SymbolsTable {    
    
    private qregs: Register[] = [];
    private cregs: Register[] = [];
    gates: string[] = [];
    opaques: string[] = [];

    private toName = (register: Register) => register.name;

    addQuantumRegister(name: string, size: number) {
        this.qregs.push(new Register(name, size));
    }

    addClassicRegister(name: string, size: number) {
        this.cregs.push(new Register(name, size));
    }

    containsQuantumRegister(qregName: string) {
        let hasSearchedName = (register: Register) => register.name === qregName;

        return this.qregs.filter(hasSearchedName).length > 0;
    }

    containsQuantumBit(qregName: string, position: number): boolean {
        return this.findBitInRegister(this.qregs, qregName, position);
    }

    containsClassicRegister(cregName: string) {
        let hasSearchedName = (register: Register) => register.name === cregName;

        return this.cregs.filter(hasSearchedName).length > 0;
    }

    containsClassicBit(cregName: string, position: number): boolean {
        return this.findBitInRegister(this.cregs, cregName, position);
    }

    private findBitInRegister(registers: Register[], registerName: string, position: number): boolean { 
        let hasSearchedName = (register: Register) => register.name === registerName;

        let searchedRegisters = registers.filter(hasSearchedName);
        if (searchedRegisters.length > 0) {
            return searchedRegisters[0].size > position;
        }

        return true;  // if register not found that's a different error
    } 

    getQuantumRegisters(): string[] {
        return this.qregs.map(this.toName);
    }

    getClassicRegisters(): string[] {
        return this.cregs.map(this.toName);
    }

    getDeclaredSymbols(): string[] {
        let result = [];
    
        result.push(...this.getQuantumRegisters());
        result.push(...this.getClassicRegisters());
        result.push(...this.gates);
        result.push(...this.opaques);

        return result;
    }

    isPreviouslyDeclaredSymbol(input: string) {
        let foundSymbols = this.getDeclaredSymbols()
            .filter((symbol) => symbol === input);

        return foundSymbols.length > 0;
    }

}

}

@members {
    
private symbolsTable = new SymbolsTable();

private checkPreviousExistenceAndApply(registerName: Token, declarationFunction: () => void) {
    if (!this.symbolsTable.isPreviouslyDeclaredSymbol(registerName.text)) {
        declarationFunction();
    } else {
        let message = `There is another declaration with name ${registerName.text}`;
        this.notifyErrorListeners(message, registerName, null);
    }
}

private declareCreg(registerName: Token, size: Token): void {
    this.checkPreviousExistenceAndApply(registerName, () => 
        this.symbolsTable.addClassicRegister(registerName.text, +size.text));
}

private declareQreg(registerName: Token, size: Token): void {
    this.checkPreviousExistenceAndApply(registerName, () => 
        this.symbolsTable.addQuantumRegister(registerName.text, +size.text));
}

private declareGate(gateName: Token): void {
    this.checkPreviousExistenceAndApply(gateName, () => 
        this.symbolsTable.gates.push(gateName.text));
}

private declareOpaque(opaqueName: Token): void {
    this.checkPreviousExistenceAndApply(opaqueName, () => 
        this.symbolsTable.opaques.push(opaqueName.text));
}

private verifyQregDeclaration(registerName: Token, position?: Token): void {
    if (!this.symbolsTable.containsQuantumRegister(registerName.text)) {
        let message = 'Qubit ' + registerName.text + ' is not previously defined';
        this.notifyErrorListeners(message, registerName, null);
        return;
    }

    if (position) {
        if (!this.symbolsTable.containsQuantumBit(registerName.text, +position.text)) {
            let message = `Qbit ${registerName.text}[${position.text}] is not valid: index out of bound`;
            this.notifyErrorListeners(message, position, null);
            return;
        }
    }
}

private verifyCregDeclaration(registerName: Token, position?: Token): void {
    if (!this.symbolsTable.containsClassicRegister(registerName.text)) {
        let message = 'Cbit ' + registerName.text + ' is not previously defined';
        this.notifyErrorListeners(message, registerName, null);
        return;
    }

    if (position) {
        if (!this.symbolsTable.containsClassicBit(registerName.text, +position.text)) {
            let message = `Cbit ${registerName.text}[${position.text}] is not valid: index out of bound`;
            this.notifyErrorListeners(message, position, null);
            return;
        }
    }
}

private verifyGateDeclaration(input: Token): void {
    if (this.symbolsTable.gates.indexOf(input.text) === -1) {
        let message = 'Gate ' + input.text + ' is not previously defined';
        this.notifyErrorListeners(message, input, null);
    }
}

declaredVariables(): string[] {
    return this.symbolsTable.getDeclaredSymbols();
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
    : Qreg Id LeftBrace Int RightBrace Semi { this.declareQreg($Id, $Int); }
    | Creg Id LeftBrace Int RightBrace Semi { this.declareCreg($Id, $Int); }
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
    : Id LeftBrace Int RightBrace { this.verifyQregDeclaration($Id, $Int); }
    ;

cbit
    : Id LeftBrace Int RightBrace { this.verifyCregDeclaration($Id, $Int); }
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
    | Id { this.verifyQregDeclaration($Id); } LeftBrace Int RightBrace
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