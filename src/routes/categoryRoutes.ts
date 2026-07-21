import { Router } from "express";
import {createCategory,getAllCategories,updateCategory,deleteCategory} from "../controllers/categoryController";
import {createSubCategory,getSubCategories,updateSubCategory,deleteSubCategory} from "../controllers/SubCategory";

const router = Router();



router.post("/createCategory", createCategory);

router.get("/getAllCategories", getAllCategories);

router.post("/createSubCategory", createSubCategory);

router.post("/getSubCategories", getSubCategories);

router.put("/updateCategory", updateCategory);
router.delete("/deleteCategory", deleteCategory);

router.put("/updateSubCategory", updateSubCategory);
router.delete("/deleteSubCategory", deleteSubCategory);



export default router;