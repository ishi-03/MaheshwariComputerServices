import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("successfully connected")

    } catch(error){
        console.log(`ERROR: ${error?.message || "Something went wrong"
 || "Something went wrong"
}`)
        process.exit(1)
    }
} 

export default connectDB;