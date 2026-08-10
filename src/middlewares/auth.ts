import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (...requiredRoles: string[]) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key") as any;
      req.user = decoded;

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access!",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};