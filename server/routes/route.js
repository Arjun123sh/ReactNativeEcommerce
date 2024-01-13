import {createCategory,GetAllCategories,GetById,UpdateCategory,DeleteCategoryById} from "../controllers/Category.controller.js";
import {CreateUser,LoginUser} from "../controllers/Auth.controller.js"
import express from "express";

const router = express.Router();


router.post("/createCategory",createCategory)
      .get("/GetAllCategories",GetAllCategories)
      .post("/UpDateCategoryById",UpdateCategory)
      .get("GetCategoryById",GetById)
      .delete("/deleteCategory ",DeleteCategoryById)
    
router.post("/SignIn",CreateUser)
      .post("/Login",LoginUser);

const route=router;
export default route;