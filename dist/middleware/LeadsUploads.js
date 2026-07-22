"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLeadDocuments = void 0;
const multer_1 = __importDefault(require("multer"));
const leadsConfig_1 = require("../config/leadsConfig");
exports.uploadLeadDocuments = (0, multer_1.default)({
    storage: leadsConfig_1.storage,
    fileFilter: leadsConfig_1.fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
}).fields(leadsConfig_1.LEAD_DOCUMENT_FIELDS.map((name) => ({
    name,
    maxCount: 1,
})));
/*
  //in simple
.fields([
  { name: "panCard", maxCount: 1 },
  { name: "aadharCard", maxCount: 1 },
  { name: "passport", maxCount: 1 },
  { name: "drivingLicense", maxCount: 1 },
]);
*/ 
