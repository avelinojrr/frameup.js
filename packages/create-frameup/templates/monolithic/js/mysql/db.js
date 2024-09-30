import mysql from 'mysql/promise';

export const connection = mysql.createPool({
    host: 'localhost',
    user: 'your_user',
    database: 'your_database',
    password: 'your_password',
});