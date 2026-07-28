import { Router } from "express";
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/DepartmentController";

const router = Router();

router.post("/createDepartment", createDepartment);
router.get("/getAllDepartments", getAllDepartments);
router.put("/updateDepartment", updateDepartment);
router.delete("/deleteDepartment", deleteDepartment);

export default router;