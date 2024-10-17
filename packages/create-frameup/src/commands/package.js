import fs from 'fs';
import path from 'path';

/**
 * Create a package.json file in the project directory
 */

export function createPackageJson(config, projectPath, normalizedProjectName) {
	const { languages, framework, database, orm } = config;

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

	// Add dependencies for TypeScript
	if (languages === 'TypeScript') {
		devDependencies['typescript'] = '^4.4.4'; // TypeScript Version
		devDependencies['ts-node'] = '^10.4.0'; // TypeScript execution environment for Node
		devDependencies['@types/node'] = '^16.7.13'; // Node types

		if (dependencies['express']) {
			devDependencies['@types/express'] = '^4.17.13'; // Express types
		}

		if (dependencies['pg']) {
			devDependencies['@types/pg'] = '^8.6.8'; // PostgreSQL types
		}

		if (dependencies['sequelize']) {
			devDependencies['@types/sequelize'] = '^4.28.9'; // Sequelize types
		}
	}

	const entryPoint =
		languages === 'TypeScript' ? 'dist/index.js' : 'src/index.js';

	const scripts = {
		start:
			languages === 'TypeScript'
				? 'node dist/index.js'
				: 'node src/index.js',
		dev:
			languages === 'TypeScript'
				? 'ts-node src/index.ts'
				: 'nodemon src/index.js',
	};

	if (languages === 'TypeScript') {
		scripts.build = 'tsc';
	}

	const packageJson = {
		name: normalizedProjectName,
		version: '1.0.0',
		description: '',
		main: entryPoint,
		type: 'module',
		scripts,
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

export function createTsConfig(projectPath) {
	const tsConfig = {
		compilerOptions: {
			target: 'ES6',
			module: 'ES6',
			outDir: '/dist',
			rootDir: 'src',
			strict: true,
			esModuleInterop: true,
			skipLibCheck: true,
			forceConsistentCasingInFileNames: true,
		},
		include: ['src/**/*.ts', 'src/**/*.tsx'],
		exclude: ['node_modules'],
	};

	const tsConfigContent = JSON.stringify(tsConfig, null, 2);

	fs.writeFileSync(
		path.join(projectPath, 'tsconfig.json'),
		tsConfigContent,
		'utf8'
	);

	console.log('Created tsconfig.json');
}
