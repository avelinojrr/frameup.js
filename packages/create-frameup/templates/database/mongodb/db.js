import mongoose from 'mongoose';

export const mongoConnect = async () => {
	try {
		if (process.env.NODE_ENV === 'production') {
			await mongoose.connect(process.env.MONGO_URL_PRD);
			console.log('🐘 MongoDB in Production is connected');
		} else {
			await mongoose.connect(process.env.MONGO_URL_DEV);
			console.log('🐘 MongoDB in Development is connected');
		}
	} catch (error) {
		console.error('🐘 MongoDB connection error: ', error);
	}
};
