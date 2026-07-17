import multer from "multer";
import  {storage,fileFilter,LEAD_DOCUMENT_FIELDS}  from "../config/leadsConfig";


export const uploadLeadDocuments = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).fields(
  LEAD_DOCUMENT_FIELDS.map((name) => ({
    name,
    maxCount: 1,
  }))
);

/*
  //in simple
.fields([
  { name: "panCard", maxCount: 1 },
  { name: "aadharCard", maxCount: 1 },
  { name: "passport", maxCount: 1 },
  { name: "drivingLicense", maxCount: 1 },
]);
*/