import { Request, Response } from "express";
import { ILike } from "typeorm";
import { AppDataSource } from "../config/dataSource";
import { EmployeesDetails } from "../entities/Employee";
import { saveUploadedFiles } from "../config/upload";

import bcrypt from "bcrypt";

const employeeRepository = AppDataSource.getRepository(EmployeesDetails);

// Small reusable helper to avoid repeating error-handling logic everywhere
const handleError = (res: Response, error: any, fallbackMessage: string) => {
  if (error.code === "23505") {
    const detail = error.detail || "";
    if (detail.includes("email")) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }
    if (detail.includes("phone")) {
      return res.status(409).json({ success: false, message: "Phone number already exists" });
    }
    if (detail.includes("emp_no")) {
      return res.status(409).json({ success: false, message: "Employee number already exists" });
    }
    return res.status(409).json({ success: false, message: "Duplicate value already exists" });
  }

  console.error(error);
  return res.status(500).json({ success: false, message: fallbackMessage });
};

// Create Employee
 export const  createEmployee = async (req: Request, res: Response) => {
  try {
    // Get uploaded file paths (e.g. resume, marksheets, ID docs)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const uploadedFiles = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const documentPaths = saveUploadedFiles(uploadedFiles, req.body.empNo);

    // Merge form data with file paths
    const employeeData = {
      ...req.body,
      ...documentPaths,
      password: hashedPassword
    };

    // Create and save the new employee record
    const newEmployee = employeeRepository.create(employeeData);
    const savedEmployee = await employeeRepository.save(newEmployee);

    console.log("Employee created successfully:", savedEmployee);
    res.status(201).json({
      success: true,
      data: savedEmployee,
    });
  } catch (error) {
    handleError(res, error, "Error creating employee");
  }
};

// Get All Employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeeRepository.find();
    console.log(`Fetched ${employees.length} employees`);
    res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    handleError(res, error, "Error fetching employees");
  }
};

// Get Employee by empNo
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const  empNo  = req.body.empNo;

    const employee = await employeeRepository.findOne({ where: { empNo } });

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    console.log(`Fetched employee with empNo: ${empNo}`);
    return res.status(200).json({ success: true, data: employee });
  } catch (error) {
    return handleError(res, error, "Error fetching employee");
  }
};

// Update Employee by empNo
export const updateEmployeeById = async (req: Request, res: Response) => {
  try {
    const  empNo  = req.body.empNo;

    const employee = await employeeRepository.findOne({ where: { empNo } });

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    employeeRepository.merge(employee, req.body);

    const documentPaths = saveUploadedFiles(
      req.files as { [fieldname: string]: Express.Multer.File[] } | undefined,
      empNo
    );
    employeeRepository.merge(employee, documentPaths);

    const updatedEmployee = await employeeRepository.save(employee);

    console.log("Employee updated successfully:", updatedEmployee);

    return res.status(200).json({ success: true, message: "Employee updated successfully", data: updatedEmployee });
  } catch (error) {
    return handleError(res, error, "Error updating employee");
  }
};

// Update Employee Salary by empNo
export const updateEmployeeSalaryById = async (req: Request, res: Response) => {
  try {
    const  empNo  = req.body.empNo;
    const { salary } = req.body;

    if (salary === undefined || salary === null) {
      return res.status(400).json({ success: false, message: "Salary is required" });
    }

    const employee = await employeeRepository.findOne({ where: { empNo } });

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    employee.salary = salary;
    const updatedEmployee = await employeeRepository.save(employee);

     console.log(`Updated salary for employee ${empNo} to ${salary}`);

    return res.status(200).json({ success: true, message: "Salary updated successfully", data: updatedEmployee });
  } catch (error) {
    return handleError(res, error, "Error updating salary");
  }
};

// Get Employees by Department
export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  try {
    const  department  = req.body.department;

    const employees = await employeeRepository.find({
      where: { department: ILike(department) },
    });

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No employees found in ${department} department.`,
      });
    }

    console.log(`Fetched ${employees.length} employees in ${department} department.`);

    return res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    return handleError(res, error, "Error fetching employees by department");
  }
};

// Get Employees by Designation
export const getEmployeesByDesignation = async (req: Request, res: Response) => {
  try {
    const  designation  = req.body.designation;

    const employees = await employeeRepository.find({
      where: { designation: ILike(designation) },
    });

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No employees found with designation '${designation}'.`,
      });
    }

     console.log(`Fetched ${employees.length} employees with designation '${designation}'.`);
     
    return res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    return handleError(res, error, "Error fetching employees by designation");
  }
};