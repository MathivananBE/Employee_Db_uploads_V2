"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLead = void 0;
const Leads_schema_1 = require("../schemas/Leads.schema");
const validateLead = (req, res, next) => {
    const result = Leads_schema_1.createLeadSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.flatten(),
        });
    }
    req.body = result.data;
    next();
};
exports.validateLead = validateLead;
