import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  updateEmployeeSalaryById,
  getEmployeesByDepartment,
  getEmployeesByDesignation
} from "../controllers/employeeController";

import { validateEmployee } from "../middleware/validateEmployee";
import { checkEmployeeExists } from "../middleware/checkEmployeeExists";
import { uploadEmployeeDocuments } from "../config/upload";

const router = Router();

router.post("/create", uploadEmployeeDocuments, validateEmployee, checkEmployeeExists, createEmployee);
router.get("/getAllEmployees", getAllEmployees);
router.post("/getEmployeeById", getEmployeeById);
router.put("/updateEmployeeById", uploadEmployeeDocuments, updateEmployeeById);
router.delete("/deleteEmployeeById", deleteEmployeeById);
router.patch("/updateEmployeeSalaryById", updateEmployeeSalaryById);

router.post("/getEmployeesByDepartment", getEmployeesByDepartment);
router.post("/getEmployeesByDesignation", getEmployeesByDesignation);


// router.get("/getEmployeesByDepartment",getEmployeesByDepartment);
// router.get("/getEmployeesByDesignation",getEmployeesByDesignation);


export default router;