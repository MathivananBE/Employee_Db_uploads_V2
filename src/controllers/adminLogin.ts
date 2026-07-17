//admin login, register user, list users

import { Request, Response } from "express";
//import { z } from "zod";

import jwt from "jsonwebtoken";
//const userRepository = AppDataSource.getRepository(User);

/**
 * POST /api/admin/login
 * The admin is a single fixed identity from env vars — there is no admin table
 * and no admin signup. This just checks the submitted credentials against env.
 */
export const adminLogin = async (req: Request, res: Response) => {
  
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

  console.log(email)
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ success: false, message: "Invalid admin credentials" });
  }

  //const token = signToken({ role: "admin", email });

  const JWT_SECRET = process.env.JWT_SECRET as string;  

  const token = jwt.sign(
  {email,role:"admin"},        //Payload....This is the data you want to store inside the token.
  JWT_SECRET,                  //Secret Key
  { expiresIn: "12h" }
);

  console.log(".................Admin Login Sucesfully.............");
  return res.status(200).json({
    success: true,
    message: "Admin login successful",
    role:"admin",
    token
  });
  
};
 