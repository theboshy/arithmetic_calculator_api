module.exports = {
  // ...otras configuraciones...
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFiles: [
    "<rootDir>/dotenv-config.js"
  ],
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.(ts|tsx)'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  preset: 'ts-jest',
};