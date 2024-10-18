import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Get the absolute path to a template file.
 * @param {...string} segments - Segments of the path to the template file.
 * @returns {string} The absolute path to the template file.
 */

export function getTemplatePath(...segments) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	// Build the path absolute to the template file
	return path.join(__dirname, '..', '..', 'templates', ...segments);
}
