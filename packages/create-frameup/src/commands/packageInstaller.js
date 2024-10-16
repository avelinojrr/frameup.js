import { exec } from 'child_process';

/**
 * Install the dependencies of the project
 */

export function installDependencies(packageManager, projectPath) {
	return new Promise((resolve, reject) => {
		const installCommand = getInstallCommand(packageManager);

		console.log(`Installing dependencies using ${packageManager}...`);

		exec(installCommand, { cwd: projectPath }, (error, stdout, stderr) => {
			if (error) {
				console.log(
					`Error during dependencies installation: ${error.message}`
				);
				reject(error);
				return;
			}
			console.log(stdout);
			console.log(stderr);
			resolve();
		});
	});
}

function getInstallCommand(packageManager) {
	switch (packageManager) {
		case 'npm':
			return 'npm install';
		case 'yarn':
			return 'yarn install';
		case 'pnpm':
			return 'pnpm install';
		default:
			return 'npm install';
	}
}
