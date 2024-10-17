import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function copyDatabaseConfig(database, projectPath) {
	const dbName = database.toLowerCase();

	const templatePath = path.join(
		__dirname,
		'..',
		'..',
		'templates',
		'database',
		dbName,
		'db.js'
	);
	const destinationPath = path.join(projectPath, 'src', 'database', 'db.js');

	try {
		await fs.copyFile(templatePath, destinationPath);
		console.log(`Database configuration copied to: ${destinationPath}`);
	} catch (error) {
		console.error('Error copying database configuration:', error);
		return;
	}
}
