"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmployeeExists = void 0;
const dataSource_1 = require("../config/dataSource");
const Employee_1 = require("../entities/Employee");
const employeeRepository = dataSource_1.AppDataSource.getRepository(Employee_1.EmployeesDetails);
const checkEmployeeExists = async (req, res, next) => {
    try {
        const { empNo, email, phone } = req.body;
        const existing = await employeeRepository.findOne({
            where: [{ empNo }, { email }, { phone }],
        });
        if (existing) {
            if (existing.empNo === empNo) {
                return res.status(409).json({ success: false, message: "Employee number already exists" });
            }
            if (existing.email === email) {
                return res.status(409).json({ success: false, message: "Email already exists" });
            }
            if (existing.phone === phone) {
                return res.status(409).json({ success: false, message: "Phone number already exists" });
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkEmployeeExists = checkEmployeeExists;
/*

import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { EmployeesDetails } from "../entities/Employee";

const employeeRepository = AppDataSource.getRepository(EmployeesDetails);

export const checkEmployeeExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { empNo, email, phone } = req.body;

    const existing = await employeeRepository
      .createQueryBuilder("emp")
      .where("emp.empNo = :empNo", { empNo })
      .orWhere("emp.email = :email", { email })
      .orWhere("emp.phone = :phone", { phone })
      .getOne();

    if (existing) {
      if (existing.empNo === empNo) {
        return res.status(409).json({ success: false, message: "Employee number already exists" });
      }
      if (existing.email === email) {
        return res.status(409).json({ success: false, message: "Email already exists" });
      }
      if (existing.phone === phone) {
        return res.status(409).json({ success: false, message: "Phone number already exists" });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
*/ 
