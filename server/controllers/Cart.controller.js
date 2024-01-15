import { Users } from "../models/Users.js";
import { Cart } from "../models/Cart.js";
import { Products } from "../models/Products.js";
import mongoose from "mongoose";

const clearCart = async (req, res) => {
    try {
        const id = req.user.id;
        const response = await Cart.deleteOne({ User: new mongoose.Types.ObjectId(id) });
        if (response) {
            return res.status(200).json({
                success: false,
                message: err.message,
            })
        }
    }
    catch (err) {
        return res.status(500).jspn({
            success: false,
            message: err.message,
        })
    }
}

const AddItemToCart = async (req, res) => {
    try {
        const { cartId, productId, quantity } = req.body;

        const FirstItem = await Cart.findById(new mongoose.Types.ObjectId(cartId));
        if (!FirstItem) {
            const response = await Cart.create({
                User: req.user.id,
            })
            response.products.push({
                productId: productId,
                quantity: quantity
            })
            response.save();
            return res.status(200).json({
                success:true,
                message:"Product Added To cart",
            })
        }
        else {
            const UpdatedCart = await Cart.updateOne(
                {
                    _id: cartId,
                },
                {
                    $push: {
                        products: {
                            productId: productId,
                            quantity: quantity,
                        }
                    }
                },
                { new: true }
            );
            console.log("Updated Cart is ", UpdatedCart);
            return res.status(200).json({
                success: true,
                data: UpdatedCart,
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const removeItemfromCart = async (req, res) => {
    try {
        const productId = req.params.productId;

        const productExisted = await Products.findById(new mongoose.Types.ObjectId(productId));

        if (!productExisted) {
            return res.status(404).json({
                success: false,
                message: "Invalid request ",
            })
        }

        const updatedCart = await Cart.updateOne(
            { User: new mongoose.Types.ObjectId(req.user.id) },
            {
                $pull: {
                    products: {
                        productId: productId
                    }
                }
            }, { new: true },
        )
        console.log("Updated cart", updatedCart);
        return res.status(200).json({
            success: true,
            data: updatedCart,
        })
    }
    catch (err) {
        return res.status(500).jspn({
            success: false,
            message: err.message,
        })
    }
}

const getCartItems = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.user.id);
        const cartId = req.params.id;
        const cartExists = await Cart.findById(new mongoose.Types.ObjectId(cartId));

        if (!cartExists) {
            return res.status(404).json({
                success: false,
            })
        }

        const response = await Cart.aggregate([
            {
                $match: {
                    User: id,
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "Product"
                }
            },
        ])
    }
    catch (err) {
        return res.status(500).jspn({
            success: false,
            message: err.message,
        })
    }
}

export {
    clearCart,
    removeItemfromCart,
    AddItemToCart,
    getCartItems,
}