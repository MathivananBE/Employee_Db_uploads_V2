import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Project } from "../entities/Project";

const projectRepo = AppDataSource.getRepository(Project);

// =========================
// CREATE PROJECT
// =========================
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const exists = await projectRepo.findOne({
      where: { name },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Project already exists",
      });
    }

    const project = projectRepo.create({
      name,
      description,
    });

    await projectRepo.save(project);

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// GET ALL PROJECTS
// =========================
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectRepo.find({
      order: {
        createdAt: "DESC",
      },
    });

    return res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// UPDATE PROJECT
// =========================
export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const { name, description, status } = req.body;

    const project = await projectRepo.findOne({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (name) {
      const exists = await projectRepo.findOne({
        where: { name },
      });

      if (exists && exists.id !== id) {
        return res.status(400).json({
          success: false,
          message: "Project already exists",
        });
      }

      project.name = name;
    }

    if (description !== undefined) {
      project.description = description;
    }

    if (status !== undefined) {
      project.status = status;
    }

    await projectRepo.save(project);

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// DELETE PROJECT
// =========================
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const project = await projectRepo.findOne({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await projectRepo.remove(project);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};