import { getStackConfig } from '../helpers/promptsHelper.js';
import { generateScaffolding } from '../commands/generate.js';

export async function initCommand() {
	try {
		const stackConfig = await getStackConfig();
		await generateScaffolding(stackConfig);
	} catch (error) {
		console.error(`Failed to initialize the project: ${error.message}`);
	}
}
