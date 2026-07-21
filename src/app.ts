import express, { Application,Request,Response,NextFunction } from "express";
import path from "path";
import multer from "multer";
import cors from "cors";
import { AppDataSource } from "./config/dataSource";

import morgan from "morgan";       //Shows every request.
 
import router from "./routes/employeeRoutes";
import { auth } from "./middleware/auth";
import { adminLogin } from "./controllers/adminLogin";
import leadsRouter from "./routes/leadsRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app: Application = express();

app.use(cors());

app.use(cors({
  origin:"http://192.168.0.10:5174"             //"http://192.168.0.10:5173"   // Replace with your frontend PC's IP and port
}));

app.use(express.json());

app.use(morgan("dev"));

// Serve uploaded documents so stored paths (e.g. uploads/documents/EMP001/resume-xxx.pdf)
// can be fetched back over HTTP as http://<host>/uploads/documents/EMP001/resume-xxx.pdf
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// --- Health check ---
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Employee API is running" });
});


app.get("/health", async (_req: Request, res: Response) => {
  try {
    await AppDataSource.query("SELECT 1");
    res.status(200).json({ success: true, status: "ok", db: "connected" });
  } catch {
    res.status(503).json({ success: false, status: "error", db: "disconnected" });
  }
});

// --- Routes ---
app.post("/api/admin/login", adminLogin);
app.get("/api/home",auth);
app.use("/api/employees", router);
app.use("/api/leads",leadsRouter)


//================category Routes===============
app.use("/api",categoryRoutes);


//app.use("/emp",router);

 

app.get("/api/test", (req, res) => {

    console.log("Test run SuccessFully");
    res.status(200).json({
        success: true,
        message: "Backend is working!"
    });
});

// --- Multer / upload error handler (invalid file type, file too large, etc.) ---
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ success: false, message: err.message || "Upload failed" });
  }
  next();
});

export default app;