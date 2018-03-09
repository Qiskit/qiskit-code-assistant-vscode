import * as assert from 'assert';
import { parse } from '../src/antlr/parser'

describe('A parse function', function() {

  describe('given an empty input', function() {

    it('will end without errors', function() {
        let result = parse('');

        assert.ok(result.errors.length === 0);
    });

  });
  
});