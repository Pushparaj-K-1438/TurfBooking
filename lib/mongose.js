import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MongoURL)
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error in DB connection",error);
    }
}


export default connectDB;