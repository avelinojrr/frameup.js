import path from 'path';
import { createMonolithicStructure } from '../utils/monolithicStructure.js';
import { createMicroservicesStructure } from '../utils/microservicesStructure.js';

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
	const { languages, architecture, projectName, database, designPattern } =
		config;

	const mappedArchitecture = architectureMap[architecture];
	const mappedLanguage = languageMap[languages];
	const mappedDb = dbMap[database];
	const mappedDesignPattern = designPatternMap[designPattern];

	if (
		!mappedArchitecture ||
		!mappedLanguage ||
		!mappedDb ||
		!mappedDesignPattern
	) {
		throw new Error(
			`Invalid configuration: Architecture: ${architecture}, Language: ${languages} ,Database: ${database}, Design Pattern: ${designPattern}`
		);
	}

	const projectPath = path.join(process.cwd(), projectName);

	const architectureHandlers = {
		monolithic: createMonolithicStructure,
		microservices: createMicroservicesStructure,
		// Add other architectures here as needed
	};

	const createStructure = architectureHandlers[mappedArchitecture];
	if (createStructure) {
		createStructure(
			projectName,
			mappedDb,
			mappedLanguage,
			mappedDesignPattern
		);
	} else {
		throw new Error(`Unsupported architecture: ${architecture}`);
	}

	console.log(`Project files created in: ${projectPath}`);
	console.log(`🚀 Project ${projectName} has been successfully created!`);
}
