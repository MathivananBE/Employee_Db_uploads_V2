"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployee = void 0;
const employee_schema_1 = require("../schemas/employee.schema");
const validateEmployee = (req, res, next) => {
    const result = employee_schema_1.createEmployeeSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.flatten(),
        });
    }
    req.body = result.data;
    next();
};
exports.validateEmployee = validateEmployee;
