import mongoose from "mongoose";
import { serverConfig } from ".";

export const connectDB = async () => {
    try {
        if (!serverConfig.MONGO_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        await mongoose.connect(serverConfig.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}