/* eslint-disable no-unused-vars */
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';

export async function addFeatureCommand(feature) {
	try {
		const workingDirectory = process.cwd();
		const frameupConfigPath = path.join(workingDirectory, '.frameuprc');

		if (!fs.existsSync(frameupConfigPath)) {
			throw new Error(
				'Project configuration file not found. Run `frameup init` first.'
			);
		}
		const frameupConfig = JSON.parse(
			fs.readFileSync(frameupConfigPath, 'utf-8')
		);

		const spinner = ora(
			`Adding feature: ${chalk.cyan(feature)}...`
		).start();
		await addFeatures(feature, frameupConfig);
		spinner.succeed(`Feature ${chalk.green(feature)} added successfully!`);
	} catch (error) {
		console.error(chalk.red(`Failed to add the feature: ${error.message}`));
	}
}

async function addFeatures(feature, config) {
	try {
		const spinner = ora(
			`Adding feature ${chalk.cyan(feature)} to the project...`
		).start();

		switch (feature.toLowerCase()) {
			case 'authentication':
				spinner.text = 'Adding authentication feature...';
				await installPackage(
					'jsonwebtoken',
					config.packageManager,
					spinner
				);
				await installPackage(
					'bcryptjs',
					config.packageManager,
					spinner
				);
				break;

			case 'logging':
				spinner.text = 'Adding logging feature...';
				await installPackage('winston', config.packageManager, spinner);
				break;

			default:
				spinner.text = `Adding ${feature} feature...`;
				await installPackage(feature, config.packageManager, spinner);
				break;
		}
		// spinner.succeed(`Feature ${chalk.green(feature)} added successfully!`);
	} catch (error) {
		throw new Error(`Error adding feature ${feature} ${error.message}`);
	}
}

async function installPackage(packageName, packageManager, spinner) {
	return new Promise((resolve, reject) => {
		exec(
			`${packageManager} install ${packageName}`,
			{ stdio: 'ignore' },
			(error, stdout, stderr) => {
				if (error) {
					spinner.fail(
						`Failed to install ${chalk.red(packageName)}.`
					);
					reject(error);
				} else {
					spinner.succeed(
						`${chalk.green(packageName)} installed successfully.`
					);
					resolve();
				}
			}
		);
	});
}
