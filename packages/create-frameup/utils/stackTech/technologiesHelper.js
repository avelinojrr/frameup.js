/**
 * Languages and frameworks
 */

import chalk from "chalk"

export const languages = [
    {'name': 'JavaScript', 'color': chalk.yellowBright},
    {'name': 'TypeScript', 'color': chalk.blueBright},
]

export const languagesChoices = languages.map(l => ({
    name: l.name,
    value: l.name,
    color: l.color
}));

export const frameworks = [
    {'name': 'Express.js', 'color': chalk.whiteBright}, // Color hex para Express.js
    {'name': 'Koa.js', 'color': chalk.hex('#6e6f70')}, // Color hex para Koa.js
    {'name': 'Hapi.js', 'color': chalk.hex('#ff9200')}, // Color hex para Hapi.js
    {'name': 'Meteor.js', 'color': chalk.hex('#FF3E00')}, // Color hex para Meteor.js
    {'name': 'NestJS', 'color': chalk.redBright}, // Color hex para NestJS
    {'name': 'AdonisJS', 'color': chalk.hex('#2200FF')}, // Color hex para AdonisJS
]

export const frameworkChoices = frameworks.map(f => ({
    name: f.name,
    value: f.name,
    color: f.color
}));