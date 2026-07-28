import { Router } from "express";
import {
  createDesignation,
  getAllDesignations,
  updateDesignation,
  deleteDesignation,
} from "../controllers/DesignationController";

const router = Router();

router.post("/createDesignation", createDesignation);
router.get("/getAllDesignations", getAllDesignations);
router.put("/updateDesignation", updateDesignation);
router.delete("/deleteDesignation", deleteDesignation);

export default router;