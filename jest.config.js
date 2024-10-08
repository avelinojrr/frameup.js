export default {
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.js'],
	moduleFileExtensions: ['js', 'json', 'ts'],
	collectCoverage: true,
	collectCoverageFrom: ['packages/**/*.js'],
	coverageDirectory: 'coverage',
};
