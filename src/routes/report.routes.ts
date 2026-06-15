import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Get all reports route working",
  });
});

export default router;