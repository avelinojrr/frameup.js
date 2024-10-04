/**
 * @param {Array} choices
 * This file is a helper for the choices in the inquirer prompts.
 */

import chalk from 'chalk';
import { frameupColors } from '../utils/colors.js';

// Nodejs Framework choices
export const frameworksChoices = [
	{ name: 'Express.js', color: frameupColors.expressJsColor },
	{ name: 'Koa.js', color: frameupColors.koaJsColor },
	{ name: 'Hapi.js', color: frameupColors.hapiJsColor },
	{ name: 'Meteor.js', color: frameupColors.meteorJsColor },
	{ name: 'NestJS', color: frameupColors.nestJsColor },
	{ name: 'AdonisJS', color: frameupColors.adonisJsColor },
];

// Architecture choices
export const architectureChoices = [
	{ name: 'Monolithic Architecture', color: frameupColors.outputColor },
	{ name: 'Microservices Architecture', color: frameupColors.outputColor },
	{ name: 'Serverless Architecture', color: frameupColors.outputColor },
	{ name: 'Event-Driven Architecture', color: frameupColors.outputColor },
	{ name: 'MVC', color: frameupColors.outputColor },
	{ name: 'Hexagonal Architecture', color: frameupColors.outputColor },
	{ name: 'Clean Architecture', color: frameupColors.outputColor },
];

// Design pattern choices
export const designPatternChoices = [
	{ name: 'Observer', color: frameupColors.outputColor },
	{ name: 'Facade', color: frameupColors.outputColor },
	{ name: 'Adapter', color: frameupColors.outputColor },
	{ name: 'Saga', color: frameupColors.outputColor },
	{ name: 'API Gateway', color: frameupColors.outputColor },
	{ name: 'Event Sourcing', color: frameupColors.outputColor },
	{ name: 'Dependency Injection', color: frameupColors.outputColor },
	{ name: 'Factory', color: frameupColors.outputColor },
	{ name: 'Singleton', color: frameupColors.outputColor },
	{ name: 'Strategy', color: frameupColors.outputColor },
];

// Database choices
export const sqlDatabaseChoice = [
	{ name: 'PostgreSQL', color: frameupColors.postgresColor },
	{ name: 'MySQL', color: frameupColors.mysqlColor },
	{ name: 'SQLite', color: frameupColors.sqliteColor },
	{ name: 'MariaDB', color: frameupColors.mariaDbColor },
	{ name: 'Oracle', color: frameupColors.oracleColor },
	{ name: 'SQL Server', color: frameupColors.sqlServerColor },
];

export const noSqlDatabaseChoice = [
	{ name: 'MongoDB', color: frameupColors.mongoDbColor },
	{ name: 'Cassandra', color: frameupColors.cassandraColor },
	{ name: 'CouchDB', color: frameupColors.couchDbColor },
	{ name: 'Firebase', color: frameupColors.firebaseColor },
];

export const databaseTypesChoice = [
	{ name: 'SQL', color: frameupColors.sqlColor },
	{ name: 'NoSQL', color: frameupColors.noSqlColor },
	{ name: 'In-memory', color: frameupColors.inMemoryColor },
	{ name: 'Graph', color: frameupColors.graphColor },
];

// Database ORMs & ODMs choices
export const databaseConnectors = [
	{
		ORMs: [
			{ name: 'Sequelize', color: frameupColors.sequelizeColor },
			{ name: 'TypeORM', color: frameupColors.typeOrmColor },
			{ name: 'Prisma', color: frameupColors.prismaColor },
			{ name: 'Objections.js', color: frameupColors.objectionsColor },
			{ name: 'Bookshelf.js', color: frameupColors.bookshelfColor },
		],
		ODMs: [
			{ name: 'Mongoose', color: frameupColors.mongooseColor },
			{ name: 'Typegoose', color: frameupColors.typegooseColor },
		],
	},
];

// Tools choices
export const toolsChoices = [
	{ name: 'Docker', color: chalk.hex('#2496ED') },
	{ name: 'GitHub Actions', color: chalk.hex('#2088FF') },
	{ name: 'Jest', color: chalk.hex('#C21325') },
	{ name: 'ESlint', color: chalk.hex('#4B32C3') },
	{ name: 'Prettier', color: chalk.hex('#F7B93E') },
];
