import fs from 'fs';
import path from 'path';

/**
 * Create a file with the given content
 */

export async function createFilesFromTemplate(template, projectName) {
	const projectPath = path.join(process.cwd(), projectName);

	// Create the project directory
	if (!fs.existsSync(projectPath)) {
		fs.mkdirSync(projectPath);
	}

	// Iterate over the template and copy the files
	for (const file of template.files) {
		let destinationPath = path.join(projectPath, file.path);

		// Verified if is a file of database and move to `src/database` folder
		if (file.path.includes('db.js')) {
			destinationPath = path.join(
				projectPath,
				'src',
				'database',
				'db.js'
			);
		}

		// Create the directory if it doesn't exist
		fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

		// Write the file content
		fs.writeFileSync(destinationPath, file.content);
	}

	console.log(`Files created at ${projectPath}`);
}
