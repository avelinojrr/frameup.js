import { frameupColors } from '../utils/colors.js';
import chalk from 'chalk';
import pkg from 'enquirer';
const { prompt, Select } = pkg;

import {
	languageChoices,
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

export async function getStackConfig() {
	const stackConfig = {};

	// Ask about the project name
	const { projectName } = await prompt({
		type: 'input',
		name: 'projectName',
		message: frameupColors.inputColor('Enter the name of your project:'),
		async format(input) {
			return input.trim()
				? frameupColors.outputColor(input)
				: frameupColors.outputColor('frameup-project');
		},
	});
	stackConfig.projectName = projectName;

	// Ask about the language
	// But added nodejs with color to the languageChoices,
	// JavaScript + Node.js
	// TypeScript + Node.js //Included Node.js color

	stackConfig.languages = await promptSelect(
		'languages',
		'Select the language you want to use:',
		languageChoices
	);

	// Ask about the framework
	stackConfig.framework = await promptSelect(
		'framework',
		'Select the Nodejs framework you want to use:',
		frameworksChoices
	);

	// Ask if developer wants to add an architecture
	if (await promptConfirm('Would you like to add an architecture?')) {
		stackConfig.architecture = await promptSelect(
			'architecture',
			'Select an architecture to use:',
			architectureChoices
		);
	}

	// Ask if developer wants to add a design pattern
	if (await promptConfirm('Would you like to add a design pattern?')) {
		stackConfig.designPattern = await promptSelect(
			'designPattern',
			'Select a design pattern to use:',
			designPatternChoices
		);
	}

	// Ask if developer wants to add a database
	if (await promptConfirm('Would you like to add a database?')) {
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

		// Ask if developer wants to add a database connector
		if (
			await promptConfirm('Would you like to add a database connector?')
		) {
			const ormChoices =
				databaseType === 'SQL'
					? databaseConnectors[0]['ORMs']
					: databaseConnectors[0]['ODMs'];
			stackConfig.orm = await promptSelect(
				'orm',
				`Select an ORM/ODM for your ${databaseType} database:`,
				ormChoices
			);
		}
	}

	// Ask if developer wants to add support tools
	if (await promptConfirm('Would you like to add some support tools?')) {
		const { tools } = await prompt({
			type: 'multiselect',
			name: 'tools',
			message: frameupColors.inputColor(
				'Select the support tools you want to include:'
			),
			choices: toolsChoices.map((tool) => ({
				name: tool.name,
				message: tool.color(tool.name),
				value: tool.name,
				disabled: false,
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
				const selected = toolsChoices.filter((tool) =>
					input.includes(tool.name)
				);
				return selected.map((tool) => tool.color(tool.name)).join(', ');
			},
		});
		stackConfig.tools = tools;
	} else {
		stackConfig.tools = [];
	}

	// Ask about the package manager
	stackConfig.packageManager = await promptSelect(
		'packageManager',
		'Which package manager would you like to use for installation?',
		packageManagers
	);

	return stackConfig;
}
