import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // Remove any trailing slashes from the URI
        const cleanURI = process.env.MONGODB_URI.replace(/\/+$/, '');
        
        // Connect to MongoDB with cleaned URI and DB name
        const connectionInstance = await mongoose.connect(`${cleanURI}/${DB_NAME}`);
        
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED", error);
        process.exit(1);
    }
};

export default connectDB;
