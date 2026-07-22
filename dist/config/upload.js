"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUploadedFiles = exports.uploadEmployeeDocuments = exports.DOCUMENT_FIELDS = exports.UPLOAD_ROOT = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
// Root folder where all employee documents are stored.
// Files end up at: uploads/documents/<empNo or "temp">/<field>-<timestamp>.<ext>
exports.UPLOAD_ROOT = path_1.default.join(process.cwd(), "uploads", "documents");
if (!fs_1.default.existsSync(exports.UPLOAD_ROOT)) {
    fs_1.default.mkdirSync(exports.UPLOAD_ROOT, { recursive: true });
}
// All the document fields we accept, matching the multipart form field names.
exports.DOCUMENT_FIELDS = [
    "marksheet10",
    "marksheet11",
    "marksheet12",
    "collegeMarksheet",
    "aadharCard",
    "panCard",
    "bankBook",
    "provisionalCertificate",
    "courseCertificate",
    "resume",
    "passportPhoto",
    "password",
];
const ALLOWED_MIME_TYPES = new Set([
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
]);
// Files are kept in memory (as Buffers) until validation + duplicate checks pass.
// They are only written to disk inside the controller, after everything succeeds.
const storage = multer_1.default.memoryStorage();
const fileFilter = (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
        return cb(new Error(`Invalid file type for ${file.fieldname}. Only PDF, JPG and PNG are allowed.`));
    }
    cb(null, true);
};
exports.uploadEmployeeDocuments = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB per file
    },
}).fields(exports.DOCUMENT_FIELDS.map((name) => ({ name, maxCount: 1 })));
// Writes buffered files (from multer.memoryStorage) to disk under uploads/documents/<empNo>/
// and returns a flat { field: "relative/path" } object to merge into the entity / DB row.
// Call this ONLY after validation and duplicate checks have passed.
const saveUploadedFiles = (files, empNo) => {
    const result = {};
    if (!files)
        return result;
    const dir = path_1.default.join(exports.UPLOAD_ROOT, empNo || "temp");
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    for (const field of exports.DOCUMENT_FIELDS) {
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
exports.saveUploadedFiles = saveUploadedFiles;
