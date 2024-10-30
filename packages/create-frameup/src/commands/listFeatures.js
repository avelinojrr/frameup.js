import chalk from 'chalk';

export function listPackageCommand() {
	try {
		console.log(chalk.blue('Packages available for installation:'));
		listPackages();
	} catch (error) {
		throw new Error(`Error listing features: ${error.message}`);
	}
}

function listPackages() {
	try {
		console.log('');
		console.log(chalk.cyan(' - Authentication'));
		console.log(chalk.cyan(' - Security'));
		console.log(chalk.cyan(' - Logging'));
		console.log(chalk.cyan(' - Errors Handling'));
		console.log(chalk.cyan(' - Performance'));
		console.log(chalk.cyan(' - File Upload'));
		console.log(chalk.cyan(' - Monitoring'));
	} catch (error) {
		throw new Error(`Error listing features: ${error.message}`);
	}
}
