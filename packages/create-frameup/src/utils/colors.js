import chalk from 'chalk';

export const frameupColors = {
	inputColor: chalk.hex('#CFD8DC'),
	outputColor: chalk.hex('#FAFAFA').bold,

	// Languages Colors
	jsColor: chalk.hex('#F0DB4F').bold,
	tsColor: chalk.hex('#007ACC').bold,
	nodeColor: chalk.hex('#83CD29'),

	// Framework Nodejs Colors
	expressJsColor: chalk.hex('#FAFAFA').bold,
	koaJsColor: chalk.hex('#6e6f70'),
	hapiJsColor: chalk.hex('#ff9200'),
	meteorJsColor: chalk.hex('#FF3E00'),
	nestJsColor: chalk.hex('#E0234E'),
	adonisJsColor: chalk.hex('#2E3148'),

	// Database SQL Colors
	postgresColor: chalk.hex('#336791').bold,
	mysqlColor: chalk.hex('#00758F'),
	sqliteColor: chalk.hex('#003B57'),
	mariaDbColor: chalk.hex('#003545'),
	oracleColor: chalk.hex('#ff0000'),
	sqlServerColor: chalk.hex('#A91D22'),

	// Database NoSQL Colors
	mongoDbColor: chalk.hex('#599636').bold,
	cassandraColor: chalk.hex('#1287B1'),
	couchDbColor: chalk.hex('#D4A635'),
	firebaseColor: chalk.hex('#FFA611'),

	// Database Types Colors
	sqlColor: chalk.hex('#1E90FF').bold,
	noSqlColor: chalk.hex('#FF5722').bold,
	inMemoryColor: chalk.hex('#4CAF50'),
	graphColor: chalk.hex('#9C27B0'),

	// ORMs & ODMs Colors
	sequelizeColor: chalk.hex('#52B0E7').bold,
	typeOrmColor: chalk.hex('#E83524').bold,
	prismaColor: chalk.hex('#0C344B'),
	objectionsColor: chalk.hex('#4B5562'),
	bookshelfColor: chalk.hex('#3F3F3F'),
	mongooseColor: chalk.hex('#880000').bold,
	typegooseColor: chalk.hex('#475569'),
};
