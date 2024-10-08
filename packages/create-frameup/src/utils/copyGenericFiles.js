import { promises as fs } from 'fs';
import path from 'path';

export async function copyGenericFiles(projectPath, language) {
	const normalizedLanguage = language.toLowerCase();

	console.log(`Language received: ${language}`);
	// Define the extension for the language
	const extensionMap = {
		javascript: 'js',
		typescript: 'ts',
	};

	const fileExtension = extensionMap[normalizedLanguage];

	if (!fileExtension) {
		throw new Error(`Unsupported language: ${language}`);
	}

	const filesToCopy = [
		{
			src: `templates/monolithic/${fileExtension}/src/config/config.${fileExtension}`,
			dest: `${projectPath}/src/config/config.${fileExtension}`,
		},
		{
			src: `templates/monolithic/${fileExtension}/src/models/exampleModel.${fileExtension}`,
			dest: `${projectPath}/src/models/exampleModel.${fileExtension}`,
		},
		{
			src: `templates/monolithic/${fileExtension}/src/controllers/exampleController.${fileExtension}`,
			dest: `${projectPath}/src/controllers/exampleController.${fileExtension}`,
		},
		{
			src: `templates/monolithic/${fileExtension}/src/routes/exampleRoute.${fileExtension}`,
			dest: `${projectPath}/src/routes/exampleRoute.${fileExtension}`,
		},
		{
			src: `templates/monolithic/${fileExtension}/src/services/exampleService.${fileExtension}`,
			dest: `${projectPath}/src/services/exampleService.${fileExtension}`,
		},
		{
			src: `templates/monolithic/${fileExtension}/src/middlewares/exampleMiddleware.${fileExtension}`,
			dest: `${projectPath}/src/middlewares/exampleMiddleware.${fileExtension}`,
		},
		{
			src: `templates/monolithic/${fileExtension}/tests/example.test.${fileExtension}`,
			dest: `${projectPath}/tests/example.test.${fileExtension}`,
		},
	];

	for (const file of filesToCopy) {
		const srcPath = path.join(process.cwd(), file.src);
		const destPath = path.join(file.dest);
		await fs.copyFile(srcPath, destPath);
		console.log(`Copied ${srcPath} to ${destPath}`);
	}
}
