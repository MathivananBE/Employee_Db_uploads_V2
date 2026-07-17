import { NextFunction, Request, Response } from "express";
import AppDataSource from "../config/dataSource";
import Leads from "../entities/Leads";

const leadRepository = AppDataSource.getRepository(Leads);

export const checkLeadExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const existing = await leadRepository.findOne({ where: { email } });

    if (existing) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
