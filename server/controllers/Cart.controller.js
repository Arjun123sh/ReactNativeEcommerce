import { Users } from "../models/Users.js";
import { Cart } from "../models/Cart.js";
import { Products } from "../models/Products.js";
import mongoose from "mongoose";

const clearCart=async(req,res)=>{
    try{
        const id=req.user.id;
        const response=await Cart.deleteOne({User:new mongoose.Types.ObjectId(id)});
        if(response){
            return res.status(200).json({
                success:false,
                message:err.message,
            })
        }
    }
    catch(err){
        return res.status(500).jspn({
            success:false,
            message:err.message,
        })
    }
}

export{
    clearCart,
}