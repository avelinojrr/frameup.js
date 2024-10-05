import fs from 'fs';
import path from 'path';

/**
 * Create a monolithic structure for the given architecture and language.
 */

export function createMonolithicStructure(projectPath) {
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

	// Creates the folders
	folders.forEach((folder) => {
		const folderPath = path.join(projectPath, folder);
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true });
			console.log(`Created folder: ${folderPath}`);
		}
	});

	console.log('Monolithic structure created successfully.');
}
