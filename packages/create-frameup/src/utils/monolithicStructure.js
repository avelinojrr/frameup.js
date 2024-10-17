import fs from 'fs/promises';
import path from 'path';
import { copyDatabaseConfig } from './copyDatabaseConfig.js';
// import { copyGenericFiles } from './copyGenericFiles.js';

/**
 * Create a monolithic structure for the given architecture and language.
 */

export async function createMonolithicStructure(
	projectPath,
	database,
	languages
	// designPattern
) {
	const folders = [
		'src',
		'src/config',
		'src/models',
		'src/controllers',
		'src/routes',
		'src/services',
		'src/database',
		'src/middlewares',
		'src/utils',
		'tests',
	];

	try {
		// Create the folders asynchronously using Promise.all

		await Promise.all(
			folders.map(async (folder) => {
				const folderPath = path.join(projectPath, folder);
				await fs.mkdir(folderPath, { recursive: true });
				console.log(`Created folder: ${folderPath}`);
			})
		);

		await copyDatabaseConfig(database, projectPath, languages);

		// await copyGenericFiles(projectPath, language, designPattern);
	} catch (error) {
		console.error('Error creating monolithic structure:', error);
		return;
	}

	console.log('Monolithic structure created successfully.');
}
