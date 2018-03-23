parser grammar QasmParser;
options { tokenVocab=QasmLexer; }

@header {
import { Register, SymbolsTable } from './utils';
import { QasmLexer } from './QasmLexer';
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'; 
import { SymbolTable, SymbolTableBuilder, VariableSymbol, RegisterSymbol, BuiltInTypeSymbol } from '../compiler/symbolTable';
import fs = require('fs');
import path = require('path');
}

@members {
    
private symbolTable = SymbolTableBuilder.build();

private declareQreg(registerName: Token, size: Token): void {
    let variableSymbol = this.symbolTable.lookup(registerName.text);
    if (variableSymbol == null) {
        let qregSymbol = this.symbolTable.lookup('Qreg') as BuiltInTypeSymbol;
        let newSymbol = new RegisterSymbol(registerName.text, qregSymbol, +size.text);

        this.symbolTable.define(newSymbol);
    } else {
        let message = `There is another declaration with name ${registerName.text}`;
        this.notifyErrorListeners(message, registerName, null);
    }
}

private declareCreg(registerName: Token, size: Token): void {
    let variableSymbol = this.symbolTable.lookup(registerName.text);
    if (variableSymbol == null) {
        let cregSymbol = this.symbolTable.lookup('Creg') as BuiltInTypeSymbol;
        let newSymbol = new RegisterSymbol(registerName.text, cregSymbol, +size.text);

        this.symbolTable.define(newSymbol);
    } else {
        let message = `There is another declaration with name ${registerName.text}`;
        this.notifyErrorListeners(message, registerName, null);
    }
}

private declareGate(gateName: Token): void {
    let variableSymbol = this.symbolTable.lookup(gateName.text);
    if (variableSymbol == null) {
        let gateSymbol = this.symbolTable.lookup('Gate') as BuiltInTypeSymbol;
        let newSymbol = new VariableSymbol(gateName.text, gateSymbol);

        this.symbolTable.define(newSymbol);
    } else {
        let message = `There is another declaration with name ${gateName.text}`;
        this.notifyErrorListeners(message, gateName, null);
    }
}

private declareOpaque(opaqueName: Token): void {
    let variableSymbol = this.symbolTable.lookup(opaqueName.text);
    if (variableSymbol == null) {
        let opaqueSymbol = this.symbolTable.lookup('Opaque') as BuiltInTypeSymbol;
        let newSymbol = new VariableSymbol(opaqueName.text, opaqueSymbol);

        this.symbolTable.define(newSymbol);
    } else {
        let message = `There is another declaration with name ${opaqueName.text}`;
        this.notifyErrorListeners(message, opaqueName, null);
    }
}

private verifyQregReference(id: Token, position?: Token) {
    let variableSymbol = this.symbolTable.lookup(id.text);
    if (variableSymbol) {
        let qregSymbol = this.symbolTable.lookup('Qreg') as BuiltInTypeSymbol;
        if (variableSymbol.type != qregSymbol) {
            let message = `Wrong type at ${id.text}, expecting a ${qregSymbol.getName()}`;
            this.notifyErrorListeners(message, id, null);
        }

        if (position) {
            let register = variableSymbol as RegisterSymbol;
            let selectedPosition = +position.text;
            if (selectedPosition >= register.size) {
                let message = `Index out of bound at register ${id.text}`;
                this.notifyErrorListeners(message, position, null);
            }
        }
    } else {
        let message = `Qubit ${id.text} is not previously defined`;
        this.notifyErrorListeners(message, id, null);
    }
}

private verifyCregReference(id: Token, position?: Token) {
    let variableSymbol = this.symbolTable.lookup(id.text);
    if (variableSymbol) {
        let cregSymbol = this.symbolTable.lookup('Creg') as BuiltInTypeSymbol;
        if (variableSymbol.type != cregSymbol) {
            let message = `Wrong type at ${id.text}, expecting a ${cregSymbol.getName()}`;
            this.notifyErrorListeners(message, id, null);
        }

        if (position) {
            let register = variableSymbol as RegisterSymbol;
            let selectedPosition = +position.text;
            if (selectedPosition >= register.size) {
                let message = `Index out of bound at register ${id.text}`;
                this.notifyErrorListeners(message, position, null);
            }
        }
    } else {
        let message = `Cbit ${id.text} is not previously defined`;
        this.notifyErrorListeners(message, id, null);
    }
}

private verifyMeasureInvocation(quantumRegister: Token, classicRegister: Token): void {
    let qregSymbol = this.symbolTable.lookup(quantumRegister.text) as RegisterSymbol;
    let cregSymbol = this.symbolTable.lookup(classicRegister.text) as RegisterSymbol;

    if (qregSymbol.size > cregSymbol.size) {
        let message = `The quatum register ${quantumRegister.text} cannot be mapped to a smaller classic register ${classicRegister.text}`;
        this.notifyErrorListeners(message, quantumRegister, null);
    }
}

private verifyGateInvocation(id: Token): void {
    let gateSymbol = this.symbolTable.lookup(id.text);

    if (gateSymbol == null) {
        let message = `The symbol ${id.text} is not previously defined`;
        this.notifyErrorListeners(message, id, null);
    }
}

declaredVariables(): string[] {
    return this.symbolTable.definedSymbols();
}
 

getSymbolTable(): SymbolTable {
    return this.symbolTable;
}

private buildQasmParser(input: string): QasmParser {
    let inputStream = new ANTLRInputStream(input);
    let lexer = new QasmLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new QasmParser(tokenStream);

    return parser;
}

private processLibrary(libraryName: string) {
    let libraryPath = path.join(__dirname, '..', 'libs', libraryName);
    let text = fs.readFileSync(libraryPath, 'utf8');
    let parser = this.buildQasmParser(text);

    parser.code();

    this.symbolTable = parser.getSymbolTable();
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
    : Qreg Id LeftBrace size=Int RightBrace Semi { this.declareQreg($Id, $size); }
    | Creg Id LeftBrace size=Int RightBrace Semi { this.declareCreg($Id, $size); }
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
    Gate Id { 
        this.declareGate($Id); 
        this.symbolTable.push($Id.text);
    } gateDefinitionArguments {
        this.symbolTable.pop();
    }
    ;

opaqueDefinition
    : Opaque Id opaqueDefinitionArguments { this.declareOpaque($Id); }
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
    | Measure q=Id { this.verifyQregReference($q); } Assign c=Id { 
        this.verifyCregReference($c); 
        this.verifyMeasureInvocation($q, $c);
    }
    ;

qubit
    : Id LeftBrace position=Int RightBrace { this.verifyQregReference($Id, $position); }
    ;

cbit
    : Id LeftBrace position=Int RightBrace { this.verifyCregReference($Id, $position); }
    ;

customArglist
    : Id LeftParen paramsListNumber RightParen qubitAndQregList { this.verifyGateInvocation($Id); }
    | Id qubitAndQregList { this.verifyGateInvocation($Id); }
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
    : Id { this.verifyQregReference($Id); }
    | Id LeftBrace position=Int RightBrace { this.verifyQregReference($Id, $position); }
    ;

cxGate
    : Cx qubitAndQregList
    ;

barrierGate
    : Barrier Id { this.verifyQregReference($Id); }
    | Barrier qubitList 
    ;

qubitList
    : qubit
    | qubit Comma qubitList
    ; 

resetGate
    : Reset Id { this.verifyQregReference($Id); }
    | Reset qubit
    ;