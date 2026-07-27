import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { LeadSource } from "../entities/LeadSource";


const leadSourceRepo = AppDataSource.getRepository(LeadSource);

// =========================
// CREATE LEAD SOURCE
// =========================
export const createLeadSource = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const exists = await leadSourceRepo.findOne({
      where: { name },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Lead source already exists",
      });
    }

    const leadSource = leadSourceRepo.create({
      name,
      description,
    });

    await leadSourceRepo.save(leadSource);

    return res.status(201).json({
      success: true,
      data: leadSource,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// GET ALL LEAD SOURCES
// =========================
export const getAllLeadSources = async (req: Request, res: Response) => {
  try {
    const leadSources = await leadSourceRepo.find({
      order: {
        createdAt: "DESC",
      },
    });

    return res.json({
      success: true,
      data: leadSources,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// UPDATE LEAD SOURCE
// =========================
export const updateLeadSource = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const { name, description, status } = req.body;

    const leadSource = await leadSourceRepo.findOne({
      where: { id },
    });

    if (!leadSource) {
      return res.status(404).json({
        success: false,
        message: "Lead source not found",
      });
    }

    if (name) {
      const exists = await leadSourceRepo.findOne({
        where: { name },
      });

      if (exists && exists.id !== id) {
        return res.status(400).json({
          success: false,
          message: "Lead source already exists",
        });
      }

      leadSource.name = name;
    }

    if (description !== undefined) {
      leadSource.description = description;
    }

    if (status !== undefined) {
      leadSource.status = status;
    }

    await leadSourceRepo.save(leadSource);

    return res.status(200).json({
      success: true,
      message: "Lead source updated successfully",
      data: leadSource,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// DELETE LEAD SOURCE
// =========================
export const deleteLeadSource = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const leadSource = await leadSourceRepo.findOne({
      where: { id },
    });

    if (!leadSource) {
      return res.status(404).json({
        success: false,
        message: "Lead source not found",
      });
    }

    await leadSourceRepo.remove(leadSource);

    return res.status(200).json({
      success: true,
      message: "Lead source deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};