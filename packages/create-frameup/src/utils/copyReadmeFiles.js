import fs from 'fs/promises';
import path from 'path';
import { getTemplatePath } from './getTemplatePath.js';

export async function copyReadmeFiles(projectPath, language, designPattern) {
	const normalizedLanguage = language.toLowerCase();

	console.log(
		`Language received: ${language}, Design pattern received: ${designPattern}`
	);

	const folderExtensionMap = {
		javascript: 'js',
		typescript: 'ts',
	};

	const folderFileExtension = folderExtensionMap[normalizedLanguage];
	if (!folderFileExtension) {
		throw new Error(`Unsupported language: ${language}`);
	}

	const baseTemplatePath = getTemplatePath(
		'monolithic',
		designPattern === 'mvc' ? 'mvc' : folderFileExtension,
		folderFileExtension
	);

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

	console.log('baseTemplatePath:', baseTemplatePath);

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
}
