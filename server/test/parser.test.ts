import { expect } from 'chai';
import { parse } from '../src/antlr/parser'
import { ParserResult } from '../src/tools/parserModel';

describe('A parse function', () => {

  describe('with an empty input', () => {
    it('will end without errors', () => {
      let result = parse('');
      expect(result.errors.length).to.be.eq(0);
    });
  });

  describe('with an input with only clean', () => {
    it ('will end without errors', () => {
      let result = parse('clean');
      expect(result.errors.length).to.be.eq(0);
    });
  });

  describe('with headers', () => {
    it('defining only ASM version will end without errors', () => {
      let input = 'OPENQASM 2.0;';

      let result = parse(input);
      expect(result.errors.length).to.be.eq(0);
    });

    it('including a functions library will end without errors', () => {
      let input = `
        OPENQASM 2.0;
        include QELIB.INC;
        `;

      let result = parse(input);
      expect(result.errors.length).to.be.eq(0);
    });
  });

  describe('with an input from QX composer', () => {
    it('will end without errors', () => {
      let input = `
        OPENQASM 2.0;
        include QELIB.INC;

        qreg q[5];
        creg c[5];
        
        u1(pi) q[0];
        x q[1];
        x q[1];
        cx q[1],q[0];
        measure q[1] -> c[1];`;

      let result = parse(input);
      expect(result.errors.length).to.be.eq(0);
    });
  });

  describe('with a wrong q registry defined', () => {
    it('will throw one error', () => {
      let input = `
        OPENQASM 2.0;
        include QELIB.INC;

        qreg q;`;

      let result = parse(input);
      expect(result.errors[0].line).to.be.eq(4);
    });
  });

});