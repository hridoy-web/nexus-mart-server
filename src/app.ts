import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Nexus Mart Backend Server is Running!",
  });
});

export default app;