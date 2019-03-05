'use strict';

module.exports = {
    testEnvironment: '<rootDir>/out/test/jest-vscode-environment.js',
    setupTestFrameworkScriptFile: '<rootDir>/out/test/jest-vscode-framework-setup.js',
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            diagnostics: true
        }
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
    },
    testMatch: ['**/*.test.(ts|js)'],
    roots: ['./test/'],
    testEnvironment: 'node',
    collectCoverage: true
};
