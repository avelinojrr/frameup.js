/* eslint-disable no-unused-vars */
import fs from 'fs';
import path from 'path';

/**
 * Load the template from the given path, including subdirectories.
 * Exclude database folders that are not selected.
 */

export function loadTemplate(templatePath, _excludeDirs = []) {
	const files = [];

	// Recursive function to read files from directories
	function readDirRecursive(dir) {
		const items = fs.readdirSync(dir);

		items.forEach((item) => {
			const fullPath = path.join(dir, item);
			const stat = fs.statSync(fullPath);

			// Skip excluded directories
			const relativeDir = path.relative(templatePath, dir);
			if (stat.isDirectory()) {
				// If it's a directory, read it recursively
				readDirRecursive(fullPath);
			} else {
				// If it's a file, read the content
				const relativePath = path.relative(templatePath, fullPath); // Keep relative path for copying
				const content = fs.readFileSync(fullPath, 'utf-8');
				files.push({ path: relativePath, content });
			}
		});
	}

	// Start reading from the root template path
	readDirRecursive(templatePath);

	if (files.length === 0) {
		console.log(`No files found in template: ${templatePath}`);
	} else {
		console.log(`Template loaded with ${files.length} files.`);
	}

	return { files };
}
