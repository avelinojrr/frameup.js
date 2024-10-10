import { promises as fs } from 'fs';
import path from 'path';

export async function copyGenericFiles(projectPath, language, designPattern) {
	const normalizedLanguage = language.toLowerCase();

	console.log(
		`Language received: ${language}, Design pattern received: ${designPattern}`
	);

	// Define the extension for the language
	const extensionMap = {
		javascript: 'js',
		typescript: 'ts',
	};

	const fileExtension = extensionMap[normalizedLanguage];

	if (!fileExtension) {
		throw new Error(`Unsupported language: ${language}`);
	}

	// Base template path now includes the language folder
	const baseTemplatePath = path.join(
		'templates',
		'monolithic',
		designPattern === 'mvc' ? 'mvc' : fileExtension,
		fileExtension
	);

	const filesToCopy = [
		{
			src: `src/config/config.${fileExtension}`,
			dest: `src/config/config.${fileExtension}`,
		},
		{
			src: `src/models/exampleModel.${fileExtension}`,
			dest: `src/models/exampleModel.${fileExtension}`,
		},
		{
			src: `src/controllers/exampleController.${fileExtension}`,
			dest: `src/controllers/exampleController.${fileExtension}`,
		},
		{
			src: `src/routes/exampleRoute.${fileExtension}`,
			dest: `src/routes/exampleRoute.${fileExtension}`,
		},
		{
			src: `src/services/exampleService.${fileExtension}`,
			dest: `src/services/exampleService.${fileExtension}`,
		},
		{
			src: `src/middlewares/exampleMiddleware.${fileExtension}`,
			dest: `src/middlewares/exampleMiddleware.${fileExtension}`,
		},
		// {
		// 	src: `tests/example.test.${fileExtension}`,
		// 	dest: `tests/example.test.${fileExtension}`,
		// },
	];

	for (const file of filesToCopy) {
		const srcPath = path.join(process.cwd(), baseTemplatePath, file.src); // Include baseTemplatePath here
		const destPath = path.join(projectPath, file.dest); // Ensure projectPath is included
		await fs.copyFile(srcPath, destPath);
		console.log(`Copied ${srcPath} to ${destPath}`);
	}
}
