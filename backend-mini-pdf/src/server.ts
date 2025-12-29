import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pdfRoutes from "./routes/pdfRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", pdfRoutes);

const PORT = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "ok", message: "PDF Compressor Backend is running." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
