import { expect } from 'chai';
import * as vscode from 'vscode';
import {
  rotate,
  sleep,
  escapeRegExp,
  trimEnd,
  isMultiline,
  normalizeURL,
  normalizeURLPath,
  extractCompletionParts,
  createDecorationType,
  toCompletionItem
} from '../../utilities/utils';
import { AutocompleteResult, ResultEntry, CompletionKind } from '../../binary/requests/requests';

suite('Utils Test Suite', () => {

  suite('rotate', () => {
    test('should initialize with current value of 0', () => {
      const iterator = rotate(5);
      expect(iterator.current()).to.equal(0);
    });

    test('should increment on next()', () => {
      const iterator = rotate(5);
      expect(iterator.next()).to.equal(1);
      expect(iterator.next()).to.equal(2);
    });

    test('should wrap around on next() when exceeding max value', () => {
      const iterator = rotate(2);
      iterator.next(); // 1
      iterator.next(); // 2
      expect(iterator.next()).to.equal(0);
    });

    test('should decrement on prev()', () => {
      const iterator = rotate(5);
      iterator.next(); // 1
      iterator.next(); // 2
      expect(iterator.prev()).to.equal(1);
    });

    test('should wrap around on prev() when going below 0', () => {
      const iterator = rotate(3);
      expect(iterator.prev()).to.equal(3);
    });

    test('should handle rotate with value 0', () => {
      const iterator = rotate(0);
      expect(iterator.current()).to.equal(0);
      expect(iterator.next()).to.equal(0);
      expect(iterator.prev()).to.equal(0);
    });

    test('should handle multiple wraps', () => {
      const iterator = rotate(1);
      expect(iterator.next()).to.equal(1);
      expect(iterator.next()).to.equal(0);
      expect(iterator.next()).to.equal(1);
      expect(iterator.prev()).to.equal(0);
      expect(iterator.prev()).to.equal(1);
    });
  });

  suite('sleep', () => {
    test('should resolve after specified time', async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      expect(elapsed).to.be.at.least(95); // Allow small margin
    });
  });

  suite('escapeRegExp', () => {
    test('should escape special regex characters', () => {
      expect(escapeRegExp('hello.world')).to.equal('hello\\.world');
      expect(escapeRegExp('test*')).to.equal('test\\*');
      expect(escapeRegExp('$100')).to.equal('\\$100');
      expect(escapeRegExp('[a-z]+')).to.equal('\\[a-z\\]\\+');
    });

    test('should return unchanged string with no special characters', () => {
      expect(escapeRegExp('hello')).to.equal('hello');
    });
  });

  suite('trimEnd', () => {
    test('should remove suffix from end of string', () => {
      expect(trimEnd('hello.txt', '.txt')).to.equal('hello');
      expect(trimEnd('test/', '/')).to.equal('test');
    });

    test('should only remove suffix if at end', () => {
      expect(trimEnd('hello.txt.md', '.txt')).to.equal('hello.txt.md');
    });

    test('should handle special regex characters in suffix', () => {
      expect(trimEnd('test$', '$')).to.equal('test');
      expect(trimEnd('file.', '.')).to.equal('file');
      expect(trimEnd('test()', '()')).to.equal('test');
    });

    test('should return original string if suffix not found', () => {
      expect(trimEnd('hello', 'world')).to.equal('hello');
    });

    test('should handle empty suffix', () => {
      expect(trimEnd('hello', '')).to.equal('hello');
    });

    test('should handle empty string', () => {
      expect(trimEnd('', 'suffix')).to.equal('');
    });
  });

  suite('isMultiline', () => {
    test('should return true for strings with newlines', () => {
      expect(isMultiline('line1\nline2')).to.be.true;
      expect(isMultiline('a\nb\nc')).to.be.true;
    });

    test('should return false for single line strings', () => {
      expect(isMultiline('single line')).to.be.false;
      expect(isMultiline('')).to.be.false;
    });

    test('should return false for undefined', () => {
      expect(isMultiline(undefined)).to.be.false;
    });
  });

  suite('normalizeURL', () => {
    test('should remove trailing slash', () => {
      expect(normalizeURL('https://example.com/')).to.equal('https://example.com');
      expect(normalizeURL('http://api.test.com/')).to.equal('http://api.test.com');
    });

    test('should not modify URL without trailing slash', () => {
      expect(normalizeURL('https://example.com')).to.equal('https://example.com');
    });

    test('should handle empty string', () => {
      expect(normalizeURL('')).to.equal('');
    });

    test('should handle URL with path and trailing slash', () => {
      expect(normalizeURL('https://example.com/api/v1/')).to.equal('https://example.com/api/v1');
    });

    test('should only remove one trailing slash', () => {
      expect(normalizeURL('https://example.com//')).to.equal('https://example.com/');
    });
  });

  suite('normalizeURLPath', () => {
    test('should add leading slash if missing', () => {
      expect(normalizeURLPath('api/v1')).to.equal('/api/v1');
      expect(normalizeURLPath('users')).to.equal('/users');
    });

    test('should not modify path with leading slash', () => {
      expect(normalizeURLPath('/api/v1')).to.equal('/api/v1');
    });

    test('should handle empty string', () => {
      expect(normalizeURLPath('')).to.equal('');
    });
  });

  suite('extractCompletionParts', () => {
    test('should split text at last newline', () => {
      const result = extractCompletionParts('line1\nline2\nline3');
      expect(result.before).to.equal('line1\nline2\n');
      expect(result.after).to.equal('line3');
    });

    test('should handle text with no newlines', () => {
      const result = extractCompletionParts('single line');
      expect(result.before).to.equal('');
      expect(result.after).to.equal('single line');
    });

    test('should handle empty string', () => {
      const result = extractCompletionParts('');
      expect(result.before).to.equal('');
      expect(result.after).to.equal('');
    });

    test('should handle text ending with newline', () => {
      const result = extractCompletionParts('line1\nline2\n');
      expect(result.before).to.equal('line1\nline2\n');
      expect(result.after).to.equal('');
    });
  });

  suite('createDecorationType', () => {
    test('should create a TextEditorDecorationType instance', () => {
      const decorationType = createDecorationType();

      // Verify it returns a TextEditorDecorationType
      expect(decorationType).to.exist;
      expect(decorationType.key).to.be.a('string');
      expect(decorationType.dispose).to.be.a('function');

      // Cleanup
      decorationType.dispose();
    });
  });

  suite('toCompletionItem', () => {
    test('should create completion item with basic properties', () => {
      const insertText = 'def hello_world():';
      const position = new vscode.Position(5, 10);
      const resultEntry: ResultEntry = {
        new_prefix: 'def hello_world():',
        old_suffix: '',
        new_suffix: '',
        completion_metadata: {
          model_id: 'test-model',
          prompt_id: 'test-prompt'
        }
      };
      const autoCompleteResult: AutocompleteResult = {
        old_prefix: 'def ',
        results: [resultEntry],
        user_message: ['Completion generated successfully'],
        is_locked: false
      };

      const item = toCompletionItem(insertText, position, autoCompleteResult, resultEntry);

      expect(item).to.exist;
      expect(item.insertText).to.equal(insertText);
      expect(item.modelId).to.equal('test-model');
      expect(item.promptId).to.equal('test-prompt');
      expect(item.suggestionEntry).to.equal(resultEntry);
    });

    test('should calculate range with single-line suffix', () => {
      const LINE = 5;
      const CHARACTER = 10;
      const OLD_PREFIX = 'def ';
      const OLD_SUFFIX = ')';

      const position = new vscode.Position(LINE, CHARACTER);
      const resultEntry: ResultEntry = {
        new_prefix: 'def hello():',
        old_suffix: OLD_SUFFIX,
        new_suffix: '',
      };
      const autoCompleteResult: AutocompleteResult = {
        old_prefix: OLD_PREFIX,
        results: [resultEntry],
        user_message: [],
        is_locked: false
      };

      const item = toCompletionItem('hello()', position, autoCompleteResult, resultEntry);

      expect(item.range).to.exist;
      const range = item.range!;

      // Range should start at position minus old_prefix length
      expect(range.start.line).to.equal(LINE);
      expect(range.start.character).to.equal(CHARACTER - OLD_PREFIX.length);

      // Range should end at position plus old_suffix length
      expect(range.end.line).to.equal(LINE);
      expect(range.end.character).to.equal(CHARACTER + OLD_SUFFIX.length);
    });

    test('should calculate range with multiline suffix', () => {
      const LINE = 5;
      const CHARACTER = 10;
      const OLD_PREFIX = 'def ';
      const MULTILINE_SUFFIX = '\n    pass';

      const position = new vscode.Position(LINE, CHARACTER);
      const resultEntry: ResultEntry = {
        new_prefix: 'def hello():\n    pass',
        old_suffix: MULTILINE_SUFFIX,
        new_suffix: '',
      };
      const autoCompleteResult: AutocompleteResult = {
        old_prefix: OLD_PREFIX,
        results: [resultEntry],
        user_message: [],
        is_locked: false
      };

      const item = toCompletionItem('hello():\n    pass', position, autoCompleteResult, resultEntry);

      expect(item.range).to.exist;
      const range = item.range!;

      // Range should start at position minus old_prefix length
      expect(range.start.line).to.equal(LINE);
      expect(range.start.character).to.equal(CHARACTER - OLD_PREFIX.length);

      // For multiline suffix, range should end at the same position (no character offset)
      expect(range.end.line).to.equal(LINE);
      expect(range.end.character).to.equal(CHARACTER);
    });

    test('should include completion metadata', () => {
      const position = new vscode.Position(0, 0);
      const autoCompleteResult: AutocompleteResult = {
        old_prefix: '',
        results: [],
        user_message: [],
        is_locked: false
      };
      const resultEntry: ResultEntry = {
        new_prefix: 'test',
        old_suffix: '',
        new_suffix: '',
        completion_metadata: {
          model_id: 'granite-3.3-8b-qiskit',
          prompt_id: 'prompt-123',
          input: 'def hello',
          output: 'def hello_world():',
          completion_kind: CompletionKind.Line,
          is_cached: true,
          snippet_context: {
            snippet_id: 'snippet-1',
            user_intent: 0
          }
        }
      };

      const item = toCompletionItem('test', position, autoCompleteResult, resultEntry);

      expect(item.modelId).to.equal('granite-3.3-8b-qiskit');
      expect(item.promptId).to.equal('prompt-123');
      expect(item.input).to.equal('def hello');
      expect(item.output).to.equal('def hello_world():');
      expect(item.completionKind).to.equal(CompletionKind.Line);
      expect(item.isCached).to.be.true;
      expect(item.snippetContext).to.deep.equal({
        snippet_id: 'snippet-1',
        user_intent: 0
      });
    });

    test('should handle missing metadata gracefully', () => {
      const position = new vscode.Position(0, 0);
      const autoCompleteResult: AutocompleteResult = {
        old_prefix: '',
        results: [],
        user_message: [],
        is_locked: false
      };
      const resultEntry: ResultEntry = {
        new_prefix: 'test',
        old_suffix: '',
        new_suffix: ''
        // No completion_metadata
      };

      const item = toCompletionItem('test', position, autoCompleteResult, resultEntry);

      expect(item.modelId).to.be.undefined;
      expect(item.promptId).to.be.undefined;
      expect(item.input).to.be.undefined;
      expect(item.output).to.be.undefined;
      expect(item.completionKind).to.be.undefined;
      expect(item.isCached).to.be.undefined;
      expect(item.snippetContext).to.be.undefined;
    });

    test('should handle empty old_prefix', () => {
      const LINE = 3;
      const CHARACTER = 5;

      const position = new vscode.Position(LINE, CHARACTER);
      const autoCompleteResult: AutocompleteResult = {
        old_prefix: '',
        results: [],
        user_message: [],
        is_locked: false
      };
      const resultEntry: ResultEntry = {
        new_prefix: 'print("Hello")',
        old_suffix: '',
        new_suffix: ''
      };

      const item = toCompletionItem('print("Hello")', position, autoCompleteResult, resultEntry);

      expect(item.range).to.exist;
      const range = item.range!;

      // With empty old_prefix, range should start at current position
      expect(range.start.line).to.equal(LINE);
      expect(range.start.character).to.equal(CHARACTER);
    });
  });
});
