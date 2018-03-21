/*
  Copyright IBM Corp. 2018. All Rights Reserved.

  This code may only be used under the Apache 2.0 license found at
  http://www.apache.org/licenses/LICENSE-2.0.txt.

  Authors:
  - Yeray Darias <yeray.darias@ibm.com>
*/

import { expect } from 'chai';
import { SymbolTableBuilder } from '../src/qasm/compiler/symbolTable'

describe('A symbol table', () => {

    describe('after construction', () => {
        let symbolTable = SymbolTableBuilder.build();

        it('contains the CREG built in type', () => {
            let symbol = symbolTable.lookup('CREG');
            
            expect(symbol.name).to.be.equals('CREG');
        });
    });

});