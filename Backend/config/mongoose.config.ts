
import mongoose from 'mongoose';

const connectToDataBase =  async() : Promise<void> => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in the environment variables");
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo db connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDataBase;