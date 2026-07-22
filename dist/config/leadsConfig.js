"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveLeadFiles = exports.fileFilter = exports.storage = exports.LEAD_DOCUMENT_FIELDS = exports.UPLOAD_ROOT = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.UPLOAD_ROOT = path_1.default.join(process.cwd(), "uploads", "Leads");
exports.LEAD_DOCUMENT_FIELDS = [
    "panCard",
    "aadharCard",
    "passport",
    "drivingLicense",
];
exports.default = exports.LEAD_DOCUMENT_FIELDS;
// Files are kept in memory (as Buffers) until validation + duplicate checks pass.
// They are only written to disk inside the controller, after everything succeeds.
exports.storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowed = [
        "application/pdf",
        "image/png",
        "image/jpeg",
    ];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF, PNG and JPG are allowed"));
    }
};
exports.fileFilter = fileFilter;
// Writes buffered files (from multer.memoryStorage) to disk under uploads/Leads/<phoneNumber>/
// and returns a flat { field: "relative/path" } object to merge into the entity / DB row.
// Call this ONLY after validation and duplicate checks have passed.
const saveLeadFiles = (files, phoneNumber) => {
    const result = {};
    if (!files)
        return result;
    const dir = path_1.default.join(exports.UPLOAD_ROOT, phoneNumber || "temp");
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    for (const field of exports.LEAD_DOCUMENT_FIELDS) {
        const fileArr = files[field];
        if (fileArr && fileArr.length > 0) {
            const file = fileArr[0];
            const ext = path_1.default.extname(file.originalname);
            const safeName = `${field}-${Date.now()}${ext}`;
            const fullPath = path_1.default.join(dir, safeName);
            fs_1.default.writeFileSync(fullPath, file.buffer);
            result[field] = path_1.default.relative(process.cwd(), fullPath).split(path_1.default.sep).join("/");
        }
    }
    return result;
};
exports.saveLeadFiles = saveLeadFiles;
