import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {constants} from "../constants.js";

const ConnectToDb = async() => {
    await mongoose.connect(constants.DATBASE_URL,{

    }).then(()=>{
        console.log("Database Is Connected Successfully")
    }).catch((err)=>{
        console.error(err);
        console.log("Error While Connecting To Database ",err)
        process.exit(-1);
    })
}

export default ConnectToDb