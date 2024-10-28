/* eslint-disable no-unused-vars */
import { exec } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';

export async function removeFeatureCommand(feature) {
	try {
		const spinner = ora(
			`Removing feature: ${chalk.cyan(feature)}...`
		).start();
		const projectPath = process.cwd();
		await removeFeature(feature, projectPath);
		spinner.succeed(
			`Feature ${chalk.green(feature)} removed successfully!`
		);
	} catch (error) {
		console.error(`Failed to remove the feature: ${error.message}`);
	}
}

async function removeFeature(feature) {
	try {
		const spinner = ora(
			`Removing feature ${chalk.cyan(feature)} from the project...`
		).start();

		switch (feature) {
			case 'authentication':
				spinner.text = `${chalk.green('jsonwebtoken')} and ${chalk.green('bcryptjs')} are being removed...`;
				await removePackage('jsonwebtoken', spinner);
				await removePackage('bcryptjs', spinner);
				break;

			case 'logging':
				spinner.text = `${chalk.green('winston')} is being removed...`;
				await removePackage('winston', spinner);
				break;

			default:
				spinner.text = `${chalk.green(feature)} is being removed...`;
				break;
		}
	} catch (error) {
		throw new Error(`Error removing feature ${feature}: ${error.message}`);
	}
}

async function removePackage(packageName, spinner) {
	return new Promise((resolve, reject) => {
		exec(
			`npm uninstall ${packageName}`,
			{ stdio: 'ignore' },
			(error, stdout, stderr) => {
				if (error) {
					spinner.fail(
						`Failed to uninstall ${chalk.red(packageName)}.`
					);
					reject(error);
				} else {
					spinner.succeed(
						`${chalk.green(packageName)} uninstalled successfully.`
					);
					resolve();
				}
			}
		);
	});
}
