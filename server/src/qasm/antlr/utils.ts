'use strict';

export class Register {
    name: string;
    size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }
}

export class SymbolsTable {    
    
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
