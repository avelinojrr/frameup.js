import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';

export async function upgradeProjectCommand() {
	try {
		const projectPath = process.cwd();
		await upgradeProject(projectPath);
	} catch (error) {
		console.error(chalk.red(`Failed to upgrade project: ${error.message}`));
	}
}

async function upgradeProject(projectPath) {
	try {
		const spinner = ora(
			`Upgrading project at path: ${chalk.cyan(projectPath)}...`
		).start();

		const packageJsonPath = path.join(projectPath, 'package.json');

		let packageManager = 'npm';
		if (fs.existsSync(packageJsonPath)) {
			const packageData = JSON.parse(
				fs.readFileSync(packageJsonPath, 'utf8')
			);
			if (packageData.packageManager) {
				packageManager = packageData.packageManager;
			} else if (fs.existsSync(path.join(projectPath, 'yarn.lock'))) {
				packageManager = 'yarn';
			} else if (
				fs.existsSync(path.join(projectPath, 'pnpm-lock.yaml'))
			) {
				packageManager = 'pnpm';
			}
		}

		switch (packageManager) {
			case 'yarn':
				await runCommand('yarn upgrade', projectPath);
				break;
			case 'pnpm':
				await runCommand('pnpm update', projectPath);
				break;
			default:
				await runCommand('npm update', projectPath);
				break;
		}

		spinner.succeed(
			`Project dependencies updated successfully using ${chalk.green(packageManager)}.`
		);
	} catch (error) {
		throw new Error(`Error upgrading project: ${error.message}`);
	}
}

async function runCommand(command, workingDirectory) {
	return new Promise((resolve, reject) => {
		exec(
			command,
			{ cwd: workingDirectory, stdio: 'ignore' },
			(error, stdout, stderr) => {
				if (error) {
					reject(`Command failed: ${stderr}`);
				} else {
					resolve();
				}
			}
		);
	});
}
