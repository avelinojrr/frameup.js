import fs from 'fs';
import path from 'path';
import { createMonolithicStructure } from './monolithicStructure.js';
/**
 * Create a file with the given content
 */

export async function createFilesFromTemplate(template, projectName) {
	const projectPath = path.join(process.cwd(), projectName);

	createMonolithicStructure(projectPath);

	// Iterar sobre las plantillas y copiar archivos
	for (const file of template.files) {
		let destinationPath = path.join(projectPath, file.path);

		if (file.path.includes('db.js')) {
			destinationPath = path.join(
				projectPath,
				'src',
				'database',
				'db.js'
			);
		}

		fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
		fs.writeFileSync(destinationPath, file.content);
	}
	console.log(`Project files created in: ${projectPath}`);
}
