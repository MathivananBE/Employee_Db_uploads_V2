import { Request, Response } from "express";
import AppDataSource from "../config/dataSource";
import { SubCategory } from "../entities/subCategory";
import { Category } from "../entities/categories";


const categoryRepo = AppDataSource.getRepository(Category);
const subCategoryRepo = AppDataSource.getRepository(SubCategory);




// =========================
// CREATE SUB CATEGORY
// =========================
export const createSubCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { categoryId, name } = req.body;

    const category = await categoryRepo.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const existingSubCategory = await subCategoryRepo.findOne({
      where: {
        categoryId,
        name,
      },
    });

    if (existingSubCategory) {
      return res.status(400).json({
        success: false,
        message: "Subcategory already exists for this category",
      });
    }

    const sub = subCategoryRepo.create({
      name,
      category,
      categoryId,
    });

    await subCategoryRepo.save(sub);

    return res.status(201).json({
      success: true,
      data: sub,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// GET SUB CATEGORIES
// =========================
export const getSubCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const  categoryId  = req.body.categoryId;

    const subCategories = await subCategoryRepo.find({
      where: {
        categoryId,
      },
      order: {
        name: "ASC",
      },
    });

    return res.json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



//==========================updateSubCategory===================================

export const updateSubCategory = async (req: Request,res: Response) => {
  try {
    const  id  = req.body.id;
    const { name, status } = req.body;

    const subCategory = await subCategoryRepo.findOne({
      where: { id },
    });

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found",
      });
    }

    if (name) {
      subCategory.name = name;
    }

    if (status !== undefined) {
      subCategory.status = status;
    }

    await subCategoryRepo.save(subCategory);

    return res.status(200).json({
      success: true,
      message: "SubCategory updated successfully",
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


//==========================deleteSubCategory=====================================

export const deleteSubCategory = async (req: Request,res: Response) => {
  try {
    const  id  = req.body.id;

    const subCategory = await subCategoryRepo.findOne({
      where: { id },
    });

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found",
      });
    }

    await subCategoryRepo.remove(subCategory);

    return res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};