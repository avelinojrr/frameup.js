/**
 * Languages and frameworks
 */

import chalk from "chalk"

const languages = [
    {'name': 'JavaScript', 'color': chalk.yellowBright},
    {'name': 'TypeScript', 'color': chalk.blueBright},
]

export const languagesChoices = languages.map(l => ({
    name: l.name,
    value: l.name,
    color: l.color
}));

const frameworks = [
    {'name': 'Express.js', 'color': chalk.whiteBright}, 
    {'name': 'Koa.js', 'color': chalk.hex('#6e6f70')}, 
    {'name': 'Hapi.js', 'color': chalk.hex('#ff9200')}, 
    {'name': 'Meteor.js', 'color': chalk.hex('#FF3E00')}, 
    {'name': 'NestJS', 'color': chalk.redBright}, 
    {'name': 'AdonisJS', 'color': chalk.hex('#2200FF')},
]

export const frameworkChoices = frameworks.map(f => ({
    name: f.name,
    value: f.name,
    color: f.color
}));