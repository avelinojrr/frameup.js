#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from '../src/commands/init.js';
import { addFeatureCommand } from '../src/commands/addFeature.js';
import { removeFeatureCommand } from '../src/commands/removeFeature.js';
import { listFeaturesCommand } from '../src/commands/listFeatures.js';
import { displayProjectInfoCommand } from '../src/commands/info.js';
import { upgradeProjectCommand } from '../src/commands/upgrade.js';

const program = new Command();

program
	.name('frameup')
	.description('Next generation backend tooling for Node.js')
	.version('1.0.0');

program
	.command('init')
	.description('Create a new frameup project')
	.action(initCommand);

program
	.command('add <feature>')
	.description('Add a new feature to the existing project')
	.action(addFeatureCommand);
program
	.command('remove <feature>')
	.description('Remove a feature from the existing project')
	.action(removeFeatureCommand);

program
	.command('list')
	.description('List all the features of the project')
	.action(listFeaturesCommand);

program
	.command('info')
	.description('Display information about the current project')
	.action(displayProjectInfoCommand);

program
	.command('upgrade')
	.description('Upgrade the project to the latest version')
	.action(upgradeProjectCommand);

program.parse(process.argv);
if (!process.argv.slice(2).length) {
	program.outputHelp();
}
