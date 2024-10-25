import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

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

		await addFeatures(feature, frameupConfig);
	} catch (error) {
		console.error(`Failed to add the feature: ${error.message}`);
	}
}

async function addFeatures(feature, config) {
	try {
		console.log(`Adding feature ${feature} to the project...`);

		switch (feature.toLowerCase()) {
			case 'authentication':
				console.log('Adding authentication feature...');
				await installPackage('jsonwebtoken', config.packageManager);
				await installPackage('bcryptjs', config.packageManager);
				break;

			case 'logging':
				console.log('Adding logging feature...');
				await installPackage('winston', config.packageManager);
				break;

			default:
				console.log(`Adding custom package: ${feature}...`);
				await installPackage(feature, config.packageManager);
				break;
		}
	} catch (error) {
		throw new Error(`Error adding feature ${feature} ${error.message}`);
	}
}

async function installPackage(packageName, packageManager, isDev) {
	return new Promise((resolve, reject) => {
		const devFlag = isDev
			? packageManager === 'npm'
				? '--save-dev'
				: '--dev'
			: '';
		exec(
			`${packageManager} install ${devFlag} ${packageName}`,
			(error, stdout, stderr) => {
				if (error) {
					reject(error);
				}
				if (stderr) {
					reject(new Error(stderr));
				}
				console.log(stdout);
				resolve();
			}
		);
	});
}
