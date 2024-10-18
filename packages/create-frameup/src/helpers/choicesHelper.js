/**
 * @param {Array} choices
 * This file is a helper for the choices in the inquirer prompts.
 */

import chalk from 'chalk';
import { frameupColors } from '../utils/colors.js';

// Language choices
export const languagesChoices = [
	{ name: 'JavaScript', color: frameupColors.jsColor },
	{ name: 'TypeScript', color: frameupColors.tsColor },
];

// Nodejs Framework choices
export const frameworksChoices = [
	{ name: 'Express.js', color: frameupColors.expressJsColor },
];

// Architecture choices
export const architectureChoices = [
	{ name: 'Monolithic Architecture', color: frameupColors.outputColor },
];

// Design pattern choices
export const designPatternChoices = [
	{ name: 'MVC', color: frameupColors.outputColor },
];

// Database choices
export const sqlDatabaseChoice = [
	{ name: 'PostgreSQL', color: frameupColors.postgresColor },
];

export const noSqlDatabaseChoice = [
	{ name: 'MongoDB', color: frameupColors.mongoDbColor },
];

export const databaseTypesChoice = [
	{ name: 'SQL', color: frameupColors.sqlColor },
	{ name: 'NoSQL', color: frameupColors.noSqlColor },
];

// Database ORMs & ODMs choices
export const databaseConnectors = [
	{
		ORMs: [
			{ name: 'Sequelize', color: frameupColors.sequelizeColor },
			{ name: 'TypeORM', color: frameupColors.typeOrmColor },
		],
		ODMs: [{ name: 'Mongoose', color: frameupColors.mongooseColor }],
	},
];

// Tools choices
export const toolsChoices = [
	{ name: 'Docker', color: chalk.hex('#2496ED') },
	{ name: 'GitHub Actions', color: chalk.hex('#2088FF') },
	// { name: 'Jest', color: chalk.hex('#C21325') },
	{ name: 'ESlint', color: chalk.hex('#4B32C3') },
	{ name: 'Prettier', color: chalk.hex('#F7B93E') },
];

// Package Manager
export const packageManagers = [
	{ name: 'npm', color: frameupColors.outputColor },
	{ name: 'yarn', color: frameupColors.outputColor },
	{ name: 'pnpm', color: frameupColors.outputColor },
];
