import { Router } from "express";
import { uploadLeadDocuments } from "../middleware/LeadsUploads";
import { createLead, getAllLeads, updateLeadByEmail, updateLeadsubCategory, searchLeads } from "../controllers/LeadsController";
import { validateLead } from "../middleware/validateLeads";
import { checkLeadExists } from "../middleware/checkLeadExists";

const leadsRouter = Router();

leadsRouter.post("/create", uploadLeadDocuments, validateLead, checkLeadExists, createLead);
leadsRouter.get("/getAllLeads", getAllLeads);
leadsRouter.put("/UpdateLeadByEmail", uploadLeadDocuments, updateLeadByEmail);



leadsRouter.post("/searchLeads", searchLeads);



leadsRouter.post("/updateLeadsubCategory", updateLeadsubCategory);


export default leadsRouter;