import path from 'path';
import fs from 'fs';
import { createFilesFromTemplate } from '../utils/fileCreator.js';
import { loadTemplate } from '../utils/templateLoader.js';

// Map the names of architecture and language to the corresponding folder names
const architectureMap = {
	'Monolithic Architecture': 'monolithic',
	'Microservices Architecture': 'microservices',
	'Serverless Architecture': 'serverless',
	'Event-Driven Architecture': 'event-driven',
	MVC: 'mvc',
	'Hexagonal Architecture': 'hexagonal',
	'Clean Architecture': 'clean',
};

const languageMap = {
	JavaScript: 'js',
	TypeScript: 'ts',
};

const dbMap = {
	PostgreSQL: 'postgres',
	MongoDB: 'mongodb',
	MySQL: 'mysql',
};

export async function generateScaffolding(config) {
	const { language, architecture, projectName, database } = config;

	const mappedArchitecture = architectureMap[architecture];
	const mappedLanguage = languageMap[language];
	const mappedDb = dbMap[database]; // Map database selection

	if (!mappedArchitecture || mappedLanguage || !mappedDb) {
		throw new Error(
			`Invalid configuration: Architecture: ${architecture}, Language: ${language} ,Database: ${database}`
		);
	}

	// Define the base path for the template files
	const templatePath = path.join(
		process.cwd(),
		'packages',
		'create-frameup',
		'templates',
		mappedArchitecture
	);

	// Define the path of the db.js file from the selected database
	const dbTemplatePath = path.join(templatePath, mappedDb, 'db.js');

	// Load the base project template and exclude all database directories
	const template = loadTemplate(templatePath, Object.values(dbMap)); // Exclude all DB folders

	// Create the project scaffolding
	await createFilesFromTemplate(template, projectName);

	// Copy only the selected database config (db.js) to src/
	const dbDestinationPath = path.join(
		process.cwd(),
		projectName,
		'src',
		'database/',
		'db.js'
	); // Copy the selected db config to src/

	if (fs.existsSync(dbTemplatePath)) {
		fs.copyFileSync(dbTemplatePath, dbDestinationPath);
		console.log(
			`Database configuration for ${database} has been added to src/db.js.`
		);
	} else {
		console.log(`No database configuration found for ${database}.`);
	}

	console.log(`🚀 Project ${projectName} has been successfully created!`);
}
