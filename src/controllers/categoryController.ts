import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Category } from "../entities/categories";

const categoryRepo = AppDataSource.getRepository(Category);


// =========================
// CREATE CATEGORY
// =========================
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const exists = await categoryRepo.findOne({
      where: { name },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = categoryRepo.create({
      name,
      description,
    });

    await categoryRepo.save(category);

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// GET ALL CATEGORIES
// =========================
export const getAllCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await categoryRepo.find({
      order: {
        createdAt: "DESC",
      },
    });

    return res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


//=============================================updateCategory=======================================


export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id  = req.body.id;
    const { name, description, status } = req.body;

    const category = await categoryRepo.findOne({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check duplicate name
    if (name) {
      const exists = await categoryRepo.findOne({
        where: { name },
      });

      if (exists && exists.id !== id) {
        return res.status(400).json({
          success: false,
          message: "Category already exists",
        });
      }

      category.name = name;
    }

    if (description !== undefined) {
      category.description = description;
    }

    if (status !== undefined) {
      category.status = status;
    }

    await categoryRepo.save(category);

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};




//===============================deleteCategory====================================


export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const  id  = req.body.id;

    const category = await categoryRepo.findOne({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await categoryRepo.remove(category);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};