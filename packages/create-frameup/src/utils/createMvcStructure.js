import fs from 'fs/promises';
import path from 'path';
import { copyDatabaseConfig } from './copyDatabaseConfig.js';
import { copyReadmeFiles } from './copyReadmeFiles.js';
import { entryFiles } from './entryFiles.js';

export async function createMvcStructure(
	projectPath,
	database,
	languages,
	designPattern
) {
	const folders = [
		'src',
		'src/config',
		'src/controllers',
		'src/database',
		'src/middlewares',
		'src/models',
		'src/routes',
		'src/services',
		'src/utils',
		'src/views',
		'tests',
		'public',
	];

	try {
		await Promise.all(
			folders.map(async (folder) => {
				const folderPath = path.join(projectPath, folder);
				await fs.mkdir(folderPath, { recursive: true });
				// console.log(`Created folder: ${folderPath}`);
				// console.log('Folders created successfully 🎉');
			})
		);

		await copyDatabaseConfig(database, projectPath, languages);
		// console.log('Database configuration copied successfully. 🎉');

		await copyReadmeFiles(projectPath, languages, designPattern);
		// console.log('README files copied successfully. 🎉');

		await entryFiles(projectPath, languages);
		// console.log('Entry files created successfully. 🎉');
	} catch (error) {
		console.error('Error creating monolithic structure: ❌', error);
		throw error;
	}

	// console.log('Monolithic structure created successfully.');
}
