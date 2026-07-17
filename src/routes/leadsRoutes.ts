import { Router } from "express";
import { uploadLeadDocuments } from "../middleware/LeadsUploads";
import { createLead } from "../controllers/LeadsController";
import { validateLead } from "../middleware/validateLeads";
import { checkLeadExists } from "../middleware/checkLeadExists";

const leadsRouter = Router();

leadsRouter.post("/create", uploadLeadDocuments, validateLead, checkLeadExists, createLead);

export default leadsRouter;