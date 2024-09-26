#!/usr/bin/env node

import chalk from "chalk";
import pkg from "enquirer";
const { prompt, Select } = pkg;

import { languagesChoices, frameworkChoices } from "../utils/stackTech/technologiesHelper.js";

async function promptUser(promptConfig) {
    try {
        const prompt = new Select(promptConfig);
        return await prompt.run();
    } catch (error) {
        console.error(chalk.red('Error during prompt execution:'), error);
        process.exit(1);
    }
}

async function getStackConfig() {

    await prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter the name of your project:',
            initial: 'my-project'
        }
    ])

    const languageConfig = {
        name: 'language',
        message: `Select a language to use: ${chalk.dim('(Use arrow keys)')}`,
        choices: languagesChoices.map(lang => ({
            name: lang.name,
            message: lang.color(lang.name),
            value: lang.name
        })),
        result(name) {
            const selected = this.choices.find(choice => choice.name === name);
            return selected ? selected.value : name;
        },
        format(input) {
            const selected = languagesChoices.find(l => l.name === input);
            return selected ? selected.color(input) : input;
        }
    };

    const frameworkConfig = {
        name: 'framework',
        message: `Select a framework to use: ${chalk.dim('(Use arrow keys)')}`,
        choices: frameworkChoices.map(choice => ({
            name: choice.name,
            message: choice.color(choice.name),
            value: choice.name
        })),
        result(name) {
            const selected = this.choices.find(choice => choice.name === name);
            return selected ? selected.value : name;
        },
        format(input) {
            const selected = frameworkChoices.find(f => f.name === input);
            return selected ? selected.color(input) : input;
        }
    };

    await promptUser(languageConfig);
    await promptUser(frameworkConfig);
}

getStackConfig();