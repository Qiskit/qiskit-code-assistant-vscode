parser grammar QasmParser;
options { tokenVocab=QasmLexer; }

@header {
import { Register, SymbolsTable } from './utils';
import { QasmLexer } from './QasmLexer';
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'; 
import { SymbolTable, SymbolTableBuilder, VariableSymbol, RegisterSymbol } from '../compiler/symbolTable';
import fs = require('fs');
import path = require('path');
}

@members {
    
private symbolTable = SymbolTableBuilder.build();

private declareQreg(registerName: Token, size: Token): void {
    let variableSymbol = this.symbolTable.lookup(registerName.text);
    if (variableSymbol == null) {
        let qregSymbol = this.symbolTable.lookup('Qreg');
        let newSymbol = new RegisterSymbol(registerName.text, qregSymbol.type, +size.text);

        this.symbolTable.define(newSymbol);
    } else {
        let message = `There is another declaration with name ${registerName.text}`;
        this.notifyErrorListeners(message, registerName, null);
    }
}

private declareCreg(registerName: Token, size: Token): void {
    let variableSymbol = this.symbolTable.lookup(registerName.text);
    if (variableSymbol == null) {
        let cregSymbol = this.symbolTable.lookup('Creg');
        let newSymbol = new RegisterSymbol(registerName.text, cregSymbol.type, +size.text);

        this.symbolTable.define(newSymbol);
    } else {
        let message = `There is another declaration with name ${registerName.text}`;
        this.notifyErrorListeners(message, registerName, null);
    }
}

private declareGate(gateName: Token): void {
    let variableSymbol = this.symbolTable.lookup(gateName.text);
    if (variableSymbol == null) {
        let gateSymbol = this.symbolTable.lookup('Gate');
        let newSymbol = new VariableSymbol(gateName.text, gateSymbol.type);

        this.symbolTable.define(newSymbol);
    } else {
        let message = `There is another declaration with name ${gateName.text}`;
        this.notifyErrorListeners(message, gateName, null);
    }
}

private declareOpaque(opaqueName: Token): void {
    let variableSymbol = this.symbolTable.lookup(opaqueName.text);
    if (variableSymbol == null) {
        let opaqueSymbol = this.symbolTable.lookup('Opaque');
        let newSymbol = new VariableSymbol(opaqueName.text, opaqueSymbol.type);

        this.symbolTable.define(newSymbol);
    } else {
        let message = `There is another declaration with name ${opaqueName.text}`;
        this.notifyErrorListeners(message, opaqueName, null);
    }
}

private verifyQregUssage(id: Token, position?: Token) {
    let variableSymbol = this.symbolTable.lookup(id.text);
    if (variableSymbol) {
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

private verifyCregUssage(id: Token, position?: Token) {
    let variableSymbol = this.symbolTable.lookup(id.text);
    if (variableSymbol) {
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
    | Measure q=Id { this.verifyQregUssage($q); } Assign c=Id { this.verifyCregUssage($c); }
    ;

qubit
    : Id LeftBrace Int RightBrace { this.verifyQregUssage($Id, $Int); }
    ;

cbit
    : Id LeftBrace Int RightBrace { this.verifyCregUssage($Id); }
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
    | Id LeftBrace Int RightBrace
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