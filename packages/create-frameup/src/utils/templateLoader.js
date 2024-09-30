import fs from 'fs';
import path from 'path';

/**
 * Load the template from the given path
 */

export function loadTemplate(templatePath) {
    const files = [];

    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template path not found: ${templatePath}`);
    }

    fs.readdirSync(templatePath).forEach(file => {
        const filePath = path.join(templatePath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        files.push({ path: file, content });
    });

    return { files };
}