import fs from 'fs';
import path from 'path';

/**
 * Create a package.json file in the project directory
 */

export function createPackageJson(config, projectPath, normalizedProjectName) {
	const { framework, database, orm } = config;

	const dependencies = {};
	const devDependencies = {};

	if (framework === 'Express.js') {
		dependencies['express'] = '^4.21.1';
	}

	if (database === 'PostgreSQL') {
		dependencies['pg'] = '^8.7.1';
	} else if (database === 'MongoDB') {
		dependencies['mongoose'] = '^6.0.4';
	}

	if (orm) {
		if (orm === 'Sequelize') {
			dependencies['sequelize'] = '^6.32.1';
		} else if (orm === 'TypeORM') {
			dependencies['typeorm'] = '^0.2.43';
		} else if (orm === 'Mongoose') {
			dependencies['mongoose'] = '^6.0.4';
		} else if (orm === 'Typegoose') {
			dependencies['@typegoose/typegoose'] = '^7.4.0';
			dependencies['mongoose'] = '^6.0.4';
		}
	}

	const packageJson = {
		name: normalizedProjectName,
		version: '1.0.0',
		description: '',
		main: 'index.js',
		type: 'module',

		scripts: {
			start: 'node index.js',
			dev: 'node --watch index.js',
		},
		keywords: [],
		author: '',
		license: 'ISC',
		dependencies,
		devDependencies,
	};

	const packageJsonContent = JSON.stringify(packageJson, null, 2);

	fs.writeFileSync(
		path.join(projectPath, 'package.json'),
		packageJsonContent,
		'utf8'
	);

	console.log('Created package.json');
}
