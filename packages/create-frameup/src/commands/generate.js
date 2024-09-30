import path from 'path';
import { createFilesFromTemplate } from '../utils/fileCreator.js';
import { loadTemplate } from '../utils/templateLoader.js';

// Map the names of architecture and language to the corresponding folder names
const architectureMap = {
    'Monolithic Architecture': 'monolithic',
    'Microservices Architecture': 'microservices',
    'Serverless Architecture': 'serverless',
    'Event-Driven Architecture': 'event-driven',
    'MVC': 'mvc',
    'Hexagonal Architecture': 'hexagonal',
    'Clean Architecture': 'clean'
};

const languageMap = {
    'JavaScript': 'js',
    'TypeScript': 'ts',
};

export async function generateScaffolding(config) {
    const { language, architecture, projectName } = config;

    const mappedArchitecture = architectureMap[architecture];
    const mappedLanguage = languageMap[language];

    // Map the architecture name to the corresponding folder name
    if (!mappedArchitecture || !mappedLanguage) {
        throw new Error(`Invalid configuration: Architecture: ${architecture}, Language: ${language}`);
    }

    const templatePath = path.join(
        process.cwd(),
        'packages',
        'create-frameup',
        'templates',
        mappedArchitecture, // Use the mapped architecture name
        mappedLanguage    
    );

    const template = loadTemplate(templatePath);
    await createFilesFromTemplate(template, projectName);

    console.log(`🚀 Project ${projectName} has been successfully created!`);

}