import mongoose from "mongoose";
import { Category } from "../models/Category.js";
import { Products } from "../models/Products.js";

const createCategory = async (req, res) => {
    console.log("Inside Controller");
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(500).json({
                success: false,
                message: "Category Name is Required",
            });
        }

        const existingCategory = await Category.aggregate([
            {
                $match: {
                    categoryName: name,
                },
            },
        ]);

        if (existingCategory.length > 0) {
            return res.status(500).json({
                success: false,
                message: "Category Already Existed",
            });
        } else {
            const response = await Category.create({
                categoryName: name,
            });

            console.log("Category is ", response);

            return res.status(200).json({
                success: true,
                message: "Category Added",
            });
        }
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const GetAllCategories = async (req, res) => {
    try {
        const response = await Category.aggregate([
            {
                $match: {}
            }
        ])
        console.log("Categories are ", response);

        return res.status(200).json({
            success: true,
            data: response
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const GetById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) throw new Error('Invalid Request');
        const response = await Category.findById(new mongoose.Types.ObjectId(categoryId));
        return res.status(200).json({
            success: true,
            response,
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const UpdateCategory = async (req, res) => {
    try {
        const { id, newCategoryName } = req.body;
        const response=await Category.updateOne(
            { _id:new mongoose.Types.ObjectId(id) },
            { $set: { categoryName: newCategoryName } }
        );
        console.log("Response is ", response);
        return res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const DeleteCategoryById=async(req,res)=>{
    try{
        const id=req.params.id;
        await Category.findByIdAndDelete(new mongoose.Types.ObjectId(id));
        return res.status(200).json({
            success:true
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

export {
    createCategory,
    GetAllCategories,
    GetById,
    UpdateCategory,
    DeleteCategoryById,
};
