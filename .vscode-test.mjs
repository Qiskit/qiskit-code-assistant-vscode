import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
  files: 'out/test/**/*.test.js',
  version: 'stable',
  workspaceFolder: './test-workspace',
  // Increase download timeout for CI environments (especially Windows)
  downloadTimeout: 60000, // 60 seconds instead of default 15 seconds
  mocha: {
    ui: 'tdd',
    timeout: 20000,
    color: true
  }
});
