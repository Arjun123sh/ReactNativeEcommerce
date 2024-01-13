import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { Schema } from "mongoose";

const UserSchemma = new Schema({
    name:{
        type:String,
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim:true,
    },
    password:{
        type: String,
        required: [true,"Password is required"],
    },
    phoneNumber:{
        type:String,
        required:true,
        unique: true,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    itemPurchased:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
        }
    ],
});

UserSchemma.plugin(mongooseAggregatePaginate);
export const Users=mongoose.model("Users",UserSchemma);