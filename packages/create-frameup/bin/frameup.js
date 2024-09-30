#!/usr/bin/env node

import { getStackConfig } from "../src/helpers/promptsHelper.js";
import { generateScaffolding } from "../src/commands/generate.js";

async function runCLI() {
    console.log('Welcome to Frameup CLI!');

    try {
        // Get the configuration selected by the user
        const stackConfig = await getStackConfig();
        console.log('User configuration:', stackConfig);

        // Generate the scaffolding
        await generateScaffolding(stackConfig);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

runCLI();