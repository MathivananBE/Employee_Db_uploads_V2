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
router.get("/getEmployeeById/:empNo", getEmployeeById);
router.put("/updateEmployeeById/:empNo", uploadEmployeeDocuments, updateEmployeeById);
router.delete("/deleteEmployeeById/:empNo", deleteEmployeeById);
router.patch("/updateEmployeeSalaryById/:empNo", updateEmployeeSalaryById);

router.get("/getEmployeesByDepartment/:department", getEmployeesByDepartment);
router.get("/getEmployeesByDesignation/:designation", getEmployeesByDesignation);


// router.get("/getEmployeesByDepartment",getEmployeesByDepartment);
// router.get("/getEmployeesByDesignation",getEmployeesByDesignation);


export default router;