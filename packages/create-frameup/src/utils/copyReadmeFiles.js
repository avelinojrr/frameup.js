import fs from 'fs/promises';
import path from 'path';
import { getTemplatePath } from './getTemplatePath.js';

export async function copyReadmeFiles(projectPath, language, designPattern) {
	const normalizedLanguage = language.toLowerCase();

	// console.log(
	// 	`Language received: ${language}, Design pattern received: ${designPattern}`
	// );

	const folderExtensionMap = {
		javascript: 'js',
		typescript: 'ts',
	};

	const folderFileExtension = folderExtensionMap[normalizedLanguage];
	if (!folderFileExtension) {
		throw new Error(`Unsupported language: ${language}`);
	}

	const baseTemplatePath = getTemplatePath('mvc', folderFileExtension);

	const foldersToCopyReadme = [
		'src/config',
		'src/controllers',
		'src/database',
		'src/middlewares',
		'src/models',
		'src/routes',
		'src/services',
		'src/utils',
		'src/views',
		'tests',
		'public',
	];

	// console.log('baseTemplatePath:', baseTemplatePath);

	for (const folder of foldersToCopyReadme) {
		try {
			const srcReadmePath = path.join(
				baseTemplatePath,
				folder,
				'README.md'
			);
			const destFolderPath = path.join(projectPath, folder);
			const destReadmePath = path.join(destFolderPath, 'README.md');

			// console.log(
			// 	`Attempting to copy README from: ${srcReadmePath} to ${destReadmePath}`
			// );

			console.log('Readmes copy successful 🎉');

			await fs.mkdir(destFolderPath, { recursive: true });

			try {
				await fs.access(srcReadmePath);
				await fs.copyFile(srcReadmePath, destReadmePath);
				console.log(`Copied README.md to ${destFolderPath}`);
			} catch (error) {
				if (error.code === 'ENOENT') {
					console.warn(
						`No README.md found for folder ${folder} in templates. Skipping...`
					);
				} else {
					throw error;
				}
			}
		} catch (error) {
			console.error(`Error copying README.md to ${folder}:`, error);
			throw error;
		}
	}

	if (designPattern) {
		const sourcePatternReadmePath = path.join(
			baseTemplatePath,
			'patterns',
			designPattern,
			'src'
		);

		// console.log('sourcePatternReadmePath:', sourcePatternReadmePath);

		try {
			const patternReadmePath = path.join(
				sourcePatternReadmePath,
				'README.md'
			);
			// console.log('patternReadmePath:', patternReadmePath);
			console.log('Pattern Readmes copy successful 🎉');
			const destPatternReadmePath = path.join(
				projectPath,
				'src',
				designPattern,
				'README.md'
			);
			// console.log('destPatternReadmePath:', destPatternReadmePath);

			await fs.mkdir(path.join(projectPath, 'src', designPattern), {
				recursive: true,
			});

			try {
				await fs.access(patternReadmePath);
				await fs.copyFile(patternReadmePath, destPatternReadmePath);
				// console.log(
				// 	`Copied README.md for design pattern ${designPattern}`
				// );
			} catch (error) {
				if (error.code === 'ENOENT') {
					console.warn(
						`No README.md found for design pattern ${designPattern} in templates. Skipping...`
					);
				} else {
					throw error;
				}
			}
		} catch (error) {
			console.error(
				`Error copying README.md for design pattern ${designPattern}:`,
				error
			);
			throw error;
		}
	}

	const rootReadmePath = getTemplatePath(
		'mvc',
		folderFileExtension,
		'src',
		'README.md'
	);
	const destRootReadmePath = path.join(projectPath, 'README.md');

	// console.log(
	// 	`Attempting to copy root README from: ${rootReadmePath} to ${destRootReadmePath}`
	// );

	try {
		await fs.access(rootReadmePath);
		await fs.copyFile(rootReadmePath, destRootReadmePath);
		// console.log(`Copied root README.md to ${destRootReadmePath}`);
		console.log('Root Readme copy successful 🎉');
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.warn('No README.md found in templates. Skipping...');
		} else {
			throw error;
		}
	}
}
