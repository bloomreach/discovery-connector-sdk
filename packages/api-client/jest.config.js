module.exports = {
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  preset: 'ts-"ts-jest/presets/default-esm"',
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/'
  ],
  extensionsToTreatAsEsm: [
    '.ts'
  ],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
