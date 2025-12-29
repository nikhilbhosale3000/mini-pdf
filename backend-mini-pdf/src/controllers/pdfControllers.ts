import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { compressPdf } from "../services/pdfService";

export const compressFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No PDF file uploaded." });
    return;
  }

  const level = (req.body.level as "less" | "medium" | "max") || "medium";

  const inputPath = req.file.path;
  const outputFileName = `compressed_${Date.now()}_${req.file.originalname}`;
  const outputPath = path.join("uploads", outputFileName);

  try {
    //compress the file
    await compressPdf(inputPath, outputPath, level);

    //downloading file back to client
    res.download(outputPath, outputFileName, (err) => {
      if (err) {
        console.error("Download error:", err);
        if (!res.headersSent) res.status(500).send("Error downloading file.");
      }

      safeDelete(inputPath);
      safeDelete(outputPath);
    });
  } catch (error) {
    console.error("Compression failed:", error);
    res.status(500).json({ error: "Compression failed." });
    safeDelete(inputPath);
  }
};

//Helper function
const safeDelete = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Failed to delete temp file:, ${filePath}`, err);
  });
};
