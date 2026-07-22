"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const dataSource_1 = require("./config/dataSource");
const morgan_1 = __importDefault(require("morgan")); //Shows every request.
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const auth_1 = require("./middleware/auth");
const adminLogin_1 = require("./controllers/adminLogin");
const leadsRoutes_1 = __importDefault(require("./routes/leadsRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: "http://192.168.0.10:5174" //"http://192.168.0.10:5173"   // Replace with your frontend PC's IP and port
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Serve uploaded documents so stored paths (e.g. uploads/documents/EMP001/resume-xxx.pdf)
// can be fetched back over HTTP as http://<host>/uploads/documents/EMP001/resume-xxx.pdf
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// --- Health check ---
app.get("/", (_req, res) => {
    res.status(200).json({ success: true, message: "Employee API is running" });
});
app.get("/health", async (_req, res) => {
    try {
        await dataSource_1.AppDataSource.query("SELECT 1");
        res.status(200).json({ success: true, status: "ok", db: "connected" });
    }
    catch {
        res.status(503).json({ success: false, status: "error", db: "disconnected" });
    }
});
// --- Routes ---
app.post("/api/admin/login", adminLogin_1.adminLogin);
app.get("/api/home", auth_1.auth);
app.use("/api/employees", employeeRoutes_1.default);
app.use("/api/leads", leadsRoutes_1.default);
//================category Routes===============
app.use("/api", categoryRoutes_1.default);
//app.use("/emp",router);
app.get("/api/test", (req, res) => {
    console.log("Test run SuccessFully");
    res.status(200).json({
        success: true,
        message: "Backend is working!"
    });
});
// --- Multer / upload error handler (invalid file type, file too large, etc.) ---
app.use((err, _req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    }
    if (err) {
        return res.status(400).json({ success: false, message: err.message || "Upload failed" });
    }
    next();
});
exports.default = app;
