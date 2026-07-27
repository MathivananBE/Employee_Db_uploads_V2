import { Router } from "express";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../controllers/ProjectController";

const router = Router();

router.post("/createProject", createProject);
router.get("/getAllProjects", getAllProjects);
router.put("/updateProject", updateProject);
router.delete("/deleteProject", deleteProject);

export default router;