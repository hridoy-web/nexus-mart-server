import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { productRoutes } from "./routes/product.routes.js";
import { reviewRoutes } from "./routes/review.routes.js";
import { globalErrorHandler } from "./lib/globalErrorHandler.js";
import { notFound } from "./lib/notFound.js";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Nexus Mart Backend Server is Running!",
  });
});

// Global Error & Not Found Middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;