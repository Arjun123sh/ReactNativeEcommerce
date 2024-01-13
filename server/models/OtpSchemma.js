import mongoose, { Schema } from "mongoose";

const OtpSchemma=new Schema({
    phoneNumber:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

export const OtpSchema=mongoose.model("OtpSchemma",OtpSchemma);