import { Request, Response } from "express";
import AppDataSource from "../config/dataSource";
import Leads from "../entities/Leads";
import { saveLeadFiles } from "../config/leadsConfig";

const leadRepository = AppDataSource.getRepository(Leads);

export const createLead = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // Buffers are only written to disk here, after validateLead + checkLeadExists have passed.
    const documentPaths = saveLeadFiles(files, req.body.phoneNumber);

    const lead = leadRepository.create({
      ...req.body,
      ...documentPaths,
    });

    const savedLead = await leadRepository.save(lead);

    res.status(201).json({
      success: true,
      data: savedLead,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }
    console.error("Create Lead Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};
