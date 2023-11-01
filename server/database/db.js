import mongoose from "mongoose";

const connectDatabase = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("DataBase Connected Successfully");
	} catch (error) {
		console.log("Error white connecting to database");
	}
};

export default connectDatabase;
