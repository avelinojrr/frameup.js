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
	},
};
