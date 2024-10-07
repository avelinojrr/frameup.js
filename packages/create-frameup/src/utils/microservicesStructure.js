import fs from 'fs/promises';
import path from 'path';

export function createMicroservicesStructure(projectPath) {
	const folders = ['api-gateway', 'services1', 'services2'];

	try {
		// Create the folders asynchronously using Promise.all
		Promise.all(
			folders.map(async (folder) => {
				const folderPath = path.join(projectPath, folder);
				await fs.mkdir(folderPath, { recursive: true });
				console.log(`Created folder: ${folderPath}`);
			})
		);
	} catch (error) {
		console.error('Error creating microservices structure:', error);
		return;
	}
}
