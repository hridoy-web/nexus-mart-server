import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { productRoutes } from "./routes/product.routes.js";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Nexus Mart Backend Server is Running!",
  });
});

export default app;