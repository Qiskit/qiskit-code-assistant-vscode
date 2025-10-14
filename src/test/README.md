# Qiskit Code Assistant - Testing Guide

This directory contains the test suite for the Qiskit Code Assistant VSCode extension.

## Table of Contents

- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Test Types](#test-types)
- [Writing Tests](#writing-tests)
- [Mocking](#mocking)
- [CI/CD Integration](#cicd-integration)

## Test Structure

```
src/test/
├── suite/              # Test suites
│   ├── extension.test.ts    # Integration tests for extension
│   ├── serviceApi.test.ts   # Unit tests for ServiceAPI
│   └── utils.test.ts        # Unit tests for utility functions
├── mocks/              # Mock objects and helpers
│   ├── vscode.mock.ts       # VSCode API mocks
│   └── fixtures.ts          # Test data and fixtures
├── runTest.ts          # Test runner entry point
└── README.md           # This file
```

## Running Tests

### All Tests

Run the complete test suite (integration + unit tests):

```bash
npm test
```

This will:
1. Compile TypeScript test files
2. Download VSCode test instance
3. Run all tests in a VSCode environment

### Watch Mode

Compile tests automatically on file changes:

```bash
npm run watch-tests
```

### Compile Tests

Compile TypeScript test files to JavaScript:

```bash
npm run compile-tests
```

## Test Types

### 1. Unit Tests

Test individual functions and classes in isolation.

**Examples:**
- [utils.test.ts](./suite/utils.test.ts) - Tests utility functions (rotate, sleep, normalizeURL, etc.)
- [serviceApi.test.ts](./suite/serviceApi.test.ts) - Tests ServiceAPI class methods

**Characteristics:**
- Fast execution
- No VSCode dependencies
- Use mocks and stubs
- Test pure logic

### 2. Integration Tests

Test the extension in a real VSCode environment.

**Examples:**
- [extension.test.ts](./suite/extension.test.ts) - Tests extension activation, commands, configuration

**Characteristics:**
- Run in VSCode test instance
- Test real interactions
- Slower execution
- End-to-end validation

## Writing Tests

### Test Framework

We use:
- **Mocha** - Test framework (TDD style)
- **Chai** - Assertion library (expect syntax)
- **Sinon** - Mocking and stubbing

### Basic Test Structure

```typescript
import { expect } from 'chai';
import * as sinon from 'sinon';

suite('My Feature Test Suite', () => {
  let sandbox: sinon.SinonSandbox;

  // Setup before each test
  setup(() => {
    sandbox = sinon.createSandbox();
  });

  // Cleanup after each test
  teardown(() => {
    sandbox.restore();
  });

  test('should do something', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = myFunction(input);

    // Assert
    expect(result).to.equal('expected');
  });
});
```

### Unit Test Example

```typescript
import { expect } from 'chai';
import { normalizeURL } from '../../utilities/utils';

suite('Utils - normalizeURL', () => {
  test('should remove trailing slash', () => {
    expect(normalizeURL('https://example.com/')).to.equal('https://example.com');
  });

  test('should not modify URL without trailing slash', () => {
    expect(normalizeURL('https://example.com')).to.equal('https://example.com');
  });
});
```

### Integration Test Example

```typescript
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Integration Tests', () => {
  test('Extension should activate', async function() {
    this.timeout(10000);

    const extension = vscode.extensions.getExtension('Qiskit.qiskit-vscode');
    assert.ok(extension);

    if (!extension.isActive) {
      await extension.activate();
    }

    assert.ok(extension.isActive);
  });
});
```

## Mocking

### VSCode API Mocks

Use the provided mock helpers from [mocks/vscode.mock.ts](./mocks/vscode.mock.ts):

```typescript
import { createMockExtensionContext, createMockTextDocument } from '../mocks/vscode.mock';

test('should handle extension context', () => {
  const context = createMockExtensionContext();
  // Use mock context in tests
});

test('should work with document', () => {
  const doc = createMockTextDocument({
    languageId: 'python',
    getText: () => 'print("hello")'
  });
  // Use mock document
});
```

### HTTP Request Mocking

Use Sinon to stub fetch calls:

```typescript
import * as sinon from 'sinon';

test('should fetch data', async () => {
  const fetchStub = sinon.stub(global, 'fetch');
  fetchStub.resolves({
    ok: true,
    json: () => Promise.resolve({ data: 'test' })
  } as any);

  // Your test code

  fetchStub.restore();
});
```

### Test Fixtures

Use predefined test data from [mocks/fixtures.ts](./mocks/fixtures.ts):

```typescript
import { mockApiResponses, mockQiskitCode } from '../mocks/fixtures';

test('should handle API response', () => {
  const models = mockApiResponses.models;
  expect(models).to.have.lengthOf(2);
});
```

## Best Practices

### 1. Test Naming

- Use descriptive names: `should remove trailing slash from URL`
- Start with "should": `should throw error when input is invalid`
- Be specific: `should return 401 error for invalid API token`

### 2. Test Organization

- Group related tests in suites
- Use setup/teardown for common initialization
- Keep tests focused and atomic

### 3. Assertions

- Use meaningful assertions
- Test both positive and negative cases
- Verify edge cases

### 4. Async Testing

```typescript
test('should handle async operation', async () => {
  const result = await asyncFunction();
  expect(result).to.exist;
});
```

### 5. Timeout Configuration

For slow tests:

```typescript
test('should wait for operation', async function() {
  this.timeout(10000); // 10 seconds
  await longRunningOperation();
});
```

## Coverage

To see test coverage (optional, requires additional setup):

```bash
# Install coverage tool
npm install --save-dev nyc

# Run tests with coverage
npx nyc npm test
```

## CI/CD Integration

Tests can be integrated into CI/CD pipelines:

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: xvfb-run -a npm test  # Linux needs xvfb for VSCode
```

## Debugging Tests

### VSCode Debug Configuration

Add to `.vscode/launch.json`:

```json
{
  "type": "extensionHost",
  "request": "launch",
  "name": "Extension Tests",
  "runtimeExecutable": "${execPath}",
  "args": [
    "--extensionDevelopmentPath=${workspaceFolder}",
    "--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
  ],
  "outFiles": ["${workspaceFolder}/out/test/**/*.js"]
}
```

### Debug Single Test

1. Set breakpoints in test files
2. Run "Extension Tests" debug configuration
3. Debug as normal TypeScript code

## Troubleshooting

### Tests Not Running

1. Ensure tests are compiled: `npm run compile-tests`
2. Check TypeScript errors: `tsc -p .`
3. Verify test files are in `out/test/` directory

### Import Errors

- Ensure paths are correct relative to test location
- Check tsconfig.json includes test files
- Verify all dependencies are installed

### VSCode API Not Available

- Integration tests need to run in VSCode environment
- Use `npm test` (not `npm run test:unit`) for integration tests
- Unit tests should use mocks instead of real VSCode API

## Additional Resources

- [VSCode Extension Testing](https://code.visualstudio.com/api/working-with-extensions/testing-extension)
- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertions](https://www.chaijs.com/api/bdd/)
- [Sinon Mocking](https://sinonjs.org/releases/latest/)

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure all tests pass before committing
3. Aim for high code coverage
4. Update this documentation if adding new test patterns
