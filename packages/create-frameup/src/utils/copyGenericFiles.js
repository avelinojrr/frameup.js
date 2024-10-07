import { promises as fs } from 'fs';
import path from 'path';

export async function copyGenericFiles(projectPath) {
	const filesToCopy = [
		{
			src: 'templates/monolithic/js/src/config/config.js',
			dest: `${projectPath}/src/config/config.js`,
		},
		{
			src: 'templates/monolithic/js/src/models/exampleModel.js',
			dest: `${projectPath}/src/models/exampleModel.js`,
		},
		{
			src: 'templates/monolithic/js/src/controllers/exampleController.js',
			dest: `${projectPath}/src/controllers/exampleController.js`,
		},
		{
			src: 'templates/monolithic/js/src/routes/exampleRoute.js',
			dest: `${projectPath}/src/routes/exampleRoute.js`,
		},
		{
			src: 'templates/monolithic/js/src/services/exampleService.js',
			dest: `${projectPath}/src/services/exampleService.js`,
		},
		{
			src: 'templates/monolithic/js/src/middlewares/exampleMiddleware.js',
			dest: `${projectPath}/src/middlewares/exampleMiddleware.js`,
		},
		{
			src: 'templates/monolithic/js/tests/example.test.js',
			dest: `${projectPath}/tests/example.test.js`,
		},
	];

	for (const file of filesToCopy) {
		const srcPath = path.join(process.cwd(), file.src);
		const destPath = path.join(file.dest);
		await fs.copyFile(srcPath, destPath);
		console.log(`Copied ${srcPath} to ${destPath}`);
	}
}
