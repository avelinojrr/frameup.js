import chalk from 'chalk';

const architectures = [
    'Monolithic',
    'Microservices',
    'Serverless',
    'Event-Driven',
    'MVC',
    'Hexagonal',
    'Clean Architecture'
];

const designPatterns = [
    'Observer',
    'Facade',
    'Adapter',
    'Saga',
    'API Gateway',
    'Event Sourcing',
    'Dependency Injection',
    'Factory',
    'Singleton',
    'Strategy',
];

const architectureColors = {
    'Monolithic': chalk.hex('#ACB0BE'),
    'Microservices': chalk.hex('#ACB0BE'),
    'Serverless': chalk.hex('#F5BDE6'),
    'Event-Driven': chalk.hex('#F5BDE6'),
    'MVC': chalk.hex('#B7BDF8'),
    'Hexagonal': chalk.hex('#B7BDF8'),
    'Clean Architecture': chalk.hex('#8AADF4')
};

const designPatternColors = {
    'Observer': chalk.hex('#FFFFFF'),
    'Facade': chalk.hex('#FFFFFF'),
    'Adapter': chalk.hex('#BE6BFF'),
    'Saga': chalk.hex('#BE6BFF'),
    'API Gateway': chalk.hex('#BE6BFF'),
    'Event Sourcing': chalk.hex('#625FFF'),
    'Dependency Injection': chalk.hex('#625FFF'),
    'Factory': chalk.hex('#625FFF'),
    'Singleton': chalk.hex('#C6C7F8'),
    'Strategy': chalk.hex('#C6C7F8'),
};

export const architectureChoices = architectures.map(arch => ({
    name: arch,
    value: arch,
    color: architectureColors[arch],
}));

export const designPatternChoices = designPatterns.map(pattern => ({
    name: pattern,
    value: pattern,
    color: designPatternColors[pattern],
}));