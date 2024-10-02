import { frameupColors } from "../utils/colors.js";
import chalk from "chalk";
import pkg from "enquirer";
const {
    prompt,
    Select,
} = pkg;

import {
    languagesChoices,
    frameworksChoices,
    architectureChoices,
    designPatternChoices,
    sqlDatabaseChoice,
    noSqlDatabaseChoice,
    databaseTypesChoice,
    toolsChoices
} from "./choicesHelper.js";

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
        message: frameupColors.inputMessage('Enter the name of your project:'),
        async format(input) {
            return input.trim() ? frameupColors.inputResponse(input) : frameupColors.inputResponse('frameup-project');
        }
    })
    
    stackConfig.projectName = projectName;

    // Ask about the language
    stackConfig.language = await promptUser({
        name: 'language',
        message: `${frameupColors.inputMessage('Select a language to use:')}`,
        initial: chalk.dim('Use arrow-keys. Enter to submit.'),
        choices: languagesChoices.map(lang => ({
            name: lang.name,
            message: lang.color(lang.name),
            value: lang.name
        })),
        result(name) {
            return this.choices.find(choice => choice.name === name).value;
        },
        format(input) {
            const selected = languagesChoices.find(l => l.name === input);
            return selected ? selected.color(input) : input;
        }
    })

    // Ask about the framework
    stackConfig.framework = await promptUser({
        name: 'framework',
        message: `${frameupColors.inputMessage('Select a framework to use:')}`,
        initial: chalk.dim('Use arrow-keys. Enter to submit.'),
        choices: frameworksChoices.map(framework => ({
            name: framework.name,
            message: framework.color(framework.name),
            value: framework.name
        })),
        result(name) {
            return this.choices.find(choice => choice.name === name).value;
        },
        format(input) {
            const selected = frameworksChoices.find(f => f.name === input);
            return selected ? selected.color(input) : input;
        }
    })

    // Ask if developer wants added a architecture
    const { promptAddArchitecture } = await prompt({
        type: 'confirm',
        name: 'promptAddArchitecture',
        message: frameupColors.inputMessage('Would you like to add an architecture?'),
        initial: true, // Yes by default
        format(input) {
            // Added color to the response
            return input ? frameupColors.inputResponse('Yes') : frameupColors.inputResponse('No');
        }
    });

    if (promptAddArchitecture) {
        // Ask about the architecture
        stackConfig.architecture = await promptUser({
            name: 'architecture',
            message: `${frameupColors.inputMessage('Select an architecture to use:')}`,
            choices: architectureChoices.map(architecture => ({
                name: architecture.name,
                message: architecture.color(architecture.name),
                value: architecture.name
            })),
            result(name) {
                return this.choices.find(choice => choice.name === name).value;
            },
            format(input) {
                const selected = architectureChoices.find(a => a.name === input);
                return selected ? selected.color(input) : input;
            }
        });
    }

    // Ask about the architecture
    // stackConfig.architecture = await promptUser({
    //     name: 'architecture',
    //     message: `Select an architecture to use: ${chalk.dim('(Use arrow keys)')}`,
    //     choices: architectureChoices.map(architecture => ({
    //         name: architecture.name,
    //         message: architecture.color(architecture.name),
    //         value: architecture.name
    //     })),
    //     result(name) {
    //         return this.choices.find(choice => choice.name === name).value;
    //     },
    //     format(input) {
    //         const selected = architectureChoices.find(a => a.name === input);
    //         return selected ? selected.color(input) : input;
    //     }
    // })

    // Ask about the design pattern

    const { promptAddDesignPattern } = await prompt({
        type: 'confirm',
        name: 'promptAddDesignPattern',
        message: frameupColors.inputMessage('Would you like to add a design pattern?'),
        initial: true, // Yes by default
        format(input) {
            // Added color to the response
            return input ? frameupColors.inputResponse('Yes') : frameupColors.inputResponse('No');
        }
    });

    if (promptAddDesignPattern) {
        stackConfig.designPattern = await promptUser({
            name: 'designPattern',
            message: `${frameupColors.inputMessage('Select a design pattern to use:')}`,
            initial: chalk.dim('Use arrow-keys. Enter to submit.'),
            choices: designPatternChoices.map(designPattern => ({
                name: designPattern.name,
                message: designPattern.color(designPattern.name),
                value: designPattern.name
            })),
            result(name) {
                return this.choices.find(choice => choice.name === name).value;
            },
            format(input) {
                const selected = designPatternChoices.find(d => d.name === input);
                return selected ? selected.color(input) : input;
            }
        })
    }

    // stackConfig.designPattern = await promptUser({
    //     name: 'designPattern',
    //     message: `Select a design pattern to use: ${chalk.dim('(Use arrow keys)')}`,
    //     choices: designPatternChoices.map(designPattern => ({
    //         name: designPattern.name,
    //         message: designPattern.color(designPattern.name),
    //         value: designPattern.name
    //     })),
    //     result(name) {
    //         return this.choices.find(choice => choice.name === name).value;
    //     },
    //     format(input) {
    //         const selected = designPatternChoices.find(d => d.name === input);
    //         return selected ? selected.color(input) : input;
    //     }
    // })

    // Ask about the database type to use (SQL or NoSQL)
    const databaseType = await promptUser({
        name: 'databaseType',
        message: `Select a database type to use: SQL or NoSQL ${chalk.dim('(Use arrow keys)')}`,
        choices: databaseTypesChoice.map(dbType => ({
            name: dbType.name,
            message: dbType.color(dbType.name),
            value: dbType.name
        })),
        result(name) {
            return this.choices.find(choice => choice.name === name).value;
        },
        format(input) {
            const selected = databaseTypesChoice.find(d => d.name === input);
            return selected ? selected.color(input) : input;
        }
    });

    // Ask about the database type segun la elección anterior
    let databaseChoices = databaseType === 'SQL' ? sqlDatabaseChoice : noSqlDatabaseChoice;
    
    stackConfig.database = await promptUser({
        name: 'database',
        message: `Select a database to use: ${chalk.dim('(Use arrow keys)')}`,
        choices: databaseChoices.map(db => ({
            name: db.name,
            message: db.color(db.name),
            value: db.name
        })),
        result(name) {
            return this.choices.find(choice => choice.name === name).value;
        },
        format(input) {
            const selected = databaseChoices.find(d => d.name === input);
            return selected ? selected.color(input) : input;
        }
    })

    // Ask about the tools
    stackConfig.tools = await promptUser({
        name: 'tools',
        message: `Select a tool to use: ${chalk.dim('(Use arrow keys)')}`,
        choices: toolsChoices.map(tool => ({
            name: tool.name,
            message: tool.color(tool.name),
            value: tool.name
        })),
        result(name) {
            return this.choices.find(choice => choice.name === name).value;
        },
        format(input) {
            const selected = toolsChoices.find(t => t.name === input);
            return selected ? selected.color(input) : input;
        }
    })

    // Return the stack configuration
    return stackConfig;

}