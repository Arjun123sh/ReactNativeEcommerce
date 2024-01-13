import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const categorySchemma = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        index:true,
    },
    Created_at: {
        type:Date,
        default:Date.now(),
    }
},
    { timestamps: true },
)

categorySchemma.plugin(mongooseAggregatePaginate);
export const Category=mongoose.model("Category", categorySchemma);