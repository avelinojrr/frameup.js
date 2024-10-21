import fs from 'fs';
import path from 'path';
import { createMonolithicStructure } from '../utils/monolithicStructure.js';
import { createMicroservicesStructure } from '../utils/microservicesStructure.js';
import { installDependencies } from './packageInstaller.js';
import { createPackageJson, createTsConfig } from './package.js';
import { copyToolConfigs } from '../utils/copyToolConfigs.js';
import { displaySuccessMessage } from '../utils/displaySuccessMessage.js';

// Map the names of architecture and languages to the corresponding folder names
const architectureMap = {
	'Monolithic Architecture': 'monolithic',
};

const languageMap = {
	JavaScript: 'JavaScript',
	TypeScript: 'TypeScript',
};

const dbMap = {
	PostgreSQL: 'postgres',
	MongoDB: 'mongodb',
};

const designPatternMap = {
	MVC: 'mvc',
};

export async function generateScaffolding(config) {
	const {
		languages,
		architecture,
		projectName,
		database,
		designPattern,
		tools,
		packageManager,
	} = config;

	const normalizedProjectName = projectName
		.trim()
		.replace(/\s+/g, '-')
		.toLowerCase();

	const mappedArchitecture = architectureMap[architecture];
	const mappedLanguage = languageMap[languages];
	const mappedDb = dbMap[database];
	const mappedDesignPattern = designPatternMap[designPattern];

	const selectedPackageManager = packageManager.toLowerCase();

	if (
		!mappedArchitecture ||
		!mappedLanguage ||
		!mappedDb ||
		!mappedDesignPattern ||
		!selectedPackageManager
	) {
		throw new Error(
			`Invalid configuration: Architecture: ${architecture}, Language: ${languages} ,Database: ${database}, 
			Design Pattern: ${designPattern}, Package Manager: ${packageManager}`
		);
	}

	const projectPath = path.join(process.cwd(), normalizedProjectName);

	// Create the project directory if it doesn't exist
	if (!fs.existsSync(projectPath)) {
		fs.mkdirSync(projectPath, { recursive: true });
	}

	const architectureHandlers = {
		monolithic: createMonolithicStructure,
		microservices: createMicroservicesStructure,
	};

	const createStructure = architectureHandlers[mappedArchitecture];
	if (createStructure) {
		await createStructure(
			projectPath,
			mappedDb,
			mappedLanguage,
			mappedDesignPattern
		);
	} else {
		throw new Error(`Unsupported architecture: ${architecture}`);
	}

	if (tools && tools.length > 0) {
		await copyToolConfigs(projectPath, tools);
	}

	createPackageJson(config, projectPath, normalizedProjectName);
	// Create tsconfig.json file if the language is TypeScript
	if (languages === 'TypeScript') {
		createTsConfig(projectPath);
	}

	try {
		await installDependencies(selectedPackageManager, projectPath);
		console.log(`Dependencies installed using ${selectedPackageManager}`);
	} catch (error) {
		console.log(`Error installing dependencies: ${error.message}`);
	}

	displaySuccessMessage(projectPath);

	console.log(`Project files created in: ${projectPath}`);
}
