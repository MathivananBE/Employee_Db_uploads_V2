import { Router } from "express";
import { uploadLeadDocuments } from "../middleware/LeadsUploads";
import { createLead, getAllLeads, updateLeadByEmail, deleteLeadByEmail,getLeadsByProject,getLeadsByLocation,getLeadsByConfiguration,getLeadsByPropertyType } from "../controllers/LeadsController";
import { validateLead } from "../middleware/validateLeads";
import { checkLeadExists } from "../middleware/checkLeadExists";

const leadsRouter = Router();

leadsRouter.post("/create", uploadLeadDocuments, validateLead, checkLeadExists, createLead);
leadsRouter.get("/getAllLeads", getAllLeads);
leadsRouter.put("/UpdateLeadByEmail", uploadLeadDocuments, updateLeadByEmail);
leadsRouter.delete("/deleteLeadByEmail", deleteLeadByEmail);



leadsRouter.post("/getLeadsByProject", getLeadsByProject);
leadsRouter.post("/getLeadsByLocation", getLeadsByLocation);
leadsRouter.post("/getLeadsByConfiguration", getLeadsByConfiguration);
leadsRouter.post("/getLeadsByPropertyType", getLeadsByPropertyType);

export default leadsRouter;