import fs from 'fs';
import path from 'path';

/**
 * Create a file with the given content
 */

export async function createFilesFromTemplate(template, projectName) {
    const projectPath = path.join(process.cwd(), projectName);

    // Create the project directory
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
    }

    // Iterate over the template and copy the files
    for (const file of template.files) {
        const destinationPath = path.join(projectPath, file.path);
        fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
        fs.writeFileSync(destinationPath, file.content);
    }

    console.log(`Files created at ${projectPath}`);
}