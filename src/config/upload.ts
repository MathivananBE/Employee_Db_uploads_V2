import fs from "fs";
import path from "path";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// Root folder where all employee documents are stored.
// Files end up at: uploads/documents/<empNo or "temp">/<field>-<timestamp>.<ext>
export const UPLOAD_ROOT = path.join(process.cwd(), "uploads", "documents");

if (!fs.existsSync(UPLOAD_ROOT)) {
  fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
}

// All the document fields we accept, matching the multipart form field names.
export const DOCUMENT_FIELDS = [
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
] as const;

export type DocumentField = (typeof DOCUMENT_FIELDS)[number];

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
]);

// Files are kept in memory (as Buffers) until validation + duplicate checks pass.
// They are only written to disk inside the controller, after everything succeeds.
const storage = multer.memoryStorage();

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    return cb(new Error(`Invalid file type for ${file.fieldname}. Only PDF, JPG and PNG are allowed.`));
  }
  cb(null, true);
};

export const uploadEmployeeDocuments = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
}).fields(DOCUMENT_FIELDS.map((name) => ({ name, maxCount: 1 })));

// Writes buffered files (from multer.memoryStorage) to disk under uploads/documents/<empNo>/
// and returns a flat { field: "relative/path" } object to merge into the entity / DB row.
// Call this ONLY after validation and duplicate checks have passed.
export const saveUploadedFiles = (
  files: { [fieldname: string]: Express.Multer.File[] } | undefined,
  empNo: string | undefined
): Partial<Record<DocumentField, string>> => {
  const result: Partial<Record<DocumentField, string>> = {};

  if (!files) return result;

  const dir = path.join(UPLOAD_ROOT, empNo || "temp");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const field of DOCUMENT_FIELDS) {
    const fileArr = files[field];
    if (fileArr && fileArr.length > 0) {
      const file = fileArr[0];
      const ext = path.extname(file.originalname);
      const safeName = `${field}-${Date.now()}${ext}`;
      const fullPath = path.join(dir, safeName);

      fs.writeFileSync(fullPath, file.buffer);

      result[field] = path.relative(process.cwd(), fullPath).split(path.sep).join("/");
    }
  }

  return result;
};
