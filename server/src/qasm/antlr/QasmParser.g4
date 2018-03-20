parser grammar QasmParser;
options { tokenVocab=QasmLexer; }

@header {
import { Register, SymbolsTable } from './utils';
import fs = require('fs');
import path = require('path');
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

private processLibrary(libraryName: string) {
    let libraryPath = path.join(__dirname, '..', 'libs', libraryName);
    let text = fs.readFileSync(libraryPath, 'utf8');

    console.log(text);
}

}

code
    : sentences
    | headers sentences
    | clean
    ;

headers
    : QasmDescriptor
    | QasmDescriptor includeLibrary
    | includeLibrary
    ;

includeLibrary
    : Include Library Semi { this.processLibrary($Library.text); }
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