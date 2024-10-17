import { connect, connection } from 'mongoose';

connect('mongodb://localhost:27017/your_database', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;
