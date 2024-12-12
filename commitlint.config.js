export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat', // ✨ Features
				'fix', // 🐛 Bug Fixes
				'docs', // 📚 Documentation
				'style', // 💎 Styles
				'refactor', // 📦 Code Refactoring
				'perf', // 🚀 Performance Improvements
				'test', // 🚨 Tests
				'build', // 🛠 Builds
				'ci', // ⚙️ Continuous Integration
				'chore', // ♻️ Chores
				'revert', // 🗑 Reverts
			],
		],
		'subject-empty': [2, 'never'],
		'type-empty': [2, 'never'],
		'header-max-length': [2, 'always', 100],
	},
	prompt: {
		messages: {
			type: "Select the type of change you're committing:",
			scope: 'Specify a scope (optional):',
			customScope: 'Denote the scope of this change:',
			subject: 'Write a short description:',
			body: 'Provide a longer description (optional):',
			breaking: 'List any breaking changes (optional):',
			footerPrefixesSelect: 'Select the issue prefix (optional):',
			footer: 'List any issues closed by this change (optional):',
			confirmCommit: 'Are you sure you want to proceed with the commit?',
		},
		types: [
			{
				value: 'feat',
				name: 'feat:      A new feature',
				emoji: '✨',
			},
			{
				value: 'fix',
				name: 'fix:       A bug fix',
				emoji: '🐛',
			},
			{
				value: 'docs',
				name: 'docs:      Documentation-only changes',
				emoji: '📚',
			},
			{
				value: 'style',
				name: 'style:     Changes that do not affect the meaning of the code',
				emoji: '💎',
			},
			{
				value: 'refactor',
				name: 'refactor:  A code change that neither fixes a bug nor adds a feature',
				emoji: '📦',
			},
			{
				value: 'perf',
				name: 'perf:      A code change that improves performance',
				emoji: '🚀',
			},
			{
				value: 'test',
				name: 'test:      Adding missing tests or correcting existing tests',
				emoji: '🚨',
			},
			{
				value: 'build',
				name: 'build:     Changes that affect the build system or external dependencies',
				emoji: '🛠',
			},
			{
				value: 'ci',
				name: 'ci:        Changes to CI configuration files and scripts',
				emoji: '⚙️',
			},
			{
				value: 'chore',
				name: `chore:     Other changes that don't modify src or test files`,
				emoji: '♻️',
			},
			{
				value: 'revert',
				name: 'revert:    Reverts a previous commit',
				emoji: '🗑',
			},
		],
	},
};
