import { exec } from 'child_process';

async function removeFeature(feature) {
	try {
		console.log(`Removing feature ${feature} from project...`);

		switch (feature) {
			case 'authentication':
				console.log('Removing authentication feature...');
				await removePackage('jsonwebtoken');
				await removePackage('bcryptjs');
				break;

			case 'logging':
				console.log('Removing logging feature...');
				await removePackage('winston');
				break;

			default:
				console.log(`Feature ${feature} is not recognized.`);
				break;
		}
	} catch (error) {
		throw new Error(`Error removing feature ${feature}: ${error.message}`);
	}
}

async function removePackage(packageName) {
	return new Promise((resolve, reject) => {
		exec(`npm uninstall ${packageName}`, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			}
			if (stderr) {
				reject(new Error(stderr));
			}
			console.log(stdout);
			resolve();
		});
	});
}

export async function removeFeatureCommand(feature) {
	try {
		const projectPath = process.cwd();
		await removeFeature(feature, projectPath);
	} catch (error) {
		console.error(`Failed to remove the feature: ${error.message}`);
	}
}
