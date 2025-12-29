import express from "express";
import { upload } from "../middleware/uploadMiddleware";
import { compressFile } from "../controllers/pdfControllers";

const router = express.Router();

// POST /api/compress
router.post("/compress", upload.single("pdf"), compressFile);

export default router;
