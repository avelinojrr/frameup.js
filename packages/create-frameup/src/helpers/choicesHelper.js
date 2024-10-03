/**
 * @param {Array} choices
 * This file is a helper for the choices in the inquirer prompts.
 */

import chalk from 'chalk';
import { frameupColors } from '../utils/colors.js';

// Language choices
export const languagesChoices = [
    { name: 'JavaScript', color: chalk.yellow.bold },
    { name: 'TypeScript', color: chalk.hex('#017ACB').bold}
]

// Framework choices
export const frameworksChoices = [
    {'name': 'Express.js', 'color': chalk.whiteBright.bold}, 
    {'name': 'Koa.js', 'color': chalk.hex('#6e6f70').bold}, 
    {'name': 'Hapi.js', 'color': chalk.hex('#ff9200').bold}, 
    {'name': 'Meteor.js', 'color': chalk.hex('#FF3E00').bold}, 
    {'name': 'NestJS', 'color': chalk.redBright.bold}, 
    {'name': 'AdonisJS', 'color': chalk.hex('#2200FF').bold},
]

// Architecture choices
export const architectureChoices = [
    {'name': 'Monolithic Architecture', 'color': chalk.whiteBright.bold}, 
    {'name': 'Microservices Architecture', 'color': chalk.whiteBright.bold}, 
    {'name': 'Serverless Architecture', 'color': chalk.whiteBright.bold}, 
    {'name': 'Event-Driven Architecture', 'color': chalk.whiteBright.bold}, 
    {'name': 'MVC', 'color': chalk.whiteBright.bold}, 
    {'name': 'Hexagonal Architecture', 'color': chalk.whiteBright.bold}, 
    {'name': 'Clean Architecture', 'color': chalk.whiteBright.bold}, 
]

// Design pattern choices
export const designPatternChoices = [
    {'name': 'Observer', 'color': chalk.whiteBright.bold}, 
    {'name': 'Facade', 'color': chalk.whiteBright.bold}, 
    {'name': 'Adapter', 'color': chalk.whiteBright.bold}, 
    {'name': 'Saga', 'color': chalk.whiteBright.bold}, 
    {'name': 'API Gateway', 'color': chalk.whiteBright.bold}, 
    {'name': 'Event Sourcing', 'color': chalk.whiteBright.bold}, 
    {'name': 'Dependency Injection', 'color': chalk.whiteBright.bold}, 
    {'name': 'Factory', 'color': chalk.whiteBright.bold}, 
    {'name': 'Singleton', 'color': chalk.whiteBright.bold}, 
    {'name': 'Strategy', 'color': chalk.whiteBright.bold}, 
]

// Database choices
export const sqlDatabaseChoice = [
    {'name': 'PostgreSQL', 'color': chalk.hex('#336791').bold},
    {'name': 'MySQL', 'color': chalk.hex('#00546B').bold},
    {'name': 'SQLite', 'color': chalk.hex('#003B57')},
    {'name': 'MariaDB', 'color': chalk.hex('#003545')},
    {'name': 'Oracle', 'color': chalk.hex('#F80000')},
    {'name': 'SQL Server', 'color': chalk.hex('#CC2927')},
]

export const noSqlDatabaseChoice = [
    {'name': 'MongoDB', 'color': chalk.hex('#599636', '#6CAC48').bold},
    {'name': 'Cassandra', 'color': chalk.hex('#1287B1')},
    {'name': 'CouchDB', 'color': chalk.hex('#D4A635')},
    {'name': 'Firebase', 'color': chalk.hex('#FFA611')},
]

export const databaseTypesChoice = [
    {'name': 'SQL', 'color': chalk.hex('#336791')},
    {'name': 'NoSQL', 'color': chalk.hex('#4DB33D')},
    {'name': 'In-memory', 'color': chalk.hex('#FF3E00')},
    {'name': 'Graph', 'color': chalk.hex('#FF3E00')},
]

// Database ORMs & ODMs choices
export const databaseConnectors = [
    {
        'ORMs' : [
            {'name': 'Sequelize', 'color': chalk.hex('#FF3E00')}, 
            {'name': 'TypeORM', 'color': chalk.hex('#FF3E00')}, 
            {'name': 'Prisma', 'color': chalk.hex('#FF3E00')}, 
            {'name': 'Objections.js', 'color': chalk.hex('#FF3E00')}, 
            {'name': 'Bookshelf.js', 'color': chalk.hex('#FF3E00')}, 
        ],
        'ODMs' : [
            {'name': 'Mongoose', 'color': chalk.hex('#FF3E00')}, 
            {'name': 'Typegoose', 'color': chalk.hex('#FF3E00')}, 
        ]
    }
]

// Tools choices
export const toolsChoices = [
    {'name': 'Docker', 'color': chalk.hex('#2496ED').bold}, 
    {'name': 'GitHub Actions', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Jest', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'ESlint', 'color': chalk.hex('#FF3E00')},
    {'name': 'Prettier', 'color': chalk.hex('#FF3E00')},
]