#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from '../src/commands/init.js';
import { addPackageCommand } from '../src/commands/addPackages.js';
import { removePackageCommand } from '../src/commands/removePackages.js';
import { listPackageCommand } from '../src/commands/listFeatures.js';
import { displayProjectInfoCommand } from '../src/commands/info.js';
import { upgradeProjectCommand } from '../src/commands/upgrade.js';

const program = new Command();

program
	.name('frameup')
	.description('New generation backend tooling. Take a look! ✨')
	.version('1.0.0');

program
	.command('init')
	.description('create a new frameup project')
	.action(initCommand);

program
	.command('add <package>')
	.description('add a new package to the existing project')
	.action(addPackageCommand);
program
	.command('remove <package>')
	.description('remove a package from the existing project')
	.action(removePackageCommand);

program
	.command('list')
	.description('list available packages')
	.action(listPackageCommand);

program
	.command('info')
	.description('display information about the current project')
	.action(displayProjectInfoCommand);

program
	.command('upgrade')
	.description('upgrade the project to the latest version')
	.action(upgradeProjectCommand);

program.parse(process.argv);
if (!process.argv.slice(2).length) {
	program.outputHelp();
}
