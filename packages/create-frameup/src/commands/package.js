import fs from 'fs';
import path from 'path';

/**
 * Create a package.json file in the project directory
 */

export function createPackageJson(config, projectPath, normalizedProjectName) {
	const { languages, framework, database, orm, tools } = config;

	const dependencies = {};
	const devDependencies = {};

	if (framework === 'Express.js') {
		dependencies['express'] = '^4.21.1';
	}

	if (database === 'PostgreSQL') {
		dependencies['pg'] = '^8.7.1';
	} else if (database === 'MongoDB') {
		dependencies['mongoose'] = '^8.7.0';
	}

	if (orm) {
		if (orm === 'Sequelize') {
			dependencies['sequelize'] = '^6.32.1';
		} else if (orm === 'TypeORM') {
			dependencies['typeorm'] = '^0.2.43';
		} else if (orm === 'Mongoose') {
			dependencies['mongoose'] = '^8.7.0';
		}
	}

	// Add devDependencies for tools selected
	if (tools && tools.length > 0) {
		if (tools.includes('Eslint')) {
			devDependencies['eslint'] = '^9.11.1';
			devDependencies['@eslint/js'] = '^9.11.1';
			devDependencies['globals'] = '^15.10.0';
			devDependencies['eslint-config-prettier'] = '^9.1.0';
			devDependencies['eslint-plugin-prettier'] = '^5.2.1';
			// If TypeScript is selected, add the TypeScript ESLint parser
			if (languages === 'TypeScript') {
				devDependencies['@typescript-eslint/parser'] = '^8.10.0';
				devDependencies['@typescript-eslint/eslint-plugin'] = '^8.10.0';
			}
		}
		if (tools.includes('Prettier')) {
			devDependencies['prettier'] = '^3.3.3';
		}

		if (tools.includes('Jest')) {
			devDependencies['jest'] = '^29.7.0';
			if (languages === 'TypeScript') {
				devDependencies['ts-jest'] = '^29.2.5';
			}
		}
	}

	// Add dependencies for TypeScript
	if (languages === 'TypeScript') {
		devDependencies['typescript'] = '^4.4.4';
		devDependencies['ts-node'] = '^10.4.0';
		devDependencies['@types/node'] = '^16.7.13';

		if (dependencies['express']) {
			devDependencies['@types/express'] = '^4.17.13';
		}

		if (dependencies['pg']) {
			devDependencies['@types/pg'] = '^8.6.8';
		}

		if (dependencies['sequelize']) {
			devDependencies['@types/sequelize'] = '^4.28.9';
		}

		if (dependencies['mongoose']) {
			dependencies['@typegoose/typegoose'] = '^12.8.0';
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

	if (tools.includes('Jest')) {
		scripts.test = 'jest';
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
			target: 'ES2023',
			module: 'NodeNext',
			moduleResolution: 'NodeNext',
			outDir: 'dist',
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
