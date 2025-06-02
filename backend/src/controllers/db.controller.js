import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB=async ()=>{
    try{
        const connection = await mongoose.connect(`${process.env.DB_URL}`);
        console.log("DB is connected:",connection.connection.name);
        if(!connection){
            throw new Error("Database not valid.")
        }
        return connection;
    }catch(error){
        console.log("Error in connecting to Database:",error);
    }
}

export default connectDB;