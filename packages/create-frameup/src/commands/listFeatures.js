import chalk from 'chalk';

export function listFeaturesCommand() {
	try {
		console.log(chalk.blue('Packages available for installation:'));
		listFeatures();
	} catch (error) {
		throw new Error(`Error listing features: ${error.message}`);
	}
}

function listFeatures() {
	try {
		console.log('');
		console.log(chalk.cyan(' - Authentication'));
		console.log(chalk.cyan(' - Authorization'));
		console.log(chalk.cyan(' - Logging'));
	} catch (error) {
		throw new Error(`Error listing features: ${error.message}`);
	}
}
