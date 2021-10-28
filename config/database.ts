import { connect, ConnectOptions } from "mongoose";
type ConnectionOptionsExtended = {
	useNewUrlParser: boolean;
	useUnifiedTopology: boolean;
};
console.log(process.env.mongoURI);
const connectDB = async () => {
	try {
		const mongoURI: string =
			process.env.mongoURI || "mongodb://localhost:27017/ecommerce";
		const options: ConnectionOptionsExtended & ConnectOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		await connect(mongoURI, options);
		console.log("Connected to db");
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
export default connectDB;
