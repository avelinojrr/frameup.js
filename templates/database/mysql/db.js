const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'your_user',
	password: 'your_password',
	database: 'your_database',
});

connection.connect((err) => {
	if (err) throw err;
	console.log('Connected to MySQL');
});

module.exports = connection;
