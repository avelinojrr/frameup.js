import fs from 'fs/promises';
import path from 'path';

async function displayProjectInfo(projectPath) {
	try {
		console.log(`Displaying project info for path: ${projectPath}`);
		const packageJsonPath = path.join(projectPath, 'package.json');

		try {
			await fs.access(packageJsonPath);
			const packageData = JSON.parse(
				await fs.readFile(packageJsonPath, 'utf-8')
			);
			console.log('Project Name:', packageData.name);
			console.log('Version:', packageData.version);
			console.log(
				'Dependencies:',
				Object.keys(packageData.dependencies || {}).join(', ')
			);
		} catch {
			console.log('No package.json file found in the project path.');
		}
	} catch (error) {
		throw new Error(`Error displaying project info: ${error.message}`);
	}
}

export async function displayProjectInfoCommand() {
	try {
		const projectPath = process.cwd();
		await displayProjectInfo(projectPath);
	} catch (error) {
		console.error(`Error displaying project info: ${error.message}`);
	}
}
