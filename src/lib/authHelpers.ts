import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: { id: string; role: string }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "7d",
  });
};