import fs from 'fs';
import path from 'path';
import { createMvcStructure } from '../utils/createMvcStructure.js';
import { installDependencies } from './packageInstaller.js';
import { createPackageJson, createTsConfig } from './package.js';
import { copyToolConfigs } from '../utils/copyToolConfigs.js';
import { displaySuccessMessage } from '../utils/displaySuccessMessage.js';

// Map the names of architecture and languages to the corresponding folder names
const architectureMap = {
	MVC: 'mvc',
};

const languageMap = {
	JavaScript: 'JavaScript',
	TypeScript: 'TypeScript',
};

const dbMap = {
	PostgreSQL: 'postgres',
	MongoDB: 'mongodb',
};

export async function generateScaffolding(config) {
	const {
		languages,
		architecture,
		projectName,
		database,
		orm,
		designPatterns,
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
	const selectedPackageManager = packageManager.toLowerCase();

	if (
		!mappedArchitecture ||
		!mappedLanguage ||
		!mappedDb ||
		!designPatterns.length ||
		!selectedPackageManager
	) {
		throw new Error(
			`Invalid configuration: Architecture: ${architecture}, Language: ${languages}, Database: ${database}, 
			Package Manager: ${packageManager}`
		);
	}

	const projectPath = path.join(process.cwd(), normalizedProjectName);

	// Create the project directory if it doesn't exist
	if (!fs.existsSync(projectPath)) {
		fs.mkdirSync(projectPath, { recursive: true });
	}

	const architectureHandlers = {
		mvc: createMvcStructure,
	};

	const createStructure = architectureHandlers[mappedArchitecture];
	if (createStructure) {
		await createStructure(
			projectPath,
			mappedDb,
			mappedLanguage,
			designPatterns,
			orm
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
	} catch (error) {
		console.error(`Error installing dependencies ❌: ${error.message}`);
	}

	const configPath = path.join(projectPath, '.frameuprc');

	try {
		fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
		// console.log('Project configuration saved in .frameuprc');
	} catch (error) {
		console.error(`Failed to save project configuration: ${error.message}`);
	}

	displaySuccessMessage(projectPath);
}
