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
      let input =
        `
        OPENQASM 2.0;
        include QELIB.INC;
        `;

      let result = parse(input);
      doesNotContainErrors(result);
    });
  })

});