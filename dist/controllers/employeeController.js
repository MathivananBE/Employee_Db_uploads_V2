"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesByDesignation = exports.getEmployeesByDepartment = exports.updateEmployeeSalaryById = exports.deleteEmployeeById = exports.updateEmployeeById = exports.getEmployeeById = exports.getAllEmployees = exports.createEmployee = void 0;
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../config/dataSource");
const Employee_1 = require("../entities/Employee");
const upload_1 = require("../config/upload");
const bcrypt_1 = __importDefault(require("bcrypt"));
const employeeRepository = dataSource_1.AppDataSource.getRepository(Employee_1.EmployeesDetails);
// Small reusable helper to avoid repeating error-handling logic everywhere
const handleError = (res, error, fallbackMessage) => {
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
const createEmployee = async (req, res) => {
    try {
        // Get uploaded file paths (e.g. resume, marksheets, ID docs)
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
        const uploadedFiles = req.files;
        const documentPaths = (0, upload_1.saveUploadedFiles)(uploadedFiles, req.body.empNo);
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
    }
    catch (error) {
        handleError(res, error, "Error creating employee");
    }
};
exports.createEmployee = createEmployee;
// Get All Employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeRepository.find();
        console.log(`Fetched ${employees.length} employees`);
        res.status(200).json({ success: true, count: employees.length, data: employees });
    }
    catch (error) {
        handleError(res, error, "Error fetching employees");
    }
};
exports.getAllEmployees = getAllEmployees;
// Get Employee by empNo
const getEmployeeById = async (req, res) => {
    try {
        const empNo = req.body.empNo;
        const employee = await employeeRepository.findOne({ where: { empNo } });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        console.log(`Fetched employee with empNo: ${empNo}`);
        return res.status(200).json({ success: true, data: employee });
    }
    catch (error) {
        return handleError(res, error, "Error fetching employee");
    }
};
exports.getEmployeeById = getEmployeeById;
// Update Employee by empNo
const updateEmployeeById = async (req, res) => {
    try {
        const empNo = req.body.empNo;
        const employee = await employeeRepository.findOne({ where: { empNo } });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        employeeRepository.merge(employee, req.body);
        const documentPaths = (0, upload_1.saveUploadedFiles)(req.files, empNo);
        employeeRepository.merge(employee, documentPaths);
        const updatedEmployee = await employeeRepository.save(employee);
        console.log("Employee updated successfully:", updatedEmployee);
        return res.status(200).json({ success: true, message: "Employee updated successfully", data: updatedEmployee });
    }
    catch (error) {
        return handleError(res, error, "Error updating employee");
    }
};
exports.updateEmployeeById = updateEmployeeById;
// Delete Employee by empNo
const deleteEmployeeById = async (req, res) => {
    try {
        const empNo = req.body.empNo;
        const employee = await employeeRepository.findOne({ where: { empNo } });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        await employeeRepository.remove(employee);
        console.log(`Deleting employee with empNo: ${empNo}`);
        return res.status(200).json({ success: true, message: "Employee deleted successfully" });
    }
    catch (error) {
        return handleError(res, error, "Error deleting employee");
    }
};
exports.deleteEmployeeById = deleteEmployeeById;
// Update Employee Salary by empNo
const updateEmployeeSalaryById = async (req, res) => {
    try {
        const empNo = req.body.empNo;
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
    }
    catch (error) {
        return handleError(res, error, "Error updating salary");
    }
};
exports.updateEmployeeSalaryById = updateEmployeeSalaryById;
// Get Employees by Department
const getEmployeesByDepartment = async (req, res) => {
    try {
        const department = req.body.department;
        const employees = await employeeRepository.find({
            where: { department: (0, typeorm_1.ILike)(department) },
        });
        if (employees.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No employees found in ${department} department.`,
            });
        }
        console.log(`Fetched ${employees.length} employees in ${department} department.`);
        return res.status(200).json({ success: true, count: employees.length, data: employees });
    }
    catch (error) {
        return handleError(res, error, "Error fetching employees by department");
    }
};
exports.getEmployeesByDepartment = getEmployeesByDepartment;
// Get Employees by Designation
const getEmployeesByDesignation = async (req, res) => {
    try {
        const designation = req.body.designation;
        const employees = await employeeRepository.find({
            where: { designation: (0, typeorm_1.ILike)(designation) },
        });
        if (employees.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No employees found with designation '${designation}'.`,
            });
        }
        console.log(`Fetched ${employees.length} employees with designation '${designation}'.`);
        return res.status(200).json({ success: true, count: employees.length, data: employees });
    }
    catch (error) {
        return handleError(res, error, "Error fetching employees by designation");
    }
};
exports.getEmployeesByDesignation = getEmployeesByDesignation;
