import { Router } from "express";
import { uploadLeadDocuments } from "../middleware/LeadsUploads";
import { createLead, getAllLeads, updateLeadById, updateLeadsubCategory, searchLeads } from "../controllers/LeadsController";
import { validateLead } from "../middleware/validateLeads";
import { checkLeadExists } from "../middleware/checkLeadExists";

const leadsRouter = Router();

leadsRouter.post("/create", uploadLeadDocuments, validateLead, checkLeadExists, createLead);
leadsRouter.get("/getAllLeads", getAllLeads);
leadsRouter.put("/UpdateLeadById", uploadLeadDocuments, updateLeadById);



leadsRouter.post("/searchLeads", searchLeads);



leadsRouter.post("/updateLeadsubCategory", updateLeadsubCategory);


export default leadsRouter;