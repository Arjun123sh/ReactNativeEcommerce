import {createCategory,GetAllCategories,GetById,UpdateCategory,DeleteCategoryById} from "../controllers/Category.controller.js";
import {CreateUser,LoginUser} from "../controllers/Auth.controller.js"
import { AddProduct,GetAllProducts,DeletePrduct,GetProductsByCategory,GetProductById,UpdateProducts } from "../controllers/Product.controller.js";
import {createAddress,UpdateAddress,getAddressById,DeleteAddress} from "../controllers/Address.controller.js"
import {verifyPayment,razorpayCheckout} from "../controllers/Payment.controller.js";
import {AddItemToCart,removeItemfromCart,clearCart,getCartItems} from "../controllers/Cart.controller.js";
import express from "express";

const router = express.Router();

router.post("/createCategory",createCategory)
      .get("/GetAllCategories",GetAllCategories)
      .post("/UpDateCategoryById",UpdateCategory)
      .get("GetCategoryById",GetById)
      .delete("/deleteCategory ",DeleteCategoryById)
    
router.post("/SignIn",CreateUser)
      .post("/Login",LoginUser);

router.post("/AddProduct",AddProduct)
      .get("/GetAllProducts",GetAllProducts)      
      .get("/GetProductsByCategory",GetProductsByCategory)
      .delete("/DeleteProduct",DeletePrduct)
      .get("/GetProductById",GetProductById)
      .put("/UpdateProduct",UpdateProducts);

router.post("/createAddress",createAddress)
      .get("/getAddressById",getAddressById)
      .put("/UpdateAddress",UpdateAddress)
      .delete("/DeleteAddress",DeleteAddress);

router.post("/capturePayment",razorpayCheckout)      
      .post("/verifyPayment",verifyPayment);

router.post("/AddItemToCart",AddItemToCart)
      .put("/removeItemFromCart",removeItemfromCart)
      .delete("/clearCart",clearCart)      
      .get("/GetCartItems",getCartItems);

const route=router;
export default route;