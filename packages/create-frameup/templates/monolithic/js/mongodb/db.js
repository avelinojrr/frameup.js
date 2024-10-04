import mongoose from 'mongoose';

export default async function connectDB() {
	try {
		await mongoose.connect('mongodb://localhost:27017/your_database', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error(err);
	}
}
