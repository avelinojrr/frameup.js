import fs from 'fs/promises';
import path from 'path';

export async function entryFiles(projectPath, languages) {
	const normalizedLanguage = languages.toLowerCase();
	const languageFileExtensionMap = {
		javascript: 'js',
		typescript: 'ts',
	};

	const languageExtension = languageFileExtensionMap[normalizedLanguage];
	if (!languageExtension) {
		throw new Error(`Unsupported language: ${languages}`);
	}

	const entryFiles = [
		{
			name: `app.${languageExtension}`,
			path: path.join(projectPath, `src/app.${languageExtension}`),
		},
		{
			name: `index.${languageExtension}`,
			path: path.join(projectPath, `src/index.${languageExtension}`),
		},
		{
			name: '.gitignore',
			path: path.join(projectPath, '.gitignore'),
		},
	];

	try {
		for (const file of entryFiles) {
			await fs.writeFile(file.path, '', 'utf-8');
			console.log(`Created ${file.name} in ${file.path}`);
		}
	} catch (error) {
		console.log('Error crating entry files:', error);
		throw new Error(error);
	}
}
