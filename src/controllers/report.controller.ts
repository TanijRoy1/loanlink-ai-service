import { Request, Response } from "express";
import { generateLoanSummary } from "../services/gemini.service";

// testAI
export const testAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await generateLoanSummary();

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};

// createReport
export const createReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(200).json({
    success: true,
    message: "create report endpoint working",
  });
};
