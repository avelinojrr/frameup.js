import fs from 'fs/promises';
import path from 'path';
import { copyDatabaseConfig } from './copyDatabaseConfig.js';
import { copyReadmeFiles } from './copyReadmeFiles.js';
import { entryFiles } from './entryFiles.js';

export async function createMvcStructure(
	projectPath,
	database,
	languages,
	designPatterns,
	orm
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
			})
		);

		await copyDatabaseConfig(database, projectPath, languages, orm);

		for (const pattern of designPatterns) {
			await copyReadmeFiles(projectPath, languages, pattern);
			console.log(
				`README for design pattern ${pattern} copied successfully.`
			);
		}

		// await copyReadmeFiles(projectPath, languages, designPattern);
		await entryFiles(projectPath, languages);
	} catch (error) {
		if (error.code === 'EEXIST') {
			console.warn('Folder already exists. Skipping...');
		} else {
			throw error;
		}
	}
}
