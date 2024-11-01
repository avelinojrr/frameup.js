/* eslint-disable no-unused-vars */
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';

const packagesMap = {
	Authentication: 'authentication',
	Security: 'security',
	Logging: 'logging',
	'Errors Handling': 'errors',
	Performance: 'performance',
	'File Upload': 'upload',
	Monitoring: 'monitoring',
};

export async function addPackageCommand(packages) {
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

		const normalizedPackage =
			packagesMap[packages] || packages.toLowerCase();

		const spinner = ora(
			`Adding package: ${chalk.cyan(normalizedPackage)}...`
		).start();
		await addPackages(normalizedPackage, frameupConfig);
		spinner.succeed(`Package ${chalk.green(packages)} added successfully!`);
	} catch (error) {
		console.error(chalk.red(`Failed to add the package: ${error.message}`));
	}
}

async function addPackages(packages, config) {
	const spinner = ora(
		`Installing ${chalk.cyan(packages)} package...`
	).start();

	const availablePackages = {
		authentication: [
			'jsonwebtoken',
			'bcryptjs',
			'passport',
			'passport-jwt',
			'passport-local',
			'express-session',
			'express-validator',
			'cookie-parser',
		],
		security: ['helmet', 'cors', 'express-rate-limit', 'hpp', 'csurf'],
		logging: ['winston', 'morgan'],
		errors: ['http-errors', 'express-async-errors'],
		performance: ['compression'],
		upload: ['multer'],
		monitoring: ['express-status-monitor', 'prom-client'],
	};

	const installedPackages = availablePackages[packages.toLowerCase()] || [
		packages,
	];

	try {
		for (const pkg of installedPackages) {
			spinner.text = `Installing ${chalk.cyan(pkg)}...`;
			await installPackage(pkg, config.packageManager, spinner);
		}
	} catch (error) {
		throw new Error(
			`Failed to install ${packages} package: ${error.message}`
		);
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
