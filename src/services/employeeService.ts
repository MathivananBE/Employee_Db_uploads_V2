/*

import { AppDataSource } from "../config/dataSource";
import { EmployeesDetails } from "../entities/Employee";
import { ILike } from "typeorm";

const employeeRepository = AppDataSource.getRepository(EmployeesDetails);

export const createEmployee = async (data: Partial<EmployeesDetails>) => {
    const employee = employeeRepository.create(data);
    return await employeeRepository.save(employee);
};

export const getAllEmployees = async () => {
    return await employeeRepository.find();
};

export const getEmployeeById = async (empNo: number) => {
    return await employeeRepository.findOne({
        where: { empNo }
    });
};

export const updateEmployeeById = async (empNo: number,data: Partial<Employee>) => {
    const employee = await employeeRepository.findOne({
        where: { empNo }
    });

    if (!employee) return null;

    employeeRepository.merge(employee, data);

    return await employeeRepository.save(employee);
};

export const deleteEmployeeById = async (empNo: number) => {
    const employee = await employeeRepository.findOne({
        where: { empNo }
    });

    if (!employee) return false;

    await employeeRepository.remove(employee);

    return true;
};

export const updateEmployeeSalary = async (empNo: number,salary: number) => {
    const employee = await employeeRepository.findOne({
        where: { empNo }
    });

    if (!employee) return null;

    employee.salary = salary;

    return await employeeRepository.save(employee);
};

export const getEmployeesByDepartment = async (department: string) => {
    return await employeeRepository.find({
        where: {
            department: ILike(department)
        }
    });
};

export const getEmployeesByDesignation = async (designation: string) => {
    return await employeeRepository.find({
        where: {
            designation: ILike(designation)
        }
    });
};


*/