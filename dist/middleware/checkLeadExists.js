"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLeadExists = void 0;
const dataSource_1 = __importDefault(require("../config/dataSource"));
const Leads_1 = __importDefault(require("../entities/Leads"));
const leadRepository = dataSource_1.default.getRepository(Leads_1.default);
const checkLeadExists = async (req, res, next) => {
    try {
        const { email, countryCode, phoneNumber } = req.body;
        const existing = await leadRepository.findOne({
            where: [
                { email },
                { countryCode, phoneNumber },
            ],
        });
        if (existing) {
            if (existing.email === email) {
                return res.status(409).json({ success: false, message: "Email already exists" });
            }
            if (existing.countryCode === countryCode && existing.phoneNumber === phoneNumber) {
                return res.status(409).json({ success: false, message: "Phone number already exists" });
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkLeadExists = checkLeadExists;
