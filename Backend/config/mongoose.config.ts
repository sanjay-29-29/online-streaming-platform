import mongoose from 'mongoose';

const mongoUrl =  `mongodb+srv://sathiyaseelan0712:8bqDvkXlGeyg0C8d@cluster0.ol4kf5m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDataBase = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }
};

export default connectToDataBase;
