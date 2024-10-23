#!/usr/bin/env node

import { getStackConfig } from '../src/helpers/promptsHelper.js';
import { generateScaffolding } from '../src/commands/generate.js';

async function runCLI() {
	try {
		const stackConfig = await getStackConfig();

		await generateScaffolding(stackConfig);
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

runCLI();
