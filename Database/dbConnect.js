
import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()
 const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL); 
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
export default dbConnect
