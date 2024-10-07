import fs from 'fs/promises';
import path from 'path';

export async function copyDatabaseConfig(database, projectPath) {
	const dbName = database.toLowerCase();

	// Construir la ruta correcta usando path.join
	const templatePath = path.join(
		process.cwd(),
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
