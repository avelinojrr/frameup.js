import { frameupColors } from '../utils/colors.js';
import chalk from 'chalk';
import pkg from 'enquirer';
const { prompt, Select } = pkg;

import {
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

	// Ask about the framework
	stackConfig.framework = await promptUser({
		name: 'framework',
		message: `${frameupColors.inputColor('Select the Nodejs framework you want to use:')}`,
		initial: chalk.dim('Use arrow-keys. Enter to submit.'),
		choices: frameworksChoices.map((framework) => ({
			name: framework.name,
			message: framework.color(framework.name),
			value: framework.name,
		})),
		result(name) {
			return this.choices.find((choice) => choice.name === name).value;
		},
		format(input) {
			const selected = frameworksChoices.find((f) => f.name === input);
			return selected ? selected.color(input) : input;
		},
	});

	// Ask if developer wants added a architecture
	const { promptAddArchitecture } = await prompt({
		type: 'confirm',
		name: 'promptAddArchitecture',
		message: frameupColors.inputColor(
			'Would you like to add an architecture?'
		),
		initial: true,
		format(input) {
			return input
				? frameupColors.outputColor('Yes')
				: frameupColors.outputColor('No');
		},
	});

	if (promptAddArchitecture) {
		// Ask about the architecture
		stackConfig.architecture = await promptUser({
			name: 'architecture',
			message: `${frameupColors.inputColor('Select an architecture to use:')}`,
			choices: architectureChoices.map((architecture) => ({
				name: architecture.name,
				message: architecture.color(architecture.name),
				value: architecture.name,
			})),
			result(name) {
				return this.choices.find((choice) => choice.name === name)
					.value;
			},
			format(input) {
				const selected = architectureChoices.find(
					(a) => a.name === input
				);
				return selected ? selected.color(input) : input;
			},
		});
	}

	const { promptAddDesignPattern } = await prompt({
		type: 'confirm',
		name: 'promptAddDesignPattern',
		message: frameupColors.inputColor(
			'Would you like to add a design pattern?'
		),
		initial: true,
		format(input) {
			return input
				? frameupColors.outputColor('Yes')
				: frameupColors.outputColor('No');
		},
	});

	if (promptAddDesignPattern) {
		stackConfig.designPattern = await promptUser({
			name: 'designPattern',
			message: `${frameupColors.inputColor('Select a design pattern to use:')}`,
			initial: chalk.dim('Use arrow-keys. Enter to submit.'),
			choices: designPatternChoices.map((designPattern) => ({
				name: designPattern.name,
				message: designPattern.color(designPattern.name),
				value: designPattern.name,
			})),
			result(name) {
				return this.choices.find((choice) => choice.name === name)
					.value;
			},
			format(input) {
				const selected = designPatternChoices.find(
					(d) => d.name === input
				);
				return selected ? selected.color(input) : input;
			},
		});
	}

	const confirmDatabase = await prompt({
		type: 'confirm',
		name: 'confirmDatabase',
		message: frameupColors.inputColor('Would you like to add a database?'),
		initial: true,
		format(input) {
			return input
				? frameupColors.outputColor('Yes')
				: frameupColors.outputColor('No');
		},
	});

	if (confirmDatabase) {
		// Ask about the database type to use (SQL or NoSQL)
		const databaseType = await promptUser({
			name: 'databaseType',
			message: frameupColors.inputColor(
				'Select a database type (SQL or NoSQL):'
			),
			choices: databaseTypesChoice.map((dbType) => ({
				name: dbType.name,
				message: dbType.color(dbType.name),
				value: dbType.name,
			})),
			result(name) {
				return this.choices.find((choice) => choice.name === name)
					.value;
			},
			format(input) {
				const selected = databaseTypesChoice.find(
					(d) => d.name === input
				);
				return selected ? selected.color(input) : input;
			},
		});

		let databaseChoices =
			databaseType === 'SQL' ? sqlDatabaseChoice : noSqlDatabaseChoice;
		const selectedDatabase = await promptUser({
			name: 'database',
			message: frameupColors.inputColor(
				`Select a ${databaseType} database:`
			),
			choices: databaseChoices.map((db) => ({
				name: db.name,
				message: db.color(db.name),
				value: db.name,
			})),
			result(name) {
				return this.choices.find((choice) => choice.name === name)
					.value;
			},
			format(input) {
				const selected = databaseChoices.find((d) => d.name === input);
				return selected ? selected.color(input) : input;
			},
		});

		stackConfig.database = selectedDatabase;

		// Ask about the database connector

		const connectors = await prompt({
			type: 'confirm',
			name: 'dbConnectors',
			message: frameupColors.inputColor(
				'Would you like to add a database connector?'
			),
			initial: true,
			format(input) {
				return input
					? frameupColors.outputColor('Yes')
					: frameupColors.outputColor('No');
			},
		});

		if (connectors.dbConnectors) {
			const ormChoices =
				databaseType === 'SQL'
					? databaseConnectors[0]['ORMs']
					: databaseConnectors[0]['ODMs'];

			const selectedORM = await promptUser({
				name: 'orm',
				message: frameupColors.inputColor(
					`Select an ORM/ODM for your ${databaseType} database:`
				),
				choices: ormChoices.map((orm) => ({
					name: orm.name,
					message: orm.color(orm.name),
					value: orm.name,
				})),
				result(name) {
					return this.choices.find((choice) => choice.name === name)
						.value;
				},
				format(input) {
					const selected = ormChoices.find((o) => o.name === input);
					return selected ? selected.color(input) : input;
				},
			});

			stackConfig.orm = selectedORM;
		}
	}

	// Ask about the tools
	const confirmTools = await prompt({
		type: 'confirm',
		name: 'addTools',
		message: frameupColors.inputColor(
			'Would you like to add some support tools?'
		),
		initial: true,
		format(input) {
			return input
				? frameupColors.outputColor('Yes')
				: frameupColors.outputColor('No');
		},
	});

	if (confirmTools.addTools) {
		const selectedTools = await prompt({
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

		stackConfig.tools = selectedTools ? selectedTools : [];
	} else {
		stackConfig.tools = [];
	}

	// Package Managers
	stackConfig.packageManager = await promptUser({
		name: 'packageManager',
		message: frameupColors.inputColor(
			'Which package manager would you like to use for installation?'
		),
		choices: packageManagers.map((pm) => ({
			name: pm.name,
			message: pm.color(pm.name),
			value: pm.name,
		})),
		result(name) {
			return this.choices.find((choice) => choice.name === name).value;
		},
		format(input) {
			const selected = packageManagers.find((pm) => pm.name === input);
			return selected ? selected.color(input) : input;
		},
	});

	return stackConfig;
}
