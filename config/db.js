import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DBURL = process.env.DBURL
//mongodb://localhost:27017
const connectTomongo = async()=>{
    try {
        const res = await mongoose.connect(DBURL);
     if(res){
        console.log("DataBase connected successfully");
     }
    } catch (error) {
        console.log("error connecting to db",error);
    }
     
};                                     

export default connectTomongo;