/**
 * @param {Array} choices
 * This file is a helper for the choices in the inquirer prompts.
 */

import chalk from 'chalk';

// Language choices
export const languagesChoices = [
    { name: 'JavaScript', color: chalk.yellow.bold },
    { name: 'TypeScript', color: chalk.blue.bold }
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
    {'name': 'Monolithic Architecture', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Microservices Architecture', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Serverless Architecture', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Event-Driven Architecture', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'MVC', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Hexagonal Architecture', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Clean Architecture', 'color': chalk.hex('#FF3E00')}, 
]

// Design pattern choices
export const designPatternChoices = [
    {'name': 'Observer', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Facade', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Adapter', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Saga', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'API Gateway', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Event Sourcing', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Dependency Injection', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Factory', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Singleton', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Strategy', 'color': chalk.hex('#FF3E00')}, 
]

// Database choices
export const sqlDatabaseChoice = [
    {'name': 'PostgreSQL', 'color': chalk.hex('#336791')},
    {'name': 'MySQL', 'color': chalk.hex('#00758F')},
    {'name': 'SQLite', 'color': chalk.hex('#003B57')},
    {'name': 'MariaDB', 'color': chalk.hex('#003545')},
    {'name': 'Oracle', 'color': chalk.hex('#F80000')},
    {'name': 'SQL Server', 'color': chalk.hex('#CC2927')},
]

export const noSqlDatabaseChoice = [
    {'name': 'MongoDB', 'color': chalk.hex('#4DB33D')},
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
    {'name': 'Docker', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'GitHub Actions', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Jest', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Mocha', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'Chai', 'color': chalk.hex('#FF3E00')},
    {'name': 'ESlint', 'color': chalk.hex('#FF3E00')},
    {'name': 'Prettier', 'color': chalk.hex('#FF3E00')},
    {'name': 'Husky', 'color': chalk.hex('#FF3E00')},
]