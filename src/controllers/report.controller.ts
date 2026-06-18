import { Request, Response } from "express";
import { generateLoanSummary } from "../services/gemini.service";
import { LoanSummaryInput } from "../types/report.types";
import { saveReport } from "../services/report.service";

// testAI
export const testAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await generateLoanSummary({
      applicantName: "John Doe",
      monthlyIncome: 50000,
      loanAmount: 300000,
      duration: 24,
      purpose: "Business Expansion",
    });

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
  try {
    const loanData: LoanSummaryInput = req.body;

    const report = await generateLoanSummary(loanData);

    const savedReport = await saveReport(loanData, report);

    res.status(201).json({
      success: true,
      data: savedReport,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate report",
    });
  }
};
