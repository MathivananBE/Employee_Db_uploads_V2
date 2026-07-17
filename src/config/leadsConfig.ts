import multer from "multer";
import path from "path";
import fs from "fs";

export const UPLOAD_ROOT = path.join(process.cwd(), "uploads", "Leads");

export const LEAD_DOCUMENT_FIELDS = [
  "panCard",
  "aadharCard",
  "passport",
  "drivingLicense",
] as const;

export type LeadDocumentField = (typeof LEAD_DOCUMENT_FIELDS)[number];

export default LEAD_DOCUMENT_FIELDS;

// Files are kept in memory (as Buffers) until validation + duplicate checks pass.
// They are only written to disk inside the controller, after everything succeeds.
export const storage = multer.memoryStorage();

export const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  cb
) => {
  const allowed = [
    "application/pdf",
    "image/png",
    "image/jpeg",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, PNG and JPG are allowed"));
  }
};

// Writes buffered files (from multer.memoryStorage) to disk under uploads/Leads/<phoneNumber>/
// and returns a flat { field: "relative/path" } object to merge into the entity / DB row.
// Call this ONLY after validation and duplicate checks have passed.
export const saveLeadFiles = (
  files: { [fieldname: string]: Express.Multer.File[] } | undefined,
  phoneNumber: string | undefined
): Partial<Record<LeadDocumentField, string>> => {
  const result: Partial<Record<LeadDocumentField, string>> = {};

  if (!files) return result;

  const dir = path.join(UPLOAD_ROOT, phoneNumber || "temp");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const field of LEAD_DOCUMENT_FIELDS) {
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