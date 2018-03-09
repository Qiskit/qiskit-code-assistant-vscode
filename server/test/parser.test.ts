import * as assert from 'assert';
import { parse } from '../src/antlr/parser'
import { ParserResult } from '../src/tools/parserModel';

let doesNotContainErrors = (result: ParserResult) => {
  return result.errors.length === 0;
}

describe('A parse function', () => {

  describe('with an empty input', () => {

    it('will end without errors', () => {
      let result = parse('');
      doesNotContainErrors(result);
    });

  });

  describe('with headers', () => {
    it('defining only ASM version will end without errors', () => {
      let input = 'OPENQASM 2.0;';

      let result = parse(input);
      doesNotContainErrors(result);
    });

    it('including a functions library will end without errors', () => {
      let input = `
        OPENQASM 2.0;
        include QELIB.INC;
        `;

      let result = parse(input);
      doesNotContainErrors(result);
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
      doesNotContainErrors(result);
    });
  });

  describe('with a wrong q registry defined', () => {
    it('will throw one error', () => {
      let input = `
        OPENQASM 2.0;
        include QELIB.INC;

        qreg q;`;

      let result = parse(input);
      assert.ok(result.errors[0].line === 4);
    });
  });

});