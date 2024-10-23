import fs from 'fs/promises';
import path from 'path';
import { getTemplatePath } from './getTemplatePath.js';

export async function copyDatabaseConfig(database, projectPath, languages) {
	const dbName = database.toLowerCase();
	const sourceFileName = 'db.js';
	const databaseFileExtension = languages === 'TypeScript' ? 'ts' : 'js';

	const templatePath = path.join(
		getTemplatePath('database', dbName),
		sourceFileName
	);

	const destinationFileName = `db.${databaseFileExtension}`;
	const destinationPath = path.join(
		projectPath,
		'src',
		'database',
		destinationFileName
	);

	try {
		const fileContent = await fs.readFile(templatePath, 'utf-8');

		// Replace the placeholder values with the actual values
		await fs.writeFile(destinationPath, fileContent, 'utf-8');
	} catch (error) {
		if (error.code === 'ENOENT') {
			throw new Error('Template file not found');
		} else {
			throw error;
		}
	}
}
