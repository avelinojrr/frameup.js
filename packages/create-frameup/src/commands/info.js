import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export async function displayProjectInfoCommand() {
	try {
		const projectPath = process.cwd();
		await displayProjectInfo(projectPath);
	} catch (error) {
		console.error(
			chalk.red(`Error displaying project info: ${error.message}`)
		);
	}
}

async function displayProjectInfo(projectPath) {
	try {
		const spinner = ora(`Fetching project information...`).start();
		const packageJsonPath = path.join(projectPath, 'package.json');

		try {
			await fs.access(packageJsonPath);
			const packageData = JSON.parse(
				await fs.readFile(packageJsonPath, 'utf-8')
			);
			spinner.succeed(`Project Information loaded successfully!`);
			console.log(chalk.green('Project Name:'), packageData.name);
			console.log(chalk.green('Version:'), packageData.version);
			console.log(
				chalk.green('Dependencies:'),
				Object.keys(packageData.dependencies || {}).join(', ')
			);
		} catch {
			spinner.fail(`No package.json found in the project directory`);
		}
	} catch (error) {
		throw new Error(`Error displaying project info: ${error.message}`);
	}
}
