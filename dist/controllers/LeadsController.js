"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadCategory = exports.getLeadsByPropertyType = exports.getLeadsByConfiguration = exports.getLeadsByLocation = exports.getLeadsByProject = exports.deleteLeadByEmail = exports.updateLeadByEmail = exports.getLeadById = exports.getAllLeads = exports.createLead = void 0;
const leadService_1 = require("../services/leadService");
const handleServiceError = (res, error, fallbackMessage) => {
    if (error instanceof leadService_1.AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error(error);
    return res.status(500).json({ success: false, message: fallbackMessage });
};
const createLead = async (req, res) => {
    try {
        const files = req.files;
        const savedLead = await leadService_1.leadService.createLead(req.body, files);
        return res.status(201).json({
            success: true,
            data: savedLead,
        });
    }
    catch (error) {
        if (error && typeof error === "object" && "code" in error && error.code === "23505") {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }
        return handleServiceError(res, error, "Failed to create lead");
    }
};
exports.createLead = createLead;
const getAllLeads = async (_req, res) => {
    try {
        const leads = await leadService_1.leadService.getAllLeads();
        return res.status(200).json({
            success: true,
            count: leads.length,
            data: leads,
        });
    }
    catch (error) {
        return handleServiceError(res, error, "Failed to fetch leads");
    }
};
exports.getAllLeads = getAllLeads;
const getLeadById = async (req, res) => {
    try {
        const email = req.body.email;
        const lead = await leadService_1.leadService.getLeadByEmail(email);
        return res.status(200).json({
            success: true,
            data: lead,
        });
    }
    catch (error) {
        return handleServiceError(res, error, "Failed to fetch lead");
    }
};
exports.getLeadById = getLeadById;
const updateLeadByEmail = async (req, res) => {
    try {
        const files = req.files;
        const updatedLead = await leadService_1.leadService.updateLeadByEmail(req.body, files);
        return res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            data: updatedLead,
        });
    }
    catch (error) {
        return handleServiceError(res, error, "Failed to update lead");
    }
};
exports.updateLeadByEmail = updateLeadByEmail;
const deleteLeadByEmail = async (req, res) => {
    try {
        const email = req.body.email;
        await leadService_1.leadService.deleteLeadByEmail(email);
        return res.status(200).json({
            success: true,
            message: "Lead deleted successfully",
        });
    }
    catch (error) {
        return handleServiceError(res, error, "Failed to delete lead");
    }
};
exports.deleteLeadByEmail = deleteLeadByEmail;
// Get Leads by Project
const getLeadsByProject = async (req, res) => {
    try {
        const project = req.body.project;
        const leads = await leadService_1.leadService.getLeadsByProject(project);
        return res.status(200).json({ success: true, count: leads.length, data: leads });
    }
    catch (error) {
        return handleServiceError(res, error, "Failed to fetch leads by project");
    }
};
exports.getLeadsByProject = getLeadsByProject;
// Get Leads by Location
const getLeadsByLocation = async (req, res) => {
    try {
        const location = req.body.location;
        const leads = await leadService_1.leadService.getLeadsByLocation(location);
        return res.status(200).json({ success: true, count: leads.length, data: leads });
    }
    catch (error) {
        return handleServiceError(res, error, "Failed to fetch leads by location");
    }
};
exports.getLeadsByLocation = getLeadsByLocation;
// Get Leads by Configuration Type
const getLeadsByConfiguration = async (req, res) => {
    try {
        const configurationType = req.body.configurationType;
        const leads = await leadService_1.leadService.getLeadsByConfiguration(configurationType);
        return res.status(200).json({ success: true, count: leads.length, data: leads });
    }
    catch (error) {
        return handleServiceError(res, error, "Failed to fetch leads by configuration type");
    }
};
exports.getLeadsByConfiguration = getLeadsByConfiguration;
// Get Leads by Property Type
const getLeadsByPropertyType = async (req, res) => {
    try {
        const propertyType = req.body.propertyType;
        const leads = await leadService_1.leadService.getLeadsByPropertyType(propertyType);
        return res.status(200).json({ success: true, count: leads.length, data: leads });
    }
    catch (error) {
        return handleServiceError(res, error, "Failed to fetch leads by property type");
    }
};
exports.getLeadsByPropertyType = getLeadsByPropertyType;
//======================================updateLeadCategory===========================================
const updateLeadCategory = async (req, res) => {
    try {
        const { leadId, categoryId, subCategoryId } = req.body;
        const lead = await leadService_1.leadService.updateLeadCategory(leadId, categoryId, subCategoryId);
        return res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            data: lead,
        });
    }
    catch (error) {
        return handleServiceError(res, error, "Failed to update lead category");
    }
};
exports.updateLeadCategory = updateLeadCategory;
