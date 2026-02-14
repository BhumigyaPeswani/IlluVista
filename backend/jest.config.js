module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    setupFilesAfterEnv: ['./tests/setup.js'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.js', '!src/index.js', '!src/lib/dbConnect.js'],
    transformIgnorePatterns: ['/node_modules/(?!(jose|@panva/hkdf|uuid)/)'],
};
