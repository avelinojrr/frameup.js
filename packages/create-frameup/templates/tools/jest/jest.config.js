export const testEnvironment = 'node';
export const roots = ['<rootDir>/src'];
export const transform = {
	'^.+\\.jsx?$': 'babel-jest', // For JavaScript projects.
	// '^.+\\.tsx?$': 'ts-jest', // For TypeScript projects, uncomments this line and comments the previous one
};
export const testRegex = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$';
export const moduleFileExtensions = ['js', 'jsx', 'json', 'node'];
