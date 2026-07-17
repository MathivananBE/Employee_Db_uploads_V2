import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Missing or invalid Authorization header" });
  }

  const token = header.split(" ")[1];

  try {
    //const decoded = verifyToken(token);

    const JWT_SECRET = process.env.JWT_SECRET as string;  

    jwt.verify(token, JWT_SECRET);

    //req.auth = decoded;


    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};