#!/usr/bin/env node

import { getStackConfig } from "../src/helpers/promptsHelper.js";

async function main() {
    console.log('Welcome to Frameup CLI!');

    try {
        // Get the configuration selected by the user
        const stackConfig = await getStackConfig();
        console.log('User configuration:', stackConfig);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();