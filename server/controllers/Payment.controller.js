import instance from "../config/razorpay.js";
import { Cart } from "../models/Cart.js";
import { Users } from "../models/Users.js";
import { Products } from "../models/Products.js";
import mongoose from "mongoose";
import crypto from "crypto";


const razorpayCheckout = async (req, res) => {
    const { products } = req.body;
    let total_amount = 0;

    for (const productId of products) {
        let item
        console.log(productId)
        try {
            item = await Products.findById(new mongoose.Types.ObjectId(productId));

            if (!item) {
                return res
                    .status(200)
                    .json({ success: false, message: "Could not find the Product" })
            }

            total_amount += course.price
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    const options = {
        amount: Number(total_amount * 100),
        currency: "INR",
    }
    try {
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Could not initiate order." })
    }
}

exports.verifyPayment = async (req, res) => {
    console.log(req.body)
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
  
    const userId = req.user.id
  
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }
  

export {
    razorpayCheckout,
}