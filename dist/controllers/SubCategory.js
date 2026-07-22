"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.updateSubCategory = exports.getSubCategories = exports.createSubCategory = void 0;
const dataSource_1 = __importDefault(require("../config/dataSource"));
const subCategory_1 = require("../entities/subCategory");
const categories_1 = require("../entities/categories");
const categoryRepo = dataSource_1.default.getRepository(categories_1.Category);
const subCategoryRepo = dataSource_1.default.getRepository(subCategory_1.SubCategory);
// =========================
// CREATE SUB CATEGORY
// =========================
const createSubCategory = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.createSubCategory = createSubCategory;
// =========================
// GET SUB CATEGORIES
// =========================
const getSubCategories = async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getSubCategories = getSubCategories;
//==========================updateSubCategory===================================
const updateSubCategory = async (req, res) => {
    try {
        const id = req.body.id;
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.updateSubCategory = updateSubCategory;
//==========================deleteSubCategory=====================================
const deleteSubCategory = async (req, res) => {
    try {
        const id = req.body.id;
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.deleteSubCategory = deleteSubCategory;
