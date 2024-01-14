import { Products } from "../models/Products.js";
import { Category } from "../models/Category.js";
import mongoose from "mongoose";

const AddProduct=async(req,res)=>{
    try{
        const {name,category,description,price,stock}=req.body;
        const response=await Products.create({
            name,
            category:category,
            description,
            price,
            stock,
        })
        const categoryToBeAdded =await Category.findById(new mongoose.Types.ObjectId(category));
        
        if(!categoryToBeAdded){
            return res.status(404).json({
                success:false,
                message:"Category Not Present ",
            })
        }
        console.log("Added Product is ",response);
        return res.status(200).json({
            success:true,
            message:"New Product Added ",
        })
    }
    catch(err){
        console.log("Error in add product: "+ err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const GetAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const AllProducts = await Products.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                },
            },
            {
                $addFields: {
                    category: { $first: "$category" },
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
        ]);

        if (AllProducts.length > 0) {
            return res.status(200).json({
                success: true,
                AllProducts,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No Products Present",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const GetProductById=async(req,res)=>{
    try{
        const id=req.params.id;
        const response =await Products.findById(new mongoose.Types.ObjectId(id)).populate("category");
        return res.status(200).json({
            success:true,
            response,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const UpdateProducts=async(req,res)=>{
    try{
        const {id,name,category,description,price,stock}=req.body;
        const updateProduct=await Products.updateOne(
        {_id:new mongoose.Types.ObjectId(id)},
        {
            $set:{
                name,
                category,
                description,
                price,
                stock,
            }
        });
        console.log("Updated Product is ",updateProduct);
        return res.status(200).json({
            success:true,
            message:"Product Updated Successfully ",
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}


export{
    AddProduct,
    GetAllProducts,
    GetProductById,
    UpdateProducts,
}