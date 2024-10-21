import { exec } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';

/**
 * Install the dependencies of the project
 */

export function installDependencies(packageManager, projectPath) {
	return new Promise((resolve, reject) => {
		const installCommand = getInstallCommand(packageManager);

		const spinner = ora(
			`Installing dependencies... ${chalk.gray('Please wait')}`
		).start();

		exec(installCommand, { cwd: projectPath }, (error) => {
			if (error) {
				spinner.fail(`Oops! Something went wrong during installation.`);
				reject(error);
				return;
			}
			spinner.succeed('Dependencies have been installed successfully.');
			resolve();
		});
	});
}

function getInstallCommand(packageManager) {
	switch (packageManager) {
		case 'npm':
			packageManager = 'npm@10.9.0';
			return 'npm install';
		case 'yarn':
			packageManager = 'yarn@1.22.22';
			return 'yarn install';
		case 'pnpm':
			packageManager = 'pnpm@9.12.2';
			return 'pnpm install';
		default:
			return 'npm install';
	}
}
