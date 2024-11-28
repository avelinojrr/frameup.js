import fs from 'fs/promises';
import path from 'path';
import { getTemplatePath } from './getTemplatePath.js';

export async function copyDatabaseConfig(
	database,
	projectPath,
	languages,
	connector = null
) {
	const dbName = database.toLowerCase();
	const databaseFileExtension = languages === 'TypeScript' ? 'ts' : 'js';

	let sourceFileName;
	let destinationFileName;
	let templatePath;

	if (connector) {
		const connectorName = connector.toLowerCase();

		const folderType = dbName === 'mongodb' ? 'odm' : 'orm';

		sourceFileName = `${connectorName}.${databaseFileExtension}`;
		destinationFileName = `${connectorName}.${databaseFileExtension}`;

		templatePath = getTemplatePath(
			'database',
			dbName,
			folderType,
			sourceFileName
		);
	} else {
		sourceFileName = `db.${databaseFileExtension}`;
		destinationFileName = sourceFileName;
		templatePath = getTemplatePath('database', dbName, sourceFileName);
	}

	const destinationPath = path.join(
		projectPath,
		'src',
		'database',
		destinationFileName
	);

	try {
		const fileContent = await fs.readFile(templatePath, 'utf-8');
		await fs.writeFile(destinationPath, fileContent, 'utf-8');
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.warn(`Template file not found: ${templatePath}`);
		} else {
			throw error;
		}
	}
}
