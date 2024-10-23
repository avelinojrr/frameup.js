import fs from 'fs/promises';
import path from 'path';
import { getTemplatePath } from './getTemplatePath.js';

export async function copyToolConfigs(projectPath, tools) {
	try {
		for (const tool of tools) {
			const normalizedTool = tool.toLowerCase().replace(/\s/g, '');

			// console.log(`Processing tool: ${normalizedTool}`);
			switch (normalizedTool) {
				case 'docker':
					await copyDockerConfigsFiles(projectPath);
					break;

				case 'githubactions':
					await copyGithubActionsConfigsFiles(projectPath);
					break;

				case 'jest':
					await copyJestConfigsFiles(projectPath);
					break;

				case 'eslint':
					await copyESLintConfigsFiles(projectPath);
					break;

				case 'prettier':
					await copyPrettierConfigsFiles(projectPath);
					break;

				default:
					console.warn(
						`No configuration available for tool: ${tool}`
					);
			}
		}
	} catch (error) {
		console.error('Error copying tool configurations: ❌', error);
		throw error;
	}
}

async function copyDockerConfigsFiles(projectPath) {
	const dockerTemplateDir = getTemplatePath('tools', 'docker');
	const copiedDockerConfigs = ['Dockerfile', '.dockerignore'];

	for (const dockerConfigFile of copiedDockerConfigs) {
		const dockerSource = path.join(dockerTemplateDir, dockerConfigFile);
		const dockerDestination = path.join(projectPath, dockerConfigFile);

		await fs.copyFile(dockerSource, dockerDestination);
		// console.log(`Copied ${dockerConfigFile} to ${projectPath}`);
		// console.log('Docker files copied successfully 🎉');
	}
}

async function copyGithubActionsConfigsFiles(projectPath) {
	const githubActionsTemplateDir = getTemplatePath('tools', 'github-actions');
	const copiedGithubActionsConfigs = path.join(
		githubActionsTemplateDir,
		'ci.yml'
	);
	const githubActionsDir = path.join(projectPath, '.github', 'workflows');

	await fs.mkdir(githubActionsDir, { recursive: true });
	const githubActionsDestination = path.join(githubActionsDir, 'ci.yml');

	await fs.copyFile(copiedGithubActionsConfigs, githubActionsDestination);
	// console.log(`Copied ci.yml to ${githubActionsDestination}`);
	// console.log('Github Actions files copied successfully 🎉');
}

async function copyJestConfigsFiles(projectPath) {
	const jestTemplateDir = getTemplatePath('tools', 'jest');
	const copiedJestConfigs = path.join(jestTemplateDir, 'jest.config.js');
	const jestDestination = path.join(projectPath, 'jest.config.js');

	await fs.copyFile(copiedJestConfigs, jestDestination);
	// console.log(`Copied jest.config.js to ${jestDestination}`);
	// console.log('Jest files copied successfully 🎉');
}

async function copyESLintConfigsFiles(projectPath) {
	const eslintTemplateDir = getTemplatePath('tools', 'eslint');
	const copyEslintConfigs = ['eslint.config.js', '.eslintignore'];

	for (const eslintConfigFile of copyEslintConfigs) {
		const eslintSource = path.join(eslintTemplateDir, eslintConfigFile);
		const eslintDestination = path.join(projectPath, eslintConfigFile);

		await fs.copyFile(eslintSource, eslintDestination);
		// console.log(`Copied ${eslintConfigFile} to ${eslintDestination}`);
		// console.log('ESLint files copied successfully 🎉');
	}
}

async function copyPrettierConfigsFiles(projectPath) {
	const prettierTemplateDir = getTemplatePath('tools', 'prettier');
	const copiedPrettierConfigs = ['.prettierrc', '.prettierignore'];

	for (const prettierConfigFile of copiedPrettierConfigs) {
		const prettierSource = path.join(
			prettierTemplateDir,
			prettierConfigFile
		);
		const prettierDestination = path.join(projectPath, prettierConfigFile);

		await fs.copyFile(prettierSource, prettierDestination);
		// console.log(`Copied ${prettierConfigFile} to ${prettierDestination}`);
		// console.log('Prettier files copied successfully 🎉');
	}
}
