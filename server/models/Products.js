import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { Schema } from "mongoose";
import { Category } from "./Category.js";

const ProductSchemma=new mongoose.Schema({
    category:{
        ref:"Category",
        type:Schema.Types.ObjectId,
    },
    name:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    ImageUrl:{
        type:String,
        required:true,
    },
    price:{
        default:0,
        type:Number,
        required:true,
    },
    stock:{
        default:0,
        type:Number,
        required:true,
    },
},
{timestamps:true},
)

ProductSchemma.plugin(mongooseAggregatePaginate);
export const Products=mongoose.model("Products",ProductSchemma);