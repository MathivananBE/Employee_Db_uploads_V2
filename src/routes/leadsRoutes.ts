import { Router } from "express";
import { uploadLeadDocuments } from "../middleware/LeadsUploads";
import { createLead, getAllLeads, updateLeadByEmail, getLeadsByProject, getLeadsByLocation, getLeadsByConfiguration, getLeadsByPropertyType, updateLeadsubCategory, searchLeads } from "../controllers/LeadsController";
import { validateLead } from "../middleware/validateLeads";
import { checkLeadExists } from "../middleware/checkLeadExists";

const leadsRouter = Router();

leadsRouter.post("/create", uploadLeadDocuments, validateLead, checkLeadExists, createLead);
leadsRouter.get("/getAllLeads", getAllLeads);
leadsRouter.put("/UpdateLeadByEmail", uploadLeadDocuments, updateLeadByEmail);



leadsRouter.post("/getLeadsByProject", getLeadsByProject);
leadsRouter.post("/getLeadsByLocation", getLeadsByLocation);
leadsRouter.post("/getLeadsByConfiguration", getLeadsByConfiguration);
leadsRouter.post("/getLeadsByPropertyType", getLeadsByPropertyType);



leadsRouter.post("/searchLeads", searchLeads);



leadsRouter.post("/updateLeadsubCategory", updateLeadsubCategory);


export default leadsRouter;