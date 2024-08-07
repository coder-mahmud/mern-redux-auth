import mongoose from "mongoose";

const connectDB = async() =>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected!")
  }catch(err){
    console.log(`DB could not be connected! - ${err.message}`)
  }
}


export default connectDB;