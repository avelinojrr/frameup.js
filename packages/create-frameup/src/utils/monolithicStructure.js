import fs from 'fs/promises';
import path from 'path';

/**
 * Create a monolithic structure for the given architecture and language.
 */

export async function createMonolithicStructure(projectPath) {
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
	} catch (error) {
		console.error('Error creating monolithic structure:', error);
		return;
	}

	console.log('Monolithic structure created successfully.');
}
