import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Designation } from "../entities/Designation";

const designationRepo = AppDataSource.getRepository(Designation);

export const createDesignation = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const exists = await designationRepo.findOne({ where: { name } });
    if (exists) {
      return res.status(400).json({ success: false, message: "Designation already exists" });
    }

    const designation = designationRepo.create({ name });
    await designationRepo.save(designation);

    return res.status(201).json({ success: true, data: designation });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllDesignations = async (req: Request, res: Response) => {
  try {
    const designations = await designationRepo.find({ order: { createdAt: "DESC" } });
    return res.json({ success: true, data: designations });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateDesignation = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const { name, status } = req.body;

    const designation = await designationRepo.findOne({ where: { id } });
    if (!designation) {
      return res.status(404).json({ success: false, message: "Designation not found" });
    }

    if (name) {
      const exists = await designationRepo.findOne({ where: { name } });
      if (exists && exists.id !== id) {
        return res.status(400).json({ success: false, message: "Designation already exists" });
      }
      designation.name = name;
    }

    if (status !== undefined) {
      designation.status = status;
    }

    await designationRepo.save(designation);

    return res.status(200).json({ success: true, message: "Designation updated successfully", data: designation });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteDesignation = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const designation = await designationRepo.findOne({ where: { id } });
    if (!designation) {
      return res.status(404).json({ success: false, message: "Designation not found" });
    }

    await designationRepo.remove(designation);

    return res.status(200).json({ success: true, message: "Designation deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};