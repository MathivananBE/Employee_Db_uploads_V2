"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadService = exports.AppError = void 0;
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../config/dataSource");
const leadsConfig_1 = require("../config/leadsConfig");
const categories_1 = require("../entities/categories");
const Leads_1 = __importDefault(require("../entities/Leads"));
const subCategory_1 = require("../entities/subCategory");
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const leadRepository = dataSource_1.AppDataSource.getRepository(Leads_1.default);
const categoryRepository = dataSource_1.AppDataSource.getRepository(categories_1.Category);
const subCategoryRepository = dataSource_1.AppDataSource.getRepository(subCategory_1.SubCategory);
const normalizeLeadUpdatePayload = (body = {}) => {
    const normalized = {};
    const aliases = {
        first_name: "firstName",
        last_name: "lastName",
        country_code: "countryCode",
        phone_number: "phoneNumber",
        budget_range: "budgetRange",
        configuration_type: "configurationType",
        property_type: "propertyType",
        pan_card: "panCard",
        aadhar_card: "aadharCard",
        driving_license: "drivingLicense",
        is_active: "isActive",
    };
    Object.entries(body).forEach(([key, value]) => {
        if (value === undefined || value === null)
            return;
        const normalizedKey = aliases[key] ?? key;
        normalized[normalizedKey] = typeof value === "string" ? value.trim() : value;
    });
    if (typeof normalized.email === "string") {
        normalized.email = normalized.email.trim().toLowerCase();
    }
    return normalized;
};
exports.leadService = {
    async createLead(payload, files) {
        const email = (payload.email || "").toString().trim().toLowerCase();
        const folderKey = email || "lead";
        const documentPaths = (0, leadsConfig_1.saveLeadFiles)(files, folderKey);
        const lead = leadRepository.create({
            ...payload,
            ...documentPaths,
        });
        return leadRepository.save(lead);
    },
    async getAllLeads() {
        return leadRepository.find({ order: { id: "DESC" } });
    },
    async getLeadByEmail(email) {
        if (!email) {
            throw new AppError("Email is required", 400);
        }
        const lead = await leadRepository.findOne({ where: { email: email.trim().toLowerCase() } });
        if (!lead) {
            throw new AppError("Lead not found", 404);
        }
        return lead;
    },
    async updateLeadByEmail(payload, files) {
        const updatePayload = normalizeLeadUpdatePayload(payload);
        const email = updatePayload.email;
        if (!email) {
            throw new AppError("Email is required", 400);
        }
        const lead = await leadRepository.findOne({ where: { email } });
        if (!lead) {
            throw new AppError("Lead not found", 404);
        }
        const { email: _email, ...leadData } = updatePayload;
        leadRepository.merge(lead, leadData);
        const folderKey = (leadData.email ?? lead.email ?? "lead").toString().trim().toLowerCase() || "lead";
        const documentPaths = (0, leadsConfig_1.saveLeadFiles)(files, folderKey);
        if (Object.keys(documentPaths).length > 0) {
            leadRepository.merge(lead, documentPaths);
        }
        return leadRepository.save(lead);
    },
    async deleteLeadByEmail(email) {
        if (!email) {
            throw new AppError("Email is required", 400);
        }
        const lead = await leadRepository.findOne({ where: { email: email.trim().toLowerCase() } });
        if (!lead) {
            throw new AppError("Lead not found", 404);
        }
        await leadRepository.remove(lead);
        return true;
    },
    async getLeadsByProject(project) {
        if (!project) {
            throw new AppError("Project is required", 400);
        }
        const leads = await leadRepository.find({ where: { project: (0, typeorm_1.ILike)(project) } });
        if (leads.length === 0) {
            throw new AppError(`No leads found for project '${project}'.`, 404);
        }
        return leads;
    },
    async getLeadsByLocation(location) {
        if (!location) {
            throw new AppError("Location is required", 400);
        }
        const leads = await leadRepository.find({ where: { location: (0, typeorm_1.ILike)(location) } });
        if (leads.length === 0) {
            throw new AppError(`No leads found for location '${location}'.`, 404);
        }
        return leads;
    },
    async getLeadsByConfiguration(configurationType) {
        if (!configurationType) {
            throw new AppError("Configuration type is required", 400);
        }
        const leads = await leadRepository.find({ where: { configurationType: (0, typeorm_1.ILike)(configurationType) } });
        if (leads.length === 0) {
            throw new AppError(`No leads found with configuration type '${configurationType}'.`, 404);
        }
        return leads;
    },
    async getLeadsByPropertyType(propertyType) {
        if (!propertyType) {
            throw new AppError("Property type is required", 400);
        }
        const leads = await leadRepository.find({ where: { propertyType: (0, typeorm_1.ILike)(propertyType) } });
        if (leads.length === 0) {
            throw new AppError(`No leads found with property type '${propertyType}'.`, 404);
        }
        return leads;
    },
    async updateLeadCategory(leadId, categoryId, subCategoryId) {
        if (!leadId || !categoryId || !subCategoryId) {
            throw new AppError("leadId, categoryId and subCategoryId are required", 400);
        }
        const lead = await leadRepository.findOne({ where: { id: leadId } });
        if (!lead) {
            throw new AppError("Lead not found", 404);
        }
        const category = await categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        const subCategory = await subCategoryRepository.findOne({
            where: { id: subCategoryId },
            relations: { category: true },
        });
        if (!subCategory) {
            throw new AppError("SubCategory not found", 404);
        }
        if (subCategory.category.id !== category.id) {
            throw new AppError("SubCategory does not belong to selected category", 400);
        }
        lead.category = category;
        lead.subCategory = subCategory;
        return leadRepository.save(lead);
    },
};
