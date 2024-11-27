/* eslint-disable no-useless-catch */
import fs from 'fs/promises';
import path from 'path';
import { getTemplatePath } from './getTemplatePath.js';

const designPatternMap = {
	DAO: 'dao',
	'Dependency Injection': 'di',
	DTOs: 'dtos',
	'Service Layer': 'service-layer',
};

export async function copyReadmeFiles(projectPath, language, designPatterns) {
	const normalizedLanguage = language.toLowerCase();

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

	for (const folder of foldersToCopyReadme) {
		try {
			const srcReadmePath = path.join(
				baseTemplatePath,
				folder,
				'README.md'
			);
			const destFolderPath = path.join(projectPath, folder);
			const destReadmePath = path.join(destFolderPath, 'README.md');

			await fs.mkdir(destFolderPath, { recursive: true });

			try {
				await fs.access(srcReadmePath);
				await fs.copyFile(srcReadmePath, destReadmePath);
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
			throw error;
		}
	}

	if (designPatterns) {
		const normalizedPattern =
			designPatternMap[designPatterns].toLowerCase();

		const sourcePatternReadmePath = path.join(
			baseTemplatePath,
			'patterns',
			normalizedPattern,
			'src'
		);

		try {
			const patternReadmePath = path.join(
				sourcePatternReadmePath,
				'README.md'
			);

			const destPatternReadmePath = path.join(
				projectPath,
				'src',
				normalizedPattern,
				'README.md'
			);

			await fs.mkdir(path.join(projectPath, 'src', normalizedPattern), {
				recursive: true,
			});

			try {
				await fs.access(patternReadmePath);
				await fs.copyFile(patternReadmePath, destPatternReadmePath);
			} catch (error) {
				if (error.code === 'ENOENT') {
					console.warn(
						`No README.md found for design pattern ${normalizedPattern} in templates. Skipping...`
					);
				} else {
					throw error;
				}
			}
		} catch (error) {
			throw error();
		}
	}

	const rootReadmePath = getTemplatePath(
		'mvc',
		folderFileExtension,
		'src',
		'README.md'
	);
	const destRootReadmePath = path.join(projectPath, 'README.md');

	try {
		await fs.access(rootReadmePath);
		await fs.copyFile(rootReadmePath, destRootReadmePath);
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.warn('No README.md found in templates. Skipping...');
		} else {
			throw error;
		}
	}
}
