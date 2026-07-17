import { NextFunction, Request, Response } from "express";
import AppDataSource from "../config/dataSource";
import Leads from "../entities/Leads";

const leadRepository = AppDataSource.getRepository(Leads);

export const checkLeadExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, countryCode, phoneNumber } = req.body;

    const existing = await leadRepository.findOne({
      where: [
        { email },
        { countryCode, phoneNumber },
      ],
    });

    if (existing) {
      if (existing.email === email) {
        return res.status(409).json({ success: false, message: "Email already exists" });
      }
      if (existing.countryCode === countryCode && existing.phoneNumber === phoneNumber) {
        return res.status(409).json({ success: false, message: "Phone number already exists" });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};