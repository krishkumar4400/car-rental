import mongoose from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongo DB");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectToDB;