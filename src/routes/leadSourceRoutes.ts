import { Router } from "express";
import {
  createLeadSource,
  getAllLeadSources,
  updateLeadSource,
  deleteLeadSource,
} from "../controllers/LeadSourceController";

const router = Router();

router.post("/createLeadSource", createLeadSource);
router.get("/getAllLeadSources", getAllLeadSources);
router.put("/updateLeadSource", updateLeadSource);
router.delete("/deleteLeadSource", deleteLeadSource);

export default router;