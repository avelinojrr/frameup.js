import { frameupColors } from '../utils/colors.js';
import chalk from 'chalk';
import pkg from 'enquirer';
const { prompt, Select, MultiSelect } = pkg;

import {
	languagesChoices,
	frameworksChoices,
	architectureChoices,
	designPatternChoices,
	sqlDatabaseChoice,
	noSqlDatabaseChoice,
	databaseTypesChoice,
	databaseConnectors,
	toolsChoices,
	packageManagers,
} from './choicesHelper.js';

// Helper function to execute a prompts
async function promptUser(promptConfig) {
	try {
		const prompt = new Select(promptConfig);
		return await prompt.run();
	} catch (error) {
		console.error(chalk.red('Error during prompt execution:'), error);
		process.exit(1);
	}
}

async function promptConfirm(message, initial = true) {
	const { confirmed } = await prompt({
		type: 'confirm',
		name: 'confirmed',
		message: frameupColors.inputColor(message),
		initial,
		format(input) {
			return input
				? frameupColors.outputColor('Yes')
				: frameupColors.outputColor('No');
		},
	});
	return confirmed;
}

async function promptSelect(name, message, choices) {
	return await promptUser({
		name,
		message: frameupColors.inputColor(message),
		choices: choices.map((choice) => ({
			name: choice.name,
			message: choice.color(choice.name),
			value: choice.name,
		})),
		result(name) {
			return this.choices.find((choice) => choice.name === name).value;
		},
		format(input) {
			const selected = choices.find((choice) => choice.name === input);
			return selected ? selected.color(input) : input;
		},
	});
}

async function promptMultiSelect(name, message, choices) {
	const prompt = new MultiSelect({
		name,
		message: frameupColors.inputColor(message),
		choices: choices.map((choice) => ({
			name: choice.name,
			message: choice.color(choice.name),
			value: choice.name,
		})),
		hint: 'Use Space to select. Enter to submit',
		validate(value) {
			return value.length > 0
				? true
				: 'Select at least one tool or press ESC to skip.';
		},
		result(names) {
			return this.choices
				.filter((choice) => names.includes(choice.name))
				.map((choice) => choice.value);
		},
		format(input) {
			const selected = choices.filter((choice) =>
				input.includes(choice.name)
			);
			return selected
				.map((choice) => choice.color(choice.name))
				.join(', ');
		},
	});
	return await prompt.run();
}

export async function getStackConfig() {
	const stackConfig = {};

	// Ask about the project name
	let { projectName } = await prompt({
		type: 'input',
		name: 'projectName',
		message: frameupColors.inputColor('Enter the name of your project:'),
		async format(input) {
			return input.trim()
				? frameupColors.outputColor(input)
				: frameupColors.outputColor('frameup-project');
		},
	});

	//Assign the project name to the stackConfig object
	if (!projectName.trim()) {
		projectName = 'frameup-project';
	}

	stackConfig.projectName = projectName;

	stackConfig.languages = await promptSelect(
		'languages',
		`Which language would you like to use: ${chalk.dim('(Use arrow keys)')}`,
		languagesChoices
	);

	// Ask about the framework
	stackConfig.framework = await promptSelect(
		'framework',
		'Which Node.js framework would you like to use:',
		frameworksChoices
	);

	// Ask if developer wants to add an architecture
	stackConfig.architecture = await promptSelect(
		'architecture',
		'Which architecture would you like to use:',
		architectureChoices
	);

	if (stackConfig.architecture === 'MVC') {
		stackConfig.designPatterns = await promptMultiSelect(
			'designPatterns',
			`Which design patterns would you like to use: ${chalk.dim('(Use arrow keys)')}`,
			designPatternChoices
		);
	}

	// Ask if developer wants to add a database
	if (await promptConfirm('Do you want to use a database?')) {
		const databaseType = await promptSelect(
			'databaseType',
			'Select a database type:',
			databaseTypesChoice
		);
		const databaseChoices =
			databaseType === 'SQL' ? sqlDatabaseChoice : noSqlDatabaseChoice;
		stackConfig.database = await promptSelect(
			'database',
			`Select a ${databaseType} database:`,
			databaseChoices
		);

		const connectorMessage =
			databaseType === 'SQL'
				? 'Would you like to add an ORM for your database?'
				: 'Would you like to add an ODM for your database?';

		if (await promptConfirm(connectorMessage)) {
			const ormChoices =
				databaseType === 'SQL'
					? databaseConnectors[0]['ORMs']
					: databaseConnectors[0]['ODMs'];
			const ormMessage =
				databaseType === 'SQL'
					? 'Select an ORM for your database:'
					: 'Select an ODM for your database:';

			stackConfig.orm = await promptSelect('orm', ormMessage, ormChoices);
		}
	}

	// Ask if developer wants to add support tools
	if (await promptConfirm('Do you want to add support tools?')) {
		const tools = await promptMultiSelect(
			'tools',
			'Select the support tools you want to include:',
			toolsChoices
		);
		stackConfig.tools = tools;
	} else {
		stackConfig.tools = [];
	}

	// Ask about the package manager
	stackConfig.packageManager = await promptSelect(
		'packageManager',
		'Which package manager do you want to use:',
		packageManagers
	);

	return stackConfig;
}
