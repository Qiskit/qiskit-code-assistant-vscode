module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
    },
    testMatch: ['**/*.test.(ts|js)'],
    roots: ['./test/'],
    testEnvironment: 'node'
};
