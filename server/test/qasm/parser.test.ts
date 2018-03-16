import { expect } from 'chai';
import { Parser } from '../../src/qasm/parser'
import { ParserResult } from '../../src/qasm/model';

describe('A parser', () => {

  let parser = new Parser();

  describe('with an empty input', () => {
    it('will end without errors', () => {
      let result = parser.parse('');
      expect(result.errors.length).to.be.eq(0);
    });
  });

  describe('with an input with only clean', () => {
    it ('will end without errors', () => {
      let result = parser.parse('clean');
      expect(result.errors.length).to.be.eq(0);
    });
  });

  describe('with headers', () => {
    it('defining only ASM version will end without errors', () => {
      let input = 'OPENQASM 2.0;';

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(0);
    });

    it('including a functions library will end without errors', () => {
      let input = `
        OPENQASM 2.0;
        include "quelib1.inc";
        `;

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(0);
    });
  });

  describe('with sentences', () => {
    it('will accept registers definition', () => {
      let input = `
        qreg q[5];
        creg c[5];
        `;

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(0);
    });

    it('will accept gates definition', () => {
      let input = `
        gate u1(lamda) q {
          U(0,0,lambda) q;
        }
        `;

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(0);
    });

    it('will not accept gates definition with a barrier', () => {
      let input = `
        gate u1(lamda) q {
          U(0,0,lambda) q;
          barrier q;
        }
        `;
      
      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(1);
      expect(result.errors[0].line).to.be.eq(3);
    });

    it('will accept a barrier outside a gate definition', () => {
      let input = `
        qreg q[5];
        creg c[5];
        barrier q[1];`;

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(0);
    });

    it('will accept opaque definition', () => {
      let input = 'opaque foo(a, b, c) q;';

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(0);
    });

    it('will accept expressions', () => {
      let input = `
        gate cx c,t {
          CX c,t; 
        }
        
        qreg q[5];
        creg c[5];
        cx q[1],q[0];
        measure q[1] -> c[1];
        reset q;`;

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(0);
    });

    it('will accept conditional expressions', () => {
      let input = `
        qreg q[5];
        if (a == 2)
          barrier q[2];
        `;

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(0);
    });
  });

  describe('with an input from QX composer', () => {
    it('will end without errors', () => {
      let input = `
        OPENQASM 2.0;
        include "quelib1.inc";

        qreg q[5];
        creg c[5];
        
        u1(pi) q[0];
        x q[1];
        x q[1];
        cx q[1],q[0];
        measure q[1] -> c[1];`;

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(0);
    });
  });

  describe('with a wrong q registry defined', () => {
    it('will throw one error', () => {
      let input = `
        OPENQASM 2.0;
        include "quelib1.inc";

        qreg q;`;

      let result = parser.parse(input);
      expect(result.errors.length).to.be.eq(1);
      expect(result.errors[0].line).to.be.eq(4);
    });
  });

});