import express, { Request, Response } from "express";
import { prisma } from "../config/db";
import { testAI, createReport } from "../controllers/report.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Get all reports route working",
  });
});

router.get("/test-db", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json({
    success: true,
    users,
  });
});

router.get("/test-ai", testAI);
router.post("/", createReport);

export default router;
