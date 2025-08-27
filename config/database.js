import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}
export default connectDb;