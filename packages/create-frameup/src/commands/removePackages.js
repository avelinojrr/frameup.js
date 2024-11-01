/* eslint-disable no-unused-vars */
import { exec } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';

const packagesNameMap = {
	Authentication: 'authentication',
	Security: 'security',
	Logging: 'logging',
	'Errors Handling': 'errors',
	Performance: 'performance',
	'File Upload': 'upload',
	Monitoring: 'monitoring',
};

export async function removePackageCommand(packages) {
	try {
		const spinner = ora(
			`Removing package: ${chalk.cyan(packages)}...`
		).start();
		const projectPath = process.cwd();
		const normalizedFeature =
			packagesNameMap[packages] || packages.toLowerCase();
		await removePackages(normalizedFeature, projectPath, spinner);
		spinner.succeed(
			`Package ${chalk.green(normalizedFeature)} removed successfully!`
		);
	} catch (error) {
		console.error(`Failed to remove the package: ${error.message}`);
	}
}

async function removePackages(packages) {
	try {
		const removedPackage = {
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

		const packagesToRemove = removedPackage[packages.toLowerCase()] || [
			packages,
		];

		for (const pkg of packagesToRemove) {
			const spinner = ora(
				`Removing ${chalk.cyan(pkg)} package...`
			).start();
			await uninstallPackage(pkg, spinner);
		}
	} catch (error) {
		throw new Error(`Error removing feature ${packages}: ${error.message}`);
	}
}

async function uninstallPackage(packageName, spinner) {
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
