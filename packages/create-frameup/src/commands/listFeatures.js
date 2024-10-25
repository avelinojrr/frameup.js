function listFeatures() {
	try {
		console.log('Available features:');
		console.log(' - Authentication');
		console.log(' - Authorization');
		console.log(' - Database Integration');
		console.log(' - Logging');
	} catch (error) {
		throw new Error(`Error listing features: ${error.message}`);
	}
}

export function listFeaturesCommand() {
	try {
		listFeatures();
	} catch (error) {
		throw new Error(`Error listing features: ${error.message}`);
	}
}
