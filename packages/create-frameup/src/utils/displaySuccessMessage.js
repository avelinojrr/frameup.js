import chalk from 'chalk';

export function displaySuccessMessage(projectPath) {
	console.log('\n');
	console.log(
		chalk.green.bold(
			'✨ Congratulations! Your backend project is ready! ✨'
		)
	);
	console.log('\n');

	console.log(`📂 We've set everything up at: ${chalk.blue(projectPath)} `);
	console.log('\n');

	console.log(
		chalk.yellow(
			'🚀 Next steps? Check the README in each folder for code examples and quality tips.'
		)
	);
	console.log('\n');

	console.log(
		`${chalk.cyan(`🎉 And that's it! Your journey to build something amazing starts here.`)}`
	);
	console.log('\n');

	console.log(chalk.magenta('Happy coding! ✨💻'));
	console.log('\n');
}
