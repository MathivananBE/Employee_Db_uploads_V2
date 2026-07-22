"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getAllCategories = exports.createCategory = void 0;
const dataSource_1 = require("../config/dataSource");
const categories_1 = require("../entities/categories");
const categoryRepo = dataSource_1.AppDataSource.getRepository(categories_1.Category);
// =========================
// CREATE CATEGORY
// =========================
const createCategory = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.createCategory = createCategory;
// =========================
// GET ALL CATEGORIES
// =========================
const getAllCategories = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getAllCategories = getAllCategories;
//=============================================updateCategory=======================================
const updateCategory = async (req, res) => {
    try {
        const id = req.body.id;
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.updateCategory = updateCategory;
//===============================deleteCategory====================================
const deleteCategory = async (req, res) => {
    try {
        const id = req.body.id;
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.deleteCategory = deleteCategory;
