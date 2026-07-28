import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Department } from "../entities/Department";

const departmentRepo = AppDataSource.getRepository(Department);

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const exists = await departmentRepo.findOne({ where: { name } });
    if (exists) {
      return res.status(400).json({ success: false, message: "Department already exists" });
    }

    const department = departmentRepo.create({ name });
    await departmentRepo.save(department);

    return res.status(201).json({ success: true, data: department });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await departmentRepo.find({ order: { createdAt: "DESC" } });
    return res.json({ success: true, data: departments });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const { name, status } = req.body;

    const department = await departmentRepo.findOne({ where: { id } });
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    if (name) {
      const exists = await departmentRepo.findOne({ where: { name } });
      if (exists && exists.id !== id) {
        return res.status(400).json({ success: false, message: "Department already exists" });
      }
      department.name = name;
    }

    if (status !== undefined) {
      department.status = status;
    }

    await departmentRepo.save(department);

    return res.status(200).json({ success: true, message: "Department updated successfully", data: department });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const department = await departmentRepo.findOne({ where: { id } });
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    await departmentRepo.remove(department);

    return res.status(200).json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};