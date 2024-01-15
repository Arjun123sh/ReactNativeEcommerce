import { Schema } from "mongoose";
import mongoose from "mongoose";

const CartSchema=new Schema({
    User:{
        type:Schema.Types.ObjectId,  
        ref:"Users",
    },
    products:{
        type: [
            {
              productId: {
                type: Schema.Types.ObjectId,
                ref: "Products",
              },
              quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity can not be less then 1."],
                default: 1,
              },
            },
          ],
        default: [],
    }
});

export const Cart=mongoose.model("Cart",CartSchema);