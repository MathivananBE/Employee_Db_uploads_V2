"use strict";
//admin login, register user, list users
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
//import { z } from "zod";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const userRepository = AppDataSource.getRepository(User);
/**
 * POST /api/admin/login
 * The admin is a single fixed identity from env vars — there is no admin table
 * and no admin signup. This just checks the submitted credentials against env.
 */
const adminLogin = async (req, res) => {
    /*
      const schema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    });
  
    /*
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid input", errors: parsed.error.flatten() });
    }
      */
    const { email, password } = req.body;
    console.log(email);
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (email !== adminEmail || password !== adminPassword) {
        return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }
    //const token = signToken({ role: "admin", email });
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ email, role: "admin" }, //Payload....This is the data you want to store inside the token.
    JWT_SECRET, //Secret Key
    { expiresIn: "12h" });
    console.log(".................Admin Login Sucesfully.............");
    return res.status(200).json({
        success: true,
        message: "Admin login successful",
        role: "admin",
        token
    });
};
exports.adminLogin = adminLogin;
