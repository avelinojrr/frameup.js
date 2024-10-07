import path from 'path';
import { createMonolithicStructure } from '../utils/monolithicStructure.js';
import { createMicroservicesStructure } from '../utils/microservicesStructure.js';

// Map the names of architecture and languages to the corresponding folder names
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
	const { languages, architecture, projectName, database } = config;

	const mappedArchitecture = architectureMap[architecture];
	const mappedLanguage = languageMap[languages];
	const mappedDb = dbMap[database]; // Map database selection

	if (!mappedArchitecture || !mappedLanguage || !mappedDb) {
		throw new Error(
			`Invalid configuration: Architecture: ${architecture}, Language: ${languages} ,Database: ${database}`
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
		createStructure(projectName, mappedDb);
	} else {
		throw new Error(`Unsupported architecture: ${architecture}`);
	}

	console.log(`Project files created in: ${projectPath}`);
	console.log(`🚀 Project ${projectName} has been successfully created!`);
}
