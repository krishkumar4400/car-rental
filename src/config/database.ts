import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

export default async function connectToDB() {
    if (!mongoURI) {
        throw new Error("Mongo DB URL is missing");
    }
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo DB");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}